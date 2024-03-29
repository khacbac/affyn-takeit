import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {AppColors} from '../assets';

type IProps = {
  text?: string;
  textStyle?: StyleProp<TextStyle> | undefined;
} & Omit<TouchableOpacityProps, 'activeOpacity'>;
export const AppButton: React.FC<IProps> = ({
  text,
  textStyle,
  style,
  disabled,
  children,
  ...props
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.7}
      style={[styles.container, disabled && styles.disabledContainer, style]}
      {...props}>
      {children || <Text style={[styles.text, textStyle]}>{text}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.primary,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
  },
  disabledContainer: {
    backgroundColor: AppColors.disabled,
  },
  text: {
    color: AppColors.white,
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '600',
  },
});
