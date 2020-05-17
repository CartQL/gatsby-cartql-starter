import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client"
import { setContext } from "@apollo/link-context"
import fetch from "isomorphic-unfetch"

const createApolloClient = (token) => {
  const customerTokenLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      ...(token && { "cartql-customer-token": token }),
    },
  }))

  const httpLink = createHttpLink({
    fetch,
    uri: process.env.GATSBY_CARTQL_URI || "https://api.cartql.com",
  })

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: customerTokenLink.concat(httpLink),
  })

  return client
}

export default createApolloClient
