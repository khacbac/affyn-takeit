import React from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {AppColors, AppImages} from '../../../assets';
import {selectUser, useAppSelector} from '../../../states';
import {formatPoints} from '../../../utils';

type IProps = {};
const {width} = Dimensions.get('window');
const CARD_WIDTH = width - 32;
const CARD_HEIGHT = CARD_WIDTH / (343 / 233);
export const HomeCard: React.FC<IProps> = ({}) => {
  const user = useAppSelector(selectUser);
  return (
    <View style={styles.container}>
      <View>
        <Image source={AppImages.card} style={styles.card} />
        <View style={StyleSheet.absoluteFill}>
          <View style={styles.titleWrapper}>
            <Text style={styles.text}>POINTS EARNED</Text>
            <Text style={styles.subText}>TakeIt Points</Text>
          </View>
          <View style={styles.amountWrapper}>
            <Text style={styles.amount}>{formatPoints(user.points)}</Text>
          </View>
          <View style={styles.logoWrapper}>
            <Image style={styles.logo} source={AppImages.logo} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {alignItems: 'center', marginTop: 22},
  titleWrapper: {marginLeft: 31, marginTop: 34},
  text: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
    color: AppColors.white,
    textTransform: 'uppercase',
  },
  subText: {
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '400',
    color: AppColors.subText,
    marginTop: 2,
  },
  card: {width: CARD_WIDTH, height: CARD_HEIGHT, resizeMode: 'contain'},
  amountWrapper: {position: 'absolute', left: 46, bottom: 35},
  amount: {
    fontSize: 36,
    lineHeight: 54,
    fontWeight: '500',
    color: AppColors.text,
  },
  logo: {width: 29, height: 29},
  logoWrapper: {
    width: 45,
    height: 45,
    borderRadius: 8,
    backgroundColor: AppColors.white,
    justifyContent: 'center',
    alignItems: 'center',
    right: 25,
    bottom: 40,
    position: 'absolute',
  },
});
