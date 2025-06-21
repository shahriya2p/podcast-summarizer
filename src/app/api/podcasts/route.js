import { NextResponse } from 'next/server';
import { Client } from 'podcast-api';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const client = Client({ apiKey: process.env.LISTEN_NOTES_API_KEY });

    const q = searchParams.get('q') || '';
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    // Await the client.fetchBestPodcasts call
    const response = await client.fetchBestPodcasts({
      genre_id: '93',
      page: 2,
      region: 'us',
      sort: 'listen_score',
      safe_mode: 0,
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching podcasts from Listen Notes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch podcasts', details: error.message },
      { status: 500 }
    );
  }
}
