import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { ApolloProvider } from "@apollo/client";
import { client } from "./lib/apolloClient";

const rootEl = document.getElementById("root");
if (rootEl) {
  createRoot(rootEl).render(
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  );
}
