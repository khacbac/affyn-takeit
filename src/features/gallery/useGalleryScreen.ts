import {useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {selectUser, setPhotos, useAppSelector} from '../../states';
import {FBPhoto} from '../../types';
import {useDispatch} from 'react-redux';
import {Alert} from 'react-native';

export const useGalleryScreen = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const firestoreRef = firestore().collection('gallery');
    return firestoreRef
      .where('authorID', '==', user.id)
      .onSnapshot(querySnapshot => {
        const list: FBPhoto[] = [];
        querySnapshot.forEach(doc => {
          const data = doc.data();
          list.push({
            authorID: data.authorID,
            createdAt: data.createdAt,
            photoPath: data.photoPath,
            photoUrl: data.photoUrl,
            title: data.title,
          });
        });
        dispatch(setPhotos(list));
      });
  }, [user]);

  const openPhoto = () => {
    Alert.alert('', 'Coming soon');
  };

  return {funcs: {openPhoto}};
};
