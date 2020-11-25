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

exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    ProductsYamlVariants: {
      formattedPrice: {
        type: `String`,
        resolve: ({ price }) =>
          price
            ? new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "usd",
              }).format(price / 100)
            : null,
      },
    },
  }

  createResolvers(resolvers)
}

exports.createPages = async ({ graphql, actions }) => {
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
