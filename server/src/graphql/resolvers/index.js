import { scalarResolvers } from './scalars.js';
import { authMutations, authQueries } from './authResolvers.js';
import { categoryMutations, categoryQueries } from './categoryResolvers.js';
import { engagementMutations, engagementQueries } from './engagementResolvers.js';
import { orderMutations, orderQueries } from './orderResolvers.js';
import { productMutations, productQueries } from './productResolvers.js';
import { reviewMutations, reviewQueries } from './reviewResolvers.js';

export const resolvers = {
  ...scalarResolvers,
  Query: {
    ...authQueries,
    ...productQueries,
    ...reviewQueries,
    ...engagementQueries,
    ...categoryQueries,
    ...orderQueries,
  },
  Mutation: {
    ...authMutations,
    ...categoryMutations,
    ...productMutations,
    ...engagementMutations,
    ...reviewMutations,
    ...orderMutations,
  },
};
