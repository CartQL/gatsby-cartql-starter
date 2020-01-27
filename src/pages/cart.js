import React from "react"
import { Link } from "gatsby"

import useCartId from "../hooks/useCartId"
import CartItemList from "../components/CartItemList"

const CartPage = () => {
  const cartId = useCartId()

  return (
    <React.Fragment>
      <h1>Cart</h1>

      <CartItemList cartId={cartId} />

      <Link to="/checkout">Go to Checkout</Link>
    </React.Fragment>
  )
}

export default CartPage
