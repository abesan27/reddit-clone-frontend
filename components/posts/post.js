import Link from 'next/link';

export const Post = ({ post }) => {
  return (
    <div>
      <Link href={`/r/programming/comments/${post.id}`}>
        <h3>{post.title}</h3>
      </Link>
      <p>{post.description}</p>
      {post.user && post.subreddit ? (
        <p>
          posted by {post.user.username} in r/{post.subreddit.name}
        </p>
      ) : !post.user ? (
        <p>{post.subreddit.name}</p>
      ) : (
        <p>{post.user.username}</p>
      )}
      <p>{post.votes} likes</p>

      {post.comments &&
        post.comments.map((comment) => (
          <div key={comment.id}>
            <p>
              {comment.content} - {comment.user.username}
            </p>
          </div>
        ))}
    </div>
  );
};
