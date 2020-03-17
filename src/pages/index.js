import React from "react"
import { graphql } from "gatsby"

import ProductGrid from "../components/ProductGrid"

const HomePage = ({
  data: {
    products: { nodes: products },
  },
}) => <ProductGrid products={products} />

export const pageQuery = graphql`
  query allProductsQuery {
    products: allProductsYaml {
      nodes {
        id
        name
        slug
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

export default HomePage
