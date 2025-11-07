import { gql } from "@apollo/client";

export const PRODUCTS_QUERY = gql`
  query Products(
    $filter: ProductFilter
    $sort: ProductSort
    $pagination: PaginationInput
  ) {
    products(filter: $filter, sort: $sort, pagination: $pagination) {
      id
      title
      price
      images
      rating
      category {
        name
      }
    }
  }
`;
