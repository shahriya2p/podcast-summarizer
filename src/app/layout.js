import './globals.css';

export const metadata = {
  title: 'Podcast Summarizer',
  description: 'Discover, explore, and get AI-powered summaries of your favorite podcasts. Search, listen, and stay informed—faster than ever.',
  openGraph: {
    title: 'Podcast Summarizer',
    description: 'Discover, explore, and get AI-powered summaries of your favorite podcasts. Search, listen, and stay informed—faster than ever.',
    url: 'https://yourdomain.com',
    siteName: 'Podcast Summarizer',
    images: [
      {
        url: '/public/globe.svg',
        width: 1200,
        height: 630,
        alt: 'Podcast Summarizer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}