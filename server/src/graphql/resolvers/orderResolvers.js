import mongoose from 'mongoose';
import { GraphQLError } from 'graphql';
import { Product } from '../../models/Product.js';
import { Order } from '../../models/Order.js';
import { requireAuth } from '../resolverUtils.js';

export const orderQueries = {
  orders: async (_, __, ctx) => {
    const user = requireAuth(ctx);
    return Order.find({ user: user.id }).populate({
      path: 'items.product',
      model: Product,
    });
  },

  order: async (_, { id }, ctx) => {
    const user = requireAuth(ctx);
    return Order.findOne({ _id: id, user: user.id }).populate({
      path: 'items.product',
      model: Product,
    });
  },
};

export const orderMutations = {
  createOrder: async (_, { items, shippingAddress }, ctx) => {
    const user = requireAuth(ctx);
    const productIds = items.map((item) => item.productId);

    for (const productId of productIds) {
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        throw new GraphQLError(`ID de producto inválido: ${productId}`, {
          extensions: { code: 'BAD_USER_INPUT' },
        });
      }
    }

    const products = await Product.find({ _id: { $in: productIds } });
    const itemsExpanded = items.map((item) => {
      const product = products.find((candidate) => candidate.id == item.productId);
      if (!product) {
        throw new GraphQLError('Producto no encontrado', {
          extensions: { code: 'BAD_USER_INPUT' },
        });
      }

      return {
        product: product._id,
        title: product.title,
        price: product.originalPrice,
        quantity: item.quantity,
      };
    });

    const total = itemsExpanded.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const order = await Order.create({
      user: user.id,
      items: itemsExpanded,
      total,
      shippingAddress: shippingAddress || {},
    });

    return order.populate({ path: 'items.product', model: Product });
  },
};
