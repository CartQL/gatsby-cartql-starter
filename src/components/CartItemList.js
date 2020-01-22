import React from "react"
import { gql } from "apollo-boost"
import { useQuery } from "@apollo/react-hooks"

import CartItem from "./CartItem"

const GET_CART_QUERY = gql`
  query getCart($id: ID!) {
    cart(id: $id) {
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

const CartItemList = ({ cartId }) => {
  const { loading, error, data } = useQuery(GET_CART_QUERY, {
    variables: {
      id: cartId,
    },
  })

  if (loading) return <span>Loading cart</span>
  if (error) return <span>Umm. Oops.</span>

  if (data.cart.isEmpty) return <p>Your cart is empty</p>

  return (
    <div>
      {data.cart.items.map(CartItem)}

      <div>
        Sub total: <strong>{data.cart.subTotal.formatted}</strong>
      </div>
    </div>
  )
}

export default CartItemList
