import React from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';

type IProps = TextInputProps & {};
export const AppTextInput: React.FC<IProps> = ({style, ...props}) => {
  return <TextInput style={[styles.container, style]} {...props} />;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
    fontSize: 16,
    lineHeight: 21,
    height: 40,
    borderRadius: 16,
    paddingHorizontal: 12,
  },
});
