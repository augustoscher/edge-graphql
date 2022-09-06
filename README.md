# edge-graphql
One Graph Service with graphql federation v2 example.
We're using [Apollo Federation](https://www.apollographql.com/docs/federation/) which is an open source architecture for building a distributed graph.
With Apollo Federation, we're able to implement GraphQL in a microservice architecture. It’s designed to replace schema stitching and solve pain points such as coordination, separation of concerns, and brittle gateway code.

## Sub Graphs
Edge GraphQL super graph is composed by the following sub graphs:

[Products Domain Graph Service](https://github.com/augustoscher/products-graphql-subgraph)

[Orders Domain Graph Service](https://github.com/augustoscher/orders-graphql-subgraph)



## Running

## FAQ
- How it works when subgraph schema changes in production? Supergraph needs to redeploy?
- What happens  when a subgraph is down?
- Is it any performance issues?  
A note on performance: Query Planning and Execution adds a ~10ms overhead in the worst case. This includes the compute for building the query plan, as well as the deserialization of DGS responses and the serialization of merged gateway response.
- How does it work with Relay subgraph?  


## Docs
[GraphQL Principle](https://principledgraphql.com/integrity#1-one-graph).

[Apollo Federation](https://www.apollographql.com/docs/federation/).

[Netflix API with GraphQL Federation](https://netflixtechblog.com/how-netflix-scales-its-api-with-graphql-federation-part-1-ae3557c187e2).
