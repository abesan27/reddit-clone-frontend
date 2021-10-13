import { gql } from '@apollo/client';

export const CREATE_SUBREDDIT = gql`
  mutation CreateSubreddit(
    $name: String!
    $description: String!
    $admins: [ID]!
    $users: [ID]!
  ) {
    createSubreddit(
      input: {
        data: {
          name: $name
          description: $description
          admins: $admins
          users: $users
        }
      }
    ) {
      subreddit {
        name
        description
        users {
          id
        }
        admins {
          id
        }
      }
    }
  }
`;
