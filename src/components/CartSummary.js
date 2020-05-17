import React from "react"
import { Link } from "gatsby"
import { gql, useQuery } from "@apollo/client"

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
