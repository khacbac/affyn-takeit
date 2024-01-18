import React, {useLayoutEffect} from 'react';
import {Pressable, Text, View} from 'react-native';
import {AppButton, Container} from '../../components';
import {useGalleryScreen} from './useGalleryScreen';
import {
  decrement,
  increment,
  useAppDispatch,
  useAppSelector,
} from '../../states';
import {useNavigation} from '@react-navigation/native';
import {RootStackProps} from '../../navigations';

type IProps = {};
export const GalleryScreen: React.FC<IProps> = ({}) => {
  const {} = useGalleryScreen();
  const navigation = useNavigation<RootStackProps<'Gallery'>>();
  const {value} = useAppSelector(state => state.counter);
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <Pressable
            onPress={() => {
              navigation.navigate('Camera');
            }}>
            <Text>Open Camera</Text>
          </Pressable>
        );
      },
    });
  }, []);

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
