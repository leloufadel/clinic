import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const formations = await prisma.matier.findMany({
      include: {
        matier_schedules: {
          orderBy: {
            uploaded_at: 'desc'
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      }
    });

    return NextResponse.json(formations);
  } catch (error) {
    console.error('Error fetching formations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch formations' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { code, name } = await request.json();

    if (!code || !name) {
      return NextResponse.json(
        { error: 'Code and name are required' },
        { status: 400 }
      );
    }

    const formation = await prisma.matier.create({
      data: {
        code,
        name
      },
      include: {
        matier_schedules: true
      }
    });

    return NextResponse.json(formation, { status: 201 });
  } catch (error: unknown) {
    console.error('Error creating formation:', error);
    
    // Handle unique constraint violation
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A formation with this code already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create formation' },
      { status: 500 }
    );
  }
}
