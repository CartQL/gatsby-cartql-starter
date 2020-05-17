import React from "react"
import { gql, useMutation } from "@apollo/client"

import { cartWithItems } from "../lib/fragments"

const ADD_ITEM_MUTATION = gql`
  mutation addToCart($input: AddToCartInput!) {
    addItem(input: $input) {
      ...cartWithItems
    }
  }
  ${cartWithItems}
`

const AddToCart = (input) => {
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
