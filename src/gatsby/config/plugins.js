require("dotenv").config()

const path = require("path")

const plugins = [
  `gatsby-plugin-react-helmet`,
  `gatsby-transformer-sharp`,
  `gatsby-plugin-sharp`,
  `gatsby-transformer-yaml`,
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `products`,
      path: path.resolve(__dirname, "../../../content/products"),
    },
  },
]

module.exports = plugins
