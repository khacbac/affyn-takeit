import React, {useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AppButton, Container} from '../../components';
import {useCameraScreen} from './useCameraScreen';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import {NoCameraDeviceError} from './components';

type IProps = {};
export const CameraScreen: React.FC<IProps> = ({}) => {
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
    </Container>
  );
};

const styles = StyleSheet.create({
  btn: {position: 'absolute', bottom: 20, left: 16, right: 16},
});
