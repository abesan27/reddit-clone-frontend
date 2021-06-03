export const Post = ({ post }) => {
  return (
    <div>
      <h3>{post.title}</h3>
      <p>{post.description}</p>
      {post.user && post.subreddit ? (
        ((<p>{post.user.username}</p>), (<p>{post.subreddit.name}</p>))
      ) : !post.user ? (
        <p>{post.subreddit.name}</p>
      ) : (
        <p>{post.user.username}</p>
      )}
    </div>
  );
};
