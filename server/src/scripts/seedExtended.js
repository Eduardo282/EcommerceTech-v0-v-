import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Product } from '../models/Product.js';
import { Category } from '../models/Category.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce-db';

const sampleDetails = [
  'Alta calidad diseñado por profesionales',
  'Construido con tecnologías modernas y mejores prácticas',
  'Totalmente personalizable y fácil de implementar',
  'Diseño responsivo que funciona en todos los dispositivos',
  'Actualizaciones regulares y mejoras incluidas',
];

const sampleSpecs = [
  { key: 'Categoría', value: 'Technology' },
  { key: 'Tecnologías', value: 'React, Node.js, GraphQL' },
  { key: 'Formato', value: 'Código fuente, Documentación' },
  { key: 'Licencia', value: 'Uso comercial' },
  { key: 'Compatibilidad', value: 'Chrome, Firefox, Safari, Edge' },
  { key: 'Soporte', value: '6 meses premium' },
];

const sampleIncludes = [
  'Código fuente completo',
  'Documentación detallada',
  'Assets de diseño (Figma)',
  'Scripts de despliegue',
  'Acceso a repositorio privado',
];

const longDesc = `
  <p class="mb-4">Este producto es una solución integral para desarrolladores que buscan acelerar su flujo de trabajo. Diseñado meticulosamente con atención a cada detalle, ofrece una base sólida y escalable para tus proyectos.</p>
  <p class="mb-4">No solo obtienes el código, sino una arquitectura pensada para el crecimiento. Cada componente ha sido optimizado para rendimiento y accesibilidad.</p>
  <p>Únete a cientos de desarrolladores que ya están utilizando nuestras plantillas para construir el futuro de la web.</p>
`;

async function seedExtended() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing products? No, let's just update one or create a new one.
    // Let's creating a specific "Premium" product.

    // Ensure category exists
    let cat = await Category.findOne({ slug: 'technology' });
    if (!cat) {
      cat = await Category.create({ name: 'Technology', slug: 'technology' });
    }

    const productData = {
      title: 'E-Commerce Pro Template',
      description: 'La plantilla definitiva para tu próximo gran proyecto de comercio electrónico.',
      longDescription: longDesc,
      price: 120.0,
      originalPrice: 199.0,
      badge: 'Best Seller',
      features: ['React 18', 'GraphQL', 'Tailwind'],
      images: [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
      ],
      category: cat._id,
      inventory: 100,
      rubro: 'TECHNOLOGY',
      // New Fields
      details: sampleDetails,
      specs: sampleSpecs,
      includes: sampleIncludes,
      rating: 4.9,
      active: true,
    };

    // Update or Create
    const existing = await Product.findOne({ title: productData.title });
    if (existing) {
      Object.assign(existing, productData);
      await existing.save();
      console.log('Updated product:', existing.title);
    } else {
      const p = await Product.create(productData);
      console.log('Created product:', p.title);
    }

    // Let's also update ALL products to have at least empty arrays if missing to avoid nulls
    await Product.updateMany(
      { details: { $exists: false } },
      { $set: { details: [], specs: [], includes: [], longDescription: '' } }
    );
    console.log('Ensured all products have new fields initialized.');

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}

seedExtended();
