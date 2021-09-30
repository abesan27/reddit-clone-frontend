import { gql, useMutation } from '@apollo/client';

export const CreateSubreddit = ({ session }) => {
  let name;
  let description;
  const [createSubreddit] = useMutation(CREATE_SUBREDDIT);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createSubreddit({
            variables: {
              name: name.value,
              description: description.value,
              admins: session.id,
              users: session.id,
            },
          });
        }}>
        <div>
          <input
            required
            placeholder="subreddit title"
            ref={(node) => {
              name = node;
            }}
          />
        </div>
        <div>
          <input
            required
            placeholder="description"
            ref={(node) => {
              description = node;
            }}
          />
        </div>
        <button type="submit">create subreddit</button>
      </form>
    </div>
  );
};

const CREATE_SUBREDDIT = gql`
  mutation CreateSubreddit(
    $name: String!
    $description: String!
    $admins: [ID]!
    $users: [ID]!
  ) {
    createSubreddit(
      input: {
        data: {
          name: $name
          description: $description
          admins: $admins
          users: $users
        }
      }
    ) {
      subreddit {
        name
        description
        users {
          id
        }
        admins {
          id
        }
      }
    }
  }
`;
