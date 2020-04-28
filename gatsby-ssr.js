import "isomorphic-fetch"

import React from "react"
import ApolloClient from "apollo-boost"
import { ApolloProvider } from "@apollo/react-hooks"
import cuid from "cuid"

import CartProvider from "./src/components/CartProvider"
import Layout from "./src/components/Layout"

const client = new ApolloClient({
  uri: 'https://api.cartql.com/graphql',
})

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>
    <CartProvider id={cuid()}>
      <Layout>{element}</Layout>
    </CartProvider>
  </ApolloProvider>
)
