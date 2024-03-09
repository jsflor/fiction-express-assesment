import React from 'react';
import {
  Text,
  Button,
  ButtonText,
  Heading,
  Image,
  Spinner,
} from '@gluestack-ui/themed';
import { Alert } from '../../components/Alert.component';
import { ControlledInput } from '../../components/Input.component';
import { Control, FieldErrors, UseFormHandleSubmit } from 'react-hook-form';
import { PostInput } from '../../../domain/post.entity';
import { Status } from '../../../utils/types';
import { PageContainer } from '../../components/PageContainer.component';
import HomeImg from '../../../assets/Illustrations/write-post.png';
import { COLORS } from '../../../utils/style';

interface CreatePostProps {
  onSubmit: (data: PostInput) => Promise<void>;
  handleSubmit: UseFormHandleSubmit<PostInput>;
  control: Control<PostInput>;
  errors?: FieldErrors<PostInput>;
  status: Status;
}

export const CreatePostView = ({
  control,
  handleSubmit,
  errors,
  onSubmit,
  status,
}: CreatePostProps) => {
  return (
    <PageContainer scroll>
      <Heading alignSelf="center" marginBottom={12}>
        Create post
      </Heading>
      <Image
        source={HomeImg}
        objectFit="contain"
        w={300}
        h={250}
        alt="logo"
        alignSelf="center"
        marginBottom={12}
      />
      {status === 'error' && <Alert text="error" action="error" />}
      <ControlledInput
        control={control}
        name="title"
        error={errors?.title?.message as string}
      />
      <ControlledInput
        control={control}
        name="content"
        error={errors?.content?.message as string}
      />
      <Button
        onPress={handleSubmit(onSubmit)}
        backgroundColor={COLORS.PRIMARY}
        disabled={status === 'loading'}
      >
        {status === 'loading' && <Spinner color={'white'} size={'small'} />}
        {status !== 'loading' && <ButtonText>Create post</ButtonText>}
      </Button>
    </PageContainer>
  );
};
