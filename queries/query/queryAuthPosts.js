import { gql } from '@apollo/client';

export const QUERY_AUTH_POSTS = gql`
  query Accounts($username: String) {
    users(where: { username: $username }) {
      username
      id
      subreddits {
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
    }
  }
`;
