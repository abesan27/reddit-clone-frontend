import { gql, useQuery } from '@apollo/client';
import { signIn, useSession } from 'next-auth/client';
import { useGetTitle } from '../../../utils/useGetTitle';
import { Post } from '../../../components/posts/post';
import { CreatePost } from '../../../components/posts/createPost';

const SubredditPage = () => {
  const title = useGetTitle();

  const [session, loading] = useSession();

  const {
    loading: loadingQuery,
    error,
    data,
  } = useQuery(SUBREDDIT_QUERY, {
    variables: { name: title },
  });

  if (loadingQuery || loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  if (!data.subreddits[0]) return <div>No such subreddit found.</div>;

  const subreddit = data.subreddits[0];
  const { posts } = subreddit;

  return (
    <div>
      <div>
        <h1>{subreddit.name}</h1>
        <h3>{subreddit.description}</h3>
        <p>{subreddit.posts.length} posts</p>
      </div>
      {!session && (
        <div>
          <button onClick={() => signIn()}>Sign in</button>
        </div>
      )}
      {session && (
        <div>
          <p>Logged in as: {session.user.email}</p>
          <CreatePost />
        </div>
      )}
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

const SUBREDDIT_QUERY = gql`
  query Subreddits($name: String) {
    subreddits(where: { name: $name }) {
      name
      description
      posts {
        account {
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
