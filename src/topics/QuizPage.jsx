import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// ─────────────────────────────────────────────────────────────────────────────
// DATA & CONFIGURATION
// ─────────────────────────────────────────────────────────────────────────────

const CATEGORY_META = {
  Grammatik: { color: '#3b82f6', icon: '📖', label: 'Grammatik' },
  Kultur: { color: '#ef4444', icon: '🏰', label: 'Kultur' },
  Wortschatz: { color: '#22c55e', icon: '🔤', label: 'Wortschatz' },
  Essen: { color: '#eab308', icon: '🥨', label: 'Essen & Trinken' },
  Geschichte: { color: '#4b5563', icon: '🏛️', label: 'Geschichte' },
};

const CITIES = [
  { name: 'Berlin', icon: '🏛', desc: 'Brandenburger Tor & Geschichte', qCount: 3 },
  { name: 'Hamburg', icon: '⚓', desc: 'Hafenstadt & Fischbrötchen', qCount: 3 },
  { name: 'Köln', icon: '⛪', desc: 'Kölner Dom & Rhein', qCount: 3 },
  { name: 'Schwarzwald', icon: '🌲', desc: 'Natur & Kuckucksuhren', qCount: 3 },
  { name: 'Bayern', icon: '🥨', desc: 'Alpen & Tradition', qCount: 3 },
  { name: 'München', icon: '🍺', desc: 'Oktoberfest & Weißwurst', qCount: 3 },
  { name: 'Rheintal', icon: '🍇', desc: 'Weinberge & Burgen', qCount: 2 },
];

const FACTS = [
  "Deutschland hat über 20.000 Burgen und Schlösser.",
  "Das erste gedruckte Buch der Welt war auf Deutsch (Die Gutenberg-Bibel).",
  "Es gibt über 1.500 verschiedene Biersorten in Deutschland.",
  "Auf etwa 65% der Autobahnen gibt es kein generelles Tempolimit.",
  "Die Tradition des Weihnachtsbaums (Tannenbaum) stammt aus Deutschland.",
  "Berlin hat mehr Brücken als Venedig — rund 1.700 Stück!",
  "Das Oktoberfest beginnt eigentlich schon im September, nicht im Oktober.",
  "Deutschland grenzt an neun andere Länder, mehr als jedes andere europäische Land.",
  "Fanta wurde 1940 in Deutschland erfunden.",
  "Es gibt über 300 verschiedene Brotsorten in Deutschland.",
  "Der Zoologische Garten in Berlin ist der artenreichste Zoo der Welt.",
  "Das Studium an öffentlichen Universitäten ist in Deutschland meist kostenlos.",
  "Der längste veröffentlichte deutsche Begriff hatte 63 Buchstaben (Rindfleischetikettierungs...).",
  "Albert Einstein, Ludwig van Beethoven und Karl Marx wurden in Deutschland geboren.",
  "Gummibärchen wurden von einem Deutschen erfunden (Hans Riegel, Gründer von Haribo).",
  "Deutschland ist einer der größten Automobilhersteller der Welt.",
  "Es ist strengstens verboten, auf der Autobahn wegen Benzinmangels stehen zu bleiben.",
  "„Müller“ ist der häufigste Nachname in Deutschland.",
  "Ein Drittel Deutschlands ist noch immer mit Wäldern bedeckt.",
  "Deutschland führte 1916 als erstes Land der Welt die Sommerzeit ein."
];

const QUESTIONS = [
  {
    cat: 'Kultur',
    q: 'Welches berühmte Wahrzeichen siehst du hier?',
    img: '/images/Brandenburger.jpg',
    layout: 'landmark',
    options: ['Brandenburger Tor', 'Kölner Dom', 'Schloss Neuschwanstein', 'Reichstagsgebäude'],
    correct: 0,
    note: 'Das Brandenburger Tor in Berlin ist ein weltbekanntes Symbol der Deutschen Einheit.',
  },
  {
    cat: 'Grammatik',
    q: '„Ich bin glücklich, ___ ich habe eine neue Stelle." Welches Wort passt (normale Wortstellung)?',
    options: ['weil', 'obwohl', 'denn', 'damit'],
    layout: 'standard',
    correct: 2,
    note: '„denn" ist der einzige Konnektor mit normaler Wortstellung (Verb Position 2).',
  },
  {
    cat: 'Geschichte',
    q: 'Wann ist der „Tag der Deutschen Einheit"?',
    img: '/images/unity.jpg', 
    layout: 'standard',
    options: ['1. Mai', '3. Oktober', '25. Dezember', '9. November'],
    correct: 1,
    note: 'Der 3. Oktober 1990 markiert die offizielle Wiedervereinigung Deutschlands.',
  },
  {
    cat: 'Essen',
    q: 'Wie heißt dieses traditionelle Getränk auf Deutsch?',
    img: '/images/beer.jpg', 
    layout: 'food',
    options: ['der Wein', 'das Bier', 'der Saft', 'die Milch'],
    correct: 1,
    note: '„das Bier" — Deutschland ist weltbekannt für sein Reinheitsgebot von 1516.',
  },
  {
    cat: 'Grammatik',
    q: 'Welches Verb passt: „Ich ___ dir." (braucht Dativ)',
    options: ['sehe', 'helfe', 'kenne', 'liebe'],
    layout: 'standard',
    correct: 1,
    note: '„helfen" gehört zu den klassischen Dativ-Verben (PHDGAS).',
  },
  {
    cat: 'Kultur',
    q: 'Welches märchenhafte Schloss steht in Bayern?',
    img: '/images/castle.jpg', 
    layout: 'landscape',
    options: ['Schloss Sanssouci', 'Schloss Neuschwanstein', 'Wartburg', 'Heidelberger Schloss'],
    correct: 1,
    note: 'Schloss Neuschwanstein wurde von König Ludwig II. erbaut und inspirierte das Disney-Schloss.',
  },
  {
    cat: 'Grammatik',
    q: 'Wie bildet man das Futur I?',
    options: ['haben + Partizip II', 'werden + Infinitiv', 'sein + Partizip II', 'würde + Infinitiv'],
    layout: 'standard',
    correct: 1,
    note: 'z.B. „Ich werde morgen arbeiten." — Das Infinitiv steht am Satzende.',
  },
  {
    cat: 'Essen',
    q: 'Was ist der deutsche Name für dieses Gebäck?',
    img: '/images/pretzel.jpg', 
    layout: 'food',
    options: ['das Brot', 'die Brezel', 'der Kuchen', 'das Brötchen'],
    correct: 1,
    note: '„die Brezel" ist besonders in Süddeutschland ein beliebtes Traditionsgebäck.',
  },
  {
    cat: 'Kultur',
    q: 'Welcher berühmte Fluss fließt an dieser Kathedrale (Kölner Dom) vorbei?',
    img: '/images/cathederal.jpg', 
    layout: 'landmark',
    options: ['die Donau', 'die Elbe', 'der Rhein', 'die Isar'],
    correct: 2,
    note: 'Der Rhein ist mit ca. 1233 km einer der längsten und wichtigsten Flüsse Europas.',
  },
  {
    cat: 'Grammatik',
    q: '„Er ist krank. ___ arbeitet er." Welches Wort passt (Verb direkt danach)?',
    options: ['weil', 'trotzdem', 'obwohl', 'damit'],
    layout: 'standard',
    correct: 1,
    note: '„trotzdem" steht am Satzanfang eines zweiten Satzes, das Verb folgt direkt (Position 2).',
  },
  {
    cat: 'Geschichte',
    q: 'Wer ist dieser in Ulm geborene berühmte Wissenschaftler?',
    img: '/images/albert.jpg', 
    layout: 'person',
    options: ['Albert Einstein', 'Isaac Newton', 'Nikola Tesla', 'Marie Curie'],
    correct: 0,
    note: 'Albert Einstein wurde 1879 in Ulm geboren und veränderte mit der Relativitätstheorie die Welt.',
  },
  {
    cat: 'Grammatik',
    q: 'Welches Relativpronomen passt: „Das ist der Mann, ___ ich kenne." (Akkusativ)',
    options: ['der', 'den', 'dem', 'dessen'],
    layout: 'standard',
    correct: 1,
    note: 'Nur das Maskulinum ändert sich im Akkusativ: der → den.',
  },
  {
    cat: 'Wortschatz',
    q: 'Wie heißt dieses Fahrzeug auf Deutsch?',
    img: '/images/cycle.jpg', 
    layout: 'landscape',
    options: ['das Auto', 'der Bus', 'das Fahrrad', 'der Zug'],
    correct: 2,
    note: '„das Fahrrad" — Deutschland hat ein riesiges und sehr aktives Radwegnetz.',
  },
  {
    cat: 'Kultur',
    q: 'Wofür stehen die Farben der deutschen Flagge (offizielle Deutung)?',
    img: '/images/flag.jpg',
    layout: 'flag',
    options: ['Einheit, Freiheit und Demokratie', 'Frieden, Natur und Sonne', 'Macht, Liebe und Reichtum', 'Norden, Mitte und Süden'],
    correct: 0,
    note: 'Schwarz-Rot-Gold steht offiziell für Einheit, Recht und Freiheit — Werte der deutschen Demokratie.',
},
  {
    cat: 'Grammatik',
    q: '„Ich mag ___ Kaffee ___ Tee." (sowohl ...)',
    options: ['entweder … oder', 'weder … noch', 'sowohl … als auch', 'zwar … aber'],
    layout: 'standard',
    correct: 2,
    note: '„sowohl … als auch" betont, dass BEIDES gilt — keine Wahl nötig.',
  },
  {
    cat: 'Essen',
    q: 'Welches Gericht gilt oft als deutsches Nationalgericht (mariniertes Rindfleisch)?',
    options: ['Paella', 'Sauerbraten', 'Ratatouille', 'Risotto'],
    layout: 'standard',
    correct: 1,
    note: 'Sauerbraten wird oft tagelang in Essig und Wein eingelegt, bevor er gebraten wird.',
  },
  {
    cat: 'Grammatik',
    q: '„Wegen ___ Regens bleibe ich zu Hause." Welcher Kasus / welche Endung passt?',
    options: ['der Regen', 'den Regen', 'des Regens', 'dem Regen'],
    layout: 'standard',
    correct: 2,
    note: 'Die Präposition „wegen" verlangt im Standarddeutschen den Genitiv: des Regens.',
  },
  {
    cat: 'Kultur',
    q: 'Wie heißt dieses berühmte Winterfest auf Deutsch?',
    img: '/images/market.jpg', 
    layout: 'landscape',
    options: ['Ostern', 'Der Weihnachtsmarkt', 'Silvester', 'Karneval'],
    correct: 1,
    note: 'Die deutschen Weihnachtsmärkte (wie der Christkindlesmarkt in Nürnberg) sind weltberühmt.',
  },
  {
    cat: 'Grammatik',
    q: 'Wie bildet man das Passiv Präsens?',
    options: ['wurde + Partizip II', 'wird + Partizip II', 'ist + Partizip II', 'hat + Partizip II'],
    layout: 'standard',
    correct: 1,
    note: 'z.B. „Das Brot wird täglich gebacken." (Fokus liegt auf der Aktion, nicht auf dem Bäcker).',
  },
  {
    cat: 'Kultur',
    q: 'Auf welchem Straßensystem gibt es auf vielen Abschnitten kein Tempolimit?',
    img: '/images/autobahn.jpg', 
    layout: 'landscape',
    options: ['Die Bundesstraße', 'Die Landstraße', 'Die Autobahn', 'Die Spielstraße'],
    correct: 2,
    note: 'Die deutsche Autobahn ist international dafür bekannt, dass es auf rund 65% der Strecken kein generelles Tempolimit gibt.',
  },
];

const TOTAL = QUESTIONS.length;
const FALLBACK_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450' viewBox='0 0 800 450'%3E%3Crect width='800' height='450' fill='%23e5e7eb'/%3E%3Cpath d='M300 280 L350 220 L420 300 L500 200 L580 320 L220 320 Z' fill='%239ca3af'/%3E%3Ccircle cx='320' cy='180' r='30' fill='%239ca3af'/%3E%3C/svg%3E";

const getCityForIndex = (index) => {
  let count = 0;
  for (let i = 0; i < CITIES.length; i++) {
    count += CITIES[i].qCount;
    if (index < count) return CITIES[i];
  }
  return CITIES[CITIES.length - 1];
};

// ─────────────────────────────────────────────────────────────────────────────
// REUSABLE IMAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

const QuestionImage = ({ src, alt, darkMode, layout }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    setLoaded(false);
    setError(false);
    
    if (imgRef.current && imgRef.current.complete) {
      setLoaded(true);
    }
  }, [src]);

  let layoutClass = 'qz-image-wrap';
  if (layout === 'food') layoutClass += ' qz-layout-food';
  if (layout === 'person') layoutClass += ' qz-layout-person';
  if (layout === 'flag') layoutClass += ' qz-layout-flag';
  if (layout === 'landmark') layoutClass += ' qz-layout-landmark';

  return (
    <div className={layoutClass}>
      {!loaded && !error && (
        <div className={`qz-skeleton ${darkMode ? 'dark' : 'light'}`}></div>
      )}
      <img
        ref={imgRef}
        src={error ? FALLBACK_IMAGE : src}
        alt={alt}
        className={`qz-image ${loaded || error ? 'visible' : 'hidden'}`}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        loading="lazy"
      />
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

const QuizPage = () => {
  // Phases: 'loading' | 'welcome' | 'quiz' | 'completion' | 'results'
  const [phase, setPhase] = useState('loading');
  const [current, setCurrent] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  
  // Animation & Transition Overlay States
  const [isAnimating, setIsAnimating] = useState(false);
  const [animClass, setAnimClass] = useState('in-right');
  const [transitionType, setTransitionType] = useState(null); // 'fact' | 'city' | null
  const [pendingNext, setPendingNext] = useState(0);
  const [factIndex, setFactIndex] = useState(0);

  // Initialization
  useEffect(() => {
    const timer = setTimeout(() => setPhase('welcome'), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Image Preloader
  useEffect(() => {
    if (current < TOTAL - 1) {
      const nextImg = QUESTIONS[current + 1]?.img;
      if (nextImg) {
        const img = new Image();
        img.src = nextImg;
      }
    }
  }, [current]);

  const q = QUESTIONS[current];
  const meta = CATEGORY_META[q?.cat];
  const currentCity = getCityForIndex(current);
  const dm = darkMode;

  // ── TRANSITION LOGIC (Automatic 3-Second Flow) ──

  const handleNext = () => {
    if (isAnimating || transitionType) return;
    
    const nextIdx = current + 1;
    if (nextIdx >= TOTAL) {
      setPhase('completion');
      return;
    }

    setIsAnimating(true);
    setAnimClass('out-left');

    // Wait for the slide-out animation to finish
    setTimeout(() => {
      const nextCity = getCityForIndex(nextIdx);
      if (currentCity.name !== nextCity.name) {
        setTransitionType('city');
      } else {
        setTransitionType('fact');
        setFactIndex((prev) => (prev + 1) % FACTS.length);
      }
      setPendingNext(nextIdx);

      // Show the Fact/City overlay for EXACTLY 3 seconds
      setTimeout(() => {
        setTransitionType(null);
        setCurrent(nextIdx);
        setAnimClass('in-right');
        
        setTimeout(() => setIsAnimating(false), 400);
      }, 3000);

    }, 300);
  };

  const handlePrev = () => {
    if (current === 0 || isAnimating || transitionType) return;
    const prevIdx = current - 1;
    
    setIsAnimating(true);
    setAnimClass('out-right');
    
    setTimeout(() => {
      setCurrent(prevIdx);
      setAnimClass('in-left');
      setTimeout(() => setIsAnimating(false), 400);
    }, 300);
  };

  const directJump = (index) => {
    if (index === current || isAnimating || transitionType) return;
    
    setIsAnimating(true);
    setAnimClass(index > current ? 'out-left' : 'out-right');
    
    setTimeout(() => {
      setCurrent(index);
      setAnimClass(index > current ? 'in-right' : 'in-left');
      setTimeout(() => setIsAnimating(false), 400);
    }, 300);
  };

  const restart = () => {
    setCurrent(0);
    setPhase('welcome');
    setAnimClass('in-right');
  };

  // ── RENDER HELPERS ──

  const renderPassport = () => {
    const visitedCities = [];
    let cumulative = 0;
    for (let i = 0; i < CITIES.length; i++) {
      cumulative += CITIES[i].qCount;
      if (current >= cumulative) {
        visitedCities.push(CITIES[i].name);
      }
    }

    return (
      <div className="passport-widget">
        <div className="passport-header">🛂 Deutscher Reisepass</div>
        <div className="passport-grid">
          {CITIES.map((c) => {
            const isVisited = visitedCities.includes(c.name);
            const isCurrent = c.name === currentCity.name;
            return (
              <div key={c.name} className={`passport-stamp ${isVisited ? 'visited' : ''} ${isCurrent ? 'current' : ''}`}>
                <span className="stamp-icon">{isVisited ? '✔' : c.icon}</span>
                <span className="stamp-name">{c.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (phase) {
      case 'loading':
        return (
          <div className="full-screen-center">
            <div className="flag-pulse">🇩🇪</div>
            <div className="loading-text">Willkommen...</div>
            <div className="loading-sub">Reise wird vorbereitet</div>
          </div>
        );
        
      case 'welcome':
        return (
          <div className="welcome-screen in-right">
            <div className="welcome-flag">🇩🇪</div>
            <h1 className="welcome-title">Willkommen!</h1>
            <p className="welcome-subtitle">Deutschland Kulturreise</p>
            <div className="welcome-divider" />
            <ul className="welcome-list">
              <li>🏰 Entdecke Deutschland</li>
              <li>📚 Teste dein Deutsch</li>
              <li>🌍 Reise durch 7 Städte</li>
              <li>📍 20 Fragen</li>
            </ul>
            <div className="welcome-divider" />
            <button className="primary-btn lg" onClick={() => { setPhase('quiz'); setAnimClass('in-right'); }}>
              Reise beginnen
            </button>
          </div>
        );

      case 'completion':
        return (
          <div className="welcome-screen in-right">
            <div className="welcome-flag" style={{ fontSize: '4rem' }}>🎉</div>
            <h2 className="welcome-title" style={{ fontSize: '2.4rem' }}>Herzlichen Glückwunsch!</h2>
            <p className="welcome-subtitle" style={{ marginBottom: '2rem' }}>Du hast die Deutschlandreise abgeschlossen.</p>
            <div className="completion-list">
              <p>Besuchte Reiseziele:</p>
              {CITIES.map(c => <div key={c.name} className="c-item">✔ {c.name}</div>)}
            </div>
            <p style={{ marginTop: '2rem', fontWeight: 600 }}>Vielen Dank fürs Mitmachen!</p>
            <button className="primary-btn lg" style={{ marginTop: '1.5rem' }} onClick={() => setPhase('results')}>
              Lösungen & Erklärungen
            </button>
          </div>
        );

      case 'results':
        return (
          <div className="in-right" style={{ width: '100%' }}>
            <div className="res-hero">
              <div className="res-icon">🏆</div>
              <h1 className="res-title">Deutschland Quiz</h1>
              <p className="res-subtitle">Lösungen & Erklärungen</p>
            </div>

            <div className="res-list">
              {QUESTIONS.map((item, i) => {
                const m = CATEGORY_META[item.cat];
                return (
                  <div key={i} className="res-card" style={{ borderTop: `4px solid ${m.color}` }}>
                    <div className="res-top">
                      <div className="res-num">{i + 1}</div>
                      <div style={{ flex: 1 }}>
                        <span className="qz-cat-badge" style={{ background: `${m.color}15`, color: m.color, padding: '0.2rem 0.6rem', fontSize: '0.65rem', marginBottom: '0.5rem' }}>
                          {m.icon} {m.label}
                        </span>
                        <h3 className="res-q">{item.q}</h3>
                      </div>
                      {item.img && <img src={item.img} alt="" className="res-img" loading="lazy" onError={(e) => e.target.src = FALLBACK_IMAGE} />}
                    </div>
                    <div className="res-answer">
                      ✓ {String.fromCharCode(65 + item.correct)} — {item.options[item.correct]}
                    </div>
                    <div className="res-note">{item.note}</div>
                  </div>
                );
              })}
            </div>

            <div className="res-outro">
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🇩🇪</div>
              <h2>Vielen Dank!</h2>
              <p>Wir hoffen, dass dir die Deutschlandreise gefallen hat.</p>
              <p>Bis bald!</p>
              <p style={{ color: '#ef4444', fontWeight: 'bold' }}>❤️ Deutschland</p>
              <button className="primary-btn lg" style={{ marginTop: '2rem' }} onClick={restart}>Reise neu starten</button>
            </div>
          </div>
        );

      case 'quiz':
      default:
        const isLast = current === TOTAL - 1;
        const pendingCity = getCityForIndex(pendingNext);

        return (
          <>
            {renderPassport()}
            
            <div className="dest-banner">
              <div className="dest-info">
                <div className="dest-icon">{currentCity.icon}</div>
                <div className="dest-text">
                  <p>Aktuelles Reiseziel</p>
                  <h3>{currentCity.name}</h3>
                </div>
              </div>
              <div className="dest-progress">Frage {current + 1} / {TOTAL}</div>
            </div>

            <div className="anim-container">
              {transitionType === 'fact' && (
                <div className="transition-box fact-style">
                  <div className="t-icon">💡</div>
                  <h2 className="t-title" style={{ color: '#3b82f6' }}>Wusstest du schon?</h2>
                  <p className="t-fact">{FACTS[factIndex]}</p>
                </div>
              )}
              
              {transitionType === 'city' && (
                <div className="transition-box city-style">
                  <p className="t-sub" style={{ color: '#10b981' }}>📍 Nächstes Reiseziel</p>
                  <h2 className="t-title">Willkommen in {pendingCity.name}</h2>
                  <div className="t-icon" style={{ fontSize: '3rem', margin: '1rem 0' }}>{pendingCity.icon}</div>
                  <p className="t-fact" style={{ opacity: 0.6, fontSize: '1rem' }}>Bekannt für {pendingCity.desc}</p>
                </div>
              )}

              {!transitionType && (
                <div className={`qz-card ${animClass} ${isLast ? 'final-challenge' : ''}`} style={{ border: `1px solid ${isLast ? '#eab308' : meta.color}40` }}>
                  {!isLast && <div className="qz-card-top-border" style={{ background: meta.color }} />}
                  
                  {isLast ? (
                    <div className="final-badge">🏁 Letztes Reiseziel — Finale Herausforderung</div>
                  ) : (
                    <span className="qz-cat-badge" style={{ background: `${meta.color}15`, color: meta.color }}>
                      {meta.icon} {meta.label}
                    </span>
                  )}
                  
                  {q.img && <QuestionImage src={q.img} alt={q.q} darkMode={dm} layout={q.layout} />}
                  
                  {!q.img && q.emoji && (
                    <div style={{ fontSize: '3.5rem', textAlign: 'center', marginBottom: '1.5rem' }}>{q.emoji}</div>
                  )}

                  <h2 className="qz-question">{q.q}</h2>

                  {/* Options are pure display elements */}
                  <div className="qz-options">
                    {q.options.map((opt, i) => (
                      <div key={i} className="qz-option">
                        <span className="qz-option-letter">{String.fromCharCode(65 + i)}</span>
                        {opt}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Dots */}
            <div className="qz-nav-dots">
              {QUESTIONS.map((_, idx) => {
                let statusClass = 'upcoming';
                if (idx === current) statusClass = 'current';
                else if (idx < current) statusClass = 'visited';

                return (
                  <button 
                    key={idx} 
                    className={`qz-nav-num ${statusClass}`}
                    onClick={() => directJump(idx)}
                    title={`Frage ${idx + 1}`}
                    disabled={isAnimating || transitionType}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Bottom Navigation Bar */}
            <div className="qz-nav">
              <button onClick={handlePrev} disabled={current === 0 || isAnimating || transitionType} className="qz-nav-btn secondary">
                ← Zurück
              </button>
              <button onClick={handleNext} disabled={isAnimating || transitionType} className="qz-nav-btn primary">
                {isLast ? 'Reise abschließen 🎉' : 'Weiter →'}
              </button>
            </div>
          </>
        );
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }

        .qz-root { min-height: 100vh; font-family: 'DM Sans', sans-serif; transition: background 0.4s ease, color 0.4s ease; position: relative; overflow-x: hidden; }
        .qz-root.light { background: #f9f7f3; color: #1a1a1a; }
        .qz-root.dark { background: #0a0a0a; color: #f0ebe0; }
        
        .qz-root::before {
          content: ''; position: fixed; inset: 0; opacity: 0.03; pointer-events: none; z-index: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
        }

        .qz-content { position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center; padding: 2rem 1.5rem 5rem; max-width: 760px; margin: 0 auto; min-height: 100vh; }

        /* Header */
        .header { width: 100%; display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 2rem; }
        .header-title { font-family: 'Playfair Display', serif; font-size: 2.2rem; font-weight: 900; line-height: 1; letter-spacing: -0.02em; }
        .header-title span { display: block; font-size: 0.75rem; font-family: 'DM Sans', sans-serif; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; opacity: 0.5; margin-bottom: 0.4rem; }
        .header-actions { display: flex; align-items: center; gap: 0.8rem; }
        .dark-toggle { background: none; border: none; cursor: pointer; font-size: 1.3rem; padding: 0.5rem; border-radius: 50%; transition: background 0.2s; line-height: 1; }
        .light .dark-toggle:hover { background: rgba(0,0,0,0.06); }
        .dark .dark-toggle:hover { background: rgba(255,255,255,0.08); }
        .back-link { text-decoration: none; font-size: 0.85rem; font-weight: 600; padding: 0.45rem 1rem; border-radius: 999px; transition: all 0.2s ease; }
        .light .back-link { border: 1.5px solid #1a1a1a; color: #1a1a1a; }
        .light .back-link:hover { background: #1a1a1a; color: #f5f0e8; }
        .dark .back-link { border: 1.5px solid #f0ebe0; color: #f0ebe0; }
        .dark .back-link:hover { background: #f0ebe0; color: #0f0f0f; }

        /* Full Screen States */
        .full-screen-center { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 60vh; text-align: center; }
        .flag-pulse { font-size: 4rem; animation: pulse 1.5s infinite ease-in-out; margin-bottom: 1rem; }
        @keyframes pulse { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.1); opacity: 0.7; } 100% { transform: scale(1); opacity: 1; } }
        .loading-text { font-family: 'Playfair Display', serif; font-size: 1.5rem; font-weight: 700; margin-bottom: 0.5rem; }
        .loading-sub { font-size: 0.85rem; opacity: 0.6; text-transform: uppercase; letter-spacing: 0.1em; }

        /* Welcome Screen */
        .welcome-screen { text-align: center; max-width: 400px; width: 100%; margin-top: 2rem; }
        .welcome-flag { font-size: 4rem; margin-bottom: 1rem; }
        .welcome-title { font-family: 'Playfair Display', serif; font-size: 2.8rem; font-weight: 900; margin: 0 0 0.5rem; }
        .welcome-subtitle { font-size: 1.1rem; opacity: 0.7; font-weight: 500; margin-bottom: 2rem; }
        .welcome-divider { height: 1px; background: currentColor; opacity: 0.1; width: 100%; margin: 1.5rem 0; }
        .welcome-list { list-style: none; padding: 0; margin: 0; text-align: left; display: flex; flex-direction: column; gap: 1rem; font-size: 1.1rem; font-weight: 500; }
        .welcome-list li { display: flex; align-items: center; gap: 1rem; }
        .completion-list { background: rgba(150,150,150,0.05); padding: 1.5rem; border-radius: 16px; text-align: left; }
        .completion-list p { font-weight: 700; opacity: 0.5; text-transform: uppercase; letter-spacing: 0.1em; font-size: 0.8rem; margin-bottom: 1rem; }
        .c-item { display: flex; gap: 0.5rem; align-items: center; font-weight: 600; margin-bottom: 0.5rem; font-size: 1.05rem; }

        /* Primary Button */
        .primary-btn { padding: 1rem 2rem; border-radius: 999px; border: none; cursor: pointer; font-weight: 800; font-size: 1rem; background: #1a1a1a; color: #f5f0e8; box-shadow: 0 6px 20px rgba(0,0,0,0.15); transition: all 0.3s ease; }
        .dark .primary-btn { background: #f0ebe0; color: #0a0a0a; box-shadow: 0 6px 20px rgba(255,255,255,0.1); }
        .primary-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(0,0,0,0.2); }
        .primary-btn.lg { font-size: 1.1rem; padding: 1.2rem 2.5rem; width: 100%; }

        /* Transition Box (Fact / City) */
        .transition-box {
          text-align: center; padding: 4rem 2.5rem; border-radius: 28px; width: 100%; margin-bottom: 1.5rem;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          animation: popIn 0.4s ease forwards;
        }
        .light .transition-box { background: white; box-shadow: 0 12px 40px -12px rgba(0,0,0,0.08); border: 1px solid #e8e2d6; }
        .dark .transition-box { background: #151515; box-shadow: 0 12px 40px -12px rgba(0,0,0,0.6); border: 1px solid #222; }
        .t-icon { font-size: 4rem; margin-bottom: 1.5rem; line-height: 1; }
        .t-title { font-family: 'Playfair Display', serif; font-size: 2.2rem; font-weight: 900; margin-bottom: 1rem; line-height: 1.2; }
        .t-sub { font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 0.5rem; }
        .t-fact { font-size: 1.25rem; line-height: 1.6; font-weight: 500; }
        
        @keyframes popIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }

        /* Passport Widget */
        .passport-widget { width: 100%; background: rgba(150,150,150,0.05); border-radius: 18px; padding: 1.25rem; margin-bottom: 1.5rem; border: 1px solid rgba(150,150,150,0.1); }
        .passport-header { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.6; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem; }
        .passport-grid { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .passport-stamp { padding: 0.4rem 0.75rem; border-radius: 8px; font-size: 0.8rem; font-weight: 600; display: flex; align-items: center; gap: 0.4rem; opacity: 0.4; border: 1px solid transparent; transition: all 0.3s; }
        .passport-stamp.visited { opacity: 1; background: rgba(34,197,94,0.1); color: #16a34a; border-color: rgba(34,197,94,0.2); }
        .passport-stamp.current { opacity: 1; background: rgba(59,130,246,0.1); color: #3b82f6; border-color: rgba(59,130,246,0.2); transform: scale(1.05); }
        .stamp-icon { font-size: 0.9rem; }

        /* Destination Banner */
        .dest-banner { width: 100%; border-radius: 18px; padding: 1.25rem 1.5rem; margin-bottom: 1.5rem; display: flex; align-items: center; justify-content: space-between; background: rgba(255,255,255,0.6); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.4); box-shadow: 0 8px 32px rgba(0,0,0,0.04); }
        .dark .dest-banner { background: rgba(30,30,30,0.6); border-color: rgba(255,255,255,0.05); }
        .dest-info { display: flex; align-items: center; gap: 0.75rem; }
        .dest-icon { font-size: 1.8rem; line-height: 1; }
        .dest-text h3 { margin: 0; font-family: 'Playfair Display', serif; font-size: 1.3rem; font-weight: 800; }
        .dest-text p { margin: 0; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.5; font-weight: 600; }
        .dest-progress { font-size: 0.85rem; font-weight: 700; opacity: 0.6; }

        /* Animations */
        .anim-container { width: 100%; position: relative; }
        .out-left { animation: slideOutLeft 0.3s forwards ease-in-out; }
        .in-right { animation: slideInRight 0.4s forwards cubic-bezier(0.2, 0.8, 0.2, 1); }
        .out-right { animation: slideOutRight 0.3s forwards ease-in-out; }
        .in-left { animation: slideInLeft 0.4s forwards cubic-bezier(0.2, 0.8, 0.2, 1); }

        @keyframes slideOutLeft { to { opacity: 0; transform: translateX(-40px); } }
        @keyframes slideInRight { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slideOutRight { to { opacity: 0; transform: translateX(40px); } }
        @keyframes slideInLeft { from { opacity: 0; transform: translateX(-40px); } to { opacity: 1; transform: translateX(0); } }

        /* Question Card */
        .qz-card { width: 100%; border-radius: 28px; padding: 2.5rem 2rem; transition: background 0.3s, border-color 0.3s, box-shadow 0.3s; position: relative; overflow: hidden; }
        .light .qz-card { background: white; box-shadow: 0 12px 40px -12px rgba(0,0,0,0.08); }
        .dark .qz-card { background: #151515; box-shadow: 0 12px 40px -12px rgba(0,0,0,0.6); }
        .qz-card-top-border { position: absolute; top: 0; left: 0; right: 0; height: 6px; }

        .final-challenge { background: linear-gradient(135deg, rgba(234,179,8,0.1), transparent) !important; box-shadow: 0 0 40px rgba(234,179,8,0.2) !important; }
        .final-badge { font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: #eab308; margin-bottom: 1.5rem; display: inline-block; padding: 0.4rem 1rem; border-radius: 999px; border: 1px solid rgba(234,179,8,0.3); background: rgba(234,179,8,0.1); }

        .qz-cat-badge { display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.35rem 0.9rem; border-radius: 999px; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 1.5rem; }

        /* Images and Layouts */
        .qz-image-wrap { width: 100%; border-radius: 18px; overflow: hidden; margin-bottom: 1.75rem; position: relative; box-shadow: 0 4px 20px rgba(0,0,0,0.1); background: #eee; }
        .qz-skeleton { position: absolute; inset: 0; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent); background-size: 200% 100%; animation: skeletonShimmer 1.5s infinite linear; }
        .light .qz-skeleton { background-color: #e5e7eb; }
        .dark .qz-skeleton { background-color: #262626; }
        @keyframes skeletonShimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        .qz-image { width: 100%; height: 100%; object-fit: cover; display: block; transition: opacity 0.4s ease; }
        .qz-image.hidden { opacity: 0; }
        .qz-image.visible { opacity: 1; }
        
        .qz-layout-landmark { aspect-ratio: 16/9; border-radius: 12px; }
        .qz-layout-landscape { aspect-ratio: 21/9; border-radius: 16px; }
        .qz-layout-flag { aspect-ratio: 5/3; border-radius: 8px; border: 1px solid rgba(150,150,150,0.2); box-shadow: none; }
        .qz-layout-person { aspect-ratio: 1/1; width: 180px; height: 180px; border-radius: 50%; margin: 0 auto 1.75rem; border: 4px solid rgba(150,150,150,0.1); }
        .qz-layout-food { aspect-ratio: 4/3; border-radius: 24px; }

        .qz-question { font-family: 'Playfair Display', serif; font-size: 1.45rem; font-weight: 800; line-height: 1.4; margin-bottom: 2rem; text-align: center; }

        .qz-options { display: flex; flex-direction: column; gap: 0.75rem; }
        
        /* Options are now purely for display: cursor set to default */
        .qz-option { padding: 1rem 1.25rem; border-radius: 16px; font-size: 0.95rem; font-weight: 600; display: flex; align-items: center; gap: 0.85rem; cursor: default; }
        .light .qz-option { background: #f9f7f3; border: 1px solid #e8e2d6; }
        .dark .qz-option { background: #1e1e1e; border: 1px solid #2a2a2a; }
        .qz-option-letter { width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 800; flex-shrink: 0; }
        .light .qz-option-letter { background: white; color: #555; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
        .dark .qz-option-letter { background: #0a0a0a; color: #aaa; box-shadow: 0 2px 8px rgba(0,0,0,0.3); }

        /* Dot Navigation */
        .qz-nav-dots { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.6rem; margin-top: 2rem; }
        .qz-nav-num { width: 34px; height: 34px; border-radius: 50%; border: none; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.85rem; cursor: pointer; transition: all 0.2s ease; color: white; }
        .light .qz-nav-num.upcoming { background: #e8e2d6; color: #888; }
        .dark .qz-nav-num.upcoming { background: #333; color: #888; }
        .qz-nav-num.visited { background: #10b981; color: white; }
        .qz-nav-num.current { background: #3b82f6; color: white; transform: scale(1.15); box-shadow: 0 4px 12px rgba(59,130,246,0.3); }

        /* Nav Buttons */
        .qz-nav { display: flex; gap: 1rem; width: 100%; justify-content: space-between; margin-top: 2rem; }
        .qz-nav-btn { flex: 1; padding: 1rem; border-radius: 16px; font-size: 0.9rem; font-weight: 700; border: none; cursor: pointer; transition: all 0.2s ease; letter-spacing: 0.04em; }
        .qz-nav-btn:disabled { opacity: 0.3; cursor: not-allowed; }
        .qz-nav-btn.secondary { background: transparent; border: 1.5px solid currentColor; opacity: 0.55; }
        .qz-nav-btn.secondary:not(:disabled):hover { opacity: 1; background: rgba(150,150,150,0.1); }
        .qz-nav-btn.primary { background: #1a1a1a; color: #f5f0e8; box-shadow: 0 6px 20px rgba(0,0,0,0.15); }
        .dark .qz-nav-btn.primary { background: #f0ebe0; color: #0a0a0a; box-shadow: 0 6px 20px rgba(255,255,255,0.1); }
        .qz-nav-btn.primary:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(0,0,0,0.2); }

        /* Results Premium Page */
        .res-hero { text-align: center; margin-bottom: 3rem; animation: slideInRight 0.6s ease; }
        .res-icon { font-size: 4rem; margin-bottom: 1rem; }
        .res-title { font-family: 'Playfair Display', serif; font-size: 2.8rem; font-weight: 900; margin-bottom: 0.5rem; }
        .res-subtitle { font-size: 1.1rem; opacity: 0.6; font-weight: 500; }
        .res-list { display: flex; flex-direction: column; gap: 1.5rem; width: 100%; margin-bottom: 4rem; }
        .res-card { width: 100%; border-radius: 24px; padding: 1.75rem; display: flex; flex-direction: column; gap: 1rem; animation: fadeUp 0.5s ease backwards; }
        .light .res-card { background: white; border: 1px solid #e8e2d6; box-shadow: 0 6px 24px rgba(0,0,0,0.04); }
        .dark .res-card { background: #151515; border: 1px solid #222; }
        .res-top { display: flex; gap: 1rem; align-items: flex-start; }
        .res-num { width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.9rem; flex-shrink: 0; font-family: 'Playfair Display', serif; background: #1a1a1a; color: #f5f0e8; }
        .dark .res-num { background: #f0ebe0; color: #0f0f0f; }
        .res-q { font-weight: 800; font-size: 1.1rem; line-height: 1.4; margin: 0; font-family: 'Playfair Display', serif; }
        .res-answer { display: flex; align-items: center; gap: 0.6rem; padding: 0.8rem 1rem; border-radius: 12px; font-weight: 700; font-size: 0.9rem; background: rgba(34,197,94,0.1); color: #16a34a; }
        .res-note { font-size: 0.85rem; opacity: 0.65; line-height: 1.6; padding-left: 1rem; border-left: 2px solid rgba(150,150,150,0.2); }
        .res-img { width: 100px; height: 70px; border-radius: 12px; object-fit: cover; flex-shrink: 0; }
        .res-outro { text-align: center; padding: 3rem 0; border-top: 1px solid rgba(150,150,150,0.2); animation: fadeUp 0.8s ease backwards; animation-delay: 0.5s; }
        .res-outro h2 { font-family: 'Playfair Display', serif; font-size: 2.2rem; font-weight: 900; margin-bottom: 1rem; }
        .res-outro p { font-size: 1.1rem; font-weight: 500; margin-bottom: 0.5rem; }

        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

        /* ───────────────────────────────────────────────────────── */
        /* LARGE SCREEN / SMART TV OPTIMIZATIONS                     */
        /* ───────────────────────────────────────────────────────── */
        @media (min-width: 1024px) {
          .qz-content { max-width: 1200px; padding-top: 4rem; }
          
          .header-title { font-size: 3rem; }
          .header-title span { font-size: 1rem; }

          /* Split Layout for Questions */
          .qz-card {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-areas: 
              "top top"
              "badge badge"
              "img q"
              "img opt";
            gap: 0 4rem;
            align-items: center;
            padding: 3.5rem;
          }
          
          .qz-card-top-border { grid-area: top; }
          .final-badge, .qz-cat-badge { grid-area: badge; justify-self: center; margin-bottom: 2.5rem; }
          
          .qz-image-wrap { grid-area: img; margin: 0; height: 100%; min-height: 350px; }
          .qz-question { grid-area: q; text-align: left; font-size: 2rem; margin-bottom: 2rem; align-self: end; }
          .qz-options { grid-area: opt; align-self: start; }
          .qz-option { font-size: 1.1rem; padding: 1.25rem 1.5rem; }

          /* Centered Layout for Questions without Images */
          .qz-card:not(:has(.qz-image-wrap)) {
            grid-template-columns: 1fr;
            grid-template-areas: 
              "top"
              "badge"
              "emoji"
              "q"
              "opt";
          }
          .qz-card:not(:has(.qz-image-wrap)) .qz-question { text-align: center; }
          .qz-card:not(:has(.qz-image-wrap)) .qz-options { max-width: 600px; margin: 0 auto; width: 100%; }

          /* 2-Column Grid for Results Page */
          .res-list { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
          .res-card { margin-bottom: 0; }
        }

        /* ───────────────────────────────────────────────────────── */
        /* TOUCHSCREEN & SMARTBOARD OPTIMIZATIONS                    */
        /* ───────────────────────────────────────────────────────── */
        @media (pointer: coarse) {
          /* Prevent accidental text highlighting while tapping */
          .qz-root {
            user-select: none;
            -webkit-user-select: none;
          }
          
          /* Allow text selection inside the fact box */
          .t-fact {
            user-select: text;
            -webkit-user-select: text;
          }

          /* Make navigation buttons massive and easy to hit on a big board */
          .qz-nav {
            margin-top: 3rem;
            gap: 1.5rem;
          }
          .qz-nav-btn {
            padding: 1.5rem;
            font-size: 1.25rem;
            border-radius: 20px;
          }

          /* Make the navigation dots much larger for fat-finger tapping */
          .qz-nav-dots {
            gap: 1rem;
            margin-top: 3rem;
          }
          .qz-nav-num {
            width: 46px;
            height: 46px;
            font-size: 1.1rem;
          }
          
          /* Make the theme toggle easy to hit */
          .dark-toggle {
            font-size: 1.8rem;
            padding: 0.8rem;
          }
        }
      `}</style>

      <div className={`qz-root ${dm ? 'dark' : 'light'}`}>
        <div className="qz-content">

          {/* Header */}
          <div className="header">
            <div className="header-title">
              <span>Einfach gut!</span>
              Kulturreise
            </div>
            <div className="header-actions">
              <Link to="/" className="back-link">← Zurück</Link>
              <button className="dark-toggle" onClick={() => setDarkMode(!dm)} title="Theme umschalten">
                {dm ? '☀️' : '🌙'}
              </button>
            </div>
          </div>

          {renderContent()}

        </div>
      </div>
    </>
  );
};

export default QuizPage;