// This file is an example of a Next.js API Route (Route Handler).
// It acts as a bridge or proxy between your frontend components and your
// custom external backend (like a .NET server or another API).

import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

// Example: GET data from your external .NET backend
export async function GET(request: Request) {
  try {
    // 1. FORWARD THE REQUEST TO YOUR .NET BACKEND
    // In the future, you would replace this URL with your actual backend endpoint.
    // Use an environment variable for the base URL.
    const backendApiUrl = `${process.env.CUSTOM_BACKEND_API_URL}/api/some-data`;

    const backendResponse = await fetch(backendApiUrl, {
      // You can forward headers, tokens, etc., here if needed
      // headers: request.headers,
      cache: 'no-store', // Use 'no-store' for dynamic data
    });

    if (!backendResponse.ok) {
      throw new Error(`Error from backend: ${backendResponse.statusText}`);
    }

    const dataFromBackend = await backendResponse.json();

    // 2. (OPTIONAL) INTERACT WITH YOUR MONGODB DATABASE
    // You could also fetch additional data from MongoDB if needed.
    const client = await clientPromise;
    const db = client.db("your_database_name");
    const mongoData = await db.collection("your_collection").find({}).limit(10).toArray();


    // 3. RETURN THE COMBINED DATA TO THE FRONTEND
    // Here we're just returning the data from the .NET backend as an example.
    return NextResponse.json({ success: true, data: dataFromBackend, mongoData });

  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// Example: POST data to your external .NET backend
export async function POST(request: Request) {
  try {
    // 1. GET THE BODY FROM THE FRONTEND REQUEST
    const body = await request.json();

    // 2. FORWARD THE DATA TO YOUR .NET BACKEND
    const backendApiUrl = `${process.env.CUSTOM_BACKEND_API_URL}/api/submit-complaint`;

    const backendResponse = await fetch(backendApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!backendResponse.ok) {
      throw new Error(`Error from backend: ${backendResponse.statusText}`);
    }

    const responseData = await backendResponse.json();
    
    // 3. RETURN THE RESPONSE FROM THE BACKEND TO THE FRONTEND
    return NextResponse.json({ success: true, data: responseData });

  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
