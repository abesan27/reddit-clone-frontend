import { gql, useMutation } from '@apollo/client';

export const LikePost = ({ post, liked, likedPostId, currentUserId }) => {
  const [addLike] = useMutation(ADD_LIKE);
  const [deleteLike] = useMutation(DELETE_LIKE);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addLike({
            variables: {
              liked_id: `${post.id}${currentUserId}`,
              users: currentUserId,
              post: post.id,
            },
            refetchQueries: [{ query: POSTS_QUERY }],
          });
        }}>
        <button disabled={liked} type="submit">
          upvote
        </button>
      </form>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          deleteLike({
            variables: {
              id: likedPostId,
            },
            refetchQueries: [{ query: POSTS_QUERY }],
          });
        }}>
        <button disabled={!liked} type="submit">
          downvote
        </button>
      </form>
    </div>
  );
};

const POSTS_QUERY = gql`
  query {
    posts {
      id
      title
      text
      url
      user {
        username
        id
      }
      subreddit {
        name
      }
      likes {
        id
        users {
          username
        }
      }
    }
  }
`;

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
