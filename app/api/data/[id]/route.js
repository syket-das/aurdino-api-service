import { NextResponse } from 'next/server';

import { getDataByKey } from '@/firebase/getData';
import updateDocument from '@/firebase/updateData';

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

//  update data

export async function PUT(request, context) {
  const req = await request.json();

  const { result, error } = await updateDocument('data', context.params.id, {
    ...req,
  });

  if (error) {
    return NextResponse.json({
      error: error.message || error,
      message: 'Error updating data',
    });
  }

  const response = NextResponse.json({
    result,
  });

  return response;
}
