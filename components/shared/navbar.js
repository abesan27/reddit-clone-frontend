import { signIn, signOut } from 'next-auth/client';
import Link from 'next/link';

export const Navbar = ({ session }) => {
  const signInButtonNode = () => {
    if (session) {
      return false;
    }

    return (
      <div>
        <Link href="/api/auth/signin">
          <a
            onClick={(e) => {
              e.preventDefault();
              signIn();
            }}
            className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-300 hover:to-pink-400 rounded-full text-lg font-semibold p-1.5 px-6">
            Signin
          </a>
        </Link>
      </div>
    );
  };

  const signOutButtonNode = () => {
    if (!session) {
      return false;
    }

    return (
      <div>
        <Link href="/api/auth/signout">
          <a
            onClick={(e) => {
              e.preventDefault();
              signOut();
            }}
            className="border-2 border-gray-200 hover:bg-gray-700 rounded-full text-gray-200 text-lg p-1 px-6">
            Signout
          </a>
        </Link>
      </div>
    );
  };

  return (
    <nav className="bg-gray-900 h-14 mx-auto px-20 shadow-2xl">
      <div className="flex justify-between">
        <Link href="/">
          <a className="mt-3.5 font-semibold text-lg text-gray-200">Reddit</a>
        </Link>
        <div className="mt-3.5 space-x-5">
          {!session ? <>{signInButtonNode()}</> : <>{signOutButtonNode()}</>}
        </div>
      </div>
    </nav>
  );
};
