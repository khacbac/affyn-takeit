import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

class FirebaseManager {
  getFirestore(path: 'users' | 'gallery') {
    return firestore().collection(path);
  }

  getStorage(path?: string) {
    return storage().ref(path);
  }
}

export const firebaseManager = new FirebaseManager();
