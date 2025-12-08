export const typeDefs = /* GraphQL */ `
  scalar Date

  type User {
    id: ID!
    name: String!
    email: String!
    role: String!
    isSeller: Boolean!
    rubro: Rubro
    storeName: String
    storeDescription: String
    createdAt: Date!
    updatedAt: Date!
  }

  type Category {
    id: ID!
    name: String!
    slug: String!
    parent: Category
    createdAt: Date!
    updatedAt: Date!
  }

  type Product {
    id: ID!
    title: String!
    slug: String!
    description: String
    price: Float!
    originalPrice: Float
    badge: String
    features: [String!]
    images: [String!]!
    category: Category
    inventory: Int!
    rating: Float!
    attributes: JSON
    active: Boolean!
    rubro: Rubro!
    createdAt: Date!
    updatedAt: Date!
  }

  scalar JSON

  type OrderItem {
    product: Product!
    title: String!
    price: Float!
    quantity: Int!
  }

  type Order {
    id: ID!
    user: User!
    items: [OrderItem!]!
    total: Float!
    status: String!
    shippingAddress: JSON
    paymentIntentId: String
    createdAt: Date!
    updatedAt: Date!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  input PaginationInput {
    page: Int = 1
    pageSize: Int = 12
  }
  input ProductFilter {
    search: String
    categorySlug: String
    minPrice: Float
    maxPrice: Float
    active: Boolean
    rubro: Rubro
  }
  enum ProductSort {
    NEWEST
    PRICE_ASC
    PRICE_DESC
    RATING_DESC
  }

  enum Rubro {
    TECHNOLOGY
    GAMING
  }

  input ProductInput {
    title: String!
    description: String
    price: Float!
    originalPrice: Float
    badge: String
    features: [String!]
    images: [String!]
    categoryId: ID
    inventory: Int
    attributes: JSON
    active: Boolean
    rubro: Rubro
  }
  input ProductUpdateInput {
    title: String
    description: String
    price: Float
    originalPrice: Float
    badge: String
    features: [String!]
    images: [String!]
    categoryId: ID
    inventory: Int
    attributes: JSON
    active: Boolean
    rubro: Rubro
  }

  input OrderItemInput {
    productId: ID!
    quantity: Int!
  }
  input AddressInput {
    line1: String
    line2: String
    city: String
    state: String
    zip: String
    country: String
  }

  type Query {
    me: User
    product(id: ID, slug: String): Product
    products(
      filter: ProductFilter
      sort: ProductSort
      pagination: PaginationInput
    ): [Product!]!
    categories: [Category!]!
    category(slug: String!): Category
    orders: [Order!]!
    order(id: ID!): Order
  }

  type Mutation {
    registerUser(name: String!, email: String!, password: String!): AuthPayload!
    loginUser(email: String!, password: String!): AuthPayload!
    logoutUser: Boolean!

    setSellerProfile(
      rubro: Rubro!
      storeName: String!
      storeDescription: String
    ): User!

    createCategory(name: String!, parentId: ID): Category!

    createProduct(input: ProductInput!): Product!
    updateProduct(id: ID!, input: ProductUpdateInput!): Product!
    deleteProduct(id: ID!): Boolean!

    createOrder(
      items: [OrderItemInput!]!
      shippingAddress: AddressInput
    ): Order!
  }
`;
