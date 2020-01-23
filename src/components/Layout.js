import React from "react"
import { Link } from "gatsby"

import CartSummary from "./CartSummary"
import useCartId from "../hooks/useCartId"

const Layout = ({ children }) => {
  const cartId = useCartId()

  return (
    <React.Fragment>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <CartSummary cartId={cartId} />
        </li>
      </ul>

      <main>{children}</main>
    </React.Fragment>
  )
}

export default Layout
