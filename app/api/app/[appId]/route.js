import { NextResponse } from 'next/server';

import prisma from '@/prisma/prismaInit';

import bcrypt from 'bcryptjs';

export async function GET(request, { params }) {
  const { appId } = params;

  const tokenId = request.headers.get('tokenId');
  const tPass = request.headers.get('tPass');

  try {
    const app = await prisma.app.findUnique({
      where: {
        id: appId,
      },

      include: {
        token: true,
      },
    });

    const match = await bcrypt.compare(tPass, app.token.tPass);

    if (!app || !match) {
      return NextResponse.json({
        success: false,
        error: 'App not found or wrong credentials',
      });
    }

    const increaseTokenCount = await prisma.token.update({
      where: {
        id: tokenId,
      },
      data: {
        requestCount: app.token.requestCount + 1,
      },
    });

    const increaseAppRead = await prisma.app.update({
      where: {
        id: appId,
      },
      data: {
        readCount: app.readCount + 1,
      },
    });

    return NextResponse.json({
      success: true,
      app: {
        ...app,
        readCount: increaseAppRead.readCount,

        token: {
          ...app.token,
          requestCount: increaseTokenCount.requestCount,
        },
      },
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error,
    });
  }
}

export async function PUT(request, { params }) {
  const { appId } = params;

  const req = await request.json();
  const { key, value } = req;

  const tokenId = request.headers.get('tokenId');
  const tPass = request.headers.get('tPass');

  try {
    const app = await prisma.app.findUnique({
      where: {
        id: appId,
      },

      include: {
        token: true,
      },
    });

    const match = await bcrypt.compare(tPass, app.token.tPass);

    if (!app || !match) {
      return NextResponse.json({
        success: false,
        error: 'App not found or wrong credentials',
      });
    }

    const updateApp = await prisma.app.update({
      where: {
        id: appId,
      },
      data: {
        key: key,
        value: value,
        writeCount: app.writeCount + 1,

        token: {
          update: {
            requestCount: app.token.requestCount + 1,
          },
        },
      },

      include: {
        token: true,
      },
    });

    return NextResponse.json({
      success: true,
      app: updateApp,
    });
  } catch (error) {}
}
