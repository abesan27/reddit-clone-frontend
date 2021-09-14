import { gql, useMutation } from '@apollo/client';

export const LikePost = ({ post, hasLikedPost }) => {
  const [addLike] = useMutation(ADD_LIKE);
  const [deleteLike] = useMutation(DELETE_LIKE);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addLike({
            variables: {
              liked_id: `${post.id}${post.user.id}`,
              users: post.user.id,
              post: post.id,
            },
          });
        }}>
        <button disabled={hasLikedPost} type="submit">
          upvote
        </button>
      </form>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          deleteLike({
            variables: {
              id: post.likes[0].id,
            },
          });
        }}>
        <button disabled={!hasLikedPost} type="submit">
          downvote
        </button>
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

const DELETE_LIKE = gql`
  mutation DeleteLike($id: ID!) {
    deleteLike(input: { where: { id: $id } }) {
      like {
        id
      }
    }
  }
`;
