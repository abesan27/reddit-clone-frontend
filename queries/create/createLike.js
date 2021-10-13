import { gql } from '@apollo/client';

export const CREATE_LIKE = gql`
  mutation CreateLike($liked_id: String!, $users: ID!, $post: ID!) {
    createLike(
      input: { data: { liked_id: $liked_id, users: $users, post: $post } }
    ) {
      like {
        users {
          username
        }
        post {
          id
        }
      }
    }
  }
`;
