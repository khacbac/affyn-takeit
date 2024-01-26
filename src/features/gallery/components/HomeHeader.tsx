import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {AppColors} from '../../../assets';
import {AppAvatar} from '../../../components';

type IProps = {gotoProfile: () => void};
export const HomeHeader: React.FC<IProps> = ({gotoProfile}) => {
  const {top} = useSafeAreaInsets();
  return (
    <View style={{paddingTop: top}}>
      <View style={styles.content}>
        {/* TODO: hardcoded, should use real data */}
        <Text style={styles.title}>Hello, Jane Doe!</Text>
        <AppAvatar onPress={gotoProfile} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: AppColors.white,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
  },
});
