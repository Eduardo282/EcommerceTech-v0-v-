import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { GraphQLError, GraphQLScalarType, Kind } from 'graphql';
import { User } from '../models/User.js';
import { Product } from '../models/Product.js';
import { Category } from '../models/Category.js';
import { Order } from '../models/Order.js';

const authError = new GraphQLError('Not authorized', {
  extensions: { code: 'UNAUTHENTICATED' },
});

function requireAuth(ctx) {
  if (!ctx.user) throw authError;
  return ctx.user;
}
function requireAdmin(ctx) {
  const user = requireAuth(ctx);
  if (user.role !== 'admin')
    throw new GraphQLError('Admin only', { extensions: { code: 'FORBIDDEN' } });
  return user;
}

export const resolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    serialize(value) {
      return value instanceof Date ? value.toISOString() : new Date(value).toISOString();
    },
    parseValue(value) {
      return new Date(value);
    },
    parseLiteral(ast) {
      return ast.kind === Kind.STRING ? new Date(ast.value) : null;
    },
  }),
  JSON: new GraphQLScalarType({
    name: 'JSON',
    serialize: (v) => v,
    parseValue: (v) => v,
    parseLiteral(ast) {
      switch (ast.kind) {
        case Kind.STRING:
        case Kind.BOOLEAN:
          return ast.value;
        case Kind.INT:
        case Kind.FLOAT:
          return parseFloat(ast.value);
        case Kind.OBJECT: {
          const value = Object.create(null);
          for (const field of ast.fields) {
            value[field.name.value] = this.parseLiteral(field.value);
          }
          return value;
        }
        case Kind.LIST:
          return ast.values.map((n) => this.parseLiteral(n));
        default:
          return null;
      }
    },
  }),
  Query: {
    me: (_, __, ctx) => ctx.user || null,

    product: async (_, { id, slug }) => {
      if (!id && !slug) return null;
      const query = id ? { _id: id } : { slug };
      return Product.findOne(query).populate('category');
    },

    products: async (_, { filter, sort, pagination }) => {
      const q = {};
      if (filter?.active != null) q.active = !!filter.active;
      if (filter?.search) q.$text = { $search: filter.search };
      if (filter?.categorySlug) {
        const cat = await Category.findOne({ slug: filter.categorySlug });
        if (cat) q.category = cat._id;
        else return [];
      }
      if (filter?.rubro) {
        q.rubro = filter.rubro;
      }
      if (filter?.minPrice != null || filter?.maxPrice != null) {
        q.price = {};
        if (filter.minPrice != null) q.price.$gte = filter.minPrice;
        if (filter.maxPrice != null) q.price.$lte = filter.maxPrice;
      }
      const page = pagination?.page || 1;
      const pageSize = pagination?.pageSize || 12;

      const cursor = Product.find(q).populate('category');
      switch (sort) {
        case 'PRICE_ASC':
          cursor.sort({ price: 1 });
          break;
        case 'PRICE_DESC':
          cursor.sort({ price: -1 });
          break;
        case 'RATING_DESC':
          cursor.sort({ rating: -1 });
          break;
        case 'NEWEST':
        default:
          cursor.sort({ createdAt: -1 });
      }
      return cursor.skip((page - 1) * pageSize).limit(pageSize);
    },

    categories: () => Category.find().sort({ name: 1 }),
    category: (_, { slug }) => Category.findOne({ slug }),

    orders: async (_, __, ctx) => {
      const user = requireAuth(ctx);
      return Order.find({ user: user.id }).populate({
        path: 'items.product',
        model: Product,
      });
    },
    order: async (_, { id }, ctx) => {
      const user = requireAuth(ctx);
      const order = await Order.findOne({ _id: id, user: user.id }).populate({
        path: 'items.product',
        model: Product,
      });
      if (!order) return null;
      return order;
    },
  },

  Mutation: {
    registerUser: async (_, { name, email, password }, { res }) => {
      const existing = await User.findOne({ email });
      if (existing)
        throw new GraphQLError('Email already in use', {
          extensions: { code: 'BAD_USER_INPUT' },
        });
      const user = await User.create({ name, email, password });
      const token = jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      return { token, user };
    },
    loginUser: async (_, { email, password }, { res }) => {
      const user = await User.findOne({ email });
      if (!user)
        throw new GraphQLError('Invalid credentials', {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      const ok = await user.comparePassword(password);
      if (!ok)
        throw new GraphQLError('Invalid credentials', {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      const token = jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      return { token, user };
    },
    logoutUser: async (_, __, { res }) => {
      res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      });
      return true;
    },

    createCategory: async (_, { name, parentId }, ctx) => {
      requireAdmin(ctx);
      return Category.create({ name, parent: parentId || null });
    },

    createProduct: async (_, { input }, ctx) => {
      requireAdmin(ctx);
      const doc = {
        title: input.title,
        description: input.description || '',
        longDescription: input.longDescription || '',
        details: input.details || [],
        specs: input.specs || [],
        includes: input.includes || [],
        price: input.price,
        images: input.images || [],
        category: input.categoryId || null,
        inventory: input.inventory ?? 0,
        attributes: input.attributes || {},
        active: input.active ?? true,
        rubro: input.rubro || ctx.user?.rubro || 'TECHNOLOGY',
      };
      const p = await Product.create(doc);
      return p.populate('category');
    },
    updateProduct: async (_, { id, input }, ctx) => {
      requireAdmin(ctx);
      const update = { ...input };
      if (input?.categoryId != null) {
        update.category = input.categoryId;
        delete update.categoryId;
      }
      if (input?.rubro) {
        update.rubro = input.rubro;
      }
      const p = await Product.findByIdAndUpdate(id, update, {
        new: true,
      }).populate('category');
      if (!p)
        throw new GraphQLError('Product not found', {
          extensions: { code: 'NOT_FOUND' },
        });
      return p;
    },

    setSellerProfile: async (_, { rubro, storeName, storeDescription }, ctx) => {
      const user = requireAuth(ctx);
      const update = {
        isSeller: true,
        rubro,
        storeName,
        storeDescription: storeDescription || '',
      };
      const u = await User.findByIdAndUpdate(user.id, update, {
        new: true,
      });
      return u;
    },
    deleteProduct: async (_, { id }, ctx) => {
      requireAdmin(ctx);
      const res = await Product.findByIdAndDelete(id);
      return !!res;
    },

    createOrder: async (_, { items, shippingAddress }, ctx) => {
      const user = requireAuth(ctx);
      // Validate product IDs early to return a friendly error instead of a CastError
      const productIds = items.map((i) => i.productId);
      for (const pid of productIds) {
        if (!mongoose.Types.ObjectId.isValid(pid)) {
          throw new GraphQLError('Invalid productId: ' + pid, {
            extensions: { code: 'BAD_USER_INPUT' },
          });
        }
      }
      const products = await Product.find({ _id: { $in: productIds } });
      const itemsExpanded = items.map((i) => {
        const p = products.find((pp) => pp.id == i.productId);
        if (!p)
          throw new GraphQLError('Product not found', {
            extensions: { code: 'BAD_USER_INPUT' },
          });
        return {
          product: p._id,
          title: p.title,
          price: p.price,
          quantity: i.quantity,
        };
      });
      const total = itemsExpanded.reduce((sum, it) => sum + it.price * it.quantity, 0);
      const order = await Order.create({
        user: user.id,
        items: itemsExpanded,
        total,
        shippingAddress: shippingAddress || {},
      });
      return order.populate({ path: 'items.product', model: Product });
    },
  },
};
