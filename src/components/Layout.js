import React from "react"
import { Link } from "gatsby"

import CartSummary from "./CartSummary"
import useCartId from "../hooks/useCartId"

const Layout = ({ children }) => {
  const cartId = useCartId()

  return (
    <React.Fragment>
      <header className="bg-white py-3 shadow-sm">
        <div className="max-w-5xl mx-auto px-6">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <CartSummary cartId={cartId} />
            </li>
          </ul>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">{children}</main>
    </React.Fragment>
  )
}

export default Layout
