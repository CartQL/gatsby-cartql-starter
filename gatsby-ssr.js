import React from "react"
import cuid from "cuid"

import CustomerTokenProvider from "./src/components/CustomerTokenProvider"
import ApolloProvider from "./src/components/ApolloProvider"
import CartProvider from "./src/components/CartProvider"
import Layout from "./src/components/Layout"

import "./src/styles/main.css"

export const wrapRootElement = ({ element }) => (
  <CustomerTokenProvider>
    <ApolloProvider>
      <CartProvider id={cuid()}>
        <Layout>{element}</Layout>
      </CartProvider>
    </ApolloProvider>
  </CustomerTokenProvider>
)
