import React from "react"
import { gql, useMutation } from "@apollo/client"

import { cartWithItems } from "../lib/fragments"

const UPDATE_ITEM_MUTATION = gql`
  mutation updateQuantity($input: UpdateCartItemInput!) {
    updateItem(input: $input) {
      ...cartWithItems
    }
  }
  ${cartWithItems}
`

const options = new Array(10).fill(0).map((v, k) => k + 1)

const UpdateQuantity = ({ initialValue, ...props }) => {
  const [updateItem, { loading }] = useMutation(UPDATE_ITEM_MUTATION)

  const handleChange = ({ target: { value: quantity } }) => {
    updateItem({
      variables: { input: { ...props, quantity: parseInt(quantity) } },
    })
  }

  return (
    <select
      defaultValue={initialValue}
      onChange={handleChange}
      disabled={loading}
    >
      <option value={0}>0</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  )
}

export default UpdateQuantity
