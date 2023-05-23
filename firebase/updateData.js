import firebase_app from './config';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';

const db = getFirestore(firebase_app);

export default async function updateDocument(collection, id, data) {
  let docRef = doc(db, collection, id);

  let result = null;
  let error = null;

  try {
    await updateDoc(docRef, data);

    result = true;
  } catch (error) {
    error = error;
  }

  return { result, error };
}
