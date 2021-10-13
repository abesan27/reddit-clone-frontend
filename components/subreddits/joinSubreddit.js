import { gql, useMutation } from '@apollo/client';

export const JoinSubreddit = ({ subredditId, users, currentUserId }) => {
  let membersIdList = [];

  users.map((user) => {
    membersIdList.push(user.id);
  });

  membersIdList.push(currentUserId);

  const [updateSubreddit] = useMutation(UPDATE_SUBREDDIT);

  return (
    <div>
      <button
        onClick={(e) => {
          e.preventDefault();
          updateSubreddit({
            variables: {
              subreddit: subredditId,
              username: membersIdList,
            },
            refetchQueries: [{ query: SUBREDDIT_QUERY }],
          });
        }}
        type="submit">
        join subreddit
      </button>
    </div>
  );
};

const SUBREDDIT_QUERY = gql`
  query {
    subreddits {
      id
      name
      description
      admins {
        username
      }
      users {
        id
        username
      }
      posts {
        user {
          username
          id
        }
        title
        text
        url
        id
        likes {
          id
          users {
            username
          }
        }
      }
      icon {
        url
      }
    }
  }
`;

const UPDATE_SUBREDDIT = gql`
  mutation updateSubreddit($subreddit: ID!, $username: [ID]!) {
    updateSubreddit(
      input: { where: { id: $subreddit }, data: { users: $username } }
    ) {
      subreddit {
        users {
          username
        }
      }
    }
  }
`;
