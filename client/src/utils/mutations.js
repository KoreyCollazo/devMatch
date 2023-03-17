import { gql } from '@apollo/client';

export const ADD_PROFILE = gql`
  mutation addProfile($firstName: String!, $lastName: String!, $age: Number!, $gender: String!, $email: String!, $password: String!) {
    addProfile(firstName: $firstName, lastName: $lastName, age: $age, gender: $gender, email: $email, password: $password) {
      token
      profile {
        _id
        firstName

      }
    }
  }
`;


export const CREATE_USER_MUTATION = gql`
  mutation addUser($firstName: String!, $age: Number!, $gender: String!, $email: String!, $password: String!) {
    addUser(firstName: $firstName, age: $age, gender: $gender, email: $email, password: $password) {
      token
      profile {
        _id
        firstName
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        firstName
      }
    }
  }
`;

