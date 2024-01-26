import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {AppColors} from '../../../assets';

type IProps = {};
export const HomeHeader: React.FC<IProps> = ({}) => {
  const {top} = useSafeAreaInsets();
  return (
    <View style={{paddingTop: top}}>
      <View style={styles.content}>
        {/* TODO: hardcoded, should use real data */}
        <Text style={styles.title}>Hello, Jane Doe!</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {paddingVertical: 12, paddingHorizontal: 24, flexDirection: 'row'},
  title: {
    color: AppColors.white,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
  },
});
