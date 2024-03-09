import React, { useEffect } from 'react';
import { useCreatePostForm } from './useCreatePostForm';
import { useCreatePost } from './useCreatePost';
import { CreatePostView } from './CreatePostView';
import { useNavigation } from '@react-navigation/native';

export const CreatePostScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useCreatePostForm();

  const { onSubmit, status } = useCreatePost();

  return (
    <CreatePostView
      control={control}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      errors={errors}
      status={status}
    />
  );
};
