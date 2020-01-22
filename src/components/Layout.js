import React from "react"
import { Link } from "gatsby"

import CartSummary from "./CartSummary"

const Layout = ({ children }) => (
  <React.Fragment>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <CartSummary cartId="testing" />
      </li>
    </ul>

    <main>{children}</main>
  </React.Fragment>
)

export default Layout
