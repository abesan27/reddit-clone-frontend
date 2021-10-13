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
            refetchQueries: [{ query: COMMENT_QUERY }],
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

const COMMENT_QUERY = gql`
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
      likes {
        id
        users {
          username
        }
      }
      subreddit {
        name
      }
      comments {
        id
        content
        user {
          username
        }
      }
    }
  }
`;

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
