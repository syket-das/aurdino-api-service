import {
  getFirestore,
  doc,
  setDoc,
  collection,
  addDoc,
} from 'firebase/firestore';
import firebase_app from './config';

import { v4 as uuidv4 } from 'uuid';

const db = getFirestore(firebase_app);
export default async function addData(colllection, data) {
  let result = null;
  let error = null;

  const collectionRef = collection(db, colllection);
  try {
    await addDoc(collectionRef, {
      ...data,
    });
    result = true;
  } catch (e) {
    error = e;
  }

  return { result, error };
}
