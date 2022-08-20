const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { ApolloGateway, IntrospectAndCompose } = require('@apollo/gateway')

const port = process.env.APOLLO_PORT || 4000

const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      {
        name: 'accounts',
        url: 'https://pw678w138q.sse.codesandbox.io/graphql'
      },
      { name: 'reviews', url: 'https://0yo165yq9v.sse.codesandbox.io/graphql' },
      {
        name: 'products',
        url: 'https://x7jn4y20pp.sse.codesandbox.io/graphql'
      },
      {
        name: 'inventory',
        url: 'https://o5oxqmn7j9.sse.codesandbox.io/graphql'
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
