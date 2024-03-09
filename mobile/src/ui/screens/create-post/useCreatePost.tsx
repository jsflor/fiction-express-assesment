import { useAppDispatch, useAppSelector } from '../../store/store';
import { CreatePostTypeForm } from './useCreatePostForm';
import { create, getAll } from '../../store/post/post.slice';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

export const useCreatePost = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((s) => s.user);
  const { createStatus } = useAppSelector((s) => s.post);
  const navigation = useNavigation();

  const onSubmit = async (data: CreatePostTypeForm) => {
    console.log('🚀 ~ onSubmit ~ createPost.data:', data);
    try {
      await dispatch(
        create({
          author_username: user?.username,
          content: data.content,
          title: data.title,
        })
      );
      dispatch(getAll());
    } catch (error) {
      console.log('🚀 ~ onSubmit ~ error:', error);
    }
  };

  useEffect(() => {
    if (createStatus === 'fetched') {
      navigation.goBack();
    }
  }, [createStatus]);

  return { onSubmit, status: createStatus };
};
