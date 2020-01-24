import React from "react"
import { gql } from "apollo-boost"
import { useMutation } from "@apollo/react-hooks"

const ADD_ITEM_MUTATION = gql`
  mutation addToCart($input: AddToCartInput!) {
    addItem(input: $input) {
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

const AddToCart = input => {
  const [addItem, { loading }] = useMutation(ADD_ITEM_MUTATION, {
    variables: {
      input,
    },
  })

  return (
    <button onClick={addItem} disabled={loading}>
      Add to Cart
    </button>
  )
}

export default AddToCart
