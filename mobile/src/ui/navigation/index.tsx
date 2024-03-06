import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from './AppNavigator';

export function RootNavigation() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
