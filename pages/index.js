import { gql, useQuery } from '@apollo/client';
import { useSession } from 'next-auth/client';
import { Post } from '../components/posts/post';
import { Navbar } from '../components/shared/navbar';
import { CreateSubreddit } from '../components/posts/createSubreddit';

const Index = ({}) => {
  const [session, loading] = useSession();

  const { loading: loadingQuery, error, data } = useQuery(POSTS_QUERY);

  if (loadingQuery || loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  const { posts } = data;

  return (
    <>
      <div>
        <Navbar session={session} />
        {session && <CreateSubreddit session={session} />}
        <div>
          <h1>Reddit</h1>
          {posts.map((post) => (
            <Post
              key={post.id}
              post={post}
              hasLikedPost={
                post.likes[0] &&
                session &&
                session.user.name == post.likes[0].users.username
              }
            />
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
      user {
        username
        id
      }
      subreddit {
        name
      }
      likes {
        id
        users {
          username
        }
      }
    }
  }
`;

// export const getServerSideProps = async ({ req }) => {
//   const session = await getSession({ req });
//   return {
//     props: {
//       session,
//     },
//   };
// };

export default Index;
