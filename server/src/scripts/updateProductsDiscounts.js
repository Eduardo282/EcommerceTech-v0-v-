import 'dotenv/config';
import { Product } from '../models/Product.js';
import { connectDB } from '../config/db.js';

async function updateProducts() {
  try {
    await connectDB(process.env.MONGODB_URI);

    // 1. Encuentra los 3 productos que queremos que tengan características y sin descuento
    const featuredProducts = await Product.find().limit(3);
    const featuredIds = featuredProducts.map((p) => p._id);

    const features = ['Soporte 24/7', 'Actualizaciones de por vida', 'Documentación detallada'];

    // Actualiza los productos destacados
    for (const product of featuredProducts) {
      product.features = features;
      product.badge = null;
      product.originalPrice = 0; // No discount
      await product.save();
      console.log(`Productos actualizados (sin descuento): ${product.title}`);
    }

    // 2. Actualiza todos los demás productos para tener un descuento (datos de prueba)
    // Esto asegura que el badge aparezca para ellos
    const otherProducts = await Product.find({ _id: { $nin: featuredIds } });

    for (const product of otherProducts) {
      // Establece el precio original para que sea 20% mayor que el precio
      product.originalPrice = product.price * 1.2;
      product.badge = 'OFERTA'; // Añade un texto de badge
      product.features = []; // Limpia las características si las hay
      await product.save();
      console.log(`Productos actualizados (con descuento): ${product.title}`);
    }

    console.log('✅ Hecho. Se han actualizado todos los productos.');
    process.exit(0);
  } catch (error) {
    console.error('Error al actualizar los productos:', error);
    process.exit(1);
  }
}

updateProducts();
