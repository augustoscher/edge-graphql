const {
  NODE_ENV = 'development',
  PORT = 4000,
  ORDERS_SUBGRAPH_URL = 'http://localhost:4001/graphql',
  PRODUCTS_SUBGRAPH_URL = 'http://localhost:4002/graphql',
  REVIEWS_SUBGRAPH_URL = 'http://localhost:4003/graphql'
} = process.env

module.exports = {
  NODE_ENV,
  PORT,
  ORDERS_SUBGRAPH_URL,
  PRODUCTS_SUBGRAPH_URL,
  REVIEWS_SUBGRAPH_URL
}
