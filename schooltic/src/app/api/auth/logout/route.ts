import { NextResponse } from 'next/server';

export async function POST() {
  try {
    console.log('=== ADMIN LOGOUT ===');
    
    const response = NextResponse.json(
      { success: true, message: 'Logout successful' },
      { status: 200 }
    );

    // Clear the admin token cookie
    response.cookies.set('admin-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0 // Expire immediately
    });

    console.log('✅ Admin logged out successfully');
    return response;

  } catch (error) {
    console.error('🚨 Logout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
