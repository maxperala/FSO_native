import { gql } from "@apollo/client";

export const GET_REPOS = gql`
  query GET_REPOS($orderBy: AllRepositoriesOrderBy, $searchKeyword: String) {
    repositories(orderBy: $orderBy, searchKeyword: $searchKeyword) {
      edges {
        node {
          fullName
          forksCount
          description
          id
          language
          url
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

export const ME = gql`
  query Me {
    me {
      id
      username
    }
  }
`;

export const ME_WITH_REVIEWS = gql`
  query MeWithReviews {
    me {
      id
      username
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            repository {
              id
              fullName
            }
          }
        }
      }
    }
  }
`;

export const GET_REPOSITORY_REVIEWS = gql`
  query GetRepositoryReviews($repoId: ID!) {
    repository(id: $repoId) {
      id
      fullName
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation CreateReview(
    $repositoryName: String!
    $ownerName: String!
    $rating: Int!
    $text: String
  ) {
    createReview(
      review: {
        repositoryName: $repositoryName
        ownerName: $ownerName
        rating: $rating
        text: $text
      }
    ) {
      id
      rating
      text
      createdAt
      repositoryId
      userId
      repository {
        id
        fullName
      }
      user {
        id
        username
      }
    }
  }
`;
