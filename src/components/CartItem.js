import React from "react"
import Img from "gatsby-image"

import RemoveFromCart from "./RemoveFromCart"

const CartItem = ({
  id,
  name,
  description,
  images = [],
  quantity,
  unitTotal,
  lineTotal,
}) => {
  const [image] = images

  return (
    <div key={id}>
      {image && (
        <Img
          fluid={JSON.parse(image).childImageSharp.fluid}
          alt=""
          title={name}
          style={{ width: 80 }}
        />
      )}

      <h4>{name}</h4>
      <p>
        <em>{description}</em>
      </p>
      <p>
        {quantity} x {unitTotal.formatted}: {lineTotal.formatted}
      </p>

      <RemoveFromCart cartId="testing" id={id} />
    </div>
  )
}

export default CartItem
