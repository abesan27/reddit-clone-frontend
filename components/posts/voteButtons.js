import { useMutation } from '@apollo/client';
import { REFETCH_POST } from '../../queries/refetch/refetchPost';
import { CREATE_LIKE } from '../../queries/create/createLike';
import { DELETE_LIKE } from '../../queries/delete/deleteLike';
import { ArrowCircleDownIcon, ArrowCircleUpIcon } from '@heroicons/react/solid';

export const VoteButtons = ({
  post,
  liked,
  likedPostId,
  currentUserId,
  totalLikes,
}) => {
  const [addLike] = useMutation(CREATE_LIKE);
  const [deleteLike] = useMutation(DELETE_LIKE);

  return (
    <div className="mt-4 mr-4 flex justify-start text-gray-400">
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
        <button
          type="submit"
          disabled={liked}
          className="flex rounded-md mr-0.5 py-0.5 px-1 hover:bg-gray-700">
          <ArrowCircleUpIcon
            className={`h-5 w-5 mt-0.5 ${
              liked && 'fill-current text-green-400'
            }`}
          />
        </button>
      </form>

      <span className="text-sm py-1 px-1 font-semibold">{totalLikes}</span>

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
        <button
          type="submit"
          disabled={!liked}
          className="flex rounded-md ml-0.5 py-0.5 px-1 hover:bg-gray-700">
          <ArrowCircleDownIcon
            className={`h-5 w-5 mt-0.5 ${
              !liked && 'fill-current text-red-400'
            }`}
          />
        </button>
      </form>
    </div>
  );
};
