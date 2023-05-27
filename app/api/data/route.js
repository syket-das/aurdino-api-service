import { NextResponse } from 'next/server';

import { getAllData } from '@/firebase/getAllData';
import addData from '@/firebase/addData';

export const dynamic = 'force-dynamic';

export async function GET() {
  const { result, error } = await getAllData('data');
  if (error) {
    console.log(error);
    return NextResponse.error(error);
  }

  const response = NextResponse.json({
    data: result,
  });

  return response;
}

export async function POST(request) {
  const req = await request.json();

  const { result, error, data } = await addData('data', {
    key: req.key,
    value: req.value,
  });

  if (error) {
    return NextResponse.json({
      error: error.message || error,
      message: 'Error adding data',
    });
  }

  const response = NextResponse.json({
    result,
    data,
  });

  return response;
}
