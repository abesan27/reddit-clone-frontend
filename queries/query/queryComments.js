import { gql } from '@apollo/client';

export const QUERY_COMMENTS = gql`
  query Posts($id: ID) {
    posts(where: { id: $id }) {
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
