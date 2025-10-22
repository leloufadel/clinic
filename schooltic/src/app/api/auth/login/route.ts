import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyPassword } from '@/lib/auth';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    console.log('=== ADMIN LOGIN ATTEMPT ===');
    const { username, password } = await request.json();
    
    console.log('Login attempt for username:', username);

    if (!username || !password) {
      console.log('❌ Missing credentials');
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Find admin user in database
    const admin = await prisma.administration.findUnique({
      where: { username }
    });

    if (!admin) {
      console.log('❌ Admin user not found:', username);
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, admin.password);
    
    if (!isValidPassword) {
      console.log('❌ Invalid password for user:', username);
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    console.log('✅ Login successful for user:', username);

    // Create JWT token (simple session management)
    const token = jwt.sign(
      { 
        adminId: admin.id, 
        username: admin.username 
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    // Create response with token
    const response = NextResponse.json(
      { 
        success: true, 
        message: 'Login successful',
        admin: {
          id: admin.id,
          username: admin.username
        }
      },
      { status: 200 }
    );

    // Set HTTP-only cookie for better security
    response.cookies.set('admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400 // 24 hours
    });

    return response;

  } catch (error: any) {
    console.error('🚨 Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
