import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Flashcard = ({ word, article, translation, plural, beispiel }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

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

  // Function to play German audio
  const playAudio = (e) => {
    e.stopPropagation(); // Prevents the card from flipping when clicking the button
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'de-DE'; // Set language to German
    window.speechSynthesis.speak(utterance);
  };

  const genderColors = {
    der: 'border-blue-500 text-blue-700',
    die: 'border-red-500 text-red-700',
    das: 'border-green-500 text-green-700'
  };

  const cardStyle = genderColors[article?.toLowerCase()] || 'border-gray-300 text-gray-700';

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <motion.div
        className="w-72 h-[70vh] max-h-96 cursor-pointer perspective-1000 relative"
        onClick={() => setIsFlipped(!isFlipped)}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front Side */}
        <div className={`absolute inset-0 backface-hidden border-4 rounded-3xl bg-white flex flex-col items-center justify-center shadow-xl ${cardStyle}`}>
          
          {/* Audio Button */}
          <button 
            onClick={playAudio} 
            className="absolute top-4 right-4 text-2xl bg-gray-50 rounded-full p-2 hover:bg-gray-200 transition-colors shadow-sm"
            title="Play Audio"
          >
            🔊
          </button>

          {article && <span className="text-lg uppercase font-bold tracking-widest mb-2">{article}</span>}
          <h2 className="text-4xl font-extrabold text-center px-4">{word}</h2>
          <p className="absolute bottom-6 text-gray-400 text-sm italic">Tap to flip</p>
        </div>

        {/* Back Side */}
        <div 
          className="absolute inset-0 backface-hidden border-4 border-gray-200 rounded-3xl bg-gray-50 flex flex-col items-center justify-center shadow-xl p-6 text-center"
          style={{ transform: 'rotateY(180deg)' }}
        >
          {loading && <div className="w-24 h-24 bg-gray-200 rounded-xl mb-4 animate-pulse"></div>}
          {!loading && imageUrl && <img src={imageUrl} alt={translation} className="w-24 h-24 object-cover mb-4 rounded-xl shadow-md" />}
          
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{translation}</h2>
          
          {plural && (
            <div className="mb-4">
              <span className="text-xs text-gray-400 uppercase font-bold tracking-wider block">Plural</span>
              <p className="text-lg font-medium text-gray-700">{plural}</p>
            </div>
          )}
          
          {beispiel && (
            <div className="mt-2 bg-white p-4 rounded-xl border border-gray-100 shadow-sm w-full">
              <span className="text-xs text-gray-400 uppercase font-bold tracking-wider block mb-1">Beispiel</span>
              <p className="text-sm text-gray-600 italic">"{beispiel}"</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Flashcard;