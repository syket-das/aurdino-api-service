import firebase_app from './config';
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs,
} from 'firebase/firestore';

const db = getFirestore(firebase_app);
export default async function getDoument(collection, id) {
  let docRef = doc(db, collection, id);

  let result = null;
  let error = null;

  try {
    result = await getDoc(docRef);
  } catch (e) {
    error = e;
  }

  return { result, error };
}

export const getDataByKey = async (url, key) => {
  let result = null;
  let error = null;
  const data = [];
  let singleData = {};

  const collectionRef = collection(db, url);

  try {
    const querySnapshot = await getDocs(collectionRef);

    querySnapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        ...doc.data(),
      });

      singleData = data.find((item) => item.key === key);
    });
  } catch (error) {
    error = error;
  }

  return {
    result: singleData,
    error,
  };
};
