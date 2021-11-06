export const About = ({ subreddit }) => {
  return (
    <div className="bg-gray-900  p-3 mb-4 rounded-lg shadow-2xl">
      <div className="flex mb-3">
        {subreddit.icon ? (
          <img
            className="inline-block rounded-full"
            src={`${process.env.NEXT_PUBLIC_API_URL}${subreddit.icon.url}`}
            width="55"
            height="55"
          />
        ) : (
          <img
            className="inline-block rounded-full"
            src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/defaulticon_0934e73c86.png`}
            width="55"
            height="55"
          />
        )}
        <h1 className="text-xl pl-3 pt-3 text-gray-200 font-semibold">
          r/{subreddit.name}
        </h1>
      </div>
      <div className="mb-2">
        <p className="text-gray-300">{subreddit.description}</p>
      </div>
      <div className="grid grid-cols-2 text-gray-300 mt-8">
        <div className="text-sm">
          <p className="text-xl font-semibold">{subreddit.users.length}</p>
          <p>Members</p>
        </div>
        <div className="text-sm">
          <p className="text-xl font-semibold">{subreddit.posts.length}</p>
          <p>Posts</p>
        </div>
      </div>
    </div>
  );
};
