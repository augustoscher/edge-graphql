const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { ApolloGateway, IntrospectAndCompose } = require('@apollo/gateway')

const port = process.env.APOLLO_PORT || 4000

const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      {
        name: 'orders',
        url: 'http://localhost:4001/graphql'
      },
      {
        name: 'products',
        url: 'https://x7jn4y20pp.sse.codesandbox.io/graphql'
      }
    ]
  })
})

const server = new ApolloServer({
  port,
  gateway,
  debug: true,
  subscriptions: false
})

;(async () => {
  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
    listen: { port }
  })

  console.log(`Server ready at ${url}`)
})()
