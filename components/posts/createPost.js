import { gql, useMutation } from '@apollo/client';

export const CreatePost = ({ userId }) => {
  let title;
  let description;
  const [addPost] = useMutation(ADD_POST);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addPost({
            variables: {
              title: title.value,
              description: description.value,
              user: userId,
            },
          });
          title.value = '';
          description.value = '';
        }}>
        <input
          required
          ref={(node) => {
            title = node;
          }}
        />
        <input
          required
          ref={(node) => {
            description = node;
          }}
        />
        <button type="submit">Add Post</button>
      </form>
    </div>
  );
};

const ADD_POST = gql`
  mutation CreatePost($title: String!, $description: String!, $user: ID!) {
    createPost(
      input: {
        data: {
          title: $title
          description: $description
          user: $user
          subreddit: 1
        }
      }
    ) {
      post {
        title
        description
        user {
          id
        }
        subreddit {
          id
        }
      }
    }
  }
`;
