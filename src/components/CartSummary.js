import React from "react"
import { Link } from "gatsby"
import { gql, useQuery } from "@apollo/client"

import { cartWithItems } from "../lib/fragments"

const GET_CART_QUERY = gql`
  query getCart($id: ID!) {
    cart(id: $id) {
      ...cartWithItems
    }
  }
  ${cartWithItems}
`

const CartSummary = ({ cartId: id }) => {
  const { loading, error, data } = useQuery(GET_CART_QUERY, {
    variables: {
      id,
    },
  })

  if (loading) return <span>Loading</span>
  if (error) return <span>Umm. Oops.</span>

  return (
    <Link to="/cart">
      {data.cart.totalUniqueItems} ({data.cart.subTotal.formatted})
    </Link>
  )
}

export default CartSummary
