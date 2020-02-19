import React from "react"

const PaymentForm = ({ loading }) => (
  <fieldset>
    <legend>Payment</legend>

    <button type="submit" disabled={loading}>
      Pay
    </button>
  </fieldset>
)

export default PaymentForm
