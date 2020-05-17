import { gql } from "@apollo/client"

export const cartWithoutItems = gql`
  fragment cartWithoutItems on Cart {
    id
    isEmpty
    totalUniqueItems
    subTotal {
      formatted
    }
  }
`

export const cartItems = gql`
  fragment cartItems on CartItem {
    id
    name
    description
    images
    quantity
    unitTotal {
      formatted
    }
    lineTotal {
      formatted
    }
  }
`

export const cartWithItems = gql`
  fragment cartWithItems on Cart {
    ...cartWithoutItems
    items {
      ...cartItems
    }
  }
  ${cartWithoutItems}
  ${cartItems}
`

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
