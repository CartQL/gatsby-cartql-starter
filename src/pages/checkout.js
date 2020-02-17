import React from "react"
import { gql } from "apollo-boost"
import { useMutation } from "@apollo/react-hooks"
import { useForm, FormContext } from "react-hook-form"

import useCartId from "../hooks/useCartId"
import AddressFields from "../components/AddressFields"

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

const defaultValues = {
  useSeparateBilling: false,
  shipping: {},
  billing: {},
}

function CheckoutPage() {
  const cartId = useCartId()
  const { handleSubmit, ...methods } = useForm({ defaultValues })
  const { register } = methods

  const [checkout, { loading }] = useMutation(CHECKOUT_MUTATION)
  const [emptyCart] = useMutation(EMPTY_CART_MUTATION, {
    variables: {
      input: { id: cartId },
    },
  })

  const onSubmit = async ({ useSeparateBilling, ...data }) => {
    console.log({ data })
    try {
      const input = {
        cartId,
        ...data,
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
    <FormContext {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <AddressFields type="shipping" />

        <AddressFields type="billing" />

        <fieldset>
          <legend>You</legend>

          <input
            type="email"
            name="email"
            ref={register({ required: true })}
            placeholder="Email"
          />
        </fieldset>

        <button type="submit" disabled={loading}>
          Checkout
        </button>
      </form>
    </FormContext>
  )
}

export default CheckoutPage
