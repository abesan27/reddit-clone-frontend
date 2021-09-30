import { gql, useQuery } from '@apollo/client';
import { useSession } from 'next-auth/client';
import { Post } from '../components/posts/post';
import { Navbar } from '../components/shared/navbar';
import { CreateSubreddit } from '../components/subreddits/createSubreddit';
import { useHasLikedPost } from '../utils/useHasLikedPost';

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
      text
      url
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

export default Index;
