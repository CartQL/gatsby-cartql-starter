import React, { useEffect } from "react"

import useLocalStorage from "../hooks/useLocalStorage"
import CartContext from "../context/CartContext"

const CartProvider = ({ id, ...props }) => {
  const [cartId, saveCartId] = useLocalStorage("cartql-cart-id", id)

  useEffect(() => {
    !cartId && saveCartId(id)
  }, [id, saveCartId])

  return <CartContext.Provider value={cartId} {...props} />
}

export default CartProvider
