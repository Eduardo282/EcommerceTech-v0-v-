import 'dotenv/config';
import { Product } from '../models/Product.js';
import { connectDB } from '../config/db.js';

async function setRubros() {
  try {
    await connectDB(process.env.MONGODB_URI);

    const allProducts = await Product.find();

    if (allProducts.length === 0) {
      console.log('No hay productos.');
      return;
    }

    // Asigna TECHNOLOGY a la primera mitad y GAMING a la segunda mitad
    const half = Math.ceil(allProducts.length / 2);

    for (let i = 0; i < allProducts.length; i++) {
      const product = allProducts[i];
      const rubro = i < half ? 'TECHNOLOGY' : 'GAMING';

      product.rubro = rubro;
      await product.save();
      console.log(`✅ Actualizado ${product.title} -> ${rubro}`);
    }

    console.log('✅ Hecho. Se han actualizado los rubros de los productos.');
    process.exit(0);
  } catch (error) {
    console.error('Error al actualizar los rubros:', error);
    process.exit(1);
  }
}

setRubros();
