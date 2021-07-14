import { useRouter } from 'next/router';

export const useGetComment = () => {
  const router = useRouter();
  const comment = router.query.comment;

  if (!comment) return 'Loading comment...';

  return comment;
};
