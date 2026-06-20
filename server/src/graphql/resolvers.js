import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { GraphQLError, GraphQLScalarType, Kind } from 'graphql';
import { User } from '../models/User.js';
import { Product } from '../models/Product.js';
import { Category } from '../models/Category.js';
import { Order } from '../models/Order.js';
import { ProductLike } from '../models/ProductLike.js';
import { Review } from '../models/Review.js';
import { emitProductEvent } from '../socket/index.js';
import {
  assertValidCategory,
  buildProductCreateDoc,
  buildProductUpdateDoc,
  ensureTrendingCapacity,
} from '../services/productService.js';

const authError = new GraphQLError('No autorizado', {
  extensions: { code: 'UNAUTHENTICATED' },
});

function requireAuth(ctx) {
  if (!ctx.user) throw authError;
  return ctx.user;
}
function requireAdmin(ctx) {
  const user = requireAuth(ctx);
  if (user.role !== 'admin')
    throw new GraphQLError('Solo Administrador', { extensions: { code: 'FORBIDDEN' } });
  return user;
}

async function getProductEngagement(productId, userId = null) {
  const product = await Product.findById(productId);
  if (!product) {
    throw new GraphQLError('Producto no encontrado', {
      extensions: { code: 'NOT_FOUND' },
    });
  }

  const liked = userId
    ? !!(await ProductLike.exists({ product: productId, user: userId }))
    : false;

  return {
    productId: product.id,
    liked,
    likesCount: product.likesCount || 0,
    reviewsCount: product.reviewsCount || 0,
    rating: product.rating || 0,
    viewsCount: product.viewsCount || 0,
  };
}

async function refreshReviewSummary(productId) {
  const [summary] = await Review.aggregate([
    {
      $match: {
        product: new mongoose.Types.ObjectId(productId),
        status: 'published',
      },
    },
    {
      $group: {
        _id: '$product',
        reviewsCount: { $sum: 1 },
        rating: { $avg: '$rating' },
      },
    },
  ]);

  return Product.findByIdAndUpdate(
    productId,
    {
      reviewsCount: summary?.reviewsCount || 0,
      rating: summary ? Math.round(summary.rating * 10) / 10 : 0,
    },
    { new: true }
  );
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
        if (filter?.isTrending != null) q.isTrending = !!filter.isTrending;
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
        q.originalPrice = {}; 
        if (filter.minPrice != null) q.originalPrice.$gte = filter.minPrice;
        if (filter.maxPrice != null) q.originalPrice.$lte = filter.maxPrice;
      }
      const page = pagination?.page || 1;
      const pageSize = pagination?.pageSize || 12;

      const cursor = Product.find(q).populate('category');
      
      switch (sort) {
        case 'PRICE_ASC':
          cursor.sort({ originalPrice: 1 }); 
          break;
        case 'PRICE_DESC':
          cursor.sort({ originalPrice: -1 }); 
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

    productReviews: async (_, { productId, limit }) => {
      if (!mongoose.Types.ObjectId.isValid(productId)) return [];
      return Review.find({ product: productId, status: 'published' })
        .populate('product')
        .populate('user')
        .sort({ createdAt: -1 })
        .limit(Math.min(Math.max(limit || 20, 1), 100));
    },

    productEngagement: (_, { productId }, ctx) =>
      getProductEngagement(productId, ctx.user?.id),

    categories: async () => Category.find().sort({ name: 1 }).exec(),
    category: async (_, { slug }) => Category.findOne({ slug }).exec(),

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
        throw new GraphQLError('Email en uso', {
          extensions: { code: 'BAD_USER_INPUT' },
        });
      const user = await User.create({ name, email, password });
      const token = jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
      });

      return { token, user };
    },
    loginUser: async (_, { email, password }, { res }) => {
      const user = await User.findOne({ email });
      if (!user)
        throw new GraphQLError('Credenciales inválidas', {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      const ok = await user.comparePassword(password);
      if (!ok)
        throw new GraphQLError('Credenciales inválidas', {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      const token = jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
      });

      return { token, user };
    },
    logoutUser: async (_, __, { res }) => {
      res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });
      return true;
    },

    createCategory: async (_, { name, parentId }, ctx) => {
      requireAdmin(ctx);
      return Category.create({ name, parent: parentId || null });
    },

    createProduct: async (_, { input }, ctx) => {
      requireAdmin(ctx);
      await assertValidCategory(Category, input.categoryId);
      if (input.isTrending === true) {
        await ensureTrendingCapacity(Product);
      }
      const p = await Product.create(buildProductCreateDoc(input, ctx.user));
      const populated = await p.populate('category');
      emitProductEvent(p.id, 'product:created', { productId: p.id });
      return populated;
    },
    updateProduct: async (_, { id, input }, ctx) => {
      requireAdmin(ctx);
      if (input?.isTrending === true) {
        await ensureTrendingCapacity(Product, id);
      }
      const update = buildProductUpdateDoc(input);
      const p = await Product.findByIdAndUpdate(id, update, {
        new: true,
      }).populate('category');
      if (!p)
        throw new GraphQLError('Producto no encontrado', {
          extensions: { code: 'NOT_FOUND' },
        });
      emitProductEvent(p.id, 'product:updated', { productId: p.id });
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
      if (res) {
        await Promise.all([
          ProductLike.deleteMany({ product: id }),
          Review.deleteMany({ product: id }),
        ]);
        emitProductEvent(id, 'product:deleted', { productId: id });
      }
      return !!res;
    },

    toggleProductLike: async (_, { productId }, ctx) => {
      const user = requireAuth(ctx);
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        throw new GraphQLError('ID de producto inválido', {
          extensions: { code: 'BAD_USER_INPUT' },
        });
      }

      const existing = await ProductLike.findOne({
        product: productId,
        user: user.id,
      });

      let liked;
      if (existing) {
        await existing.deleteOne();
        liked = false;
      } else {
        try {
          await ProductLike.create({ product: productId, user: user.id });
        } catch (error) {
          if (error?.code !== 11000) throw error;
        }
        liked = true;
      }

      const likesCount = await ProductLike.countDocuments({ product: productId });
      const product = await Product.findByIdAndUpdate(
        productId,
        { likesCount },
        { new: true }
      );
      if (!product) {
        throw new GraphQLError('Producto no encontrado', {
          extensions: { code: 'NOT_FOUND' },
        });
      }

      const engagement = {
        productId: product.id,
        liked,
        likesCount,
        reviewsCount: product.reviewsCount || 0,
        rating: product.rating || 0,
        viewsCount: product.viewsCount || 0,
      };
      emitProductEvent(productId, 'product:engagement-updated', engagement);
      return engagement;
    },

    recordProductView: async (_, { productId }, ctx) => {
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        throw new GraphQLError('ID de producto inválido', {
          extensions: { code: 'BAD_USER_INPUT' },
        });
      }
      const product = await Product.findByIdAndUpdate(
        productId,
        { $inc: { viewsCount: 1 } },
        { new: true }
      );
      if (!product) {
        throw new GraphQLError('Producto no encontrado', {
          extensions: { code: 'NOT_FOUND' },
        });
      }
      const engagement = await getProductEngagement(productId, ctx.user?.id);
      emitProductEvent(productId, 'product:engagement-updated', engagement);
      return engagement;
    },

    saveProductReview: async (_, { productId, rating, comment }, ctx) => {
      const user = requireAuth(ctx);
      const normalizedComment = comment.trim();
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        throw new GraphQLError('ID de producto inválido', {
          extensions: { code: 'BAD_USER_INPUT' },
        });
      }
      if (rating < 1 || rating > 5) {
        throw new GraphQLError('La calificación debe estar entre 1 y 5', {
          extensions: { code: 'BAD_USER_INPUT' },
        });
      }
      if (normalizedComment.length < 3) {
        throw new GraphQLError('La reseña debe contener al menos 3 caracteres', {
          extensions: { code: 'BAD_USER_INPUT' },
        });
      }
      if (!(await Product.exists({ _id: productId }))) {
        throw new GraphQLError('Producto no encontrado', {
          extensions: { code: 'NOT_FOUND' },
        });
      }

      const review = await Review.findOneAndUpdate(
        { product: productId, user: user.id },
        {
          rating,
          comment: normalizedComment,
          status: 'published',
        },
        { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
      )
        .populate('product')
        .populate('user');

      const product = await refreshReviewSummary(productId);
      emitProductEvent(productId, 'product:review-saved', {
        productId,
        reviewId: review.id,
        reviewsCount: product.reviewsCount,
        rating: product.rating,
      });
      return review;
    },

    deleteProductReview: async (_, { productId }, ctx) => {
      const user = requireAuth(ctx);
      const deleted = await Review.findOneAndDelete({
        product: productId,
        user: user.id,
      });
      if (!deleted) return false;

      const product = await refreshReviewSummary(productId);
      emitProductEvent(productId, 'product:review-deleted', {
        productId,
        reviewId: deleted.id,
        reviewsCount: product.reviewsCount,
        rating: product.rating,
      });
      return true;
    },

    createOrder: async (_, { items, shippingAddress }, ctx) => {
      const user = requireAuth(ctx);
      // Valida ID de productos y retorna un error amigable en lugar de un CastError
      const productIds = items.map((i) => i.productId);
      for (const pid of productIds) {
        if (!mongoose.Types.ObjectId.isValid(pid)) {
          throw new GraphQLError('ID de producto inválido: ' + pid, {
            extensions: { code: 'BAD_USER_INPUT' },
          });
        }
      }
      const products = await Product.find({ _id: { $in: productIds } });
      const itemsExpanded = items.map((i) => {
        const p = products.find((pp) => pp.id == i.productId);
        if (!p)
          throw new GraphQLError('Producto no encontrado', {
            extensions: { code: 'BAD_USER_INPUT' },
          });
        return {
          product: p._id,
          title: p.title,
          price: p.originalPrice, //Nota: preservando el nombre del campo 'price' en el esquema OrderItem
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
