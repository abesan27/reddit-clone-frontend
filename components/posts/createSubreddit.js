import { gql, useMutation } from '@apollo/client';

export const CreateSubreddit = () => {
  let name;
  let description;

  return (
    <div>
      <form>
        <div>
          <input
            required
            ref={(node) => {
              name = node;
            }}
          />
        </div>
        <div>
          <input
            required
            ref={(node) => {
              description = node;
            }}
          />
        </div>
        <div>
          <label>Choose an icon: </label>
          <input required type="file" accept=".jpeg, .png" />
        </div>
        <button type="submit">Add Subreddit</button>
      </form>
    </div>
  );
};
