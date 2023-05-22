import { NextResponse } from 'next/server';

import admin from 'firebase-admin';
import { adminDB } from '@/firebase/firebaseAdmin';
import { collection } from 'firebase/firestore';

export async function GET(request, context) {
  // get all data from data collection in firestore
  
  const data = [];
  await adminDB
    .collection('data')
    .get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            data.push({
            id: doc.id,
            ...doc.data(),
            });
        });
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });

    const singleData = data.filter((item) => item.key === context.params.id)[0];



  return NextResponse.json({
    data: singleData,
  });
}
