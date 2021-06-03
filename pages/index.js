import { gql, useQuery } from '@apollo/client';
import { Post } from '../components/posts/post';
import { Navbar } from '../components/shared/navbar';

const Index = () => {
  const { loading, error, data } = useQuery(POSTS_QUERY);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  const { posts } = data;

  return (
    <div>
      <Navbar />
      <div>
        <h1>Reddit</h1>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
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
      }
      subreddit {
        name
      }
    }
  }
`;

export default Index;
