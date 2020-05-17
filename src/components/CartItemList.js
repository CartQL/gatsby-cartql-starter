import React from "react"
import { gql, useQuery } from "@apollo/client"

import useCartId from "../hooks/useCartId"
import CartItem from "./CartItem"

import { cartWithItems } from "../lib/fragments"

const GET_CART_QUERY = gql`
  query getCart($id: ID!) {
    cart(id: $id) {
      ...cartWithItems
    }
  }
  ${cartWithItems}
`

const CartItemList = ({ cartId: id }) => {
  const cartId = useCartId()
  const { loading, error, data } = useQuery(GET_CART_QUERY, {
    variables: {
      id,
    },
  })

  if (loading) return <span>Loading cart</span>
  if (error) return <span>Umm. Oops.</span>

  if (data.cart.isEmpty) return <p>Your cart is empty</p>

  return (
    <div>
      {data.cart.items.map((item) => (
        <CartItem key={item.id} cartId={cartId} {...item} />
      ))}

      <div>
        Sub total: <strong>{data.cart.subTotal.formatted}</strong>
      </div>
    </div>
  )
}

export default CartItemList
