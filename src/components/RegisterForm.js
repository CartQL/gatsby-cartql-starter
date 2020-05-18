import React from "react"
import { gql, useMutation } from "@apollo/client"
import { useForm } from "react-hook-form"

import useCustomerToken from "../hooks/useCustomerToken"
import { customerWithToken } from "../lib/fragments"

const REGISTER_MUTATION = gql`
  mutation register($input: CreateCustomerInput!) {
    createCustomer(input: $input) {
      ...customerWithToken
    }
  }
  ${customerWithToken}
`

const RegisterForm = () => {
  const { saveToken } = useCustomerToken()
  const { handleSubmit, register, errors } = useForm()
  const [signup, { loading }] = useMutation(REGISTER_MUTATION, {
    onCompleted({ createCustomer }) {
      const { token } = createCustomer
      saveToken(token)
    },
  })

  const onSubmit = async ({ name, username, password, acceptsMarketing }) => {
    try {
      const {
        data: { createCustomer: customer },
      } = await signup({
        variables: {
          input: {
            name,
            username,
            password,
            attributes: [
              { key: "acceptsMarketing", value: String(acceptsMarketing) },
            ],
          },
        },
      })

      console.log(customer)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input name="name" ref={register} placeholder="Name" />
      </div>

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
        <label htmlFor="acceptsMarketing">
          <input
            id="acceptsMarketing"
            name="acceptsMarketing"
            ref={register}
            type="checkbox"
          />
          Accepts marketing
        </label>
      </div>

      <div>
        <button type="submit" disabled={loading}>
          Register
        </button>
      </div>
    </form>
  )
}

export default RegisterForm
