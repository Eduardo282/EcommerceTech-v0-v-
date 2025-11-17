import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const uri = import.meta.env.VITE_GRAPHQL_URL || "http://localhost:4000/graphql";

const httpLink = new HttpLink({ uri, credentials: "include" });

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("auth.token");
  return {
    headers: {
      ...headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
