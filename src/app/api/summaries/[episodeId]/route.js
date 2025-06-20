import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/mongodb';
import PodcastSummary from '../../../../models/PodcastSummary';
import { GoogleGenerativeAI } from '@google/generative-ai';
import axios from 'axios';

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
      `https://listen-api-test.listennotes.com/api/v2/episodes/${episodeId}`
    );
    const episode = response.data;

    const prompt = `
      Generate a meaningful summary (100-150 words) of the podcast episode titled "${episode.title}" from the podcast "${episode.podcast.title}" by ${episode.podcast.publisher}. 
      The podcast focuses on: ${episode.podcast.description}
      The episode description is: ${episode.description}
      ${episode.transcript ? `The episode transcript is: ${episode.transcript}` : 'No transcript is available.'}
      The episode duration is ${Math.floor(episode.audio_length_sec / 60)} minutes, and it belongs to genres such as ${episode.podcast.genre_ids.join(', ')}.
      Summarize the main discussion points, key themes, and insights from the episode, incorporating the podcast's context, episode details, and the full transcript (if available). Focus on the actual content discussed, such as the topics, guests, and lessons shared, rather than just the description. Ensure the summary is engaging, concise, and captures the essence of the episode.
    `;

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
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