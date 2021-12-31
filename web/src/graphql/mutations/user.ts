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

export const LOGOUT_USER_MUTATION = gql`
  mutation {
    logout
  }
`;
