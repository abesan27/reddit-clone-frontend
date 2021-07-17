import { gql, useMutation } from '@apollo/client';

export const CreateComment = ({ postId, userId }) => {
  let content;
  const [addComment] = useMutation(ADD_COMMENT);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addComment({
            variables: { content: content.value, post: postId, user: userId },
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

const ADD_COMMENT = gql`
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
