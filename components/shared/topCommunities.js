import Image from 'next/image';

export const TopCommunities = () => {
  return (
    <div>
      <div className="p-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-t-lg">
        <p className="pl-1 text-black font-semibold pt-5">TOP COMMUNITIES</p>
      </div>
      <div className="bg-gray-900 p-3 mb-4 rounded-b-lg shadow-2xl">
        <ol className="text-gray-300 divide-y divide-gray-600 divide-opacity-50">
          <li>
            <a href="#" className="pb-3 flex">
              <p className="pt-1 px-3">1</p>
              <Image
                className="inline-block rounded-full"
                src="/defaultAvatar.png"
                width="32"
                height="32"
              />
              <p className="pt-1 pl-3">r/gaming</p>
            </a>
          </li>
          <li>
            <a href="#" className="py-3 flex">
              <p className="pt-1 px-3">2</p>
              <Image
                className="inline-block rounded-full"
                src="/defaultAvatar.png"
                width="32"
                height="32"
              />
              <p className="pt-1 pl-3">r/formula1</p>
            </a>
          </li>
          <li>
            <a href="#" className="py-3 flex">
              <p className="pt-1 px-3">3</p>
              <Image
                className="inline-block rounded-full"
                src="/defaultAvatar.png"
                width="32"
                height="32"
              />
              <p className="pt-1 pl-3">r/programming</p>
            </a>
          </li>
          <li>
            <a href="#" className="py-3 flex">
              <p className="pt-1 px-3">4</p>
              <Image
                className="inline-block rounded-full"
                src="/defaultAvatar.png"
                width="32"
                height="32"
              />
              <p className="pt-1 pl-3">r/soccer</p>
            </a>
          </li>
          <li>
            <a href="#" className="pt-3 flex">
              <p className="pt-1 px-3">5</p>
              <Image
                className="inline-block rounded-full"
                src="/defaultAvatar.png"
                width="32"
                height="32"
              />
              <p className="pt-1 pl-3">r/nba</p>
            </a>
          </li>
        </ol>
      </div>
    </div>
  );
};
