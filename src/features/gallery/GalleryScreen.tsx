import React from 'react';
import {Text, View} from 'react-native';
import {Container} from '../../components';
import {useGalleryScreen} from './useGalleryScreen';

type IProps = {};
export const GalleryScreen: React.FC<IProps> = ({}) => {
  const {} = useGalleryScreen();
  return (
    <Container>
      <Text>GalleryScreen</Text>
    </Container>
  );
};
