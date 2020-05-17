import React from "react"
import { gql, useMutation } from "@apollo/client"
import { useForm } from "react-hook-form"

import useCustomerToken from "../hooks/useCustomerToken"
import { customerWithToken } from "../lib/fragments"

const LOGIN_MUTATION = gql`
  mutation login($input: CreateCustomerTokenInput!) {
    createCustomerToken(input: $input) {
      ...customerWithToken
    }
  }
  ${customerWithToken}
`

const LoginForm = () => {
  const { saveToken } = useCustomerToken()
  const { handleSubmit, register, errors } = useForm()
  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted({ createCustomerToken }) {
      const { token } = createCustomerToken

      saveToken(token)
    },
  })

  const onSubmit = async ({ username, password }) => {
    try {
      const {
        data: { createCustomerToken: customer },
      } = await login({ variables: { input: { username, password } } })

      console.log(customer)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          name="username"
          ref={register({ required: true })}
          placeholder="Username/Email"
        />
        {errors && errors.username && "Username/Email is required."}
      </div>

      <div>
        <input
          name="password"
          type="password"
          ref={register({ required: true })}
          placeholder="Password"
        />
        {errors && errors.password && "Password is required."}
      </div>

      <div>
        <button type="submit" disabled={loading}>
          Login
        </button>
      </div>
    </form>
  )
}

export default LoginForm
