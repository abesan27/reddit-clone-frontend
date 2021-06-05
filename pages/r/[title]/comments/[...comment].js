import { gql, useQuery } from '@apollo/client';
import { useGetComment } from '../../../../utils/useGetComment';
import { Post } from '../../../../components/posts/post';

const Comment = () => {
  const comment = parseInt(useGetComment());

  const { loading, error, data } = useQuery(COMMENT_QUERY, {
    variables: { id: comment },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  const post = data.posts[0];
  if (!post) return <div>No such post found.</div>;

  return (
    <div>
      <Post key={post.id} post={post} />
    </div>
  );
};

const COMMENT_QUERY = gql`
  query Posts($id: ID!) {
    posts(where: { id: $id }) {
      id
      title
      description
      votes
      user {
        username
      }
      subreddit {
        name
      }
    }
  }
`;

export default Comment;
