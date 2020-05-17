import React from "react"
import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from "@apollo/client"
import fetch from "isomorphic-unfetch"
import cuid from "cuid"

import CartProvider from "./src/components/CartProvider"
import Layout from "./src/components/Layout"

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    fetch,
    uri: "https://api.cartql.com",
  }),
})

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>
    <CartProvider id={cuid()}>
      <Layout>{element}</Layout>
    </CartProvider>
  </ApolloProvider>
)
