import { useContext } from "react"

import CartContext from "../context/CartContext"

const useCartId = () => {
  const cartId = useContext(CartContext)

  if (!cartId) {
    throw new Error("useCartId must be used within a CartProvider")
  }

  return cartId
}

export default useCartId
