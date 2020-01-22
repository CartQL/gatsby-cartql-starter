import React from "react"

import CartItemList from "../components/CartItemList"

const CartPage = () => (
  <React.Fragment>
    <h1>Cart</h1>

    <CartItemList cartId="testing" />
  </React.Fragment>
)

export default CartPage
