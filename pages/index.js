import { gql, useQuery } from '@apollo/client';
import { useSession } from 'next-auth/client';
import { Post } from '../components/posts/post';
import { Navbar } from '../components/shared/navbar';
import { CreateSubreddit } from '../components/posts/createSubreddit';
import { useHasLikedPost } from '../utils/useHasLikedPost';

const Index = ({}) => {
  const [session, loading] = useSession();

  const { loading: loadingQuery, error, data } = useQuery(POSTS_QUERY);

  if (loadingQuery || loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  const { posts } = data;

  // const hasUserLikedPost = ({ post }) => {
  //   let liked = false;
  //   let id;

  //   for (let i = 0; i < post.likes.length; i++) {
  //     if (session && session.user.name == post.likes[i].users.username) {
  //       liked = true;
  //       id = post.likes[i].id;
  //     }
  //   }

  //   return [liked, id];
  // };

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
              hasLikedPost={useHasLikedPost({ post, session })}
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
