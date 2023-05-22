import { NextResponse } from 'next/server';

import admin from 'firebase-admin';
import { adminDB } from '@/firebase/firebaseAdmin/firebaseAdmin';
import { collection } from 'firebase/firestore';
import { getAllData } from '@/firebase/getAllData';

export async function GET() {
 

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
