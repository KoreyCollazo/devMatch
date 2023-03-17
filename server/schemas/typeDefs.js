const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Profile {
    _id: ID
    name: String
    age: String
    email: String
    password: String
  }

  type User {
    _id: ID
    name: String
    age: Int
    bio: String
    gender: String
    image: String
  }

  type Message {
    _id: ID
    message: String
    messageAuthor: String
  }

  type Auth {
    token: ID!
    profile: Profile
  }

  type Query {
    profiles: [Profile]!
    users: [User]
    profile(profileId: ID!): Profile
    user(userId: ID!): User
    # Because we have the context functionality in place to check a JWT and decode its data, we can use a query that will always find and return the logged in user's data
    me: Profile
  }

  type Mutation {
    addProfile(name: String!, age: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
