import React from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';
import {AppColors} from '../assets';

type IProps = TextInputProps & {};
export const AppTextInput: React.FC<IProps> = ({style, ...props}) => {
  return (
    <TextInput
      style={[styles.container, style]}
      placeholderTextColor={AppColors.placeholder}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    color: AppColors.white,
    backgroundColor: AppColors.background,
    fontSize: 14,
    lineHeight: 21,
    height: 63,
    borderRadius: 16,
    paddingHorizontal: 22,
    fontWeight: '400',
  },
});
