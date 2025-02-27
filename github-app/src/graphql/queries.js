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
