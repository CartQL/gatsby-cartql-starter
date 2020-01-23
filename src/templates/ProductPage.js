import React, { useState } from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import useCartId from "../hooks/useCartId"
import AddToCart from "../components/AddToCart"

const ProductPage = ({ data: { product } }) => {
  const cartId = useCartId()
  const { name, variants } = product
  const [firstVariant] = variants
  const [activeVariantSlug, setActiveVariantSlug] = useState(firstVariant.slug)
  const hasVariants = variants.length > 1
  const activeVariant = variants.find(v => v.slug === activeVariantSlug)

  return (
    <React.Fragment>
      <h1>{name}</h1>

      <p>{activeVariant.formattedPrice}</p>

      <Img
        style={{ width: 250 }}
        fluid={activeVariant.image.childImageSharp.fluid}
        alt={activeVariant.name}
        title={activeVariant.name}
      />

      {hasVariants && (
        <React.Fragment>
          <h3>Style</h3>

          <select
            value={activeVariantSlug}
            onChange={({ target: { value } }) => setActiveVariantSlug(value)}
          >
            {variants.map(variant => (
              <option key={variant.id} value={variant.slug}>
                {variant.splitName}
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
        description={activeVariant.splitName}
        images={[JSON.stringify(activeVariant.image)]}
      />
    </React.Fragment>
  )
}

export const pageQuery = graphql`
  query ProductPageQuery($slug: String!) {
    product: printfulProduct(slug: { eq: $slug }) {
      id
      name
      variants {
        id
        name
        slug
        splitName
        price: retail_price
        formattedPrice
        image: variantImage {
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
