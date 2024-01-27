import React, {useRef} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AppButton, Container} from '../../components';
import {useCameraScreen} from './useCameraScreen';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import {NoCameraDeviceError} from './components';
import {AppColors, AppImages} from '../../assets';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {RootStackProps} from '../../navigations';

type IProps = {};
export const CameraScreen: React.FC<IProps> = ({}) => {
  const {top} = useSafeAreaInsets();
  const navigation = useNavigation<RootStackProps<'Camera'>>();
  const {refs, funcs} = useCameraScreen();
  const device = useCameraDevice('back');

  if (device == null) return <NoCameraDeviceError />;

  return (
    <Container>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
        ref={refs.camera}
      />
      <View
        pointerEvents="box-none"
        style={[
          StyleSheet.absoluteFill,
          {justifyContent: 'center', alignItems: 'center'},
        ]}>
        <View pointerEvents="none">
          <Image source={AppImages['focusing-to-take-a-picture']} />
        </View>
        <View style={{alignSelf: 'center'}}>
          <AppButton
            style={{
              position: 'absolute',
              width: 72,
              height: 72,
              borderRadius: 72,
              alignSelf: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
            }}
            onPress={funcs.takeAPicture}>
            <Image source={AppImages.bolt} />
          </AppButton>
        </View>
      </View>
      <View style={[styles.header, {top: top + 16, width: '100%'}]}>
        <TouchableOpacity
          style={styles.backbtn}
          onPress={navigation.goBack}
          activeOpacity={0.8}>
          <Image
            source={AppImages['arrow-left']}
            style={{width: 24, height: 24}}
            tintColor={AppColors.white}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Take Photo</Text>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  btn: {position: 'absolute', bottom: 20, left: 16, right: 16},
  header: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  backbtn: {
    position: 'absolute',
    left: 16,
    justifyContent: 'center',
  },
  headerTitle: {
    color: AppColors.white,
    alignSelf: 'center',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
  },
});
