import React from "react"
import { gql, useMutation } from "@apollo/client"

import { cartWithItems } from "../lib/fragments"

const REMOVE_ITEM_MUTATION = gql`
  mutation removeFromCart($input: RemoveCartItemInput!) {
    removeItem(input: $input) {
      ...cartWithItems
    }
  }
  ${cartWithItems}
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
