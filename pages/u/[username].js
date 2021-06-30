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

  if (!data.accounts[0]) return <div>No such user found.</div>;

  const account = data.accounts[0];
  const { posts } = account;

  return (
    <div>
      <div>
        <h1>{account.username}</h1>
      </div>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

const USER_QUERY = gql`
  query Accounts($username: String) {
    accounts(where: { username: $username }) {
      username
      posts {
        id
        title
        description
        votes
        subreddit {
          name
        }
      }
    }
  }
`;

export default UserPage;
