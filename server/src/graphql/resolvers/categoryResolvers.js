import { Category } from '../../models/Category.js';
import { requireAdmin } from '../resolverUtils.js';

export const categoryQueries = {
  categories: async () => Category.find().sort({ name: 1 }).exec(),
  category: async (_, { slug }) => Category.findOne({ slug }).exec(),
};

export const categoryMutations = {
  createCategory: async (_, { name, parentId }, ctx) => {
    requireAdmin(ctx);
    return Category.create({ name, parent: parentId || null });
  },
};
