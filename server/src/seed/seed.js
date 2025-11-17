import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import { Category } from "../models/Category.js";
import { Product } from "../models/Product.js";

async function run() {
  await connectDB(process.env.MONGODB_URI);

  console.log("🧹 Clearing collections...");
  await Category.deleteMany({});
  await Product.deleteMany({});

  console.log("📚 Creating categories...");
  const catNames = ["Phones", "Laptops", "Accessories"];
  const categories = await Category.insertMany(
    catNames.map((name) => ({ name }))
  );

  console.log("📦 Creating products...");
  const products = [];
  const images = [
    "https://plus.unsplash.com/premium_photo-1728892768695-ebebed48ff90?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=735",
    "https://images.unsplash.com/photo-1761960084255-7b45bd632251?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1172",
    "https://images.unsplash.com/photo-1761839257664-ecba169506c1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1169",
    "https://images.unsplash.com/photo-1713781926298-a4032455779c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1380",
    "https://images.unsplash.com/photo-1762568792352-f952c6a0a6cb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    "https://images.unsplash.com/photo-1761839258045-6ef373ab82a7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    "https://images.unsplash.com/photo-1762543417158-675752f61c8c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
  ];
  for (let i = 1; i <= 12; i++) {
    const c = categories[i % categories.length];
    products.push({
      title: `Producto ejemplo ${i}`,
      description: "Este es un producto de ejemplo utilizado para poblar la base de datos.",
      price: 9.99 + i,
      images: [images[i % images.length]],
      category: c._id,
      inventory: 10 + i,
      rating: Math.min(5, 2 + (i % 2)),
      attributes: { color: ["rojo", "azul", "negro"][i % 3] },
    });
  }
  await Product.insertMany(products);

  console.log("✅ Seed complete");
  await mongoose.connection.close();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
