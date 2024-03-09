import React from 'react';
import {
  Text,
  Button,
  ButtonText,
  Link,
  LinkText,
  Image,
  Heading,
  Spinner,
} from '@gluestack-ui/themed';

import { ControlledInput } from '../../components/Input.component';
import { Control, FieldErrors, UseFormHandleSubmit } from 'react-hook-form';
import { UserLoginInput } from '../../../domain/user.entity';
import LogoImg from '../../../assets/Logos/logo-l.png';
import HomeImg from '../../../assets/Illustrations/home.png';
import { PageContainer } from '../../components/PageContainer.component';
import { Alert } from '../../components/Alert.component';
import { COLORS } from '../../../utils/style';
import { Status } from '../../../utils/types';

interface LoginViewProps {
  onSubmit: (data: UserLoginInput) => Promise<void>;
  handleSubmit: UseFormHandleSubmit<UserLoginInput>;
  control: Control<UserLoginInput>;
  errors?: FieldErrors<UserLoginInput>;
  goToRegister: () => void;
  status: Status;
}

export const LoginView = ({
  control,
  handleSubmit,
  errors,
  onSubmit,
  goToRegister,
  status,
}: LoginViewProps) => {
  return (
    <PageContainer scroll>
      <Image
        source={LogoImg}
        w={300}
        aspectRatio={'auto'}
        alt="logo"
        alignSelf="center"
        marginBottom={12}
      />
      <Text alignSelf="center" marginBottom={12}>
        Front-end development blog
      </Text>
      <Image
        source={HomeImg}
        w={150}
        h={150}
        aspectRatio={'auto'}
        alt="logo"
        alignSelf="center"
        marginBottom={12}
      />
      <Heading alignSelf="center" marginBottom={12}>
        Login
      </Heading>
      {status === 'error' && <Alert text="error" action="error" />}
      <ControlledInput
        control={control}
        autoCapitalize="none"
        name="username"
        error={errors?.username?.message as string}
      />
      <ControlledInput
        control={control}
        name="password"
        autoCapitalize="none"
        textContentType={'oneTimeCode'}
        secureTextEntry
        error={errors?.password?.message as string}
      />
      <Button
        backgroundColor={COLORS.PRIMARY}
        onPress={handleSubmit(onSubmit)}
        marginBottom={16}
        disabled={status === 'loading'}
      >
        {status === 'loading' && <Spinner color={'white'} size={'small'} />}
        {status !== 'loading' && <ButtonText>Login</ButtonText>}
      </Button>

      <Text style={{ textAlign: 'center' }}>Don't have an account?</Text>
      <Link onPress={goToRegister} alignSelf="center">
        <LinkText color={COLORS.TERTIARY}>Register</LinkText>
      </Link>
    </PageContainer>
  );
};
