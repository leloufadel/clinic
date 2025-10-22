import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { smartFileService } from '@/lib/smartFileService';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const formation_id = parseInt(id);

    if (isNaN(formation_id)) {
      return NextResponse.json(
        { error: 'Invalid formation ID' },
        { status: 400 }
      );
    }

    // Get the latest schedule for this formation
    const latestSchedule = await prisma.matier_schedules.findFirst({
      where: {
        matier_id: formation_id
      },
      orderBy: {
        effective_date: 'desc'
      },
      include: {
        matier: true
      }
    });

    if (!latestSchedule) {
      return NextResponse.json(
        { error: 'No schedule found for this formation' },
        { status: 404 }
      );
    }


    // Get the stored file URL and ensure it's properly formatted
    const raw = latestSchedule.file_url;

    if (!raw) {
      return NextResponse.json({ error: 'Schedule file path missing' }, { status: 500 });
    }

    // Use SmartFileService to get the proper URL (handles both S3 URLs and legacy paths)
    const absoluteUrl = smartFileService.getFileUrl(raw);

    // Optional: log what's being returned
    console.log('latestSchedule', latestSchedule);
    console.log('resolved file_url', absoluteUrl);

    return NextResponse.json({
      file_url: absoluteUrl,
      effective_date: latestSchedule.effective_date,
    });
  } catch (error) {
    console.error('Error fetching latest schedule:', error);
    return NextResponse.json(
      { error: 'Failed to fetch latest schedule' },
      { status: 500 }
    );
  }
}

