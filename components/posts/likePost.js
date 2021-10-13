import { useMutation } from '@apollo/client';
import { REFETCH_POST } from '../../queries/refetch/refetchPost';
import { CREATE_LIKE } from '../../queries/create/createLike';
import { DELETE_LIKE } from '../../queries/delete/deleteLike';

export const LikePost = ({ post, liked, likedPostId, currentUserId }) => {
  const [addLike] = useMutation(CREATE_LIKE);
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
            refetchQueries: [{ query: REFETCH_POST }],
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
            refetchQueries: [{ query: REFETCH_POST }],
          });
        }}>
        <button disabled={!liked} type="submit">
          downvote
        </button>
      </form>
    </div>
  );
};
