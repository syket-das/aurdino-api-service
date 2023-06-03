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


