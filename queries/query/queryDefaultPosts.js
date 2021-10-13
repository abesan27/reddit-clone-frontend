import { gql } from '@apollo/client';

export const QUERY_DEFAULT_POSTS = gql`
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
