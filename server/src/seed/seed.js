import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import { Category } from '../models/Category.js';
import { Product } from '../models/Product.js';

async function run() {
  await connectDB(process.env.MONGODB_URI);

  console.log('🧹 Limpiando colecciones...');
  await Category.deleteMany({});
  await Product.deleteMany({});

  console.log('📚 Creando categorías...');
  const catNames = ['Dashboards', 'React', 'Programacion', 'Technology', 'UI/UX'];
  const categories = await Category.insertMany(catNames.map((name) => ({ name })));

  console.log('📦 Creando productos...');
  const products = [];
  const images = [
    'https://plus.unsplash.com/premium_photo-1728892768695-ebebed48ff90?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=735',
    'https://images.unsplash.com/photo-1761960084255-7b45bd632251?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1172',
    'https://images.unsplash.com/photo-1761839257664-ecba169506c1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1169',
    'https://images.unsplash.com/photo-1713781926298-a4032455779c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1380',
    'https://images.unsplash.com/photo-1762568792352-f952c6a0a6cb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687',
    'https://images.unsplash.com/photo-1761839258045-6ef373ab82a7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170',
    'https://images.unsplash.com/photo-1762543417158-675752f61c8c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1000',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000',
    'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&q=80&w=1000',
    'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=1000',
    'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=1000',
  ];
  for (let i = 1; i <= 12; i++) {
    const c = categories[i % categories.length];
    products.push({
      title: `Producto ${i}`,
      description: 'Este es un producto para poblar la base de datos.',
      originalPrice: i % 3 === 0 ? Math.round((100 + i) * 1.4) : 100 + i,
      descuentoPrice: i % 3 === 0 ? 100 + i : undefined,
      images: [images[Math.floor(Math.random() * images.length)]],
      category: c._id,
      attributes: { color: ['rojo', 'azul', 'negro'][i % 3] },
      rating: Number((1.5 + Math.random() * 3.5).toFixed(1)), // Random rating 1.5 - 5.0
      active: true,
    });
  }
  await Product.insertMany(products);

  console.log('✅ Semillero completado');
  await mongoose.connection.close();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
