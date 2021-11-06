import Link from 'next/link';
import { Comment } from '../comments/comment';
import { useSession } from 'next-auth/client';
import { LikePost, VoteButtons } from './voteButtons';
import { ExternalLinkIcon } from '@heroicons/react/solid';
import { ViewComments } from './viewComments';

export const Post = ({ post, subreddit, hasLikedPost }) => {
  const [session, loading] = useSession();

  if (loading) return <div>Loading...</div>;

  let subredditName;

  {
    subreddit
      ? (subredditName = subreddit)
      : (subredditName = post.subreddit.name);
  }

  const [liked, id] = hasLikedPost;

  return (
    <div className="bg-gray-900 p-3 mb-4 rounded-lg shadow-2xl">
      <div className="grid grid-cols-2">
        <div className="flex justify-start">
          {post.subreddit.icon ? (
            <img
              className="inline-block rounded-full"
              src={`${process.env.NEXT_PUBLIC_API_URL}${post.subreddit.icon.url}`}
              width="32"
              height="32"
            />
          ) : (
            <img
              className="inline-block rounded-full"
              src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/defaulticon_0934e73c86.png`}
              width="32"
              height="32"
            />
          )}

          <div className="flex text-xs pl-2 pt-1.5">
            <Link href={`/r/${subredditName}`}>
              <a className="font-medium text-gray-300 hover:underline">
                r/{subredditName}
              </a>
            </Link>
            {post.user && (
              <div className="flex">
                <p className="text-gray-400 ml-1 mr-1">• Posted by </p>
                <Link href={`/u/${post.user.username}`}>
                  <a className="text-gray-400 hover:underline">
                    u/{post.user.username}
                  </a>
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-end">
          <Link href="#">
            <a className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-300 hover:to-pink-400 rounded-full mt-1 py-0.5 px-2 pl-1.5 h-7 text-black font-medium">
              + Join
            </a>
          </Link>
        </div>
      </div>

      <div className="pt-3">
        <Link href={`/r/${subredditName}/comments/${post.id}`}>
          <a className="overflow-hidden text-gray-200 font-semibold hover:underline">
            {post.title}
          </a>
        </Link>

        {post.text ? (
          <p className="text-gray-300 pt-1">{post.text}</p>
        ) : (
          <div>
            <Link href={post.url}>
              <a className="text-blue-300 hover:underline flex pt-1">
                {post.url}{' '}
                <ExternalLinkIcon className="pl-0.5 h-5 w-5 mr-1.5 mt-0.5" />
              </a>
            </Link>
          </div>
        )}
      </div>

      <div className="flex">
        {session && post.likes && (
          <VoteButtons
            post={post}
            liked={liked}
            totalLikes={post.likes.length}
            likedPostId={id}
            currentUserId={session.id}
          />
        )}

        <ViewComments subredditName={subredditName} postId={post.id} />

        {/* <CommentsButton /> */}
        {post.comments &&
          post.comments.map((comment) => <Comment comment={comment} />)}
      </div>
    </div>
  );
};
