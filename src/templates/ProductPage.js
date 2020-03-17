import React, { useState } from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import useCartId from "../hooks/useCartId"
import AddToCart from "../components/AddToCart"

const ProductPage = ({ data: { product } }) => {
  const cartId = useCartId()
  const { name, description, variants } = product
  const [firstVariant] = variants
  const [activeVariantId, setActiveVariantId] = useState(firstVariant.id)
  const hasVariants = variants.length > 1
  const activeVariant = variants.find(v => v.id === activeVariantId)

  return (
    <React.Fragment>
      <h1>{name}</h1>

      <p>{description}</p>

      <p>{activeVariant.formattedPrice}</p>

      {activeVariant.image && (
        <Img
          style={{ width: 250 }}
          fluid={activeVariant.image.childImageSharp.fluid}
          alt={activeVariant.name}
          title={activeVariant.name}
        />
      )}

      {hasVariants && (
        <React.Fragment>
          <h3>Style</h3>

          <select
            value={activeVariantId}
            onChange={({ target: { value } }) => setActiveVariantId(value)}
          >
            {variants.map(variant => (
              <option key={variant.id} value={variant.id}>
                {variant.name}
              </option>
            ))}
          </select>
        </React.Fragment>
      )}

      <AddToCart
        cartId={cartId}
        id={activeVariant.id}
        name={name}
        price={activeVariant.price}
        description={activeVariant.description}
        images={[JSON.stringify(activeVariant.image)]}
      />
    </React.Fragment>
  )
}

export const pageQuery = graphql`
  query ProductPageQuery($slug: String!) {
    product: productsYaml(slug: { eq: $slug }) {
      id
      name
      slug
      description
      variants {
        id
        name
        description
        price
        formattedPrice
        image {
          childImageSharp {
            fluid(maxWidth: 560) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`

export default ProductPage
