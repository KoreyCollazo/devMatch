const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    age: Int
    gender: String
    email: String
    password: String
    photos: String
    bio: String
    education: String
    location: String
    height: String
    ethnicity: String
    match: [User!]
    matchScore: Int
  }

  type ProfileWithMatch {
    _id: ID
    name: String
    age: String
    email: String
    password: String
    matchScore: Int
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]!
    user(UserId: ID!): User
    getMatches: [User]
    getMatch(UserId: ID!): User
    # Because we have the context functionality in place to check a JWT and decode its data, we can use a query that will always find and return the logged in user's data
    me: User
  }

  type Mutation {
    addUser(email: String!, password: String!): Auth
    addMatch(userId: ID!, matchId: ID!): User!
    login(email: String!, password: String!): Auth

    updateUser: User
    removeUser: User
    saveAnswers(answers: [Boolean]): Boolean
  }
`;

module.exports = typeDefs;
