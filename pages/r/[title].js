import { gql, useQuery } from '@apollo/client';
import { useGetTitle } from '../../utils/useGetTitle';
import { Post } from '../../components/posts/post';

const SubredditPage = () => {
  const title = useGetTitle();

  const { loading, error, data } = useQuery(SUBREDDIT_QUERY, {
    variables: { name: title },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  if (!data.subreddits[0]) return <div>No such subreddit found.</div>;

  const subreddit = data.subreddits[0];
  const { posts } = subreddit;

  return (
    <div>
      <div>
        <h1>{subreddit.name}</h1>
        <h3>{subreddit.description}</h3>
        <p>{subreddit.posts.length}</p>
      </div>
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
        user {
          username
        }
        title
        description
        id
      }
    }
  }
`;

export default SubredditPage;
