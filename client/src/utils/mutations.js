import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($firstName: String!, $lastName: String!, $age: Int!, $gender: String!, $location: String!, $email: String!, $password: String!) {
    addUser(firstName: $firstName, lastName: $lastName, age: $age, gender: $gender, location: $location, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const SAVE_ANSWERS = gql`
  mutation saveAnswers($answers: [Boolean]) {
    saveAnswers(answers: $answers)
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $id: ID!
    $firstName: String
    $lastName: String
    $age: Int
    $gender: String
    $email: String
    $password: String
    $photos: String
    $bio: String
    $education: String
    $location: String
    $height: String
    $ethnicity: String
    $email: String
  ) {
    updateUser(
      id: $id,
      firstName: $firstName
      lastName: $lastName
      age: $age
      gender: $gender
      email: $email
      password: $password
      photos: $photos
      bio: $bio
      education: $education
      location: $location
      height: $height
      ethnicity: $ethnicity
    ) {
      id
      firstName
      lastName
      age
      gender
      email
      password
      photos
      bio
      education
      location
      height
      ethnicity
    }
  }
`;


