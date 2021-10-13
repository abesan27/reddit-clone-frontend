import { gql } from '@apollo/client';

export const UPDATE_SUBREDDIT = gql`
  mutation updateSubreddit($subreddit: ID!, $username: [ID]!) {
    updateSubreddit(
      input: { where: { id: $subreddit }, data: { users: $username } }
    ) {
      subreddit {
        users {
          username
        }
      }
    }
  }
`;
