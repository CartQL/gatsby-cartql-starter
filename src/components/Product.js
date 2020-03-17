import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"

const Product = ({ id, slug, image, name }) => (
  <article key={id}>
    <Link to={`/products/${slug}`}>
      {image && (
        <Img
          style={{ width: 250 }}
          fluid={image.childImageSharp.fluid}
          alt={name}
          title={name}
        />
      )}

      <h4>{name}</h4>
    </Link>
  </article>
)

export default Product
