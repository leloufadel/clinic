import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { smartFileService } from '@/lib/smartFileService';

// Helper function to serialize BigInt values and dates
function serializeBigInt(obj: any): any {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj === 'bigint') return obj.toString();
  if (obj instanceof Date) return obj.toISOString();
  if (Array.isArray(obj)) return obj.map(serializeBigInt);
  if (typeof obj === 'object') {
    const result: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (key === 'published_at' || key === 'created_at' || key === 'updated_at') {
          // Ensure dates are properly serialized
          result[key] = obj[key] instanceof Date ? obj[key].toISOString() : obj[key];
        } else {
          result[key] = serializeBigInt(obj[key]);
        }
      }
    }
    return result;
  }
  return obj;
}

interface UpdateData {
  title: string;
  description: string;
  image_url?: string;
  published_at: Date;
}

interface PatchUpdates {
  title?: string;
  description?: string;
  image_url?: string;
  published_at?: Date;
}

// GET single actuality
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const actualityId = parseInt(id);
    
    if (isNaN(actualityId)) {
      return NextResponse.json(
        { error: 'Invalid ID' },
        { status: 400 }
      );
    }

    const actuality = await prisma.actualites.findUnique({
      where: { id: actualityId }
    });

    if (!actuality) {
      return NextResponse.json(
        { error: 'Actuality not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(serializeBigInt(actuality));
  } catch (error) {
    console.error('Error fetching actuality:', error);
    return NextResponse.json(
      { error: 'Failed to fetch actuality' },
      { status: 500 }
    );
  }
}

// PUT update actuality
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const actualityId = parseInt(id);
    
    if (isNaN(actualityId)) {
      return NextResponse.json(
        { error: 'Invalid ID' },
        { status: 400 }
      );
    }

    const formData = await request.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const image = formData.get('image') as File | null;

    if (!title || !description) {
      return NextResponse.json(
        { error: 'Title and description are required' },
        { status: 400 }
      );
    }

    let image_url: string | undefined;

    // Handle image upload if provided
    if (image && image.size > 0) {
      try {
        // Generate unique filename
        const timestamp = Date.now();
        const fileExtension = image.name.split('.').pop();
        const filename = `actuality_${timestamp}.${fileExtension}`;

        console.log('📤 Uploading image to S3...', filename);
        // Convert File to Buffer and upload
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        const uploadResult = await smartFileService.uploadFile(
          buffer,
          filename,
          image.type,
          'actualities'
        );

        // SmartFileService now returns the full S3 URL directly
        image_url = uploadResult.fileUrl; // This is the full S3 URL
        
        console.log('✅ Image uploaded successfully to S3:', image_url);
      } catch (uploadError) {
        console.error('Error saving image:', uploadError);
        return NextResponse.json(
          { error: 'Failed to save image' },
          { status: 500 }
        );
      }
    }

    const updateData: UpdateData = {
      title,
      description,
      image_url,
      published_at: new Date()
    };

    const actuality = await prisma.actualites.update({
      where: { id: actualityId },
      data: updateData
    });

    return NextResponse.json(serializeBigInt(actuality));
  } catch (error: unknown) {
    console.error('Error updating actuality:', error);
    
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Actuality not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update actuality' },
      { status: 500 }
    );
  }
}

// PATCH partial update actuality
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const actualityId = parseInt(id);
    
    if (isNaN(actualityId)) {
      return NextResponse.json(
        { error: 'Invalid ID' },
        { status: 400 }
      );
    }

    const updates = await request.json();
    const updateData: PatchUpdates = { ...updates };

    const actuality = await prisma.actualites.update({
      where: { id: actualityId },
      data: updateData
    });

    return NextResponse.json(serializeBigInt(actuality));
  } catch (error: unknown) {
    console.error('Error updating actuality:', error);
    
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Actuality not found' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update actuality' },
      { status: 500 }
    );
  }
}

// DELETE actuality
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const actualityId = parseInt(id);
    
    if (isNaN(actualityId)) {
      return NextResponse.json(
        { error: 'Invalid ID' },
        { status: 400 }
      );
    }

    await prisma.actualites.delete({
      where: { id: actualityId }
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('Error deleting actuality:', error);
    
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Actuality not found' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to delete actuality' },
      { status: 500 }
    );
  }
}
