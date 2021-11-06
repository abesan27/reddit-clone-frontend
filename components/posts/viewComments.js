import Link from 'next/link';
import { ChatAltIcon } from '@heroicons/react/solid';

export const ViewComments = ({ subredditName, postId }) => {
  return (
    <div className="mt-4 flex justify-start text-gray-400">
      <Link href={`/r/${subredditName}/comments/${postId}`}>
        <a className="flex rounded-md py-0.5 px-1.5 hover:bg-gray-700">
          <ChatAltIcon className="h-5 w-5 mr-1.5 mt-0.5" />
          <span className="text-sm pt-0.5 font-semibold">Comments</span>
        </a>
      </Link>
    </div>
  );
};
