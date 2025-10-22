import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { smartFileService } from '@/lib/smartFileService';

function serializeBigInt(obj: any): any {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj === 'bigint') return obj.toString();
  if (obj instanceof Date) return obj.toISOString();
  if (Array.isArray(obj)) return obj.map(serializeBigInt);
  if (typeof obj === 'object') {
    const out: any = {};
    for (const k in obj) {
      if (k === 'published_at' || k === 'created_at' || k === 'updated_at') {
        // Ensure dates are properly serialized
        out[k] = obj[k] instanceof Date ? obj[k].toISOString() : obj[k];
      } else {
        out[k] = serializeBigInt(obj[k]);
      }
    }
    return out;
  }
  return obj;
}

// GET /api/actualites  -> list (optional query params later)
export async function GET() {
  try {
    const rows = await prisma.actualites.findMany({
      orderBy: { published_at: 'desc' },
      take: 50,
    });
    return NextResponse.json(serializeBigInt(rows));
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to list actualites' }, { status: 500 });
  }
}

// POST /api/actualites  -> create
// Accepts multipart/form-data (category, title, description?, link?, image?)
export async function POST(request: NextRequest) {
  try {
    const ct = request.headers.get('content-type') || '';
    const isMultipart = ct.includes('multipart/form-data');

    let category: string | null = null;
    let title: string | null = null;
    let description: string | null = null;
    let link: string | null = null;
    let image_url: string | null = null;

    if (isMultipart) {
      const form = await request.formData();
      category = (form.get('category') as string) || null;
      title = (form.get('title') as string) || null;
      description = (form.get('description') as string) || null;
      link = (form.get('link') as string) || null;

      const image = form.get('image') as File | null;
      if (image && image.size > 0) {
        const ts = Date.now();
        const ext = image.name.includes('.') ? image.name.split('.').pop() : 'bin';
        const filename = `actuality_${ts}.${ext}`;
        
        console.log('📤 Uploading image to S3...', filename);
        const buffer = Buffer.from(await image.arrayBuffer());
        const uploadResult = await smartFileService.uploadFile(
          buffer,
          filename,
          image.type,
          'actualities'
        );
        
        // SmartFileService now returns the full S3 URL directly
        image_url = uploadResult.fileUrl; // This is the full S3 URL
        
        console.log('✅ Image uploaded successfully to S3:', image_url);
      }
    } else {
      const body = await request.json();
      category = body.category ?? null;
      title = body.title ?? null;
      description = body.description ?? null;
      link = body.link ?? null;
      image_url = body.image_url ?? null;
    }

    if (!title) {
      return NextResponse.json(
        { error: 'title is required' },
        { status: 400 }
      );
    }

    const created = await prisma.actualites.create({
      data: {
        category: 'news',
        title: title,
        description: description,
        link: link,
        image_url: image_url,
        published_at: new Date(),

      },
    });

    return NextResponse.json(serializeBigInt(created), { status: 201 });
  } catch (e) {
    console.error('Create actualite error:', e);
    return NextResponse.json({ error: 'Failed to create actualite' }, { status: 500 });
  }
}
