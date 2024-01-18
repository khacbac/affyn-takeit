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
import {AppColors} from '../../assets';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type IProps = {};
const {width} = Dimensions.get('window');
const NUM_COLUMNS = 4;
const SCREEN_SPACING = 3;
const ITEM_SPACING = 3;
const PHOTO_WIDTH =
  (width - (NUM_COLUMNS - 1) * ITEM_SPACING - 2 * SCREEN_SPACING) / NUM_COLUMNS;
const PHOTO_HEIGHT = PHOTO_WIDTH / PHOTO_RATIO;
export const GalleryScreen: React.FC<IProps> = ({}) => {
  const {funcs} = useGalleryScreen();
  const {bottom} = useSafeAreaInsets();
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
        <View style={styles.itemInfo}>
          <LinearGradient
            colors={['white', AppColors.black80]}
            style={StyleSheet.absoluteFill}
          />
          {item.location && (
            <Text style={styles.location}>
              {`${item.location.latitude.toFixed(
                3,
              )}, ${item.location.longitude.toFixed(3)}`}
            </Text>
          )}
          <Text style={styles.itemCreatedAt}>
            {moment(item.createdAt).format('DD MMM YYYY -  HH:mm')}
          </Text>
        </View>
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
      <AppButton
        text="Logout"
        style={[styles.logoutBtn, {bottom: bottom + 16, right: 16}]}
        onPress={funcs.onLogOut}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  photo: {
    width: PHOTO_WIDTH,
    height: PHOTO_HEIGHT,
  },
  list: {
    paddingTop: ITEM_SPACING,
    paddingHorizontal: SCREEN_SPACING,
  },
  itemInfo: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'flex-end',
    paddingBottom: 4,
    paddingTop: 16,
    paddingHorizontal: 4,
  },
  location: {color: AppColors.white, fontSize: 8},
  itemCreatedAt: {color: AppColors.white, fontSize: 8},
  logoutBtn: {
    position: 'absolute',
    paddingHorizontal: 16,
  },
});
