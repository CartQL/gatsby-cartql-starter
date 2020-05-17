import React from "react"
import { Link } from "gatsby"

import LoginForm from "../components/LoginForm"

const LoginPage = () => {
  return (
    <React.Fragment>
      <h1>Login</h1>

      <LoginForm />

      <Link to="/register">Not got an account? Register now</Link>
    </React.Fragment>
  )
}

export default LoginPage
