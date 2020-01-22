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

const AddToCart = ({ cartId, ...props }) => {
  const [addItem] = useMutation(ADD_ITEM_MUTATION, {
    variables: {
      input: { cartId, ...props },
    },
  })

  return <button onClick={addItem}>Add to Cart</button>
}

export default AddToCart
