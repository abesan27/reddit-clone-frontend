import { signIn, signOut, useSession } from 'next-auth/client';
import { gql, useQuery } from '@apollo/client';
import { Post } from '../components/posts/post';
import { Navbar } from '../components/shared/navbar';

const Index = () => {
  const [session, loading] = useSession();

  const { loading: loadingQuery, error, data } = useQuery(POSTS_QUERY);

  if (loadingQuery || loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  const { posts } = data;

  return (
    <>
      {!session && (
        <div>
          <button onClick={() => signIn()}>Sign in</button>
        </div>
      )}
      {session && (
        <div>
          <Navbar />
          <button onClick={() => signOut()}>Sign out</button>
          <p>Logged in as: {session.user.email}</p>
          <div>
            <h1>Reddit</h1>
            {posts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

const POSTS_QUERY = gql`
  query {
    posts {
      id
      title
      description
      votes
      user {
        username
      }
      subreddit {
        name
      }
    }
  }
`;

export default Index;
