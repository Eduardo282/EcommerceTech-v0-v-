import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation RegisterUser($name: String!, $email: String!, $password: String!) {
    registerUser(name: $name, email: $email, password: $password) {
      token
      user {
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
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
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
  }
`;

export const SET_SELLER_PROFILE = gql`
  mutation SetSellerProfile($rubro: Rubro!, $storeName: String!, $storeDescription: String) {
    setSellerProfile(rubro: $rubro, storeName: $storeName, storeDescription: $storeDescription) {
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

export const LOGOUT_USER = gql`
  mutation LogoutUser {
    logoutUser
  }
`;

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($name: String!, $parentId: ID) {
    createCategory(name: $name, parentId: $parentId) {
      id
      name
      slug
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: ProductInput!) {
    createProduct(input: $input) {
      id
      title
      description
      originalPrice
      descuentoPrice
      images
        inventory
        active
        isTrending
        rubro
      badge
      features
      rating
      reviewsCount
      likesCount
      salesCount
      downloadsCount
      viewsCount
      category {
        id
        name
      }
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: ID!, $input: ProductUpdateInput!) {
    updateProduct(id: $id, input: $input) {
      id
      title
      description
      originalPrice
      descuentoPrice
      images
        inventory
        active
        isTrending
        rubro
      badge
      features
      rating
      reviewsCount
      likesCount
      salesCount
      downloadsCount
      viewsCount
      category {
        id
        name
      }
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;

export const TOGGLE_PRODUCT_LIKE = gql`
  mutation ToggleProductLike($productId: ID!) {
    toggleProductLike(productId: $productId) {
      productId
      liked
      likesCount
      reviewsCount
      rating
      viewsCount
    }
  }
`;

export const RECORD_PRODUCT_VIEW = gql`
  mutation RecordProductView($productId: ID!) {
    recordProductView(productId: $productId) {
      productId
      liked
      likesCount
      reviewsCount
      rating
      viewsCount
    }
  }
`;

export const SAVE_PRODUCT_REVIEW = gql`
  mutation SaveProductReview($productId: ID!, $rating: Int!, $comment: String!) {
    saveProductReview(productId: $productId, rating: $rating, comment: $comment) {
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

export const DELETE_PRODUCT_REVIEW = gql`
  mutation DeleteProductReview($productId: ID!) {
    deleteProductReview(productId: $productId)
  }
`;
