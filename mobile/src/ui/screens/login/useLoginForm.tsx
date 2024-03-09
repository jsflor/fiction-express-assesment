import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as zod from 'zod';

const schema = zod.object({
  username: zod.string(),
  password: zod.string(),
});

const defaultValues = {
  username: '',
  password: '',
};

export type LoginFormType = zod.infer<typeof schema>;

export const useLoginForm = () => {
  return useForm<LoginFormType>({
    resolver: zodResolver(schema),
    defaultValues,
  });
};
