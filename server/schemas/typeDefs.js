const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    age: Int
    gender: String
    email: String
    photos: String
    bio: String
    education: String
    location: String
    height: String
    ethnicity: String
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
    profile: Profile
  }

  type Query {
    profiles: [Profile]!
    profile(profileId: ID!): Profile
    # Because we have the context functionality in place to check a JWT and decode its data, we can use a query that will always find and return the logged in user's data
    me: Profile
    getMatches: [ProfileWithMatch]
  }

  type Mutation {
    addProfile(email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveAnswers(answers: [Boolean]): Boolean
  }
`;

module.exports = typeDefs;
