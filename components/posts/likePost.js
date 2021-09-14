import { gql, useMutation } from '@apollo/client';

export const LikePost = ({ userId, postId }) => {
  const [addLike] = useMutation(ADD_LIKE);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addLike({
            variables: {
              liked_id: `${postId}${userId}`,
              users: userId,
              post: postId,
            },
          });
        }}>
        <button type="submit">like</button>
      </form>
    </div>
  );
};

const ADD_LIKE = gql`
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
