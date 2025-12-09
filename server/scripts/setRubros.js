import 'dotenv/config';
import { Product } from '../src/models/Product.js';
import { connectDB } from '../src/config/db.js';

async function setRubros() {
  try {
    await connectDB(process.env.MONGODB_URI);

    const allProducts = await Product.find();

    if (allProducts.length === 0) {
      console.log('No products found.');
      return;
    }

    // Assign TECHNOLOGY to the first half, GAMING to the second half
    const half = Math.ceil(allProducts.length / 2);

    for (let i = 0; i < allProducts.length; i++) {
      const product = allProducts[i];
      const rubro = i < half ? 'TECHNOLOGY' : 'GAMING';

      product.rubro = rubro;
      await product.save();
      console.log(`Updated ${product.title} -> ${rubro}`);
    }

    console.log('Successfully updated product rubros.');
    process.exit(0);
  } catch (error) {
    console.error('Error updating rubros:', error);
    process.exit(1);
  }
}

setRubros();
