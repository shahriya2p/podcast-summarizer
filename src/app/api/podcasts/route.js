import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    const response = await axios.get(
      'https://listen-api-test.listennotes.com/api/v2/search?q=tech&type=episode&sort_by_date=1&len=20'
    );
    return NextResponse.json(response.data.results);
  } catch (error) {
    console.error('Error fetching podcasts from Listen Notes mock server:', error);
    return NextResponse.json(
      { error: 'Failed to fetch podcasts', details: error.message },
      { status: 500 }
    );
  }
}