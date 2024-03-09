import React from 'react';
import { Pressable } from 'react-native';
import { Image } from '@gluestack-ui/themed';
import MenuImg from '../../assets/Logos/menu-open.png';
import LogoImg from '../../assets/Logos/logo-m.png';

export const HeaderLeft = ({ onPress }: { onPress?: () => void }) => {
  return (
    <Pressable onPress={onPress}>
      <Image source={LogoImg} w={60} h={26} alt="logo" />
    </Pressable>
  );
};

export const HeaderRight = ({ onPress }: { onPress?: () => void }) => {
  return (
    <Pressable onPress={onPress}>
      <Image source={MenuImg} w={26} h={26} tintColor={'black'} alt="logo" />
    </Pressable>
  );
};
