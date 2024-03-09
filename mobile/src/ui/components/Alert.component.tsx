import React from 'react';
import {
  Alert as GluestackIcon,
  AlertText,
  AlertIcon,
  InfoIcon,
} from '@gluestack-ui/themed';

interface AlertProps {
  action: 'info' | 'error' | 'warning';
  text: string;
}

export const Alert = ({ action, text }: AlertProps) => {
  return (
    <GluestackIcon mx="$2.5" action={action} variant="solid" marginBottom={12}>
      <AlertIcon as={InfoIcon} mr="$3" />
      <AlertText>{text}</AlertText>
    </GluestackIcon>
  );
};
