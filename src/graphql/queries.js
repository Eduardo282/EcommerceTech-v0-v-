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
        name
      }
      inventory
      attributes
      rating
      active
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
