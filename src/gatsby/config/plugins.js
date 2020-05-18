require("dotenv").config()

const path = require("path")

const plugins = [
  `gatsby-plugin-react-helmet`,
  `gatsby-transformer-sharp`,
  `gatsby-plugin-sharp`,
  `gatsby-transformer-yaml`,
  `gatsby-plugin-postcss`,
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `products`,
      path: path.resolve(__dirname, "../../../content/products"),
    },
  },
  {
    resolve: `gatsby-plugin-google-fonts`,
    options: {
      fonts: [`Inter\:100,200,300,400,500,600,700,800,900`],
      display: "swap",
    },
  },
]

module.exports = plugins
