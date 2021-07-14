import typeDefs from '@/main/graphql/type-defs'
import resolvers from '@/main/graphql/resolvers'

import { ApolloServer } from 'apollo-server-express'

export default (app: any): void => {
  const server = new ApolloServer({
    resolvers,
    typeDefs
  })
  server.applyMiddleware({ app })
}
