import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import {
  deleteOne,
  getAll,
  getOne,
  setDeleteStatus,
} from '../../store/post/post.slice';
import { useNavigation } from '@react-navigation/native';

export const usePostDetail = (id: number) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const { user } = useAppSelector((s) => s.user);
  const { detailed, detailedStatus, deleteStatus } = useAppSelector(
    (s) => s.post
  );

  const canDeletePost = user?.username === detailed?.author_username;

  const deletePost = async () => {
    await dispatch(deleteOne({ id: detailed.id }));
    dispatch(getAll());
    navigation.goBack();
  };

  useEffect(() => {
    dispatch(getOne({ id }));
    dispatch(setDeleteStatus('idle'));
  }, [id]);

  return {
    data: detailed,
    status: detailedStatus,
    deletePost,
    deleteStatus,
    canDeletePost,
  };
};
