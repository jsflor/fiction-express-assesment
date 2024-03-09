import React from 'react';
import { UserRegisterInput } from '../../../domain/user.entity';
import { PageContainer } from '../../components/PageContainer.component';
import { ControlledInput } from '../../components/Input.component';
import { Control, FieldErrors, UseFormHandleSubmit } from 'react-hook-form';
import LogoImg from '../../../assets/Logos/logo-l.png';
import { Alert } from '../../components/Alert.component';
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
import { COLORS } from '../../../utils/style';
import { Status } from '../../../utils/types';

interface RegisterViewProps {
  onSubmit: (data: UserRegisterInput) => Promise<void>;
  handleSubmit: UseFormHandleSubmit<UserRegisterInput>;
  control: Control<UserRegisterInput>;
  errors?: FieldErrors<UserRegisterInput>;
  goToLogin: () => void;
  status: Status;
}

export const RegisterView = ({
  control,
  handleSubmit,
  errors,
  onSubmit,
  goToLogin,
  status,
}: RegisterViewProps) => {
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
      <Heading alignSelf="center" marginBottom={12}>
        Register
      </Heading>
      {status === 'error' && <Alert text="error" action="error" />}
      <ControlledInput
        control={control}
        name="username"
        autoCapitalize="none"
        error={errors?.username?.message as string}
      />
      <ControlledInput
        control={control}
        name="password1"
        secureTextEntry
        textContentType={'oneTimeCode'}
        autoCapitalize="none"
        error={errors?.password1?.message as string}
      />
      <ControlledInput
        control={control}
        name="password2"
        secureTextEntry
        textContentType={'oneTimeCode'}
        autoCapitalize="none"
        error={errors?.password2?.message as string}
      />
      <ControlledInput
        control={control}
        name="first_name"
        autoCapitalize="none"
        error={errors?.first_name?.message as string}
      />
      <ControlledInput
        control={control}
        name="last_name"
        autoCapitalize="none"
        error={errors?.last_name?.message as string}
      />
      <Button
        backgroundColor={COLORS.PRIMARY}
        onPress={handleSubmit(onSubmit)}
        marginBottom={16}
        disabled={status === 'loading'}
      >
        {status === 'loading' && <Spinner color={'white'} size={'small'} />}
        {status !== 'loading' && <ButtonText>Register</ButtonText>}
      </Button>
      <Text style={{ textAlign: 'center' }}>Already have an account?</Text>
      <Link onPress={goToLogin} alignSelf="center">
        <LinkText color={COLORS.TERTIARY}>Login</LinkText>
      </Link>
    </PageContainer>
  );
};
