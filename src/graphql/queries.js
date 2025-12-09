import { gql } from '@apollo/client';

export const PRODUCTS_QUERY = gql`
  query Products($filter: ProductFilter, $sort: ProductSort, $pagination: PaginationInput) {
    products(filter: $filter, sort: $sort, pagination: $pagination) {
      id
      title
      price
      images
      rating
      rubro
      description
      longDescription
      details
      specs {
        key
        value
      }
      includes
      category {
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
