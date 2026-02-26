import React, { useState, useEffect } from 'react';
import Flashcard from '../Flashcard';
import vocabData from '../vocab.json';

const MainPage = () => {
  const [chapter, setChapter] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filteredWords, setFilteredWords] = useState([]);
  const [category, setCategory] = useState('All');
  const [showList, setShowList] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    let words = vocabData.filter(word => word.lektion === chapter);
    if (category === 'Nouns') {
      words = words.filter(w => w.artikel !== '');
    } else if (category === 'Verbs/Others') {
      words = words.filter(w => w.artikel === '');
    }
    setFilteredWords(words);
    setCurrentIndex(0);
  }, [chapter, category]);

  const nextWord = () => currentIndex < filteredWords.length - 1 && setCurrentIndex(currentIndex + 1);
  const prevWord = () => currentIndex > 0 && setCurrentIndex(currentIndex - 1);

  // Dark mode classes
  const bg = darkMode ? 'bg-gray-900' : 'bg-gray-100';
  const text = darkMode ? 'text-gray-100' : 'text-gray-800';
  const subtext = darkMode ? 'text-gray-400' : 'text-gray-500';
  const chapterActive = 'bg-blue-600 text-white';
  const chapterInactive = darkMode ? 'bg-gray-700 text-gray-200 shadow-sm' : 'bg-white text-gray-700 shadow-sm';
  const catActive = darkMode ? 'bg-gray-100 text-gray-900' : 'bg-gray-800 text-white';
  const catInactive = darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600';
  const jumpBtn = darkMode ? 'bg-gray-800 border-gray-600 text-gray-100' : 'bg-white border-gray-200 text-gray-800';
  const dropdownBg = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';
  const dropdownItem = darkMode ? 'hover:bg-gray-700 border-gray-700 text-gray-100' : 'hover:bg-blue-50 border-gray-100 text-gray-800';
  const dropdownActive = darkMode ? 'bg-gray-600 font-bold' : 'bg-blue-100 font-bold';
  const prevBtn = darkMode ? 'bg-gray-700 text-gray-100 hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300';

  return (
    <div className={`min-h-screen ${bg} flex flex-col items-center p-6 relative transition-colors duration-300`}>

      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`absolute top-5 right-5 text-xl p-2 rounded-full transition-colors ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-200'} shadow-md`}
        title="Toggle dark mode"
      >
        {darkMode ? '☀️' : '🌙'}
      </button>

      <h1 className={`text-3xl font-bold mb-4 ${text}`}>A1 Vocabulary</h1>

      {/* Chapter Selection */}
      <div className="mb-4 flex gap-2 overflow-x-auto w-full max-w-md pb-2">
        {[1, 2, 3, 4, 5, 6].map(num => (
          <button
            key={num}
            onClick={() => setChapter(num)}
            className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-colors ${
              chapter === num ? chapterActive : chapterInactive
            }`}
          >
            Lektion {num}
          </button>
        ))}
      </div>

      {/* Category Filter */}
      <div className="mb-6 flex gap-2 w-full max-w-md justify-center">
        {['All', 'Nouns', 'Verbs/Others'].map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-1 rounded-full text-sm font-bold transition-colors ${
              category === cat ? catActive : catInactive
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Word List Jump Menu */}
      <div className="w-full max-w-sm mb-4 relative z-10">
        <button
          onClick={() => setShowList(!showList)}
          className={`w-full border-2 p-3 rounded-xl font-semibold flex justify-between items-center shadow-sm transition-colors ${jumpBtn}`}
        >
          <span>{filteredWords.length > 0 ? filteredWords[currentIndex]?.deutsch : 'No words'}</span>
          <span className={subtext}>▼ Jump to word</span>
        </button>

        {showList && (
          <div className={`absolute top-full left-0 w-full mt-2 border rounded-xl shadow-xl max-h-60 overflow-y-auto ${dropdownBg}`}>
            {filteredWords.map((word, index) => (
              <button
                key={index}
                onClick={() => { setCurrentIndex(index); setShowList(false); }}
                className={`w-full text-left p-3 border-b last:border-0 transition-colors ${dropdownItem} ${currentIndex === index ? dropdownActive : ''}`}
              >
                {word.artikel} {word.deutsch}{' '}
                <span className={`text-sm ml-2 ${subtext}`}>- {word.englisch}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <p className={`${subtext} mb-4 font-medium`}>
        Word {currentIndex + 1} of {filteredWords.length}
      </p>

      {/* Flashcard — receives swipe handlers and dark mode */}
      <div className="w-full max-w-sm flex justify-center z-0">
        {filteredWords.length > 0 ? (
          <Flashcard
            word={filteredWords[currentIndex].deutsch}
            article={filteredWords[currentIndex].artikel}
            translation={filteredWords[currentIndex].englisch}
            plural={filteredWords[currentIndex].plural}
            beispiel={filteredWords[currentIndex].beispiel}
            onSwipeLeft={nextWord}
            onSwipeRight={prevWord}
            darkMode={darkMode}
          />
        ) : (
          <p className={`${subtext} mt-10`}>No words found for this category.</p>
        )}
      </div>

      {/* Navigation Controls */}
      <div className="flex gap-4 mt-8 w-full max-w-xs justify-between z-0">
        <button
          onClick={prevWord}
          disabled={currentIndex === 0}
          className={`px-6 py-3 rounded-xl disabled:opacity-50 font-bold transition-colors ${prevBtn}`}
        >
          ← Previous
        </button>
        <button
          onClick={nextWord}
          disabled={currentIndex === filteredWords.length - 1}
          className="px-6 py-3 bg-blue-600 rounded-xl disabled:opacity-50 font-bold text-white shadow-lg hover:bg-blue-700 transition-colors"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default MainPage;