const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const {
    data: {
      allPrintfulProduct: { nodes: products },
    },
  } = await graphql(`
    query {
      allPrintfulProduct {
        nodes {
          slug
        }
      }
    }
  `)

  products.forEach(({ slug }) =>
    createPage({
      component: path.resolve("./src/templates/ProductPage.js"),
      context: { slug },
      path: `/products/${slug}`,
    })
  )
}

exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    PrintfulVariant: {
      formattedPrice: {
        type: `String`,
        resolve: ({ retail_price }) =>
          new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "usd",
          }).format(retail_price / 100),
      },

      splitName: {
        type: `String!`,
        resolve: ({ name }) => {
          const [, splitVariantName] = name.split(" - ")

          return splitVariantName ? splitVariantName : name
        },
      },
    },
  }

  createResolvers(resolvers)
}
