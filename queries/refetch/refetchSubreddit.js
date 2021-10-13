import { gql } from '@apollo/client';

export const REFETCH_SUBREDDIT = gql`
  query {
    subreddits {
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
