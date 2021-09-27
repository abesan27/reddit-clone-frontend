import { gql, useQuery } from '@apollo/client';
import { useGetUsername } from '../../utils/useGetUsername';
import { Post } from '../../components/posts/post';
import { useHasLikedPost } from '../../utils/useHasLikedPost';
import { useSession } from 'next-auth/client';

const UserPage = () => {
  const [session, loading] = useSession();

  const username = useGetUsername();

  const {
    loading: loadingQuery,
    error,
    data,
  } = useQuery(USER_QUERY, {
    variables: { username: username },
  });

  if (loading || loadingQuery) return <div>Loading...</div>;
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
        <Post
          key={post.id}
          post={post}
          hasLikedPost={useHasLikedPost({ post, session })}
        />
      ))}
    </div>
  );
};

const USER_QUERY = gql`
  query Accounts($username: String) {
    users(where: { username: $username }) {
      username
      id
      posts {
        id
        title
        description
        likes {
          id
          users {
            username
          }
        }
        subreddit {
          name
        }
      }
    }
  }
`;

export default UserPage;
