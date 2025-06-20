import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q') || ''; 
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    const response = await axios.get(
      `${process.env.LISTEN_NOTES_API}/search`,
      {
        params: {
          q,
          type: 'podcast',
          offset,
        },
      }
    );
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching podcasts from Listen Notes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch podcasts', details: error.message },
      { status: 500 }
    );
  }
}