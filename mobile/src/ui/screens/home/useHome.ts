import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { getAll } from '../../store/post/post.slice';

export const useHome = () => {
  const dispatch = useAppDispatch();
  const { all, allStatus } = useAppSelector((s) => s.post);

  useEffect(() => {
    dispatch(getAll());
  }, []);

  return {
    data: all,
    status: allStatus,
  };
};
