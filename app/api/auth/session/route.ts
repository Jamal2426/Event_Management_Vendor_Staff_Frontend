import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export async function POST(request: NextRequest) {
  const accessToken = request.cookies.get('staff_access_token')?.value;

  if (!accessToken) {
    return NextResponse.json({ success: false, message: 'No access token' }, { status: 401 });
  }

  try {
    const meRes = await fetch(`${BACKEND_URL}/vendors/staff/auth/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!meRes.ok) {
      return NextResponse.json({ success: false, message: 'Failed to fetch staff profile' }, { status: meRes.status });
    }

    const data = await meRes.json();
    const permissions: string[] = (data?.data?.role?.permissions ?? []).map((p: any) => p.slug);

    const response = NextResponse.json({ success: true });
    response.cookies.set('staff_permissions', permissions.join(','), {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return response;
  } catch (err) {
    console.error('[session route error]', err);
    return NextResponse.json({ success: false, message: 'Internal error' }, { status: 500 });
  }
}
