import { useQuery } from '@apollo/client';
import { useSession } from 'next-auth/client';
import { useGetTitle } from '../../../utils/useGetTitle';
import { useCheckUsername } from '../../../utils/useCheckUsername';
import { Post } from '../../../components/posts/post';
import { JoinSubreddit } from '../../../components/subreddits/joinSubreddit';
import { LeaveSubreddit } from '../../../components/subreddits/leaveSubreddit';
import { useRouter } from 'next/router';
import { useHasLikedPost } from '../../../utils/useHasLikedPost';
import { Navbar } from '../../../components/shared/navbar';
import { useRandomizePosts } from '../../../utils/useRandomizePosts';
import { QUERY_SUBREDDIT } from '../../../queries/query/querySubreddit';

const SubredditPage = () => {
  const title = useGetTitle();
  const router = useRouter();
  let isMember,
    isAdmin = false;

  const [session, loading] = useSession();

  const {
    loading: subredditLoading,
    error: subredditError,
    data: subredditData,
  } = useQuery(QUERY_SUBREDDIT, {
    variables: { name: title },
  });

  if (subredditLoading || loading) return <div>Loading...</div>;
  if (subredditError) return <div>Error</div>;

  if (!subredditData.subreddits[0]) return <div>No such subreddit found.</div>;

  const subreddit = subredditData.subreddits[0];
  const { posts, users, admins } = subreddit;

  if (session && users && admins) {
    const username = session.user.name;

    const checkIfMember = useCheckUsername({ list: users, username });
    const checkIfAdmin = useCheckUsername({ list: admins, username });

    isMember = checkIfMember;
    isAdmin = checkIfAdmin;
  }

  let postList = [...posts];
  const randomizedPostList = RandomizePosts({ postList });

  return (
    <div>
      <Navbar session={session} />
      <div>
        {subreddit.icon ? (
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL}${subreddit.icon.url}`}
            height={80}
            widht={80}
          />
        ) : (
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/defaulticon_0934e73c86.png`}
            height={80}
            widht={80}
          />
        )}

        <h1>{subreddit.name}</h1>
        <h3>{subreddit.description}</h3>
        <div>
          <p>{subreddit.posts.length} posts</p>
          <p>{subreddit.users.length} users</p>
        </div>
      </div>
      {session && (
        <div>
          {isAdmin ? null : isMember ? (
            <LeaveSubreddit
              subredditId={subreddit.id}
              users={subreddit.users}
              currentUserId={session.id}
            />
          ) : (
            <JoinSubreddit
              subredditId={subreddit.id}
              users={subreddit.users}
              currentUserId={session.id}
            />
          )}
          <p>Logged in as: {session.user.name}</p>
          <button onClick={() => router.push('/submit')}>create post</button>
        </div>
      )}
      {randomizedPostList.map((post) => (
        <Post
          key={post.id}
          post={post}
          subreddit={title}
          hasLikedPost={useHasLikedPost({ post, session })}
        />
      ))}
    </div>
  );
};

const RandomizePosts = ({ postList }) => {
  return useRandomizePosts({ postList });
};

export default SubredditPage;
