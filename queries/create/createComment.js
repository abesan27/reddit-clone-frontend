import { gql } from '@apollo/client';

export const CREATE_COMMENT = gql`
  mutation CreateComment($content: String!, $post: ID!, $user: ID!) {
    createComment(
      input: { data: { content: $content, post: $post, user: $user } }
    ) {
      comment {
        content
        user {
          username
        }
      }
    }
  }
`;
