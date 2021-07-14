import { useRouter } from 'next/router';

export const useGetTitle = () => {
  const router = useRouter();
  const title = router.query.title;

  if (!title) return 'Loading title...';

  return title;
};
