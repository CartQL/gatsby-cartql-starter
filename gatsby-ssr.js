import React from "react"
import cuid from "cuid"

import CustomerAuthProvider from "./src/components/CustomerTokenProvider"
import ApolloProvider from "./src/components/ApolloProvider"
import CartProvider from "./src/components/CartProvider"
import Layout from "./src/components/Layout"

export const wrapRootElement = ({ element }) => (
  <CustomerAuthProvider>
    <ApolloProvider>
      <CartProvider id={cuid()}>
        <Layout>{element}</Layout>
      </CartProvider>
    </ApolloProvider>
  </CustomerAuthProvider>
)
