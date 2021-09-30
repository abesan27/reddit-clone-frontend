export const Comment = ({ comment }) => {
  return (
    <div key={comment.id}>
      <p>
        {comment.content} -- {comment.user.username}
      </p>
    </div>
  );
};
