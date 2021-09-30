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
          });
        }}
        type="submit">
        leave subreddit
      </button>
    </div>
  );
};

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
