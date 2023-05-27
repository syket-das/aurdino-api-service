import {
  getFirestore,
  doc,
  setDoc,
  collection,
  addDoc,
} from 'firebase/firestore';
import firebase_app from './config';

const db = getFirestore(firebase_app);
export default async function addData(colllection, args) {
  let result = null;
  let error = null;
  let data = null;

  const collectionRef = collection(db, colllection);
  try {
    const newDoc = await addDoc(collectionRef, {
      ...args,
    }).then((docRef) => {
      result = true;
      // return id and data of new doc
      data = { id: docRef.id, ...args };
    });
  } catch (e) {
    error = e;
  }

  return { result, error, data };
}
