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
          <button
            onClick={(e) => {
              e.preventDefault();
              signIn();
            }}>
            Sign In
          </button>
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
          <button
            onClick={(e) => {
              e.preventDefault();
              signOut();
            }}>
            Sign Out
          </button>
        </Link>
      </div>
    );
  };

  return (
    <div>
      <h1>Navbar</h1>
      {!session && (
        <div>
          {signOutButtonNode()}
          {signInButtonNode()}
        </div>
      )}
      {session && (
        <div>
          {signOutButtonNode()}
          {signInButtonNode()}
          <p>Logged in as: {session.user.name}</p>
        </div>
      )}
    </div>
  );
};
