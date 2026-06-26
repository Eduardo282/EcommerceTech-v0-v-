import mongoose from 'mongoose';
import slugify from 'slugify';

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, default: '' },
    originalPrice: { type: Number, required: true, min: 0 },
    descuentoPrice: { type: Number, min: 0 },
    images: [{ type: String }],
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    inventory: { type: Number, default: 0 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewsCount: { type: Number, default: 0, min: 0 },
    likesCount: { type: Number, default: 0, min: 0 },
    salesCount: { type: Number, default: 0, min: 0 },
    downloadsCount: { type: Number, default: 0, min: 0 },
    viewsCount: { type: Number, default: 0, min: 0 },
    attributes: { type: Map, of: String },
    active: { type: Boolean, default: true },
    isTrending: { type: Boolean, default: false, index: true },
    rubro: {
      type: String,
      enum: ['TECHNOLOGY', 'GAMING'],
      default: 'TECHNOLOGY',
      index: true,
    },
    badge: { type: String },
    features: [{ type: String }],
    details: [{ type: String }],
    includes: [{ type: String }],
    longDescription: { type: String, default: '' },
    specs: [
      {
        key: { type: String },
        value: { type: String },
      },
    ],
  },
  { timestamps: true }
);

ProductSchema.pre('validate', function (next) {
  if (!this.slug && this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  // Compatibilidad con semillas antiguas
  if (!this.originalPrice) {
    if (this.descuentoPrice) this.originalPrice = this.descuentoPrice;
    else if (this.price) this.originalPrice = this.price; // fallback si price existe en el documento
  }
  next();
});
ProductSchema.index({ title: 'text', description: 'text' });

export const Product = mongoose.model('Product', ProductSchema);
