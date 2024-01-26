import React from 'react';
import {Image, ImageSourcePropType, TouchableOpacity} from 'react-native';
import {AppImages} from '../assets';

type IProps = {
  size?: number;
  source?: ImageSourcePropType | undefined;
  onPress?: () => void;
};
export const AppAvatar: React.FC<IProps> = ({
  size = 48,
  onPress,
  source = AppImages['default-avatar'],
}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} disabled={!onPress}>
      <Image
        source={source}
        style={{width: size, height: size, borderRadius: size}}
      />
    </TouchableOpacity>
  );
};
