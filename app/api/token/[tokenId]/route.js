import { NextResponse } from 'next/server';
import prisma from '@/prisma/prismaInit';
import bcrypt from 'bcryptjs';

// GET /api/token => Get token data
export async function GET(request, { params }) {
  const tPass = request.headers.get('tPass');
  const { tokenId } = params;

  try {
    const token = await prisma.token.findUnique({
      where: {
        id: tokenId,
      },
      include: {
        apps: true,
      },
    });
    const match = await bcrypt.compare(tPass, token.tPass);
    if (!token || !match) {
      return NextResponse.json({
        success: false,
        error: 'Token not found or wrong credentials',
      });
    }
    const increaseCount = await prisma.token.update({
      where: {
        id: tokenId,
      },
      data: {
        requestCount: token.requestCount + 1,
      },
    });

    return NextResponse.json({
      success: true,
      token: {
        ...token,
        requestCount: increaseCount.requestCount,
      },
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message || error || 'Something went wrong',
    });
  }
}
