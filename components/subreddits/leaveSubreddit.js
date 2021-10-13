import { useMutation } from '@apollo/client';
import { REFETCH_SUBREDDIT } from '../../queries/refetch/refetchSubreddit';
import { UPDATE_SUBREDDIT } from '../../queries/update/updateSubreddit';

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
            refetchQueries: [{ query: REFETCH_SUBREDDIT }],
          });
        }}
        type="submit">
        leave subreddit
      </button>
    </div>
  );
};
