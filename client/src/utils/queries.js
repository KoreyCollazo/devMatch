import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
  query allUsers {
    users {
      _id
     
      
    
    }
  }
`;

export const QUERY_SINGLE_USER = gql`
  query singleUser($userId: ID!) {
    user(userId: $userId) {
      _id
     
    }
  }
`;

export const QUERY_GET_MATCHES = gql`
  query getMatches {
    users {
      _id
    firstName
    lastName
    age
    gender
    email
    photos
    bio
    education
    location
    height
    ethnicity
    matchScore
    }
  }
`;


export const QUERY_ME = gql`
  query me {
    me {
      _id
      
    }
  }
`;

export const QUERY_DIRECTORY = gql`
  query allUsers {
  users {
    _id
    age
    bio
    education
    ethnicity
    firstName
    gender
    location
    height
  }
}
`