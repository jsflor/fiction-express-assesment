import React, { useLayoutEffect, useState } from 'react';
import { useHome } from './useHome';
import { HomeView } from './HomeView';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '../../store/store';
import { setCreateStatus } from '../../store/post/post.slice';
import { HeaderRight, HeaderLeft } from '../../components/Header.component';
import { logout } from '../../store/user/user.slice';

export const HomeScreen = () => {
  const [showActionSheet, setShowActionSheet] = useState(false);
  const { data, status } = useHome();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const toggleActionSheet = () => {
    setShowActionSheet(!showActionSheet);
  };

  const navigateToPost = (id: number) => {
    dispatch(setCreateStatus('idle'));
    // @ts-ignore
    navigation.navigate('postDetail', { id });
  };

  const navigateToCreatePost = () => {
    // @ts-ignore
    navigation.navigate('createPost');
  };

  const navigateToChatBot = () => {
    toggleActionSheet();
    // @ts-ignore
    // navigation.navigate('createPost');
  };

  const onLogout = () => {
    toggleActionSheet();
    dispatch(logout());
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <HeaderLeft />,
      headerRight: () => <HeaderRight onPress={toggleActionSheet} />,
    });
  }, []);

  return (
    <HomeView
      status={status}
      posts={data}
      navigateToPost={navigateToPost}
      navigateToCreatePost={navigateToCreatePost}
      showActionSheet={showActionSheet}
      toggleActionSheet={toggleActionSheet}
      onLogout={onLogout}
      navigateToChatBot={navigateToChatBot}
    />
  );
};
