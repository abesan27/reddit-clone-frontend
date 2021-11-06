import { useQuery } from '@apollo/client';
import { QUERY_NEWESY_SUBREDDITS } from '../../queries/query/queryNewestSubreddits';
import Link from 'next/link';

export const Newest = () => {
  const { loading, error, data } = useQuery(QUERY_NEWESY_SUBREDDITS, {
    variables: { limit: 5 },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  const { subreddits } = data;

  console.log(subreddits);

  return (
    <div>
      <div className="p-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-t-lg">
        <p className="pl-1 text-black font-semibold pt-5">NEWEST SUBREDDITS</p>
      </div>
      <div className="bg-gray-900 px-3 mb-4 rounded-b-lg shadow-2xl">
        <ol className="text-gray-300 divide-y divide-gray-600 divide-opacity-50">
          {subreddits.map((subreddit, index) => (
            <li key={index}>
              <div className="py-4 flex">
                <p className="pt-1 px-3">{index + 1}</p>
                {subreddit.icon ? (
                  <img
                    className="inline-block rounded-full"
                    src={`${process.env.NEXT_PUBLIC_API_URL}${subreddit.icon.url}`}
                    width="32"
                    height="32"
                  />
                ) : (
                  <img
                    className="inline-block rounded-full"
                    src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/defaulticon_0934e73c86.png`}
                    width="32"
                    height="32"
                  />
                )}
                <Link href={`/r/${subreddit.name}`}>
                  <a className="pt-1 pl-3 hover:underline">
                    r/{subreddit.name}
                  </a>
                </Link>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};
