import { useQuery } from '@apollo/client';
import { useSession } from 'next-auth/client';
import { useGetComment } from '../../../../utils/useGetComment';
import { Post } from '../../../../components/posts/post';
import { CreateComment } from '../../../../components/comments/createComment';
import { useHasLikedPost } from '../../../../utils/useHasLikedPost';
import { Navbar } from '../../../../components/shared/navbar';
import { QUERY_COMMENTS } from '../../../../queries/query/queryComments';

const Comment = () => {
  const comment = parseInt(useGetComment());

  const [session, loading] = useSession();

  const {
    loading: loadingQuery,
    error,
    data,
  } = useQuery(QUERY_COMMENTS, {
    variables: { id: comment },
  });

  if (loadingQuery || loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  const post = data.posts[0];
  if (!post) return <div>No such post found.</div>;

  return (
    <div>
      <Navbar session={session} />
      <Post
        key={post.id}
        post={post}
        hasLikedPost={useHasLikedPost({ post, session })}
      />
      {session && (
        <div>
          <CreateComment postId={post.id} userId={session.id} />
        </div>
      )}
    </div>
  );
};

export default Comment;
