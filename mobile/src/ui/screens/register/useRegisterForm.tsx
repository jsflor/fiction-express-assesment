import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as zod from 'zod';

const schema = zod.object({
  username: zod.string(),
  password1: zod.string(),
  password2: zod.string(),
  first_name: zod.string(),
  last_name: zod.string(),
});

const defaultValues = {
  username: '',
  password1: '',
  password2: '',
  first_name: '',
  last_name: '',
};

export type RegisterFormType = zod.infer<typeof schema>;

export const useRegisterForm = () => {
  return useForm<RegisterFormType>({
    resolver: zodResolver(schema),
    defaultValues,
  });
};
