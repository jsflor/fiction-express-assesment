import { useAppDispatch, useAppSelector } from '../../store/store';
import { RegisterFormType } from './useRegisterForm';
import { register } from '../../store/user/user.slice';

export const useRegister = () => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((s) => s.user);

  const onSubmit = async (data: RegisterFormType) => {
    console.log('🚀 ~ onSubmit ~ register.data:', data);
    try {
      dispatch(
        register({
          username: data.username,
          password1: data.password1,
          password2: data.password2,
          first_name: data.first_name,
          last_name: data.last_name,
        })
      );
    } catch (error) {
      console.log('🚀 ~ onSubmit ~ error:', error);
    }
  };

  return { onSubmit, status };
};
