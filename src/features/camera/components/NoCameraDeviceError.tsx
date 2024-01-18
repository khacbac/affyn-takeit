import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {RootStackProps} from '../../../navigations';

type IProps = {};
export const NoCameraDeviceError: React.FC<IProps> = ({}) => {
  const navigation = useNavigation<RootStackProps<'Camera'>>();
  useEffect(() => {
    setTimeout(() => {
      navigation.goBack();
    }, 1000);
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>No Camera</Text>
    </View>
  );
};
