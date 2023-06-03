import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/prisma/prismaInit';

// POST /api/token => Create a new token

export async function POST(request) {
  const req = await request.json();

  const { dName, dMac, tPass } = req;

  try {
    const token = await prisma.token.create({
      data: {
        dName,
        dMac,
        tPass: await bcrypt.hash(tPass, 10),
      },
    });

    await prisma.$disconnect();

    return NextResponse.json({
      success: true,
      token,
    });
  } catch (error) {
    await prisma.$disconnect();

    return NextResponse.json({
      success: false,
      error,
    });
  }
}

// GET /api/token/?dMac= => Get a token by dMac

export async function GET(request) {
  const dMac = request.nextUrl.searchParams.get('dMac');

  try {
    const token = await prisma.token.findUnique({
      where: {
        dMac,
      },
    });

    const increaseTokenCount = await prisma.token.update({
      where: {
        dMac,
      },
      data: {
        requestCount: token.requestCount + 1,
      },
    });

    await prisma.$disconnect();

    return NextResponse.json({
      success: true,
      token: {
        ...token,
        requestCount: increaseTokenCount.requestCount,
      },
    });
  } catch (error) {
    await prisma.$disconnect();

    return NextResponse.json({
      success: false,
      error,
    });
  }
}
