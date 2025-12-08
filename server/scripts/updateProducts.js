import "dotenv/config";
import mongoose from "mongoose";
import { Product } from "../src/models/Product.js";
import { connectDB } from "../src/config/db.js";

async function updateProducts() {
  try {
    await connectDB(process.env.MONGODB_URI);

    // 1. Find the 3 products we want to have features and NO discount
    const featuredProducts = await Product.find().limit(3);
    const featuredIds = featuredProducts.map(p => p._id);

    const features = [
      "Soporte 24/7",
      "Actualizaciones de por vida",
      "Documentación detallada"
    ];

    // Update featured products
    for (const product of featuredProducts) {
      product.features = features;
      product.badge = null;
      product.originalPrice = 0; // No discount
      await product.save();
      console.log(`Updated featured product (no discount): ${product.title}`);
    }

    // 2. Update ALL OTHER products to have a discount (mock data)
    // This ensures the badge appears for them
    const otherProducts = await Product.find({ _id: { $nin: featuredIds } });

    for (const product of otherProducts) {
      // Set original price to be 20% higher than price
      product.originalPrice = product.price * 1.2;
      product.badge = "OFERTA"; // Add a badge text
      product.features = []; // Clear features if any
      await product.save();
      console.log(`Updated standard product (with discount): ${product.title}`);
    }

    console.log("Successfully updated all products.");
    process.exit(0);
  } catch (error) {
    console.error("Error updating products:", error);
    process.exit(1);
  }
}

updateProducts();
