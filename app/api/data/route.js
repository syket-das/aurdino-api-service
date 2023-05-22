import { NextResponse } from 'next/server';

import { getAllData } from '@/firebase/getAllData';

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
