const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { ApolloGateway, IntrospectAndCompose } = require('@apollo/gateway')

const {
  PORT,
  ORDERS_SUBGRAPH_URL,
  PRODUCTS_SUBGRAPH_URL
} = require('./config/constants')

const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      {
        name: 'orders',
        url: ORDERS_SUBGRAPH_URL
      },
      {
        name: 'products',
        url: PRODUCTS_SUBGRAPH_URL
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
    context: async ({ req }) => ({ token: req.headers.token }),
    listen: { port: PORT }
  })

  console.log(`Server ready at ${url}`)
})()
