import { gql, useQuery } from '@apollo/client';
import { useSession } from 'next-auth/client';
import { useGetTitle } from '../../../utils/useGetTitle';
import { Post } from '../../../components/posts/post';
import { CreatePost } from '../../../components/posts/createPost';

const SubredditPage = () => {
  const title = useGetTitle();

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
  const { posts } = subreddit;

  return (
    <div>
      <div>
        <h1>{subreddit.name}</h1>
        <h3>{subreddit.description}</h3>
        <p>{subreddit.posts.length} posts</p>
      </div>
      {session && (
        <div>
          <p>Logged in as: {session.user.name}</p>
          <CreatePost userId={session.id} subredditId={subreddit.id} />
        </div>
      )}
      {posts.map((post) => (
        <Post key={post.id} post={post} subreddit={title} />
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
      posts {
        user {
          username
        }
        title
        description
        id
        votes
      }
    }
  }
`;

export default SubredditPage;
