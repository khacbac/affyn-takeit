import React, {useLayoutEffect} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ListRenderItem,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {AppButton, Container} from '../../components';
import {useGalleryScreen} from './useGalleryScreen';
import {useAppDispatch, useAppSelector} from '../../states';
import {useNavigation} from '@react-navigation/native';
import {RootStackProps} from '../../navigations';
import {selectPhotos} from '../../states/galerrySlice';
import {FBPhoto} from '../../types';
import {PHOTO_RATIO} from '../../constants';

type IProps = {};
const {width} = Dimensions.get('window');
const NUM_COLUMNS = 4;
const SCREEN_SPACING = 12;
const ITEM_SPACING = 12;
const PHOTO_WIDTH =
  (width - (NUM_COLUMNS - 1) * ITEM_SPACING - 2 * SCREEN_SPACING) / NUM_COLUMNS;
const PHOTO_HEIGHT = PHOTO_WIDTH / PHOTO_RATIO;
export const GalleryScreen: React.FC<IProps> = ({}) => {
  const {funcs} = useGalleryScreen();
  const navigation = useNavigation<RootStackProps<'Gallery'>>();
  const photos = useAppSelector(selectPhotos);

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

  const renderItem: ListRenderItem<FBPhoto> = ({item, index}) => {
    return (
      <Pressable
        style={{marginLeft: index % NUM_COLUMNS === 0 ? 0 : ITEM_SPACING}}
        onPress={funcs.openPhoto}>
        <Image source={{uri: item.photoUrl}} style={styles.photo} />
      </Pressable>
    );
  };

  return (
    <Container>
      <FlatList
        numColumns={NUM_COLUMNS}
        data={photos}
        renderItem={renderItem}
        keyExtractor={e => e.title}
        ItemSeparatorComponent={() => (
          <View style={{marginTop: ITEM_SPACING}} />
        )}
        contentContainerStyle={styles.list}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  photo: {
    width: PHOTO_WIDTH,
    height: PHOTO_HEIGHT,
    borderRadius: 8,
  },
  list: {
    paddingTop: 16,
    paddingHorizontal: SCREEN_SPACING,
  },
});
