import { useAppDispatch, useAppSelector } from '../../store/store';
import { LoginFormType } from './useLoginForm';
import { login } from '../../store/user/user.slice';

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((s) => s.user);

  const onSubmit = async (data: LoginFormType) => {
    console.log('🚀 ~ onSubmit ~ login.data:', data);
    try {
      dispatch(login({ username: data.username, password: data.password }));
    } catch (error) {
      console.log('🚀 ~ onSubmit ~ error:', error);
    }
  };

  return { onSubmit, status };
};
