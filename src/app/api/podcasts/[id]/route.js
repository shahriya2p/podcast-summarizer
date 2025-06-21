import { NextResponse } from 'next/server';
import { Client } from 'podcast-api';

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    const client = Client({ apiKey: process.env.LISTEN_NOTES_API_KEY });

    const response = await client.fetchPodcastById({
      id: id,
      sort: 'recent_first',
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching episodes from Listen Notes mock server:', error);
    return NextResponse.json(
      { error: 'Failed to fetch episodes', details: error.message },
      { status: 500 }
    );
  }
}
