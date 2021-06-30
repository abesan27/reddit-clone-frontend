import { signIn, signOut, useSession } from 'next-auth/client';

export const Navbar = () => {
  const [session, loading] = useSession();

  if (loading) return <div>Loading...</div>;

  console.log(session);

  return (
    <div>
      <h1>Navbar</h1>
      {!session && (
        <div>
          <button onClick={() => signIn()}>Sign in</button>
        </div>
      )}
      {session && (
        <div>
          <button onClick={() => signOut()}>Sign out</button>
          <p>Logged in as: {session.user.email}</p>
        </div>
      )}
    </div>
  );
};