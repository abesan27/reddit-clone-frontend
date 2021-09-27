import { gql, useQuery } from '@apollo/client';
import { useSession } from 'next-auth/client';
import { useGetTitle } from '../../../utils/useGetTitle';
import { useCheckUsername } from '../../../utils/useCheckUsername';
import { Post } from '../../../components/posts/post';
import { JoinSubreddit } from '../../../components/shared/joinSubreddit';
import { LeaveSubreddit } from '../../../components/shared/leaveSubreddit';
import { useRouter } from 'next/router';

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
  } = useQuery(SUBREDDIT_QUERY, {
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

  return (
    <div>
      <div>
        <img
          src={`${process.env.NEXT_PUBLIC_API_URL}${subreddit.icon.url}`}
          height={60}
          widht={60}
        />
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
      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          subreddit={title}
          hasLikedPost={
            post.likes[0] &&
            session &&
            session.user.name == post.likes[0].users.username
          }
        />
      ))}
    </div>
  );
};

const SUBREDDIT_QUERY = gql`
  query Subreddits($name: String!) {
    subreddits(where: { name: $name }) {
      id
      name
      description
      admins {
        username
      }
      users {
        id
        username
      }
      posts {
        user {
          username
          id
        }
        title
        description
        id
        likes {
          id
          users {
            username
          }
        }
      }
      icon {
        url
      }
    }
  }
`;

export default SubredditPage;
