import { gql } from '@apollo/client';

export const REFETCH_COMMENT = gql`
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
      likes {
        id
        users {
          username
        }
      }
      subreddit {
        name
      }
      comments {
        id
        content
        user {
          username
        }
      }
    }
  }
`;
