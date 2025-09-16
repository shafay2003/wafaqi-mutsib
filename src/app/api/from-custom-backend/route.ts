// This file is intentionally left blank to resolve a build error.
// This example API route depended on a MongoDB connection that was not configured.
// Since it is not used by the application, it has been removed.
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'This API route is disabled.' });
}
