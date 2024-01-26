import React, {ReactNode} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {AppColors} from '../assets';

type IProps = {
  children: ReactNode;
  safeArea?: 'all' | 'bottom' | 'top';
  contentStyle?: StyleProp<ViewStyle> | undefined;
} & Pick<ViewProps, 'style'>;
export const Container: React.FC<IProps> = ({
  children,
  safeArea,
  style,
  contentStyle,
}) => {
  const {bottom, top} = useSafeAreaInsets();
  return (
    <View
      style={[
        {
          ...((safeArea === 'all' || safeArea === 'top') && {paddingTop: top}),
          ...((safeArea === 'all' || safeArea === 'bottom') && {
            paddingBottom: bottom,
          }),
        },
        styles.container,
        style,
      ]}>
      <View style={[styles.content, contentStyle]}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: AppColors.background},
  content: {flex: 1},
});
