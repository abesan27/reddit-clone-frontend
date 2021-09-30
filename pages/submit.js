import { useSession } from 'next-auth/client';
import { signIn } from 'next-auth/client';
import { useEffect } from 'react';
import { CreatePost } from '../components/posts/createPost';

const Submit = () => {
  const [session, loading] = useSession();

  useEffect(() => {
    if (!loading && !session) return signIn();
  });

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <CreatePost session={session} />
    </div>
  );
};

export default Submit;
