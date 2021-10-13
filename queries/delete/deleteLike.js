import { gql } from '@apollo/client';

export const DELETE_LIKE = gql`
  mutation DeleteLike($id: ID!) {
    deleteLike(input: { where: { id: $id } }) {
      like {
        id
      }
    }
  }
`;
