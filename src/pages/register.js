import React from "react"
import { Link } from "gatsby"

import RegisterForm from "../components/RegisterForm"

const RegisterPage = () => {
  return (
    <React.Fragment>
      <h1>Register</h1>

      <RegisterForm />

      <Link to="/login">Already have an account? Login</Link>
    </React.Fragment>
  )
}

export default RegisterPage
