import { gql } from '@urql/core';

export const LOGIN_USER_MUTATION = gql`
  mutation ($username: String!, $password: String!) {
    login(loginUserInput: { username: $username, password: $password }) {
      username
      id
      email
    }
  }
`;

export const CREATE_USER_MUTATION = gql`
  mutation ($username: String!, $email: String!, $password: String!) {
    createUser(
      newUserInput: { username: $username, email: $email, password: $password }
    ) {
      username
      id
      email
    }
  }
`;

export const LOGOUT_USER_MUTATION = gql`
  mutation {
    logout
  }
`;
