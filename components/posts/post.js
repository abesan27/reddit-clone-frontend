import Link from 'next/link';
import { Comment } from './comment';
import { useSession } from 'next-auth/client';
import { LikePost } from './likePost';

export const Post = ({ post, subreddit, hasLikedPost }) => {
  const [session, loading] = useSession();

  if (loading) return <div>Loading...</div>;

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
            posted by{' '}
            <Link href={`/u/${post.user.username}`}>
              <a>u/{post.user.username}</a>
            </Link>{' '}
            in{' '}
            <Link href={`/r/${subredditName}`}>
              <a>r/{subredditName}</a>
            </Link>
          </p>
        ) : !post.user ? (
          <p>{subredditName}</p>
        ) : (
          <p>{post.user.username}</p>
        )}
        {post.likes && <p>{post.likes.length} likes</p>}
      </div>
      {session && post.likes && (
        <LikePost post={post} hasLikedPost={hasLikedPost} />
      )}
      <div>
        {post.comments &&
          post.comments.map((comment) => <Comment comment={comment} />)}
      </div>
    </div>
  );
};
