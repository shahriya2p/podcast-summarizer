import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req, { params }) {
    try {
        const { id } = await params;
        const response = await axios.get(
            `${process.env.LISTEN_NOTES_API}/podcasts/${id}/`
        );
        return NextResponse.json(response.data);
    } catch (error) {
        console.error('Error fetching episodes from Listen Notes mock server:', error);
        return NextResponse.json(
            { error: 'Failed to fetch episodes', details: error.message },
            { status: 500 }
        );
    }
}