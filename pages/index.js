import { gql, useQuery } from '@apollo/client';
import { useSession } from 'next-auth/client';
import { Post } from '../components/posts/post';
import { Navbar } from '../components/shared/navbar';
import { CreateSubreddit } from '../components/subreddits/createSubreddit';
import { useHasLikedPost } from '../utils/useHasLikedPost';

const Index = ({}) => {
  const [session, loading] = useSession();

  const [loadingQuery, error, data] = GetQuery({ session });

  if (loadingQuery || loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  const { posts } = data;

  const postList = GetPostsFromQuery({ loadingQuery, session, data });

  return (
    <>
      <div>
        <Navbar session={session} />
        {session && <CreateSubreddit session={session} />}
        <div>
          {session
            ? postList.map((post) => (
                <Post
                  key={post.id}
                  post={post}
                  hasLikedPost={useHasLikedPost({ post, session })}
                />
              ))
            : posts.map((post) => (
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
    } = useQuery(AUTHENTICATED_POSTS_QUERY, {
      variables: { username: session.user.name },
    }));
  } else {
    ({ loading: loadingQuery, error, data } = useQuery(DEFAULT_POSTS_QUERY));
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

    let currentIndex = postList.length,
      randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [postList[currentIndex], postList[randomIndex]] = [
        postList[randomIndex],
        postList[currentIndex],
      ];
    }
  }

  return postList;
};

const DEFAULT_POSTS_QUERY = gql`
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

const AUTHENTICATED_POSTS_QUERY = gql`
  query Accounts($username: String) {
    users(where: { username: $username }) {
      username
      id
      subreddits {
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
    }
  }
`;

export default Index;
