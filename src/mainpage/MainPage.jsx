import React, { useState, useEffect } from 'react';
import Flashcard from '../Flashcard';
import vocabData from '../vocab.json';
import { Link } from 'react-router-dom';

const MainPage = () => {
  const [chapter, setChapter] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filteredWords, setFilteredWords] = useState([]);
  const [category, setCategory] = useState('All');
  const [showList, setShowList] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let words = vocabData.filter(word => word.lektion === chapter);
    if (category === 'Nouns') words = words.filter(w => w.artikel !== '');
    else if (category === 'Verbs/Others') words = words.filter(w => w.artikel === '');
    setFilteredWords(words);
    setCurrentIndex(0);
  }, [chapter, category]);

  const nextWord = () => currentIndex < filteredWords.length - 1 && setCurrentIndex(currentIndex + 1);
  const prevWord = () => currentIndex > 0 && setCurrentIndex(currentIndex - 1);

  const dm = darkMode;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

        * { box-sizing: border-box; }

        .app-root {
          min-height: 100vh;
          font-family: 'DM Sans', sans-serif;
          transition: background 0.4s ease, color 0.4s ease;
          position: relative;
          /* REMOVED overflow-x: hidden — it was clipping the scrollable chapter row */
        }
        .app-root.light {
          background: #f5f0e8;
          color: #1a1a1a;
        }
        .app-root.dark {
          background: #0f0f0f;
          color: #f0ebe0;
        }

        .app-root::before {
          content: '';
          position: fixed;
          inset: 0;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
        }

        .app-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2rem 1.5rem 3rem;
          max-width: 480px;
          margin: 0 auto;
          overflow-x: hidden; /* moved here so only content clips, not the row */
        }

        .header {
          width: 100%;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 2rem;
        }
        .header-title {
          font-family: 'Playfair Display', serif;
          font-size: 2.4rem;
          font-weight: 900;
          line-height: 1;
          letter-spacing: -0.02em;
        }
        .header-title span {
          display: block;
          font-size: 0.85rem;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          opacity: 0.45;
          margin-bottom: 0.2rem;
        }
        .dark-toggle {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1.3rem;
          padding: 0.5rem;
          border-radius: 50%;
          transition: transform 0.3s ease, background 0.2s;
          line-height: 1;
        }
        .light .dark-toggle:hover { background: rgba(0,0,0,0.06); }
        .dark .dark-toggle:hover { background: rgba(255,255,255,0.08); }

        .header-actions {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}
.grammar-link {
  text-decoration: none;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  transition: all 0.2s ease;
}
.light .grammar-link { border: 1.5px solid #1a1a1a; color: #1a1a1a; }
.light .grammar-link:hover { background: #1a1a1a; color: #f5f0e8; }
.dark .grammar-link { border: 1.5px solid #f0ebe0; color: #f0ebe0; }
.dark .grammar-link:hover { background: #f0ebe0; color: #0f0f0f; }
      

        /* Chapter pills */
        .chapter-row {
          display: flex;
          flex-wrap: nowrap;
          gap: 0.4rem;
          overflow-x: auto;
          width: 100%;
          padding-bottom: 0.5rem;
          margin-bottom: 1rem;
          -webkit-overflow-scrolling: touch;
        }
        .chapter-row::-webkit-scrollbar { height: 4px; }
        .light .chapter-row::-webkit-scrollbar-track { background: #e8e2d6; border-radius: 999px; }
        .light .chapter-row::-webkit-scrollbar-thumb { background: #c4bdb0; border-radius: 999px; }
        .dark .chapter-row::-webkit-scrollbar-track { background: #2a2a2a; border-radius: 999px; }
        .dark .chapter-row::-webkit-scrollbar-thumb { background: #555; border-radius: 999px; }
        .chapter-btn {
          flex-shrink: 0;
          padding: 0.4rem 1rem;
          border-radius: 999px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          border: 1.5px solid transparent;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s ease;
        }
        .light .chapter-btn {
          background: white;
          color: #444;
          border-color: #e0d8cc;
          box-shadow: 0 1px 3px rgba(0,0,0,0.06);
        }
        .light .chapter-btn:hover { border-color: #aaa; }
        .light .chapter-btn.active {
          background: #1a1a1a;
          color: #f5f0e8;
          border-color: #1a1a1a;
        }
        .dark .chapter-btn {
          background: #1e1e1e;
          color: #aaa;
          border-color: #2e2e2e;
        }
        .dark .chapter-btn:hover { border-color: #555; }
        .dark .chapter-btn.active {
          background: #f0ebe0;
          color: #0f0f0f;
          border-color: #f0ebe0;
        }

        /* Category filter */
        .category-row {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }
        .cat-btn {
          padding: 0.3rem 0.9rem;
          border-radius: 999px;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .light .cat-btn { background: #e8e2d6; color: #666; }
        .light .cat-btn:hover { background: #ddd5c5; }
        .light .cat-btn.active { background: #1a1a1a; color: #f5f0e8; }
        .dark .cat-btn { background: #1e1e1e; color: #666; }
        .dark .cat-btn:hover { background: #2a2a2a; }
        .dark .cat-btn.active { background: #f0ebe0; color: #0f0f0f; }

        /* Jump menu */
        .jump-wrap {
          width: 100%;
          max-width: 340px;
          position: relative;
          z-index: 10;
          margin-bottom: 0.75rem;
        }
        .jump-btn {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          border: none;
          transition: all 0.2s;
        }
        .light .jump-btn {
          background: white;
          color: #1a1a1a;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }
        .light .jump-btn:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.12); }
        .dark .jump-btn {
          background: #1a1a1a;
          color: #f0ebe0;
          box-shadow: 0 2px 8px rgba(0,0,0,0.4);
        }
        .dark .jump-btn:hover { background: #222; }
        .jump-arrow { font-size: 0.7rem; opacity: 0.4; }
        .jump-dropdown {
          position: absolute;
          top: calc(100% + 6px);
          left: 0;
          width: 100%;
          border-radius: 12px;
          overflow-y: auto;
          max-height: 220px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.18);
        }
        .light .jump-dropdown { background: white; border: 1px solid #e8e2d6; }
        .dark .jump-dropdown { background: #1a1a1a; border: 1px solid #2a2a2a; }
        .jump-item {
          width: 100%;
          text-align: left;
          padding: 0.65rem 1rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          border: none;
          border-bottom: 1px solid transparent;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          transition: background 0.15s;
        }
        .light .jump-item { color: #1a1a1a; border-bottom-color: #f0ebe8; }
        .light .jump-item:hover { background: #faf7f2; }
        .light .jump-item.active { background: #f0ebe0; font-weight: 600; }
        .dark .jump-item { color: #e0dbd0; border-bottom-color: #222; }
        .dark .jump-item:hover { background: #222; }
        .dark .jump-item.active { background: #2a2a2a; font-weight: 600; }
        .jump-item:last-child { border-bottom: none; }
        .jump-item-en { opacity: 0.4; font-size: 0.78rem; margin-left: auto; }

        /* Counter */
        .counter {
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          opacity: 0.4;
          margin-bottom: 1rem;
        }

        /* Nav buttons */
        .nav-row {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
          width: 100%;
          max-width: 340px;
          justify-content: space-between;
        }
        .nav-btn {
          flex: 1;
          padding: 0.85rem;
          border-radius: 14px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          letter-spacing: 0.02em;
        }
        .nav-btn:disabled { opacity: 0.3; cursor: not-allowed; }
        .nav-btn.prev {
          background: transparent;
          border: 1.5px solid currentColor;
          opacity: 0.5;
        }
        .nav-btn.prev:not(:disabled):hover { opacity: 1; }
        .nav-btn.next {
          background: #2563eb;
          color: white;
          box-shadow: 0 4px 14px rgba(37,99,235,0.35);
        }
        .nav-btn.next:not(:disabled):hover {
          background: #1d4ed8;
          box-shadow: 0 6px 20px rgba(37,99,235,0.45);
          transform: translateY(-1px);
        }
        .dark .nav-btn.prev { color: #f0ebe0; }
        .light .nav-btn.prev { color: #1a1a1a; }

        .fade-in {
          animation: fadeUp 0.5s ease both;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in:nth-child(1) { animation-delay: 0.05s; }
        .fade-in:nth-child(2) { animation-delay: 0.1s; }
        .fade-in:nth-child(3) { animation-delay: 0.15s; }
        .fade-in:nth-child(4) { animation-delay: 0.2s; }
      `}</style>

      <div className={`app-root ${dm ? 'dark' : 'light'}`}>
        <div className="app-content">

          {/* Header */}
          <div className="header fade-in">
            <div className="header-title">
              <span>Einfach gut!</span>
              Deutsch A1
            </div>
            <div className="header-actions">
    <Link to="/basics" className="grammar-link">Basics 🎒</Link>
    <Link to="/topics" className="grammar-link">Topics 🌍</Link>
    <Link to="/grammar" className="grammar-link">Grammar 📖</Link>
    <button className="dark-toggle" onClick={() => setDarkMode(!dm)} title="Toggle theme">
      {dm ? '☀️' : '🌙'}
    </button>
  </div>
          </div>

          {/* Chapter Row — sits outside app-content flow to allow full-width scroll */}
          <div className="chapter-row fade-in">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(num => (
              <button
                key={num}
                onClick={() => setChapter(num)}
                className={`chapter-btn ${chapter === num ? 'active' : ''}`}
              >
                Lektion {num}
              </button>
            ))}
          </div>

          {/* Category Row */}
          <div className="category-row fade-in">
            {['All', 'Nouns', 'Verbs/Others'].map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`cat-btn ${category === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Jump Menu */}
          <div className="jump-wrap fade-in">
            <button className="jump-btn" onClick={() => setShowList(!showList)}>
              <span>{filteredWords.length > 0 ? filteredWords[currentIndex]?.deutsch : 'No words'}</span>
              <span className="jump-arrow">{showList ? '▲' : '▼'} jump</span>
            </button>
            {showList && (
              <div className="jump-dropdown">
                {filteredWords.map((word, index) => (
                  <button
                    key={index}
                    onClick={() => { setCurrentIndex(index); setShowList(false); }}
                    className={`jump-item ${currentIndex === index ? 'active' : ''}`}
                  >
                    <span style={{ opacity: 0.5, fontSize: '0.75rem' }}>{word.artikel}</span>
                    <span>{word.deutsch}</span>
                    <span className="jump-item-en">{word.englisch}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Counter */}
          <p className="counter fade-in">{currentIndex + 1} / {filteredWords.length}</p>

          {/* Flashcard */}
          <div style={{ width: '100%', maxWidth: 340, zIndex: 0 }} className="fade-in">
            {filteredWords.length > 0 ? (
              <Flashcard
                word={filteredWords[currentIndex].deutsch}
                article={filteredWords[currentIndex].artikel}
                translation={filteredWords[currentIndex].englisch}
                plural={filteredWords[currentIndex].plural}
                beispiel={filteredWords[currentIndex].beispiel}
                darkMode={dm}
              />
            ) : (
              <p style={{ opacity: 0.4, textAlign: 'center', marginTop: '3rem' }}>No words found.</p>
            )}
          </div>

          {/* Nav */}
          <div className="nav-row fade-in">
            <button onClick={prevWord} disabled={currentIndex === 0} className="nav-btn prev">
              ← Zurück
            </button>
            <button onClick={nextWord} disabled={currentIndex === filteredWords.length - 1} className="nav-btn next">
              Weiter →
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default MainPage;