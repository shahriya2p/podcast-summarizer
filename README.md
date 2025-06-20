# Podcast Summarizer

Discover, explore, and get AI-powered summaries of your favorite podcasts. Search, listen, and stay informed—faster than ever.

## Features

- 🔍 **Search Podcasts:** Find podcasts by title or publisher.
- 🎧 **Browse Episodes:** View episodes for each podcast, with details and audio playback.
- 🤖 **AI Summaries:** Instantly generate concise, meaningful summaries for any episode using Google Gemini.
- 🌐 **Multi-Platform Links:** Quick access to podcast websites, Spotify, and YouTube.
- 🖥️ **Modern UI:** Responsive, dark-themed interface built with Next.js, Tailwind CSS, and React.

## Demo

> https://podcast-summarizer-eight.vercel.app/

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm (v9+ recommended)
- A MongoDB database (local or cloud)
- API keys for:
  - [ListenNotes API](https://www.listennotes.com/api/)
  - [Google Gemini API](https://ai.google.dev/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/podcast-summarizer.git
   cd podcast-summarizer
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env.local` file in the root directory and add the following:

   ```
   MONGODB_URI=your_mongodb_connection_string
   LISTEN_NOTES_API=https://listen-api.listennotes.com/api/v2
   LISTEN_NOTES_API_KEY=your_listennotes_api_key
   GEMINI_API_KEY=your_google_gemini_api_key
   GEMINI_MODEL=gemini-1.5-flash
   ```

   > _Replace the values with your actual credentials._

4. **Run the development server:**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Scripts

- `npm run dev` — Start the development server
- `npm run build` — Build for production
- `npm start` — Start the production server
- `npm run lint` — Lint the codebase

## Usage

- Click a podcast to view its details and episodes.
- Click an episode to open the modal, listen, and generate an AI summary.

## API Overview

### Podcast Endpoints

- `GET /api/podcasts` — List podcasts (search/filter supported)
- `GET /api/podcasts/[id]` — Get details for a specific podcast
- `GET /api/podcasts/[id]/episodes` — List episodes for a podcast

### Summaries

- `GET /api/summaries/[episodeId]` — Get the AI summary for an episode
- `POST /api/summaries/[episodeId]` — Generate and store a new summary for an episode

## Environment Variables

| Variable             | Description                        |
|----------------------|------------------------------------|
| `MONGODB_URI`        | MongoDB connection string          |
| `LISTEN_NOTES_API`   | ListenNotes API base URL           |
| `LISTEN_NOTES_API_KEY` | ListenNotes API key              |
| `GEMINI_API_KEY`     | Google Gemini API key              |
| `GEMINI_MODEL`       | Gemini model name (default: gemini-1.5-flash) |

## Technologies Used

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Mongoose](https://mongoosejs.com/)
- [Google Gemini API](https://ai.google.dev/)
- [ListenNotes API](https://www.listennotes.com/api/)
