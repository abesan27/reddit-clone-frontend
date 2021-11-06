import Link from 'next/link';
import { FireIcon, ChartBarIcon, ClockIcon } from '@heroicons/react/solid';

export const SortBar = () => {
  return (
    <div className="bg-gray-900 p-2 mb-4 rounded-lg shadow-2xl text-gray-200 font-semibold">
      <div className="pl-1 flex justify-start">
        <Link href="#">
          <a className="flex rounded-full py-1.5 px-3 mr-2 hover:bg-gray-700">
            <FireIcon className="h-5 w-5 mr-1.5 mt-0.5" />
            Hot
          </a>
        </Link>
        <Link href="#">
          <a className="flex rounded-full py-1.5 px-3 mr-2 hover:bg-gray-700">
            <ClockIcon className="h-5 w-5 mr-1.5 mt-0.5" />
            New
          </a>
        </Link>
        <Link href="#">
          <a className="flex rounded-full py-1.5 px-3 hover:bg-gray-700">
            <ChartBarIcon className="h-5 w-5 mr-1.5 mt-0.5" />
            Top
          </a>
        </Link>
      </div>
    </div>
  );
};
