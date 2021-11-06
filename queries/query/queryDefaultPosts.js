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
        icon {
          url
        }
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
