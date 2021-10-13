import { gql } from '@apollo/client';

export const CREATE_POST = gql`
  mutation CreatePost(
    $title: String!
    $text: String
    $url: String
    $user: ID!
    $subreddit: ID!
  ) {
    createPost(
      input: {
        data: {
          title: $title
          text: $text
          url: $url
          user: $user
          subreddit: $subreddit
        }
      }
    ) {
      post {
        title
        text
        url
        user {
          id
        }
        subreddit {
          id
        }
      }
    }
  }
`;
