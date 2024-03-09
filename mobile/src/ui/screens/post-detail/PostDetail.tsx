import React from 'react';
import { usePostDetail } from './usePostDetail';
import { PostDetailView } from './PostDetailView';
import { useRoute } from '@react-navigation/native';

export const PostDetailScreen = () => {
  const { params } = useRoute();
  const { data, status, deletePost, deleteStatus, canDeletePost } =
    usePostDetail((params as { id: number })?.id);
  return (
    <PostDetailView
      status={status}
      post={data}
      onDeletePost={deletePost}
      deleteStatus={deleteStatus}
      canDeletePost={canDeletePost}
    />
  );
};
