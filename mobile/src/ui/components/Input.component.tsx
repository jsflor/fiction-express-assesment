import React from 'react';
import {
  Input as GluestackInput,
  InputField,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlError,
  FormControlErrorText,
} from '@gluestack-ui/themed';

import { Control, Controller, FieldValues } from 'react-hook-form';
import { TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {}

export const Input = (props: InputProps) => {
  return (
    <GluestackInput
      size="md"
      isDisabled={false}
      isInvalid={false}
      isReadOnly={false}
    >
      <InputField {...props} />
    </GluestackInput>
  );
};

interface ControlledInputProps extends TextInputProps {
  control?: Control<FieldValues>;
  name: string;
  error?: string;
}

export const ControlledInput = ({
  control,
  name,
  error,
  ...props
}: ControlledInputProps) => {
  return (
    <FormControl marginBottom={16}>
      {/* label */}
      <FormControlLabel mb="$1">
        <FormControlLabelText>{name}</FormControlLabelText>
      </FormControlLabel>
      {/* input */}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            {...props}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name={name}
      />
      {/* error */}
      <FormControlError>
        <FormControlErrorText>{error}</FormControlErrorText>
      </FormControlError>
    </FormControl>
  );
};
