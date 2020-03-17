const path = require("path")

const PRODUCTS_QUERY = `
  query {
    allProductsYaml {
      nodes {
        slug
      }
    }
  }
`

const createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const {
    data: {
      allProductsYaml: { nodes: products },
    },
  } = await graphql(PRODUCTS_QUERY)

  products.forEach(({ slug }) =>
    createPage({
      component: path.resolve("./src/templates/ProductPage.js"),
      context: { slug },
      path: `/products/${slug}`,
    })
  )
}

module.exports = createPages
