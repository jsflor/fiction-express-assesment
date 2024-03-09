import React from 'react';
import { ViewProps } from 'react-native';
import { Box, SafeAreaView, ScrollView } from '@gluestack-ui/themed';

interface PageContainerProps extends ViewProps {
  scroll?: boolean;
}

export const PageContainer = ({ children, scroll }: PageContainerProps) => {
  return (
    <Box bg="$white" flex={1} padding={32}>
      <SafeAreaView />
      {scroll && (
        <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
      )}
      {!scroll && children}
    </Box>
  );
};
