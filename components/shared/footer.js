import Link from 'next/link';

export const Footer = () => {
  return (
    <div className="bg-gray-900 sticky top-0 p-3 mb-4 rounded-lg shadow-2xl">
      <div className="grid grid-cols-2 text-gray-200">
        <div>
          <ul className="text-sm">
            <li className="mb-0.5">
              <Link href="#">
                <a>Help</a>
              </Link>
            </li>
            <li className="mb-0.5">
              <Link href="#">
                <a>Reddit App</a>
              </Link>
            </li>
            <li className="mb-0.5">
              <Link href="#">
                <a>Reddit Coins</a>
              </Link>
            </li>
            <li className="mb-0.5">
              <Link href="#">
                <a>Reddit Premium</a>
              </Link>
            </li>
            <li className="mb-0.5">
              <Link href="#">
                <a>Reddit Gifts</a>
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <ul className="text-sm">
            <li className="mb-0.5">
              <Link href="#">
                <a>About</a>
              </Link>
            </li>
            <li className="mb-0.5">
              <Link href="#">
                <a>Careers</a>
              </Link>
            </li>
            <li className="mb-0.5">
              <Link href="#">
                <a>Press</a>
              </Link>
            </li>
            <li className="mb-0.5">
              <Link href="#">
                <a>Advertise</a>
              </Link>
            </li>
            <li className="mb-0.5">
              <Link href="#">
                <a>Blog</a>
              </Link>
            </li>
            <li className="mb-0.5">
              <Link href="#">
                <a>Terms</a>
              </Link>
            </li>
            <li className="mb-0.5">
              <Link href="#">
                <a>Content Policy</a>
              </Link>
            </li>
            <li className="mb-0.5">
              <Link href="#">
                <a>Privacy Policy</a>
              </Link>
            </li>
            <li className="mb-0.5">
              <Link href="#">
                <a>Mod Policy</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <p className="text-gray-200 text-sm mt-5">
        Albert Stan © 2021. All rights reserved.
      </p>
    </div>
  );
};
