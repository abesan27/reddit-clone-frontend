import { useMutation } from '@apollo/client';
import { REFETCH_SUBREDDIT } from '../../queries/refetch/refetchSubreddit';
import { CREATE_SUBREDDIT } from '../../queries/create/createSubreddit';
import router from 'next/router';

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
            refetchQueries: [{ query: REFETCH_SUBREDDIT }],
          });

          router.push(`r/${name.value}`);
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
