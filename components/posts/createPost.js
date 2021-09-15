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
              subreddit: 1,
            },
          });
          title.value = '';
          description.value = '';
        }}>
        <div>
          <input disabled type="radio" id="text" name="type" />
          <label for="text">text</label>
        </div>
        <div>
          <input disabled required type="radio" id="image/video" name="type" />
          <label for="image/video">image/video</label>
        </div>
        <div>
          <input disabled required type="radio" id="link" name="type" />
          <label for="link">link</label>
        </div>
        <div>
          <select disabled name="subreddits">
            <option value="programming">programming</option>
            <option value="askreddit">askreddit</option>
          </select>
        </div>
        <div>
          <input
            required
            placeholder="title"
            required
            ref={(node) => {
              title = node;
            }}
          />
          <input
            required
            placeholder="description"
            required
            ref={(node) => {
              description = node;
            }}
          />
        </div>
        <button type="submit">create post</button>
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
