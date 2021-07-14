import { useRouter } from 'next/router';

export const useGetUsername = () => {
  const router = useRouter();
  const username = router.query.username;

  if (!username) return 'Loading username...';

  return username;
};
