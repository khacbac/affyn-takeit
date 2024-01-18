import React from 'react';
import {Text, View} from 'react-native';

type IProps = {};
export const NoCameraDeviceError: React.FC<IProps> = ({}) => {
  return (
    <View>
      <Text>No Camera</Text>
    </View>
  );
};
