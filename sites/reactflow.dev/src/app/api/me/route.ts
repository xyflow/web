import { NextResponse } from 'next/server';
import { getNhost } from '@/utils/nhost';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const nhost = await getNhost();
    const user = nhost.auth.getUser();
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
