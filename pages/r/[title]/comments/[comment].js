import { useQuery } from '@apollo/client';
import { useSession } from 'next-auth/client';
import { useGetComment } from '../../../../utils/useGetComment';
import { Post } from '../../../../components/posts/post';
import { CreateComment } from '../../../../components/comments/createComment';
import { useHasLikedPost } from '../../../../utils/useHasLikedPost';
import { Navbar } from '../../../../components/shared/navbar';
import { QUERY_COMMENTS } from '../../../../queries/query/queryComments';
import { Footer } from '../../../../components/shared/footer';
import { About } from '../../../../components/subreddits/about';

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
      <div className="bg-gray-800 h-screen">
        <div className="grid grid-cols-3 py-20 mx-auto gap-4 w-3/6">
          <div className="col-span-2">
            <Post
              key={post.id}
              post={post}
              hasLikedPost={useHasLikedPost({ post, session })}
            />
          </div>
          <div>
            <About subreddit={data.posts[0].subreddit} />
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
