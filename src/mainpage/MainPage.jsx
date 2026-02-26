import React, { useState, useEffect } from 'react';
import Flashcard from '../Flashcard'; 
import vocabData from '../vocab.json'; 

const MainPage = () => {
  const [chapter, setChapter] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filteredWords, setFilteredWords] = useState([]);
  const [category, setCategory] = useState('All');
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    let words = vocabData.filter(word => word.lektion === chapter);
    
    if (category === 'Nouns') {
      words = words.filter(w => w.artikel !== "");
    } else if (category === 'Verbs/Others') {
      words = words.filter(w => w.artikel === "");
    }
    
    setFilteredWords(words);
    setCurrentIndex(0); 
  }, [chapter, category]);

  const nextWord = () => currentIndex < filteredWords.length - 1 && setCurrentIndex(currentIndex + 1);
  const prevWord = () => currentIndex > 0 && setCurrentIndex(currentIndex - 1);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6 relative">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">A1 Vocabulary</h1>
      
      {/* Chapter Selection */}
      <div className="mb-4 flex gap-2 overflow-x-auto w-full max-w-md pb-2">
        {[1, 2, 3, 4, 5, 6].map(num => (
          <button
            key={num}
            onClick={() => setChapter(num)}
            className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap ${
              chapter === num ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 shadow-sm'
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
            className={`px-4 py-1 rounded-full text-sm font-bold ${
              category === cat ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-600'
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
          className="w-full bg-white border-2 border-gray-200 p-3 rounded-xl font-semibold flex justify-between items-center shadow-sm"
        >
          <span>{filteredWords.length > 0 ? filteredWords[currentIndex]?.deutsch : 'No words'}</span>
          <span className="text-gray-400">▼ Jump to word</span>
        </button>
        
        {showList && (
          <div className="absolute top-full left-0 w-full mt-2 bg-white border rounded-xl shadow-xl max-h-60 overflow-y-auto">
            {filteredWords.map((word, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setShowList(false);
                }}
                className={`w-full text-left p-3 hover:bg-blue-50 border-b last:border-0 ${
                  currentIndex === index ? 'bg-blue-100 font-bold' : ''
                }`}
              >
                {word.artikel} {word.deutsch} <span className="text-gray-400 text-sm ml-2">- {word.englisch}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <p className="text-gray-500 mb-4 font-medium">
        Word {currentIndex + 1} of {filteredWords.length}
      </p>

      {/* Flashcard */}
      <div className="w-full max-w-sm flex justify-center z-0">
        {filteredWords.length > 0 ? (
          <Flashcard 
            word={filteredWords[currentIndex].deutsch}
            article={filteredWords[currentIndex].artikel}
            translation={filteredWords[currentIndex].englisch}
            plural={filteredWords[currentIndex].plural}
            beispiel={filteredWords[currentIndex].beispiel}
          />
        ) : (
          <p className="text-gray-500 mt-10">No words found for this category.</p>
        )}
      </div>

      {/* Navigation Controls */}
      <div className="flex gap-4 mt-8 w-full max-w-xs justify-between z-0">
        <button onClick={prevWord} disabled={currentIndex === 0} className="px-6 py-3 bg-gray-200 rounded-xl disabled:opacity-50 font-bold hover:bg-gray-300">
          Previous
        </button>
        <button onClick={nextWord} disabled={currentIndex === filteredWords.length - 1} className="px-6 py-3 bg-blue-600 rounded-xl disabled:opacity-50 font-bold text-white shadow-lg hover:bg-blue-700">
          Next
        </button>
      </div>
    </div>
  );
};

export default MainPage;