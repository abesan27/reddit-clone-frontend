import { gql, useQuery } from '@apollo/client';
import { getSession } from 'next-auth/client';
import { Post } from '../components/posts/post';
import { Navbar } from '../components/shared/navbar';
import { CreateSubreddit } from '../components/posts/createSubreddit';

const Index = ({ session }) => {
  const { loading: loadingQuery, error, data } = useQuery(POSTS_QUERY);

  if (loadingQuery) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  const { posts } = data;

  return (
    <>
      <div>
        <Navbar session={session} />
        <CreateSubreddit />
        <div>
          <h1>Reddit</h1>
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </div>
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

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  return {
    props: {
      session,
    },
  };
};

export default Index;
