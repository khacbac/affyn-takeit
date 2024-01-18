import {useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';

export const useGalleryScreen = () => {
  useEffect(() => {
    const firestoreRef = firestore().collection('gallery');
    return firestoreRef.onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        const {title, complete} = doc.data();
        list.push({
          id: doc.id,
          title,
          complete,
        });
      });

      console.log('BACHK_____ list : ', list);
    });
  }, []);

  return {};
};
