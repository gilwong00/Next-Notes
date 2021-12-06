import { gql } from '@urql/core';

export const WHO_AM_I = gql`
  query {
    whoami {
      id
      email
      username
    }
  }
`;
