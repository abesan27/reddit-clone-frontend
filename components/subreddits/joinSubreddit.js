import { useMutation } from '@apollo/client';
import { REFETCH_SUBREDDIT } from '../../queries/refetch/refetchSubreddit';
import { UPDATE_SUBREDDIT } from '../../queries/update/updateSubreddit';

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
            refetchQueries: [{ query: REFETCH_SUBREDDIT }],
          });
        }}
        type="submit">
        join subreddit
      </button>
    </div>
  );
};
