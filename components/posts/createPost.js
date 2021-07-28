import { gql, useMutation } from '@apollo/client';

export const CreatePost = ({ userId, subredditId }) => {
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
              subreddit: subredditId,
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
  mutation CreatePost(
    $title: String!
    $description: String!
    $user: ID!
    $subreddit: ID!
  ) {
    createPost(
      input: {
        data: {
          title: $title
          description: $description
          user: $user
          subreddit: $subreddit
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
