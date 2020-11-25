const Stripe = require("stripe")
const { request, gql } = require("graphql-request")

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const query = gql`
  query getCart($cartId: ID!) {
    cart(id: $cartId) {
      id
      isEmpty
      items {
        id
        name
        description
        unitTotal {
          amount
          currency {
            code
          }
        }
        quantity
      }
    }
  }
`

exports.handler = async function (event) {
  const { cartId } = JSON.parse(event.body)

  const {
    cart: { isEmpty, items },
  } = await request(process.env.GATSBY_GRAPHQL_ENDPOINT, query, {
    cartId,
  })

  if (isEmpty) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "The cart is empty." }),
    }
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      success_url: `${process.env.URL}/thankyou`,
      cancel_url: `${process.env.URL}/cart`,
      line_items: items.map(
        ({
          name,
          description,
          unitTotal: {
            amount: unit_amount,
            currency: { code: currency },
          },
          quantity,
        }) => ({
          ...(description && { description }),
          price_data: {
            currency,
            unit_amount,
            product_data: {
              name,
              ...(description && { description }),
            },
          },
          quantity,
        })
      ),
    })

    return {
      statusCode: 201,
      body: JSON.stringify(session),
    }
  } catch ({ message }) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message }),
    }
  }
}
