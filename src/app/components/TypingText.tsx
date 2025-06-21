import { useEffect, useState } from 'react';

export default function TypingText({ text, speed = 30 }) {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!text) return;

    setDisplayedText('');
    setIndex(0);
  }, [text]);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text.charAt(index));
        setIndex((i) => i + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [index, text, speed]);

  return (
    <p className="text-gray-100 whitespace-pre-line">
      {displayedText}
      {index < text.length && <span className="animate-pulse">▍</span>}
    </p>
  );
}
