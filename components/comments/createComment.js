import { useMutation } from '@apollo/client';
import { REFETCH_COMMENT } from '../../queries/refetch/refetchComment';
import { CREATE_COMMENT } from '../../queries/create/createComment';
import Link from 'next/link';

export const CreateComment = ({ postId, userId, username }) => {
  let content;
  const [addComment] = useMutation(CREATE_COMMENT);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addComment({
            variables: { content: content.value, post: postId, user: userId },
            refetchQueries: [{ query: REFETCH_COMMENT }],
          });
          content.value = '';
        }}>
        <div className="mt-8">
          <p className="text-gray-400 text-sm">
            Comment as{' '}
            <Link href={`/u/${username}`}>
              <a className="text-blue-300 hover:underline">u/{username}</a>
            </Link>
          </p>
          <textarea
            className="p-1.5 mt-1 w-full border border-black rounded bg-gray-800  text-gray-300"
            required
            cols="4"
            ref={(node) => {
              content = node;
            }}
          />
          <button
            type="submit"
            className="border border-gray-200 hover:bg-gray-700 rounded-full text-sm text-gray-200 mt-1 mb-5 p-1 px-4 ">
            Add Comment
          </button>
        </div>
      </form>
    </div>
  );
};
