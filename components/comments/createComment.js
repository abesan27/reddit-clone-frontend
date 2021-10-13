import { useMutation } from '@apollo/client';
import { REFETCH_COMMENT } from '../../queries/refetch/refetchComment';
import { CREATE_COMMENT } from '../../queries/create/createComment';

export const CreateComment = ({ postId, userId }) => {
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
        <input
          required
          ref={(node) => {
            content = node;
          }}
        />
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
};
