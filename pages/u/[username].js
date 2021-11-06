import { useQuery } from '@apollo/client';
import { useGetUsername } from '../../utils/useGetUsername';
import { Post } from '../../components/posts/post';
import { useHasLikedPost } from '../../utils/useHasLikedPost';
import { useSession } from 'next-auth/client';
import { Navbar } from '../../components/shared/navbar';
import { useRandomizePosts } from '../../utils/useRandomizePosts';
import { QUERY_USER_POSTS } from '../../queries/query/queryUserPosts';
import { SortBar } from '../../components/shared/sortBar';
import { Footer } from '../../components/shared/footer';
import { UserInfo } from '../../components/shared/userInfo';

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
      <div className="bg-gray-800 h-full">
        <div className="grid grid-cols-3 py-20 mx-auto gap-4 w-3/6">
          <div className="col-span-2">
            <SortBar />
            {randomizedPostList.map((post) => (
              <Post
                key={post.id}
                post={post}
                hasLikedPost={useHasLikedPost({ post, session })}
              />
            ))}
          </div>
          <div>
            <UserInfo user={user} />
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

const RandomizePosts = ({ postList }) => {
  return useRandomizePosts({ postList });
};

export default UserPage;
