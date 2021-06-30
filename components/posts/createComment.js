import { gql, useMutation } from '@apollo/client';

export const CreateComment = ({ postId }) => {
  let content;
  const [addComment] = useMutation(ADD_COMMENT);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addComment({
            variables: { content: content.value, post: postId },
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
mutation CreateComment($content: String!, $post: ID!) {
  createComment(
    input: { data: { content: $content, post: $post, account: 1 } }
  ) {
    comment {
      content
      account {
        username
      }
    }
  }
}
`;
