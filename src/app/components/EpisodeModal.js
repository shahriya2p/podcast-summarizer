'use client';

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { formatAudioLength } from '../../lib/formatAudioLength';
import TypingText from './TypingText';

export default function EpisodeModal({
  episode,
  summary,
  summaryLoading,
  summaryError,
  summarizing,
  onClose,
  onSummarize,
  animate,
}) {
  // Prevent background scroll when modal is open
  useEffect(() => {
    if (episode) {
      // Save current scroll position
      const scrollY = window.scrollY;
      
      // Prevent background scroll
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      
      // Cleanup function to restore scroll
      return () => {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [episode]);

  if (!episode) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 transition-opacity duration-200 p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-gray-900 rounded-xl shadow-2xl max-w-5xl w-full md:p-0 p-2 relative animate-fadeIn max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2.5 right-2.5 text-gray-400 hover:text-white text-3xl font-bold z-20 flex items-center justify-center cursor-pointer"
          onClick={onClose}
          aria-label="Close"
          type="button"
        >
          &times;
        </button>
        <div className="flex flex-col md:flex-row gap-0 md:gap-0 pt-12 md:pt-0 min-h-0 flex-1">
          {/* Left: Episode Details */}
          <div className="md:w-1/2 w-full p-6 md:pr-4 border-b md:border-b-0 md:border-r border-gray-800 flex flex-col items-center justify-start overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
            <img
              src={episode.image || episode.thumbnail}
              alt={episode.title}
              className="w-full h-48 object-cover rounded-lg mb-6 shadow flex-shrink-0"
            />
            <h3 className="text-2xl font-bold mb-3 text-center w-full break-words">
              {episode.title}
            </h3>
            <div className="flex flex-col items-center w-full mb-2 flex-shrink-0">
              <span className="text-xs text-gray-400 mb-1">
                Published: {new Date(episode.pub_date_ms).toLocaleDateString()}
              </span>
              <span className="text-xs text-gray-400 mb-1">
                Audio Length: {formatAudioLength(episode.audio_length_sec)}
              </span>
              {episode.explicit_content && (
                <span className="text-xs text-red-400 mb-1">Explicit</span>
              )}
            </div>
            <div
              className="text-gray-300 mb-4 text-sm w-full flex flex-col gap-2"
              dangerouslySetInnerHTML={{ __html: episode.description }}
            />
            <audio controls src={episode.audio} className="w-full mb-3 flex-shrink-0" />
            <a
              href={episode.link || episode.listennotes_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline text-xs text-center block mb-2 flex-shrink-0"
            >
              View Episode Page
            </a>
          </div>
          {/* Right: Summary & Options */}
          <div className="md:w-1/2 w-full p-6 md:pl-4 flex flex-col justify-start items-stretch min-h-0">
            <div className="p-4 border rounded-lg shadow w-full mt-4 mb-2 flex-1 overflow-y-auto min-h-0 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
              <h4 className="text-lg font-medium mb-2 text-blue-200">Summary</h4>
              {summaryLoading ? (
                <p className="text-blue-300 mb-4 flex items-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4 text-blue-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    ></path>
                  </svg>
                </p>
              ) : summary ? (
                !animate ? (
                  <p className="text-gray-100 whitespace-pre-line">{summary}</p>
                ) : (
                  <TypingText text={summary}></TypingText>
                )
              ) : (
                <p className="text-gray-400 mb-4">No summary available yet.</p>
              )}
            </div>
            {summaryError && <p className="text-red-400 mt-2 flex-shrink-0">{summaryError}</p>}
            <button
              onClick={onSummarize}
              disabled={summarizing || summary}
              className={`w-full mb-6 px-4 py-2 text-white rounded-lg transition-colors font-semibold shadow flex-shrink-0
                   ${summarizing ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'} 
                    ${summarizing || summary ? 'opacity-50 cursor-not-allowed' : ''}`}
              style={{ minHeight: 48 }}
            >
              {summarizing ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    ></path>
                  </svg>
                  Generating...
                </span>
              ) : (
                'Generate Summary'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

EpisodeModal.propTypes = {
  episode: PropTypes.shape({
    id: PropTypes.string.isRequired,
    image: PropTypes.string,
    thumbnail: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    pub_date_ms: PropTypes.number.isRequired,
    audio_length_sec: PropTypes.number.isRequired,
    explicit_content: PropTypes.bool,
    audio: PropTypes.string,
    link: PropTypes.string,
    listennotes_url: PropTypes.string,
  }),
  summary: PropTypes.string,
  summaryLoading: PropTypes.bool,
  summaryError: PropTypes.string,
  summarizing: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onSummarize: PropTypes.func.isRequired,
};
