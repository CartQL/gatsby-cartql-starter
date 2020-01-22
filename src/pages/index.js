import React from "react"
import { graphql } from "gatsby"

import ProductGrid from "../components/ProductGrid"

const HomePage = ({
  data: {
    products: { nodes: products },
  },
}) => {
  return <ProductGrid products={products} />
}

export const pageQuery = graphql`
  query allProductsQuery {
    products: allPrintfulProduct {
      nodes {
        id
        name
        slug
        image: productImage {
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

export default HomePage
