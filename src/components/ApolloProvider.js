import React from "react"
import { ApolloProvider } from "@apollo/client"

import useCustomerToken from "../hooks/useCustomerToken"
import createApolloClient from "../lib/createApolloClient"

const ApolloProviderWithAuth = ({ children }) => {
  const { token } = useCustomerToken()
  const client = createApolloClient(token)

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default ApolloProviderWithAuth
