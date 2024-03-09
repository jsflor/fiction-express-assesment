import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as zod from 'zod';

const schema = zod.object({
  title: zod.string(),
  content: zod.string(),
  author_username: zod.string(),
});

const defaultValues = {
  title: '',
  content: '',
  author_username: '',
};

export type CreatePostTypeForm = zod.infer<typeof schema>;

export const useCreatePostForm = () => {
  return useForm<CreatePostTypeForm>({
    resolver: zodResolver(schema),
    defaultValues,
  });
};
