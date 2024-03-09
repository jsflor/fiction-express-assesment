import React from 'react';
import { useLoginForm } from './useLoginForm';
import { useLogin } from './useLogin';
import { LoginView } from './LoginView';
import { useNavigation } from '@react-navigation/native';
export const LoginScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useLoginForm();

  const { onSubmit, status } = useLogin();

  const navigation = useNavigation();

  const goToRegister = () => {
    // @ts-ignore
    navigation.navigate('register');
  };
  return (
    <LoginView
      control={control}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      errors={errors}
      goToRegister={goToRegister}
      status={status}
    />
  );
};
