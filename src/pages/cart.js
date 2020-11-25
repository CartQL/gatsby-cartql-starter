import React from "react"
import { loadStripe } from "@stripe/stripe-js"

import useCartId from "../hooks/useCartId"
import CartItemList from "../components/CartItemList"

const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY)

const CartPage = () => {
  const cartId = useCartId()

  const goToCheckout = async (e) => {
    e.preventDefault()

    const stripe = await stripePromise

    const { id: sessionId } = await fetch(
      "/.netlify/functions/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartId,
        }),
      }
    ).then((res) => res.json())

    await stripe.redirectToCheckout({
      sessionId,
    })
  }

  return (
    <React.Fragment>
      <h1>Cart</h1>

      <CartItemList cartId={cartId} />

      <button type="button" onClick={goToCheckout}>
        Go to Checkout &rarr;
      </button>
    </React.Fragment>
  )
}

export default CartPage
