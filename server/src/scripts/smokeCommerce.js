import 'dotenv/config';
import assert from 'node:assert/strict';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import { resolvers } from '../graphql/resolvers.js';
import { Category } from '../models/Category.js';
import { Product } from '../models/Product.js';
import { ProductLike } from '../models/ProductLike.js';
import { Review } from '../models/Review.js';
import { User } from '../models/User.js';

const suffix = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
let user;
let category;
let product;

async function run() {
  await connectDB(process.env.MONGODB_URI);

  try {
    user = await User.create({
      name: 'Commerce Smoke Test',
      email: `commerce-smoke-${suffix}@example.test`,
      password: 'SmokeTest123!',
      role: 'admin',
    });
    const context = { user };

    category = await resolvers.Mutation.createCategory(
      null,
      { name: `Smoke Category ${suffix}` },
      context
    );
    product = await resolvers.Mutation.createProduct(
      null,
      {
        input: {
          title: `Smoke Product ${suffix}`,
          description: 'Temporary product used by the commerce smoke test.',
          originalPrice: 49.99,
          images: ['https://example.com/smoke-product.jpg'],
          categoryId: category.id,
          inventory: 5,
          active: true,
          rubro: 'TECHNOLOGY',
        },
      },
      context
    );
    assert.equal(product.isTrending, false);

    const liked = await resolvers.Mutation.toggleProductLike(
      null,
      { productId: product.id },
      context
    );
    assert.equal(liked.liked, true);
    assert.equal(liked.likesCount, 1);

    const viewed = await resolvers.Mutation.recordProductView(
      null,
      { productId: product.id },
      context
    );
    assert.equal(viewed.viewsCount, 1);

    await resolvers.Mutation.saveProductReview(
      null,
      {
        productId: product.id,
        rating: 4,
        comment: 'Persistent review created by the smoke test.',
      },
      context
    );
    const engagement = await resolvers.Query.productEngagement(
      null,
      { productId: product.id },
      context
    );
    assert.equal(engagement.liked, true);
    assert.equal(engagement.likesCount, 1);
    assert.equal(engagement.reviewsCount, 1);
    assert.equal(engagement.rating, 4);
    assert.equal(engagement.viewsCount, 1);

    const reviews = await resolvers.Query.productReviews(
      null,
      { productId: product.id, limit: 20 },
      context
    );
    assert.equal(reviews.length, 1);
    assert.equal(reviews[0].comment, 'Persistent review created by the smoke test.');

    assert.equal(
      await resolvers.Mutation.deleteProductReview(null, { productId: product.id }, context),
      true
    );
    assert.equal(await resolvers.Mutation.deleteProduct(null, { id: product.id }, context), true);
    product = null;

    console.log('✅ Commerce smoke test passed');
  } finally {
    if (product) {
      await Promise.all([
        Product.deleteOne({ _id: product.id }),
        ProductLike.deleteMany({ product: product.id }),
        Review.deleteMany({ product: product.id }),
      ]);
    }
    if (category) await Category.deleteOne({ _id: category.id });
    if (user) await User.deleteOne({ _id: user.id });
    await mongoose.disconnect();
  }
}

run().catch((error) => {
  console.error('❌ Commerce smoke test failed');
  console.error(error);
  process.exitCode = 1;
});
