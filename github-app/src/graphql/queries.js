import { gql } from "@apollo/client";

export const GET_REPOS = gql`
  query GET_REPOS {
    repositories {
      edges {
        node {
          fullName
          forksCount
          description
          id
          language
          name
          ownerAvatarUrl
          ratingAverage
          reviewCount
          stargazersCount
        }
      }
    }
  }
`;

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($username: String!, $password: String!) {
    createUser(user: { username: $username, password: $password }) {
      id
      username
    }
  }
`;

export const AUTHENTICATE_MUTATION = gql`
  mutation Authenticate($username: String!, $password: String!) {
    authenticate(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`;
