const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Profile {
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

  type Auth {
    token: ID!
    profile: Profile
  }

  type Query {
    profiles: [Profile]!
    profile(profileId: ID!): Profile
    # Because we have the context functionality in place to check a JWT and decode its data, we can use a query that will always find and return the logged in user's data
    me: Profile
  }

  type Mutation {
    addProfile(email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    removeProfile: Profile
  }
`;

module.exports = typeDefs;
