import React from 'react';
import {
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
import {useAppSelector} from '../../states';
import {useNavigation} from '@react-navigation/native';
import {RootStackProps} from '../../navigations';
import {selectPhotos} from '../../states/galerrySlice';
import {FBPhoto} from '../../types';
import {AppColors} from '../../assets';
import moment from 'moment';
import {HomeCard, HomeHeader} from './components';

type IProps = {};
export const GalleryScreen: React.FC<IProps> = ({}) => {
  const {funcs} = useGalleryScreen();
  const navigation = useNavigation<RootStackProps<'Gallery'>>();
  const photos = useAppSelector(selectPhotos);

  const renderItem: ListRenderItem<FBPhoto> = ({item, index}) => {
    return (
      <Pressable style={styles.itemWrapper} onPress={funcs.openPhoto}>
        <Image source={{uri: item.photoUrl}} style={styles.photo} />
        <View style={styles.itemInfo}>
          <Text style={styles.itemTitle}>
            {moment(item.createdAt).format('DD/MM/YYYY HH:mm')}
          </Text>
          {item.location && (
            <Text style={styles.itemSubTitle}>
              {`${item.location.latitude.toFixed(
                7,
              )}, ${item.location.longitude.toFixed(7)}`}
            </Text>
          )}
        </View>
        {/* TODO: update real data later */}
        <Text style={styles.price}>+10.00</Text>
      </Pressable>
    );
  };

  const renderListHeaderComponent = () => {
    return (
      <>
        <HomeCard />
        <AppButton
          text="TakeIt"
          style={styles.btn}
          onPress={() => {
            // navigation.navigate('Camera');
            navigation.navigate('PointSuccess');
          }}
        />
        <Text style={styles.label}>Transactions</Text>
      </>
    );
  };

  return (
    <Container>
      <HomeHeader gotoProfile={funcs.gotoProfile} />
      <FlatList
        data={photos}
        renderItem={renderItem}
        keyExtractor={e => e.title}
        ItemSeparatorComponent={() => <View style={{marginTop: 8}} />}
        ListHeaderComponent={renderListHeaderComponent()}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  photo: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  itemWrapper: {
    marginHorizontal: 16,
    flexDirection: 'row',
    backgroundColor: AppColors.card,
    alignItems: 'center',
    paddingHorizontal: 16,
    borderRadius: 16,
    paddingVertical: 13,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
  },
  location: {color: AppColors.white, fontSize: 8},
  itemCreatedAt: {color: AppColors.white, fontSize: 8},
  logoutBtn: {
    position: 'absolute',
    paddingHorizontal: 16,
  },
  btn: {marginTop: 14, marginHorizontal: 24},
  label: {
    color: AppColors.text,
    marginLeft: 16,
    marginTop: 53,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    marginBottom: 16,
  },
  price: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
    color: AppColors.text,
    marginLeft: 8,
  },
  itemTitle: {
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '400',
    color: AppColors.text,
  },
  itemSubTitle: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '400',
    color: 'rgba(124, 114, 189, 1)',
    marginTop: 2,
  },
});
