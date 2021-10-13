import { gql, useMutation } from '@apollo/client';

export const LeaveSubreddit = ({ subredditId, users, currentUserId }) => {
  let membersIdList = [];

  users.map((user) => {
    if (user.id != currentUserId) membersIdList.push(user.id);
  });

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
        leave subreddit
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
