import React from "react"
import Img from "gatsby-image"

import UpdateQuantity from "./UpdateQuantity"
import RemoveFromCart from "./RemoveFromCart"

const CartItem = ({
  cartId,
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
    <div>
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
        <UpdateQuantity initialValue={quantity} cartId={cartId} id={id} /> x{" "}
        {unitTotal.formatted}: {lineTotal.formatted}
      </p>

      <RemoveFromCart cartId={cartId} id={id} />
    </div>
  )
}

export default CartItem
