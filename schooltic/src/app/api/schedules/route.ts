import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { smartFileService } from '@/lib/smartFileService';


export async function POST(request: NextRequest) {
  try {
    console.log('=== SCHEDULE UPLOAD DEBUG ===');
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const formation_id = formData.get('formation_id') as string;
    const effective_date = formData.get('effective_date') as string;
    
    console.log('File:', file?.name, file?.type, file?.size);
    console.log('Formation ID:', formation_id);
    console.log('Effective Date:', effective_date);
    console.log('==============================');

    if (!file || !formation_id || !effective_date) {
      return NextResponse.json(
        { error: 'File, formation_id, and effective_date are required' },
        { status: 400 }
      );
    }

    // Validate file type
    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'Only PDF files are allowed' },
        { status: 400 }
      );
    }

    // Generate unique filename
    const timestamp = Date.now();
    const fileName = `schedule_${formation_id}_${timestamp}.pdf`;

    // Upload file and get full public URL
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    console.log('📤 Uploading file to S3...', fileName);
    const uploadResult = await smartFileService.uploadFile(
      buffer,
      fileName,
      file.type,
      'schedules'
    );
    
    // SmartFileService now returns the full S3 URL directly
    const fileUrl = uploadResult.fileUrl; // This is the full S3 URL
    console.log('✅ File uploaded successfully to S3');
    console.log('🌐 S3 URL stored in DB:', fileUrl);

    // Save to database with the full S3 URL
    const schedule = await prisma.matier_schedules.create({
      data: {
        matier_id: parseInt(formation_id),
        file_url: fileUrl,
        effective_date: new Date(effective_date)
      },
      include: {
        matier: true
      }
    });
    console.log("schedule", schedule);
    return NextResponse.json(schedule, { status: 201 });
  } catch (error: any) {
    console.error('Error uploading schedule:', error);
    
    // Handle foreign key constraint violation
    if (error.code === 'P2003') {
      return NextResponse.json(
        { error: 'Formation not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to upload schedule' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const formation_id = searchParams.get('formation_id');

    let schedules;
    if (formation_id) {
      schedules = await prisma.matier_schedules.findMany({
        where: {
          matier_id: parseInt(formation_id)
        },
        include: {
          matier: true
        },
        orderBy: {
          uploaded_at: 'desc'
        }
      });
    } else {
      schedules = await prisma.matier_schedules.findMany({
        include: {
          matier: true
        },
        orderBy: {
          uploaded_at: 'desc'
        }
      });
    }

    return NextResponse.json(schedules);
  } catch (error) {
    console.error('Error fetching schedules:', error);
    return NextResponse.json(
      { error: 'Failed to fetch schedules' },
      { status: 500 }
    );
  }
}
