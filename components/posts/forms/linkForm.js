import { useRouter } from 'next/router';

export const LinkForm = ({ mutation, userId, selectedSubreddit, disabled }) => {
  const router = useRouter();

  let title;
  let url;

  console.log(selectedSubreddit, disabled);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutation({
            variables: {
              title: title.value,
              url: url.value,
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
            placeholder="url"
            ref={(node) => {
              url = node;
            }}
          />
        </div>
        <button disabled={disabled} type="submit">
          create post
        </button>
      </form>
    </div>
  );
};
