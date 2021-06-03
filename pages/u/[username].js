import { gql, useQuery } from '@apollo/client';
import { useGetUsername } from '../../utils/useGetUsername';
import { Post } from '../../components/posts/post';

const UserPage = () => {
  const username = useGetUsername();

  const { loading, error, data } = useQuery(USER_QUERY, {
    variables: { username: username },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  if (!data.users[0]) return <div>No such user found.</div>;

  const user = data.users[0];
  const { posts } = user;

  return (
    <div>
      <div>
        <h1>{user.username}</h1>
      </div>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

const USER_QUERY = gql`
  query Users($username: String) {
    users(where: { username: $username }) {
      username
      posts {
        id
        title
        description
        subreddit {
          name
        }
      }
    }
  }
`;

export default UserPage;
