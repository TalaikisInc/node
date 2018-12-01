import { gql } from 'apollo-server-express'

const typeDefs = gql`
  type User {
    id: Int
    name: String
  }

  type Query {
    allUsers: [User]
    user(id: Int!): User
  }
`

export default typeDefs
