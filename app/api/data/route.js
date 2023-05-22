import { NextResponse } from 'next/server';

import admin from 'firebase-admin';
import { adminDB } from '@/firebase/firebaseAdmin';
import { collection } from 'firebase/firestore';

export async function GET() {
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

  const response = NextResponse.json({
    data,
  });

  // Set cache control headers to prevent caching
  response.headers.set('Cache-Control', 'no-store, must-revalidate');
  response.headers.set('Pragma', 'no-cache');
  response.headers.set('Expires', '0');

  return response;
}
