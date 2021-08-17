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
      <div>
        <p>{post.description}</p>
        {post.user && post.subreddit ? (
          <p>
            posted by {post.user.username} in{' '}
            <Link href={`/r/${subredditName}`}>
              <a>r/{subredditName}</a>
            </Link>
          </p>
        ) : !post.user ? (
          <p>{subredditName}</p>
        ) : (
          <p>{post.user.username}</p>
        )}
        <p>{post.votes} likes</p>
      </div>
      <div>
        <button>upvote</button>
        <button>downvote</button>
      </div>
      <div>
        {post.comments &&
          post.comments.map((comment) => <Comment comment={comment} />)}
      </div>
    </div>
  );
};
