import React from 'react';
import {Text, View} from 'react-native';
import {AppButton, Container} from '../../components';
import {useGalleryScreen} from './useGalleryScreen';
import {
  decrement,
  increment,
  useAppDispatch,
  useAppSelector,
} from '../../states';

type IProps = {};
export const GalleryScreen: React.FC<IProps> = ({}) => {
  const {} = useGalleryScreen();
  const {value} = useAppSelector(state => state.counter);
  const dispatch = useAppDispatch();
  return (
    <Container>
      <Text>GalleryScreen</Text>
      <Text>{value}</Text>
      <AppButton
        text="INCREASE"
        onPress={() => {
          dispatch(increment());
        }}
      />
      <AppButton
        text="DECREASE"
        onPress={() => {
          dispatch(decrement());
        }}
      />
    </Container>
  );
};
