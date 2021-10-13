import { useQuery } from '@apollo/client';
import { useSession } from 'next-auth/client';
import { Post } from '../components/posts/post';
import { Navbar } from '../components/shared/navbar';
import { CreateSubreddit } from '../components/subreddits/createSubreddit';
import { useHasLikedPost } from '../utils/useHasLikedPost';
import { useRandomizePosts } from '../utils/useRandomizePosts';
import { QUERY_DEFAULT_POSTS } from '../queries/query/queryDefaultPosts';
import { QUERY_AUTH_POSTS } from '../queries/query/queryAuthPosts';

const Index = ({}) => {
  const [session, loading] = useSession();

  const [loadingQuery, error, data] = GetQuery({ session });

  if (loadingQuery || loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  const { posts } = data;

  const randomizedAuthPostList = GetPostsFromQuery({
    loadingQuery,
    session,
    data,
  });

  const randomizedPostList = RandomizePosts({ session, posts });

  return (
    <>
      <div>
        <Navbar session={session} />
        {session && <CreateSubreddit session={session} />}
        <div>
          {session
            ? randomizedAuthPostList.map((post) => (
                <Post
                  key={post.id}
                  post={post}
                  hasLikedPost={useHasLikedPost({ post, session })}
                />
              ))
            : randomizedPostList.map((post) => (
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

const GetQuery = ({ session }) => {
  let loadingQuery, error, data;

  if (session) {
    ({
      loading: loadingQuery,
      error,
      data,
    } = useQuery(QUERY_AUTH_POSTS, {
      variables: { username: session.user.name },
    }));
  } else {
    ({ loading: loadingQuery, error, data } = useQuery(QUERY_DEFAULT_POSTS));
  }

  return [loadingQuery, error, data];
};

const GetPostsFromQuery = ({ loadingQuery, session, data }) => {
  let postList = [];

  if (!loadingQuery && session) {
    for (let i = 0; i < data.users[0].subreddits.length; i++) {
      for (let j = 0; j < data.users[0].subreddits[i].posts.length; j++) {
        postList.push(data.users[0].subreddits[i].posts[j]);
      }
    }
  }

  return useRandomizePosts({ postList });
};

const RandomizePosts = ({ session, posts }) => {
  if (!session) {
    let postList = [...posts];
    return useRandomizePosts({ postList });
  }
};

export default Index;
