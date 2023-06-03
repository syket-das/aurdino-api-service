import { NextResponse } from 'next/server';
import prisma from '@/prisma/prismaInit';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  const req = await request.json();

  const { key, value } = req;

  const tokenId = request.headers.get('tokenId');
  const tPass = request.headers.get('tPass');

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

    const updateToken = await prisma.token.update({
      where: {
        id: tokenId,
      },
      data: {
        requestCount: token.requestCount + 1,
      },
    });

    const app = await prisma.app.create({
      data: {
        key,
        value,
        tokenId: tokenId,
      },
    });

    return NextResponse.json({
      success: true,
      token: {
        ...token,
        requestCount: updateToken.requestCount,
        apps: [...token.apps, app],
      },
      app,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message || error || 'Something went wrong',
    });
  }
}
