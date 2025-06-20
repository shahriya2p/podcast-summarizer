import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/mongodb';
import PodcastSummary from '../../../../models/PodcastSummary';
import { GoogleGenerativeAI } from '@google/generative-ai';
import axios from 'axios';
import { generateEpisodeSummaryPrompt } from '../../../../lib/promptTemplates';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req, { params }) {
  try {
    await dbConnect();
    const { episodeId } = await params;

    if (!episodeId) {
      return NextResponse.json(
        { error: 'Episode ID is required' },
        { status: 400 }
      );
    }

    const existingSummary = await PodcastSummary.findOne({ episodeId });
    if (existingSummary) {
      return NextResponse.json(existingSummary);
    }

    const response = await axios.get(
      `${process.env.LISTEN_NOTES_API}/episodes/${episodeId}`
    );
    const episode = response.data;
    const podcast = episode.podcast;

    const prompt = generateEpisodeSummaryPrompt({ episode, podcast });

    const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL??'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const summary = result.response.text();

    const newSummary = await PodcastSummary.create({
      episodeId,
      summary,
      createdAt: new Date(),
    });

    return NextResponse.json(newSummary, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/summaries/[episodeId]:', error);
    return NextResponse.json(
      { error: 'Failed to generate summary', details: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { episodeId } = await params;

    const summary = await PodcastSummary.findOne({ episodeId });
    if (!summary) {
      return NextResponse.json(
        { error: 'Summary not found' },
        { status: 200 }
      );
    }

    return NextResponse.json(summary);
  } catch (error) {
    console.error('Error in GET /api/summaries/[episodeId]:', error);
    return NextResponse.json(
      { error: 'Failed to fetch summary', details: error.message },
      { status: 500 }
    );
  }
}