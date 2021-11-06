import { gql } from '@apollo/client';

export const QUERY_SUBREDDIT = gql`
  query Subreddits($name: String!) {
    subreddits(where: { name: $name }) {
      id
      name
      description
      admins {
        username
      }
      users {
        id
        username
      }
      posts {
        user {
          username
          id
        }
        subreddit {
          icon {
            url
          }
        }
        title
        text
        url
        id
        likes {
          id
          users {
            username
          }
        }
      }
      icon {
        url
      }
    }
  }
`;
