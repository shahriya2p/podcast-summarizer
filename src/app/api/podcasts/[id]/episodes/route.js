import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    const response = await axios.get(
      `https://listen-api-test.listennotes.com/api/v2/podcasts/${id}/episodes`
    );
    return NextResponse.json(response.data.episodes);
  } catch (error) {
    console.error('Error fetching episodes from Listen Notes mock server:', error);
    return NextResponse.json(
      { error: 'Failed to fetch episodes', details: error.message },
      { status: 500 }
    );
  }
}