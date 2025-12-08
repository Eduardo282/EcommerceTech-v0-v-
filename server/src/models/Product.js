import mongoose from "mongoose";
import slugify from "slugify";

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true, min: 0 },
    originalPrice: { type: Number, min: 0 },
    badge: { type: String },
    features: [{ type: String }],
    images: [{ type: String }],
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    inventory: { type: Number, default: 0 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    attributes: { type: Map, of: String },
    active: { type: Boolean, default: true },
    rubro: {
      type: String,
      enum: ["TECHNOLOGY", "GAMING"],
      default: "TECHNOLOGY",
      index: true,
    },
  },
  { timestamps: true }
);

ProductSchema.pre("validate", function (next) {
  if (!this.slug && this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});
ProductSchema.index({ title: "text", description: "text" });

export const Product = mongoose.model("Product", ProductSchema);
