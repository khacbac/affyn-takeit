import React from 'react';
import {AppButton, AppSpacing, Container} from '../../components';
import {Alert, Image, StyleSheet, Text, View} from 'react-native';
import {AppColors, AppImages} from '../../assets';
import {useNavigation, useRoute} from '@react-navigation/native';
import {RootRouteProps, RootStackProps} from '../../navigations';
import moment from 'moment';
import {FORMAT_DATETIME} from '../../constants';
import {formatLatLng} from '../../utils';

type IProps = {};
export const PointSuccessScreen: React.FC<IProps> = ({}) => {
  const navigation = useNavigation<RootStackProps<'PointSuccess'>>();
  const route = useRoute<RootRouteProps<'PointSuccess'>>();
  const {data} = route.params;

  const onClose = () => {
    navigation.navigate('Gallery');
  };

  const onShare = () => {
    Alert.alert('', 'Coming soon!');
  };
  const onDownload = () => {
    Alert.alert('', 'Coming soon!');
  };

  return (
    <Container safeArea="all" contentStyle={styles.container}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <AppSpacing spacing={25}>
          <View style={styles.successIconWrapper}>
            <Image source={AppImages.check} />
          </View>
          <Text style={styles.text}>You won {data.points} points!</Text>
          <View>
            <AppSpacing spacing={22}>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.dateLabel}>Date</Text>
                <Text style={styles.date}>
                  {moment(data.createdAt).format(FORMAT_DATETIME)}
                </Text>
              </View>
              {data.location && (
                <View style={{alignItems: 'center'}}>
                  <Text style={styles.dateLabel}>Location</Text>
                  <Text style={styles.date}>{formatLatLng(data.location)}</Text>
                </View>
              )}
            </AppSpacing>
          </View>
        </AppSpacing>
      </View>
      <View style={{flexDirection: 'row'}}>
        <AppButton
          onPress={onShare}
          style={{flex: 1, backgroundColor: AppColors.card}}>
          <Image source={AppImages.share} />
        </AppButton>
        <AppButton
          onPress={onDownload}
          style={{flex: 1, backgroundColor: AppColors.card, marginLeft: 12}}>
          <Image source={AppImages.download} />
        </AppButton>
      </View>
      <AppButton
        text="Close"
        onPress={onClose}
        style={{marginBottom: 8, marginTop: 24}}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {paddingHorizontal: 45},
  successIconWrapper: {
    width: 93,
    height: 93,
    borderRadius: 93,
    backgroundColor: AppColors.success,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    lineHeight: 30,
    fontWeight: '400',
    color: AppColors.text,
  },
  dateLabel: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '400',
    color: AppColors.subText,
    alignSelf: 'center',
  },
  date: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    color: AppColors.text,
  },
});
