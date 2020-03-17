const createResolvers = ({ createResolvers }) => {
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

module.exports = createResolvers
