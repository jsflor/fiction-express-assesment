import React from 'react';
import { useRegisterForm } from './useRegisterForm';
import { useRegister } from './useRegister';
import { RegisterView } from './RegisterView';
import { useNavigation } from '@react-navigation/native';
export const RegisterScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useRegisterForm();

  const { onSubmit, status } = useRegister();
  const navigation = useNavigation();

  const goToLogin = () => {
    // @ts-ignore
    navigation.navigate('login');
  };
  return (
    <RegisterView
      control={control}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      errors={errors}
      goToLogin={goToLogin}
      status={status}
    />
  );
};
