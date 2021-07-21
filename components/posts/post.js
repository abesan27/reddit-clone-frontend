import Link from 'next/link';
import { Comment } from './comment';

export const Post = ({ post, subreddit }) => {
  let subredditName;

  {
    subreddit
      ? (subredditName = subreddit)
      : (subredditName = post.subreddit.name);
  }

  return (
    <div>
      <Link href={`/r/${subredditName}/comments/${post.id}`}>
        <a>{post.title}</a>
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
        post.comments.map((comment) => <Comment comment={comment} />)}
    </div>
  );
};
