import { gql } from '@apollo/client';

export const REFETCH_POST = gql`
  query {
    posts {
      id
      title
      text
      url
      user {
        username
        id
      }
      subreddit {
        name
      }
      likes {
        id
        users {
          username
        }
      }
    }
  }
`;
