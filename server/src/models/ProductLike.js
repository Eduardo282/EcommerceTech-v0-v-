import mongoose from 'mongoose';

const ProductLikeSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

ProductLikeSchema.index({ product: 1, user: 1 }, { unique: true });

export const ProductLike = mongoose.model('ProductLike', ProductLikeSchema);
