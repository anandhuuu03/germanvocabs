import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Flashcard = ({ word, article, translation, plural, beispiel, onSwipeLeft, onSwipeRight, darkMode }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const isTouchDevice = useRef(false);
  const SWIPE_THRESHOLD = 50;

  useEffect(() => {
    setIsFlipped(false);
    setImageUrl('');
    setLoading(false);

    const blockImagesFor = ['Entschuldigung', 'Aussage', 'Grammatik'];

    if (article && !blockImagesFor.includes(word)) {
      setLoading(true);
      fetch(`https://api.pexels.com/v1/search?query=${translation}&per_page=1`, {
        headers: { Authorization: 'cCGQTJQyePM3EscpXJK5vBWE3n1ON2EGhsMyFJNhkjBxiCjcZe4v78Xl' }
      })
        .then(res => res.json())
        .then(data => {
          if (data.photos && data.photos.length > 0) {
            setImageUrl(data.photos[0].src.medium);
          }
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [translation, article, word]);

  const playAudio = (e) => {
    e.stopPropagation();
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'de-DE';
    window.speechSynthesis.speak(utterance);
  };

  const handleTouchStart = (e) => {
    isTouchDevice.current = true;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;

    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > SWIPE_THRESHOLD) {
      // Swipe → navigate
      if (deltaX < 0) {
        onSwipeLeft && onSwipeLeft();
      } else {
        onSwipeRight && onSwipeRight();
      }
    } else {
      // Tap → flip
      setIsFlipped(prev => !prev);
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Only fires on desktop mouse clicks, not touch
  const handleClick = () => {
    if (!isTouchDevice.current) {
      setIsFlipped(prev => !prev);
    }
  };

  const genderColors = {
    der: 'border-blue-500',
    die: 'border-red-500',
    das: 'border-green-500',
  };
  const genderText = {
    der: 'text-blue-600',
    die: 'text-red-600',
    das: 'text-green-600',
  };

  const borderStyle = genderColors[article?.toLowerCase()] || 'border-gray-300';
  const articleTextStyle = genderText[article?.toLowerCase()] || 'text-gray-500';

  const frontBg = darkMode ? 'bg-gray-800' : 'bg-white';
  const frontText = darkMode ? 'text-gray-100' : 'text-gray-900';
  const frontHint = darkMode ? 'text-gray-500' : 'text-gray-400';
  const audioBtn = darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-200';

  const backBg = darkMode ? 'bg-gray-800 border-gray-600' : 'bg-gray-50 border-gray-200';
  const backText = darkMode ? 'text-gray-100' : 'text-gray-800';
  const backSub = darkMode ? 'text-gray-400' : 'text-gray-400';
  const beispielBox = darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-100';
  const beispielText = darkMode ? 'text-gray-300' : 'text-gray-600';

  return (
    <div className="flex flex-col items-center justify-center p-4 w-full">
      <p className={`text-xs mb-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'} md:hidden`}>
        ← Swipe to navigate · Tap to flip →
      </p>

      <motion.div
        className="w-72 h-[70vh] max-h-96 cursor-pointer relative select-none"
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
        style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
      >
        {/* Front Side */}
        <div
          className={`absolute inset-0 border-4 rounded-3xl flex flex-col items-center justify-center shadow-xl ${borderStyle} ${frontBg} transition-colors duration-300`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <button
            onClick={playAudio}
            className={`absolute top-4 right-4 text-2xl rounded-full p-2 transition-colors shadow-sm ${audioBtn}`}
            title="Play Audio"
          >
            🔊
          </button>

          {article && (
            <span className={`text-lg uppercase font-bold tracking-widest mb-2 ${articleTextStyle}`}>
              {article}
            </span>
          )}
          <h2 className={`text-4xl font-extrabold text-center px-4 ${frontText}`}>{word}</h2>
          <p className={`absolute bottom-6 text-sm italic ${frontHint}`}>Tap to flip</p>
        </div>

        {/* Back Side */}
        <div
          className={`absolute inset-0 border-4 rounded-3xl flex flex-col items-center justify-center shadow-xl p-6 text-center ${backBg} transition-colors duration-300`}
          style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
        >
          {loading && <div className="w-24 h-24 bg-gray-300 rounded-xl mb-4 animate-pulse"></div>}
          {!loading && imageUrl && (
            <img src={imageUrl} alt={translation} className="w-24 h-24 object-cover mb-4 rounded-xl shadow-md" />
          )}

          <h2 className={`text-3xl font-bold mb-4 ${backText}`}>{translation}</h2>

          {plural && (
            <div className="mb-4">
              <span className={`text-xs uppercase font-bold tracking-wider block ${backSub}`}>Plural</span>
              <p className={`text-lg font-medium ${backText}`}>{plural}</p>
            </div>
          )}

          {beispiel && (
            <div className={`mt-2 p-4 rounded-xl border shadow-sm w-full ${beispielBox}`}>
              <span className={`text-xs uppercase font-bold tracking-wider block mb-1 ${backSub}`}>Beispiel</span>
              <p className={`text-sm italic ${beispielText}`}>"{beispiel}"</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Flashcard;