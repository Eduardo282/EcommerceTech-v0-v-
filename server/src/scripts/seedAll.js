import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Product } from '../models/Product.js';

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

async function seedAll() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const result = await Product.updateMany(
      {}, // Filter: All products
      {
        $set: {
          details: sampleDetails,
          specs: sampleSpecs,
          includes: sampleIncludes,
          longDescription: longDesc,
        },
      }
    );

    console.log(`Updated ${result.modifiedCount} products with sample data.`);
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}

seedAll();
