import { gql } from '@apollo/client';

export const QUERY_USER_POSTS = gql`
  query Accounts($username: String) {
    users(where: { username: $username }) {
      username
      id
      posts {
        id
        title
        text
        url
        likes {
          id
          users {
            username
          }
        }
        subreddit {
          name
          icon {
            url
          }
        }
      }
      pfp {
        url
      }
    }
  }
`;
