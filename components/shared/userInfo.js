export const UserInfo = ({ user }) => {
  return (
    <div className="bg-gray-900 p-3 mb-3 rounded-lg shadow-2xl">
      <div>
        {user.pfp ? (
          <img
            className="inline-block rounded-full"
            src={`${process.env.NEXT_PUBLIC_API_URL}${user.pfp.url}`}
            width={55}
            height={55}
          />
        ) : (
          <img
            className="inline-block rounded-full"
            src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/snoo_783cb16771.png`}
            width={55}
            height={55}
          />
        )}
        <h1 className="text-2xl mt-1 text-gray-200 font-semibold">
          {user.username}
        </h1>
        <p className="text-gray-400">u/{user.username}</p>
      </div>
    </div>
  );
};
