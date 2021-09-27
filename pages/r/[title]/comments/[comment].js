import { gql, useQuery } from '@apollo/client';
import { signIn, useSession } from 'next-auth/client';
import { useGetComment } from '../../../../utils/useGetComment';
import { Post } from '../../../../components/posts/post';
import { CreateComment } from '../../../../components/posts/createComment';
import { useHasLikedPost } from '../../../../utils/useHasLikedPost';

const Comment = () => {
  const comment = parseInt(useGetComment());

  const [session, loading] = useSession();

  const {
    loading: loadingQuery,
    error,
    data,
  } = useQuery(COMMENT_QUERY, {
    variables: { id: comment },
  });

  if (loadingQuery || loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  const post = data.posts[0];
  if (!post) return <div>No such post found.</div>;

  // const hasUserLikedPost = ({ post }) => {
  //   let liked = false;
  //   let id;

  //   for (let i = 0; i < post.likes.length; i++) {
  //     if (session && session.user.name == post.likes[i].users.username) {
  //       liked = true;
  //       id = post.likes[i].id;
  //     }
  //   }

  //   return [liked, id];
  // };

  // const hasLikedPost =
  //   post.likes[0] &&
  //   session &&
  //   session.user.name == post.likes[0].users.username;

  // console.log(
  //   post.likes[0] &&
  //     session &&
  //     session.user.name == post.likes[0].users.username
  // );

  return (
    <div>
      <Post
        key={post.id}
        post={post}
        hasLikedPost={useHasLikedPost({ post, session })}
      />
      {!session && (
        <div>
          <button onClick={() => signIn()}>Sign in</button>
        </div>
      )}
      {session && (
        <div>
          <CreateComment postId={post.id} userId={session.id} />
        </div>
      )}
    </div>
  );
};

const COMMENT_QUERY = gql`
  query Posts($id: ID) {
    posts(where: { id: $id }) {
      id
      title
      description
      user {
        username
        id
      }
      likes {
        id
        users {
          username
        }
      }
      subreddit {
        name
      }
      comments {
        id
        content
        user {
          username
        }
      }
    }
  }
`;

export default Comment;
