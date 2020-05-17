import { useContext } from "react"

import CustomerAuthContext from "../context/CustomerTokenContext"

const useCustomerToken = () => {
  const context = useContext(CustomerAuthContext)

  if (!context) {
    throw new Error(
      "useCustomerToken must be used within a CustomerAuthProvider"
    )
  }

  return context
}

export default useCustomerToken
