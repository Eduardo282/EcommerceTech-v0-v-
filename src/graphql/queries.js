import { gql } from '@apollo/client';

export const PRODUCTS_QUERY = gql`
  query Products($filter: ProductFilter, $sort: ProductSort, $pagination: PaginationInput) {
    products(filter: $filter, sort: $sort, pagination: $pagination) {
      id
      title
      description
      originalPrice
      descuentoPrice
      images
      category {
        id
        name
      }
      inventory
      attributes
      rating
      reviewsCount
      likesCount
      salesCount
      downloadsCount
      viewsCount
      active
      isTrending
      rubro
      badge
      features
      details
      includes
      longDescription
      specs {
        key
        value
      }
    }
  }
`;

export const CATEGORIES_QUERY = gql`
  query Categories {
    categories {
      id
      name
      slug
    }
  }
`;

export const PRODUCT_ENGAGEMENT_QUERY = gql`
  query ProductEngagement($productId: ID!) {
    productEngagement(productId: $productId) {
      productId
      liked
      likesCount
      reviewsCount
      rating
      viewsCount
    }
  }
`;

export const PRODUCT_REVIEWS_QUERY = gql`
  query ProductReviews($productId: ID!, $limit: Int) {
    productReviews(productId: $productId, limit: $limit) {
      id
      rating
      comment
      createdAt
      updatedAt
      user {
        id
        name
      }
    }
  }
`;

export const GET_ME = gql`
  query Me {
    me {
      id
      name
      email
      role
      isSeller
      rubro
      storeName
      storeDescription
    }
  }
`;
