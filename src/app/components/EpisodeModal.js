import React from "react";

export default function EpisodeModal({ episode, summary, summaryLoading, summaryError, summarizing, onClose, onSummarize }) {
  if (!episode) return null;
  console.log("episode", episode);
  // Helper to format audio length
  const formatAudioLength = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec.toString().padStart(2, '0')}`;
  };
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 transition-opacity duration-200"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-gray-900 rounded-xl shadow-2xl max-w-3xl w-full md:p-0 p-2 relative animate-fadeIn overflow-y-auto max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-3xl font-bold z-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={onClose}
          aria-label="Close"
          type="button"
        >
          &times;
        </button>
        <div className="flex flex-col md:flex-row gap-0 md:gap-0 pt-12 md:pt-0">
          {/* Left: Episode Details */}
          <div className="md:w-1/2 w-full p-6 md:pr-4 border-b md:border-b-0 md:border-r border-gray-800 flex flex-col items-center justify-start">
            <img
              src={episode.image || episode.thumbnail}
              alt={episode.title}
              className="w-full h-48 object-cover rounded-lg mb-6 shadow"
            />
            <h3 className="text-2xl font-bold mb-3 text-center w-full break-words">{episode.title}</h3>
            <div className="flex flex-col items-center w-full mb-2">
              <span className="text-xs text-gray-400 mb-1">Published: {new Date(episode.pub_date_ms).toLocaleDateString()}</span>
              <span className="text-xs text-gray-400 mb-1">Audio Length: {formatAudioLength(episode.audio_length_sec)}</span>
              {episode.explicit_content && (
                <span className="text-xs text-red-400 mb-1">Explicit</span>
              )}
            </div>
            <p className="text-gray-300 mb-4 text-sm w-full text-center" dangerouslySetInnerHTML={{ __html: episode.description }} />
            <audio controls src={episode.audio} className="w-full mb-3" />
            <a
              href={episode.link || episode.listennotes_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline text-xs text-center block mb-2"
            >
              View Episode Page
            </a>
          </div>
          {/* Right: Summary & Options */}
          <div className="md:w-1/2 w-full p-6 md:pl-4 flex flex-col justify-start items-stretch">
            <button
              onClick={onSummarize}
              disabled={summarizing}
              className={`w-full mb-6 px-4 py-2 text-white rounded-lg transition-colors font-semibold shadow ${summarizing ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"}`}
              style={{ minHeight: 48 }}
            >
              {summarizing ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                  Generating...
                </span>
              ) : "Generate Summary"}
            </button>
            <div className="p-4 border rounded-lg  shadow w-full mt-2 mb-2 max-h-60 overflow-y-auto">
              <h4 className="text-lg font-medium mb-2 text-blue-200">Summary</h4>
              {summaryLoading ? (
                <p className="text-blue-300 mb-4 flex items-center gap-2"><svg className="animate-spin h-4 w-4 text-blue-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>Loading summary...</p>
              ) : summary ? (
                <p className="text-gray-100 whitespace-pre-line">{summary}</p>
              ) : (
                <p className="text-gray-400 mb-4">No summary available yet.</p>
              )}
            </div>
            {summaryError && <p className="text-red-400 mt-2">{summaryError}</p>}
          </div>
        </div>
      </div>
    </div>
  );
} 