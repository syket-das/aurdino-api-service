import { getFirestore, getDocs, collection } from 'firebase/firestore';
import firebase_app from './config';

const db = getFirestore(firebase_app);

export async function getAllData(url) {
  let result = [];
  let error = null;

  try {
    const collectionRef = collection(db, url);
    const querySnapshot = await getDocs(collectionRef);
    querySnapshot.forEach((doc) => {    
        result.push({
            id: doc.id,
            ...doc.data(),
        });
        }
    );

  } catch (e) {
    error = e;
  }

  return { result, error };
}
