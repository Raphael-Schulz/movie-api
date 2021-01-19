import { gql } from "@apollo/client";

export const USER_INFORMATION_QUERY = gql`
  query GetUserInformation {
    currentUser {
      id
      username
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation register($username: String!, $password: String!) {
    register(username: $username, password: $password) {
      id
      username
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation {
    logout
  }
`;
