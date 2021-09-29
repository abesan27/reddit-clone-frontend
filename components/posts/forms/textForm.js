import { useRouter } from 'next/router';

export const TextForm = ({ mutation, userId, selectedSubreddit }) => {
  const router = useRouter();

  let title;
  let text;

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutation({
            variables: {
              title: title.value,
              text: text.value,
              user: userId,
              subreddit: selectedSubreddit,
            },
          });

          router.push('/');
        }}>
        <div>
          <input
            required
            placeholder="title"
            ref={(node) => {
              title = node;
            }}
          />
          <input
            required
            placeholder="text"
            ref={(node) => {
              text = node;
            }}
          />
        </div>
        <button type="submit">create post</button>
      </form>
    </div>
  );
};
