import { gql, useMutation } from '@apollo/client';

export const CreatePost = () => {
  let title;
  let description;
  const [addPost] = useMutation(ADD_POST);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addPost({
            variables: { title: title.value, description: description.value },
          });
          title.value = '';
          description.value = '';
        }}>
        <input
          ref={(node) => {
            title = node;
          }}
        />
        <input
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
  mutation CreatePost($title: String!, $description: String!) {
    createPost(
      input: {
        data: {
          title: $title
          description: $description
          user: 2
          subreddit: 3
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
