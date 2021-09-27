export const useHasLikedPost = ({ post, session }) => {
  let liked = false;
  let id;

  for (let i = 0; i < post.likes.length; i++) {
    if (session && session.user.name == post.likes[i].users.username) {
      liked = true;
      id = post.likes[i].id;
    }
  }

  return [liked, id];
};
