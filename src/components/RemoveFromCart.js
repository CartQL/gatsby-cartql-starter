import React from "react"
import { gql, useMutation } from "@apollo/client"

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

const RemoveFromCart = (input) => {
  const [removeItem, { loading }] = useMutation(REMOVE_ITEM_MUTATION, {
    variables: {
      input,
    },
  })

  return (
    <button onClick={removeItem} disabled={loading}>
      &times; Remove item
    </button>
  )
}

export default RemoveFromCart
