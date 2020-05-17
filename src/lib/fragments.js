import { gql } from "@apollo/client"

export const customer = gql`
  fragment customer on Customer {
    id
    name
    username
  }
`

export const customerWithToken = gql`
  fragment customerWithToken on CustomerPayload {
    token
    customer {
      ...customer
    }
  }
  ${customer}
`
