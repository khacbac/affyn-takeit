import React from 'react';
import {
  AppAvatar,
  AppButton,
  AppSpacing,
  Container,
  modalManager,
} from '../../components';
import {Image, StyleSheet, Text, View} from 'react-native';
import {AppColors, AppImages} from '../../assets';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {
  removeUser,
  selectUser,
  setIsLoggedIn,
  useAppSelector,
} from '../../states';

type IProps = {};
export const ProfileScreen: React.FC<IProps> = ({}) => {
  const dispatch = useDispatch();
  const user = useAppSelector(selectUser);

  const onLogOut = () => {
    modalManager.showLoading();
    auth()
      .signOut()
      .then(() => {
        dispatch(removeUser());
        dispatch(setIsLoggedIn(false));
      })
      .catch(() => {})
      .finally(() => {
        modalManager.hideLoading();
      });
  };

  return (
    <Container safeArea="all">
      <AppSpacing spacing={62}>
        <Text style={styles.header}>Profile</Text>
        <View style={{flex: 1}}>
          <View style={{alignSelf: 'center'}}>
            <AppSpacing spacing={9}>
              <AppAvatar size={104} />
              <View>
                <Text style={styles.name}>jane Doe</Text>
                <Text style={styles.username}>jd2334e</Text>
              </View>
            </AppSpacing>
          </View>
          <View style={[styles.card, {marginTop: 44}]}>
            <View style={styles.cardIconWrapper}>
              <Image source={AppImages.user} style={{width: 24, height: 24}} />
            </View>
            <Text style={styles.cardText}>{user.email}</Text>
          </View>
          <View style={styles.card}>
            <View style={styles.cardIconWrapper}>
              <Image
                source={AppImages.language}
                style={{width: 24, height: 24}}
              />
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.cardText}>Language</Text>
            </View>
            <Text style={styles.cardRightText}>English</Text>
          </View>
        </View>
      </AppSpacing>
      <AppButton
        text="Logout"
        style={styles.logoutBtn}
        onPress={onLogOut}
        textStyle={{color: AppColors.primary}}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    color: AppColors.white,
    alignSelf: 'center',
    marginTop: 8,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
  },
  logoutBtn: {backgroundColor: AppColors.card, marginHorizontal: 24},
  name: {
    color: AppColors.white,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    alignSelf: 'center',
  },
  username: {
    color: AppColors.inactive,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '500',
    alignSelf: 'center',
  },
  card: {
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 24,
    backgroundColor: AppColors.card,
    marginTop: 27,
    padding: 16,
    borderRadius: 16,
  },
  cardIconWrapper: {
    backgroundColor: 'rgba(96, 76, 180, 1)',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
  },
  cardText: {
    color: AppColors.white,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '400',
    marginLeft: 12,
  },
  cardRightText: {
    color: AppColors.inactive,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '400',
    marginLeft: 12,
    marginRight: 16,
  },
});
