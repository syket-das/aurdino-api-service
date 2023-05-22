import { NextResponse } from 'next/server';


import { getDataByKey } from '@/firebase/getData';

export async function GET(request, context) {
  const { result, error } = await getDataByKey('data', context.params.id);

  if (error) {
    console.log(error);
    return NextResponse.error(error);
  }

  const response = NextResponse.json({
    data: result,
  });

  return response;
}
