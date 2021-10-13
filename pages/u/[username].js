import { useQuery } from '@apollo/client';
import { useGetUsername } from '../../utils/useGetUsername';
import { Post } from '../../components/posts/post';
import { useHasLikedPost } from '../../utils/useHasLikedPost';
import { useSession } from 'next-auth/client';
import { Navbar } from '../../components/shared/navbar';
import { useRandomizePosts } from '../../utils/useRandomizePosts';
import { QUERY_USER_POSTS } from '../../queries/query/queryUserPosts';

const UserPage = () => {
  const [session, loading] = useSession();

  const username = useGetUsername();

  const {
    loading: loadingQuery,
    error,
    data,
  } = useQuery(QUERY_USER_POSTS, {
    variables: { username: username },
  });

  if (loading || loadingQuery) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  if (!data.users[0]) return <div>No such user found.</div>;

  const user = data.users[0];
  const { posts } = user;

  let postList = [...posts];
  const randomizedPostList = RandomizePosts({ postList });

  return (
    <div>
      <Navbar session={session} />
      {user.pfp ? (
        <img
          src={`${process.env.NEXT_PUBLIC_API_URL}${user.pfp.url}`}
          height={80}
          widht={80}
        />
      ) : (
        <img
          src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/snoo_783cb16771.png`}
          height={80}
          widht={80}
        />
      )}
      <div>
        <h1>{user.username}</h1>
      </div>
      {randomizedPostList.map((post) => (
        <Post
          key={post.id}
          post={post}
          hasLikedPost={useHasLikedPost({ post, session })}
        />
      ))}
    </div>
  );
};

const RandomizePosts = ({ postList }) => {
  return useRandomizePosts({ postList });
};

export default UserPage;
