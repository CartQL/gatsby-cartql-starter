import React from "react"

import useCartId from "../hooks/useCartId"
import CartItemList from "../components/CartItemList"

const CartPage = () => {
  const cartId = useCartId()

  return (
    <React.Fragment>
      <h1>Cart</h1>

      <CartItemList cartId={cartId} />
    </React.Fragment>
  )
}

export default CartPage
