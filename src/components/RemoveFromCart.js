import React from "react"
import { gql } from "apollo-boost"
import { useMutation } from "@apollo/react-hooks"

const REMOVE_ITEM_MUTATION = gql`
  mutation removeFromCart($input: RemoveCartItemInput!) {
    removeItem(input: $input) {
      id
      isEmpty
      totalUniqueItems
      subTotal {
        formatted
      }
      items {
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
    }
  }
`

const RemoveFromCart = ({ cartId, ...props }) => {
  const [removeItem] = useMutation(REMOVE_ITEM_MUTATION, {
    variables: {
      input: { cartId, ...props },
    },
  })

  return <button onClick={removeItem}>&times; Remove item</button>
}

export default RemoveFromCart
