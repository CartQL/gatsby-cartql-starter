import React from "react"
import { gql } from "apollo-boost"
import { useMutation } from "@apollo/react-hooks"
import { useForm, FormContext } from "react-hook-form"

import useCartId from "../hooks/useCartId"
import AddressFields from "../components/AddressFields"
import PaymentForm from "../components/PaymentForm"

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
  currentStep: "shipping",
  useSeparateBilling: false,
  shipping: {},
  billing: {},
}

function CheckoutPage() {
  const cartId = useCartId()
  const { handleSubmit, ...methods } = useForm({ defaultValues })
  const { watch, setValue } = methods
  const { currentStep, useSeparateBilling } = watch()

  const [checkout, { loading }] = useMutation(CHECKOUT_MUTATION)
  const [emptyCart] = useMutation(EMPTY_CART_MUTATION, {
    variables: {
      input: { id: cartId },
    },
  })

  const onSubmit = async ({ useSeparateBilling, ...data }) => {
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

  const goToBilling = () =>
    setValue("currentStep", useSeparateBilling ? "billing" : "payment")

  const goToPayment = () => setValue("currentStep", "payment")

  return (
    <FormContext {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <AddressFields type="shipping" handleSubmit={goToBilling} />
        <AddressFields type="billing" handleSubmit={goToPayment} />
        <PaymentForm loading={loading} />
      </form>
    </FormContext>
  )
}

export default CheckoutPage
