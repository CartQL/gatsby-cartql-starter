import React from "react"
import { gql } from "apollo-boost"
import { useMutation } from "@apollo/react-hooks"
import { useForm } from "react-hook-form"

import useCartId from "../hooks/useCartId"

const CHECKOUT_MUTATION = gql`
  mutation checkout($input: CheckoutInput!) {
    checkout(input: $input) {
      id
      status
    }
  }
`

const EMPTY_CART_MUTATION = gql`
  mutation emptyCart($input: EmptyCartInput!) {
    emptyCart(input: $input) {
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

function CheckoutPage() {
  const cartId = useCartId()
  const { register, handleSubmit, errors } = useForm()
  const [checkout, { loading }] = useMutation(CHECKOUT_MUTATION)
  const [emptyCart] = useMutation(EMPTY_CART_MUTATION, {
    variables: {
      input: { id: cartId },
    },
  })

  const onSubmit = async values => {
    console.log({ values })
    try {
      const input = {
        cartId,
        email: values.email,
        shipping: {
          name: "Jamie",
          line1: "1st line",
          city: "City name",
          state: "State name",
          postalCode: "NNN 123",
          country: "GB",
        },
      }

      const {
        data: { checkout: order },
      } = await checkout({ variables: { input } })

      await emptyCart()

      alert(JSON.stringify(order))
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="email"
        name="email"
        ref={register({ required: true })}
        placeholder="Email"
      />
      {errors.email && "Email is required."}
      <br />

      <button type="submit" disabled={loading}>
        Checkout
      </button>
    </form>
  )
}

export default CheckoutPage
