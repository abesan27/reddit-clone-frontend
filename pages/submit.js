import { useSession } from 'next-auth/client';
import { signIn } from 'next-auth/client';
import { CreatePost } from '../components/posts/createPost';
import { Navbar } from '../components/shared/navbar';

const Submit = () => {
  const [session, loading] = useSession();

  if (loading) return <div>Loading...</div>;

  if (!loading && !session) return signIn();

  return (
    <div>
      <Navbar session={session} />
      <CreatePost session={session} />
    </div>
  );
};

export default Submit;
