import React, { Fragment } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/home/Home';
import { CreatePostScreen } from '../screens/create-post/CreatePost';
import { LoginScreen } from '../screens/login/Login';
import { RegisterScreen } from '../screens/register/Register';
import { PostDetailScreen } from '../screens/post-detail/PostDetail';
import { useAppSelector } from '../store/store';

const Stack = createNativeStackNavigator();

export function AppNavigator() {
  const { user } = useAppSelector((s) => s.user);
  return (
    <Stack.Navigator>
      {!user && (
        <Fragment>
          <Stack.Screen
            name="login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
        </Fragment>
      )}
      {user && (
        <Fragment>
          <Stack.Screen
            name="home"
            component={HomeScreen}
            options={{ title: '' }}
          />
          <Stack.Screen
            name="createPost"
            component={CreatePostScreen}
            options={{ title: '' }}
          />
          <Stack.Screen
            name="postDetail"
            component={PostDetailScreen}
            options={{ title: '' }}
          />
        </Fragment>
      )}
    </Stack.Navigator>
  );
}
