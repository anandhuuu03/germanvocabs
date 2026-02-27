import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Flashcard = ({ word, article, translation, plural, beispiel, onSwipeLeft, onSwipeRight, darkMode }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [justSwiped, setJustSwiped] = useState(null);

  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const isTouchDevice = useRef(false);
  const touchStartTime = useRef(null);
  const SWIPE_THRESHOLD = 80; // increased from 50 → less sensitive

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
        .then(r => r.json())
        .then(data => {
          if (data.photos?.length > 0) setImageUrl(data.photos[0].src.medium);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [translation, article, word]);

  const playAudio = (e) => {
    // Stop ALL propagation so the card never sees this touch/click
    e.stopPropagation();
    e.nativeEvent?.stopImmediatePropagation();
    const u = new SpeechSynthesisUtterance(word);
    u.lang = 'de-DE';
    window.speechSynthesis.speak(u);
  };

  // Also block touch events on the audio button from reaching the card
  const handleAudioTouchEnd = (e) => {
    e.stopPropagation();
    e.nativeEvent?.stopImmediatePropagation();
    playAudio(e);
  };

  const handleTouchStart = (e) => {
    isTouchDevice.current = true;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchStartTime.current = Date.now();
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;

    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    const elapsed = Date.now() - touchStartTime.current;

    const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > SWIPE_THRESHOLD;
    // Also require it wasn't just a very quick tap (< 120ms) to avoid accidental swipes
    const isIntentionalSwipe = isHorizontalSwipe && elapsed > 120;

    if (isIntentionalSwipe) {
      if (deltaX < 0) {
        setJustSwiped('left');
        setTimeout(() => setJustSwiped(null), 400);
        onSwipeLeft?.();
      } else {
        setJustSwiped('right');
        setTimeout(() => setJustSwiped(null), 400);
        onSwipeRight?.();
      }
    } else {
      // It's a tap — flip
      setIsFlipped(prev => !prev);
    }

    touchStartX.current = null;
    touchStartY.current = null;
    touchStartTime.current = null;
  };

  const handleClick = () => {
    if (!isTouchDevice.current) setIsFlipped(prev => !prev);
  };

  const articleMeta = {
    der: { border: '#3b82f6', label: '#3b82f6', badge: 'rgba(59,130,246,0.1)' },
    die: { border: '#ef4444', label: '#ef4444', badge: 'rgba(239,68,68,0.1)' },
    das: { border: '#22c55e', label: '#22c55e', badge: 'rgba(34,197,94,0.1)' },
  };
  const meta = articleMeta[article?.toLowerCase()] || { border: '#888', label: '#888', badge: 'rgba(128,128,128,0.1)' };

  const dm = darkMode;
  const frontBg = dm ? '#141414' : '#ffffff';
  const frontTextColor = dm ? '#f0ebe0' : '#1a1a1a';
  const hintColor = dm ? 'rgba(240,235,224,0.2)' : 'rgba(0,0,0,0.2)';
  const audioBg = dm ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.04)';
  const audioHover = dm ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)';
  const backBg = dm ? '#111' : '#faf7f2';
  const backBorder = dm ? '#222' : '#e8e2d6';
  const backText = dm ? '#f0ebe0' : '#1a1a1a';
  const subText = dm ? 'rgba(240,235,224,0.4)' : 'rgba(0,0,0,0.35)';
  const beispielBg = dm ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.8)';
  const beispielBorder = dm ? '#2a2a2a' : '#e8e2d6';

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        .card-wrap {
          perspective: 1200px;
          width: 100%;
          max-width: 340px;
          margin: 0 auto;
        }
        .swipe-hint {
          text-align: center;
          font-size: 0.7rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          opacity: 0.3;
          margin-bottom: 0.6rem;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
        }
        .audio-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 2.8rem;
          height: 2.8rem;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          transition: all 0.2s ease;
          background: ${audioBg};
          /* Ensure it sits above the card's touch layer */
          z-index: 10;
          -webkit-tap-highlight-color: transparent;
        }
        .audio-btn:hover { transform: scale(1.1); background: ${audioHover}; }
        .article-badge {
          display: inline-flex;
          align-items: center;
          padding: 0.2rem 0.7rem;
          border-radius: 999px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          margin-bottom: 0.6rem;
          background: ${meta.badge};
          color: ${meta.label};
        }
        .card-word {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: clamp(2rem, 8vw, 2.8rem);
          text-align: center;
          padding: 0 1.5rem;
          line-height: 1.1;
          letter-spacing: -0.01em;
          color: ${frontTextColor};
        }
        .flip-hint {
          position: absolute;
          bottom: 1.1rem;
          font-size: 0.68rem;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: ${hintColor};
        }
        .back-translation {
          font-family: 'Playfair Display', serif;
          font-size: 2.2rem;
          font-weight: 700;
          color: ${backText};
          margin-bottom: 0.8rem;
          line-height: 1.1;
        }
        .back-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: ${subText};
          display: block;
          margin-bottom: 0.2rem;
        }
        .back-plural {
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem;
          font-weight: 500;
          color: ${backText};
        }
        .beispiel-box {
          margin-top: 0.75rem;
          padding: 0.75rem 1rem;
          border-radius: 10px;
          border: 1px solid ${beispielBorder};
          background: ${beispielBg};
          width: 100%;
          text-align: left;
        }
        .beispiel-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          font-style: italic;
          color: ${backText};
          opacity: 0.75;
          line-height: 1.5;
        }
        .back-image {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 12px;
          margin-bottom: 0.75rem;
          box-shadow: 0 4px 16px rgba(0,0,0,0.18);
        }
        .skeleton {
          width: 80px;
          height: 80px;
          border-radius: 12px;
          margin-bottom: 0.75rem;
          background: linear-gradient(90deg, ${dm ? '#1e1e1e' : '#ede8e0'} 25%, ${dm ? '#2a2a2a' : '#e0dbd2'} 50%, ${dm ? '#1e1e1e' : '#ede8e0'} 75%);
          background-size: 200% 100%;
          animation: shimmer 1.4s infinite;
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      <div className="card-wrap">
        <p className="swipe-hint" style={{color: dm ? '#f0ebe0' : '#1a1a1a'}}>
          swipe ← → to navigate · tap to flip
        </p>

        <motion.div
          onClick={handleClick}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          animate={{
            rotateY: isFlipped ? 180 : 0,
            x: justSwiped === 'left' ? -8 : justSwiped === 'right' ? 8 : 0,
          }}
          transition={{
            rotateY: { duration: 0.55, type: 'spring', stiffness: 280, damping: 22 },
            x: { duration: 0.15, ease: 'easeOut' }
          }}
          style={{
            width: '100%',
            height: '420px',
            cursor: 'pointer',
            position: 'relative',
            transformStyle: 'preserve-3d',
            userSelect: 'none',
          }}
        >
          {/* FRONT */}
          <div style={{
            position: 'absolute', inset: 0,
            backfaceVisibility: 'hidden',
            borderRadius: '24px',
            background: frontBg,
            border: `3px solid ${meta.border}`,
            boxShadow: dm
              ? `0 0 0 1px rgba(255,255,255,0.04), 0 20px 60px rgba(0,0,0,0.6), 0 0 40px ${meta.border}18`
              : `0 20px 60px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.04), 0 0 30px ${meta.border}15`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.4s, box-shadow 0.4s',
          }}>
            {/* Audio button with its own touch handler to block propagation */}
            <button
              className="audio-btn"
              onClick={playAudio}
              onTouchEnd={handleAudioTouchEnd}
              title="Aussprechen"
            >
              🔊
            </button>

            {article && <span className="article-badge">{article}</span>}
            <h2 className="card-word">{word}</h2>
            <p className="flip-hint">zum Umdrehen tippen</p>
          </div>

          {/* BACK */}
          <div style={{
            position: 'absolute', inset: 0,
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            borderRadius: '24px',
            background: backBg,
            border: `3px solid ${backBorder}`,
            boxShadow: dm
              ? '0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)'
              : '0 20px 60px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            textAlign: 'center',
            transition: 'background 0.4s',
          }}>
            {loading && <div className="skeleton" />}
            {!loading && imageUrl && <img src={imageUrl} alt={translation} className="back-image" />}

            <h2 className="back-translation">{translation}</h2>

            {plural && (
              <div style={{marginBottom: '0.5rem'}}>
                <span className="back-label">Plural</span>
                <p className="back-plural">{plural}</p>
              </div>
            )}

            {beispiel && (
              <div className="beispiel-box">
                <span className="back-label">Beispiel</span>
                <p className="beispiel-text">{beispiel}</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Flashcard;