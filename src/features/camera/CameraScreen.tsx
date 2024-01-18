import React, {useRef} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
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
      <AppButton
        text="Take A Picture"
        style={styles.btn}
        onPress={funcs.takeAPicture}
      />
      <Pressable
        style={[styles.backbtn, {top: top + 16}]}
        onPress={navigation.goBack}>
        <Image
          source={AppImages.back}
          style={{width: 16, height: 16}}
          tintColor={AppColors.black}
        />
      </Pressable>
    </Container>
  );
};

const styles = StyleSheet.create({
  btn: {position: 'absolute', bottom: 20, left: 16, right: 16},
  backbtn: {
    position: 'absolute',
    left: 16,
    width: 36,
    height: 36,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.white,
  },
});
