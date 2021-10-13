import { gql } from '@apollo/client';

export const QUERY_USER_SUBREDDIT = gql`
  query Users($username: String) {
    users(where: { username: $username }) {
      subreddits {
        name
        id
      }
    }
  }
`;
