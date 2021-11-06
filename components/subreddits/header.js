import Link from 'next/link';

export const Header = ({ subreddit }) => {
  return (
    <>
      <div className="bg-blue-600  h-20 shadow-2xl"></div>
      <div className="bg-gray-900 h-24 shadow-2xl">
        <div className="grid grid-cols-1 mx-auto w-3/6">
          <div className="flex justify-start mt-4">
            {subreddit.icon ? (
              <img
                className="inline-block rounded-full"
                src={`${process.env.NEXT_PUBLIC_API_URL}${subreddit.icon.url}`}
                width="64"
                height="64"
              />
            ) : (
              <img
                className="inline-block rounded-full"
                src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/defaulticon_0934e73c86.png`}
                width="64"
                height="64"
              />
            )}
            <ul className="pl-2">
              <li className="flex">
                <h1 className="text-2xl text-gray-200 font-semibold">
                  {subreddit.name}
                </h1>
                <Link href="/">
                  <a className="bg-gray-200 hover:bg-gray-300 rounded-full ml-20 mt-1.5 px-5 font-semibold">
                    Join
                  </a>
                </Link>
              </li>
              <li>
                <h2 className="text-gray-400">r/{subreddit.name}</h2>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
