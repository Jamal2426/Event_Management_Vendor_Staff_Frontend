import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

async function clearStaffCookies() {
  const cookieStore = await cookies();
  cookieStore.delete('staff_access_token');
  cookieStore.delete('staff_refresh_token');
  cookieStore.delete('staff_auth_pending');
  cookieStore.delete('staff_permissions');
}

export async function GET(request: NextRequest) {
  await clearStaffCookies();
  return NextResponse.redirect(new URL('/login', request.url));
}

export async function POST() {
  await clearStaffCookies();
  return NextResponse.json({ success: true });
}
