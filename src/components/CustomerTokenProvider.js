import React, { useEffect } from "react"

import useLocalStorage from "../hooks/useLocalStorage"
import CustomerTokenContext from "../context/CustomerTokenContext"

const CustomerTokenProvider = (props) => {
  const [token, saveToken] = useLocalStorage("cartql-customer-token")

  useEffect(() => {
    saveToken(token)
  }, [token, saveToken])

  return (
    <CustomerTokenContext.Provider value={{ token, saveToken }} {...props} />
  )
}

export default CustomerTokenProvider
