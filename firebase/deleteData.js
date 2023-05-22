import firebase_app from './config';
import { getFirestore, doc, deleteDoc } from 'firebase/firestore';

export default async function deleteData(collection, id) {
  let result = null;
  let error = null;
  const db = getFirestore(firebase_app);

  try {
    await deleteDoc(doc(db, collection, id));
    result = true;
  } catch (e) {
    error = e;
  }

  return { result, error };
}
