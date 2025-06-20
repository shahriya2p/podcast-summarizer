import mongoose from 'mongoose';

const PodcastSummarySchema = new mongoose.Schema({
  podcastId: { type: String, required: true, unique: true },
  summary: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.PodcastSummary || mongoose.model('PodcastSummary', PodcastSummarySchema);