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
  for (let i = 1; i <= 12; i++) {
    const c = categories[i % categories.length];
    products.push({
      title: `Sample Product ${i}`,
      description: "This is a sample product used for seeding the DB.",
      price: 9.99 + i,
      images: [],
      category: c._id,
      inventory: 10 + i,
      rating: Math.min(5, 3 + (i % 3)),
      attributes: { color: ["red", "blue", "black"][i % 3] },
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
