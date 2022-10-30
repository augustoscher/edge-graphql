const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { ApolloGateway, IntrospectAndCompose } = require('@apollo/gateway')

const {
  PORT,
  ORDERS_SUBGRAPH_URL,
  PRODUCTS_SUBGRAPH_URL,
  REVIEWS_SUBGRAPH_URL
} = require('./config/constants')

const gateway = new ApolloGateway({
  // Notice that we used IntrospectAndCompose method to introspect subschemas.
  // This approach is low performance and should be used only for development purpose.
  // Consider to use either managed or manual composition for production environments:
  // https://www.apollographql.com/docs/federation/federated-types/composition
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      {
        name: 'orders',
        url: ORDERS_SUBGRAPH_URL
      },
      {
        name: 'products',
        url: PRODUCTS_SUBGRAPH_URL
      },
      {
        name: 'reviews',
        url: REVIEWS_SUBGRAPH_URL
      }
    ]
  })
})

const server = new ApolloServer({
  port: PORT,
  gateway,
  debug: true,
  subscriptions: false
})

;(async () => {
  const { url } = await startStandaloneServer(server, {
    context: async ({ req }: any) => ({ token: req.headers.token }),
    listen: { port: PORT }
  })

  console.log(`Edge GraphQL ready at ${url}`)
})()
