export function generateEpisodeSummaryPrompt({ episode, podcast }) {
  return `
    Generate a meaningful summary (100-150 words) of the podcast episode titled "${episode.title}" from the podcast "${podcast.title}" by ${podcast.publisher}.
    The podcast focuses on: ${podcast.description}
    The episode description is: ${episode.description}
    ${episode.transcript ? `The episode transcript is: ${episode.transcript}` : 'No transcript is available.'}
    The episode duration is ${Math.floor(episode.audio_length_sec / 60)} minutes, and it belongs to genres such as ${podcast.genre_ids?.join(', ') || ''}.
    Summarize the main discussion points, key themes, and insights from the episode, incorporating the podcast's context, episode details, and the full transcript (if available). Focus on the actual content discussed, such as the topics, guests, and lessons shared, rather than just the description. Ensure the summary is engaging, concise, and captures the essence of the episode.
  `;
} 