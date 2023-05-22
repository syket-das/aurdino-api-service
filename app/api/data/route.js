import { NextResponse } from 'next/server';

import admin from 'firebase-admin';
import { adminDB } from '@/firebase/firebaseAdmin/firebaseAdmin';
import { collection } from 'firebase/firestore';
import { getAllData } from '@/firebase/getAllData';

export async function GET() {
  // get all data from data collection in firestore
  // const data = [];
  // await adminDB
  //   .collection('data')
  //   .get()
  //   .then((snapshot) => {
  //     snapshot.forEach((doc) => {
  //       data.push({
  //         id: doc.id,
  //         ...doc.data(),
  //       });
  //     });
  //   })
  //   .catch((err) => {
  //     console.log('Error getting documents', err);
  //   });

  // console.log(data);
  // const response = NextResponse.json(
  //   {
  //     data,
  //   },
  //   {
  //     headers: {
  //       'Cache-Control': 'no-store, must-revalidate',
  //       Pragma: 'no-cache',
  //       Expires: '0',
  //     },
  //   }
  // );

  // return response;

  const {result, error} = await getAllData('data');
  if (error) {
    console.log(error);
    return NextResponse.error(error);
  }

  const response = NextResponse.json(
    {
      data: result,
    })

  return response;
}
