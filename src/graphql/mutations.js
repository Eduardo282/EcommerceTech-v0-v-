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
