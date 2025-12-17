import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import { Category } from '../models/Category.js';
import { Product } from '../models/Product.js';

async function ensureCategories(names) {
  const found = await Category.find({ name: { $in: names } });
  const existing = new Map(found.map((c) => [c.name, c]));

  const toCreate = names.filter((n) => !existing.has(n)).map((name) => ({ name }));

  if (toCreate.length) {
    const inserted = await Category.insertMany(toCreate);
    inserted.forEach((c) => existing.set(c.name, c));
  }

  return names.map((n) => existing.get(n));
}

async function run() {
  await connectDB(process.env.MONGODB_URI);

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

  const categoryNames = ['Assets', 'UI', 'Skins', 'Music', 'Accessories', '3D Models'];
  const categories = await ensureCategories(categoryNames);

  const pick = (i) => categories[i % categories.length]._id;
  const images = [
    'https://plus.unsplash.com/premium_photo-1681433359172-b36439557c4a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
    'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1080&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=1080&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=1080&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=1080&auto=format&fit=crop',
    'https://loremflickr.com/1000/1000/gaming,tech?lock=1',
    'https://loremflickr.com/1000/1000/gaming,tech?lock=2',
    'https://loremflickr.com/1000/1000/gaming,tech?lock=3',
    'https://loremflickr.com/1000/1000/gaming,tech?lock=4',
    'https://loremflickr.com/1000/1000/gaming,tech?lock=5',
    'https://loremflickr.com/1000/1000/gaming,tech?lock=6',
  ];

  console.log('🕹 Sembrando productos GAMING (no destructivo)…');
  let created = 0;

  for (let i = 1; i <= 12; i++) {
    const doc = {
      title: 'Producto gaming ' + i,
      description: 'Producto para el rubro GAMING',
      originalPrice: i % 3 === 0 ? Math.round((100 + i) * 5.4) : 300 + i,
      descuentoPrice: i % 3 === 0 ? 100 + i : undefined,
      images: [images[i % images.length]],
      category: pick(i),
      inventory: 25 + i,
      attributes: { platform: ['pc', 'xbox', 'ps'][i % 3] },
      rating: Number((1.5 + Math.random() * 3.5).toFixed(1)),
      active: true,
      rubro: 'GAMING',
      badge: 'Mas vendido',
      features: ['Gaming', 'Diseño', 'Calidad'],
      details: sampleDetails,
      includes: sampleIncludes,
      longDescription: longDesc,
      specs: sampleSpecs,
    };

    // Actualizar o crear producto (Upsert)
    // Así aseguramos que si la imagen estaba mal en la BD, se corrija con la nueva.
    await Product.findOneAndUpdate(
      { title: doc.title },
      { $set: doc },
      { upsert: true, new: true, runValidators: true }
    );
    created++;
  }

  console.log(`✅ Hecho. Se han sembrado/actualizado ${created} productos de GAMING.`);
  await mongoose.connection.close();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
