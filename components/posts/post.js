import Link from 'next/link';

export const Post = ({ post }) => {
  return (
    <div>
      <Link href={`/r/programming/comments/${post.id}`}>
        <h3>{post.title}</h3>
      </Link>
      <p>{post.description}</p>
      {post.account && post.subreddit ? (
        <p>
          posted by {post.account.username} in r/{post.subreddit.name}
        </p>
      ) : !post.account ? (
        <p>{post.subreddit.name}</p>
      ) : (
        <p>{post.account.username}</p>
      )}
      <p>{post.votes} likes</p>

      {post.comments &&
        post.comments.map((comment) => (
          <div key={comment.id}>
            <p>
              {comment.content} - {comment.account.username}
            </p>
          </div>
        ))}
    </div>
  );
};
