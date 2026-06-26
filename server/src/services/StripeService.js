import Stripe from 'stripe';
import { Product } from '../models/Product.js';

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn(
    '⚠️ WARNING: STRIPE_SECRET_KEY no está presente en el archivo .env. Características de Stripe no funcionarán.'
  );
}

export async function createCheckoutSession(items = [], origin) {
  if (!stripe) {
    throw new Error(
      'Error de configuración: Clave STRIPE_SECRET_KEY no encontrada en el servidor.'
    );
  }

  if (!Array.isArray(items) || items.length === 0) {
    const error = new Error('El carrito está vacío.');
    error.statusCode = 400;
    throw error;
  }

  const products = await Product.find({ _id: { $in: items.map((item) => item.id) } });
  const productsById = new Map(products.map((product) => [product.id, product]));

  const lineItems = items.map((item) => {
    const product = productsById.get(String(item.id));
    if (!product) {
      const error = new Error(`Producto no encontrado o no disponible: ${item.name || item.id}`);
      error.statusCode = 404;
      throw error;
    }

    const realPrice = product.descuentoPrice ?? product.originalPrice;

    return {
      price_data: {
        currency: 'mxn',
        product_data: {
          name: product.title,
          images: product.images?.length ? [product.images[0]] : [],
        },
        unit_amount: Math.round(realPrice * 100),
      },
      quantity: Math.max(1, Number(item.quantity) || 1),
    };
  });

  return stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: `${origin || 'http://localhost:3000'}/success`,
    cancel_url: `${origin || 'http://localhost:3000'}/cancel`,
  });
}
