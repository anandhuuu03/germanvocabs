import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const LEVELS = ['A1', 'A2', 'B1'];

const TABS_BY_LEVEL = {
  A1: ['Family', 'Colors', 'City & Travel', 'Food & Drink'],
  A2: ['Work & Tech', 'Health & Body', 'Shopping'],
  B1: ['Media & IT', 'Advanced Travel', 'Environment & Society'],
};

const TopicsPage = () => {
  const [level, setLevel] = useState('A1');
  const [activeTab, setActiveTab] = useState(TABS_BY_LEVEL['A1'][0]);
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const changeLevel = (lvl) => {
    setLevel(lvl);
    setActiveTab(TABS_BY_LEVEL[lvl][0]);
  };

  const dm = darkMode;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        * { box-sizing: border-box; }

        .app-root {
          min-height: 100vh;
          font-family: 'DM Sans', sans-serif;
          transition: background 0.4s ease, color 0.4s ease;
          position: relative;
        }
        .app-root.light { background: #f5f0e8; color: #1a1a1a; }
        .app-root.dark { background: #0f0f0f; color: #f0ebe0; }

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
          max-width: 900px;
          margin: 0 auto;
          overflow-x: hidden;
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
        .header-actions {
          display: flex;
          align-items: center;
          gap: 0.8rem;
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

        /* Level pills */
        .gr-level-row { display: flex; gap: 0.5rem; margin-bottom: 1.25rem; width: 100%; max-width: 340px; }
        .gr-level-btn {
          flex: 1; padding: 0.55rem 0.5rem; border-radius: 10px;
          font-family: 'Playfair Display', serif; font-size: 0.95rem; font-weight: 700;
          letter-spacing: 0.04em; border: 1.5px solid transparent; cursor: pointer;
          transition: all 0.2s ease; text-align: center;
        }
        .light .gr-level-btn { background: white; color: #888; border-color: #e0d8cc; }
        .light .gr-level-btn:hover { border-color: #aaa; color: #1a1a1a; }
        .light .gr-level-btn.active { background: #2563eb; color: white; border-color: #2563eb; }
        .dark .gr-level-btn { background: #1e1e1e; color: #777; border-color: #2e2e2e; }
        .dark .gr-level-btn:hover { border-color: #555; color: #f0ebe0; }
        .dark .gr-level-btn.active { background: #2563eb; color: white; border-color: #2563eb; }

        /* Chapter/Tab pills */
        .chapter-row {
          display: flex;
          flex-wrap: nowrap;
          gap: 0.4rem;
          overflow-x: auto;
          width: 100%;
          padding-bottom: 0.5rem;
          margin-bottom: 2rem;
          -webkit-overflow-scrolling: touch;
        }
        .chapter-row::-webkit-scrollbar { height: 4px; }
        .light .chapter-row::-webkit-scrollbar-track { background: #e8e2d6; border-radius: 999px; }
        .light .chapter-row::-webkit-scrollbar-thumb { background: #c4bdb0; border-radius: 999px; }
        .dark .chapter-row::-webkit-scrollbar-track { background: #2a2a2a; border-radius: 999px; }
        .dark .chapter-row::-webkit-scrollbar-thumb { background: #555; border-radius: 999px; }
        .chapter-btn {
          flex-shrink: 0;
          padding: 0.5rem 1.2rem;
          border-radius: 999px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          border: 1.5px solid transparent;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s ease;
        }
        .light .chapter-btn { background: white; color: #444; border-color: #e0d8cc; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
        .light .chapter-btn:hover { border-color: #aaa; }
        .light .chapter-btn.active { background: #1a1a1a; color: #f5f0e8; border-color: #1a1a1a; }
        .dark .chapter-btn { background: #1e1e1e; color: #aaa; border-color: #2e2e2e; }
        .dark .chapter-btn:hover { border-color: #555; }
        .dark .chapter-btn.active { background: #f0ebe0; color: #0f0f0f; border-color: #f0ebe0; }

        /* Theme-aware Cards for Topics */
        .topic-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          width: 100%;
        }
        @media (min-width: 768px) {
          .topic-grid { grid-template-columns: repeat(2, 1fr); }
          .grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
        }

        .topic-card {
          border-radius: 1.5rem;
          padding: 1.5rem;
          border: 1.5px solid transparent;
          width: 100%;
          transition: all 0.3s ease;
        }
        .light .topic-card { background: white; border-color: #e0d8cc; box-shadow: 0 4px 12px rgba(0,0,0,0.04); }
        .dark .topic-card { background: #151515; border-color: #2a2a2a; }

        .topic-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          margin-bottom: 0.5rem;
          border: 1px solid transparent;
        }
        .light .topic-item { background: #f9f7f3; border-color: #f0ebe8; }
        .light .topic-item:hover { background: #f0ebe8; }
        .dark .topic-item { background: #1e1e1e; border-color: #2a2a2a; }
        .dark .topic-item:hover { background: #252525; }

        .text-muted { opacity: 0.5; font-size: 0.85rem; }
        .topic-title { font-size: 1.4rem; font-weight: 800; margin-bottom: 1.5rem; font-family: 'Playfair Display', serif; }

        .fade-in { animation: fadeUp 0.35s ease both; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className={`app-root ${dm ? 'dark' : 'light'}`}>
        <div className="app-content">

          {/* Header */}
          <div className="header fade-in">
            <div className="header-title">
              <span>Einfach gut!</span>
              Themen
            </div>
            <div className="header-actions">
              <Link to="/" className="grammar-link">← Back</Link>
              <button className="dark-toggle" onClick={() => setDarkMode(!dm)} title="Toggle theme">
                {dm ? '☀️' : '🌙'}
              </button>
            </div>
          </div>

          {/* Level Switcher */}
          <div className="gr-level-row fade-in" style={{ animationDelay: '0.05s' }}>
            {LEVELS.map(lvl => (
              <button key={lvl} onClick={() => changeLevel(lvl)} className={`gr-level-btn ${level === lvl ? 'active' : ''}`}>
                {lvl}
              </button>
            ))}
          </div>

          {/* Tab Row */}
          <div className="chapter-row fade-in" style={{ animationDelay: '0.1s' }}>
            {TABS_BY_LEVEL[level].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`chapter-btn ${activeTab === tab ? 'active' : ''}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* ========================================= A1 CONTENT ========================================= */}
          {level === 'A1' && activeTab === 'Family' && (
            <div className="topic-grid grid-cols-3 fade-in w-full" style={{ animationDelay: '0.15s' }}>
              <div className="topic-card">
                <h3 className="topic-title" style={{ color: dm ? '#60a5fa' : '#2563eb' }}>Masculine (der)</h3>
                {[
                  ['der Vater', 'father'], ['der Bruder', 'brother'], ['der Sohn', 'son'], 
                  ['der Opa', 'grandpa'], ['der Onkel', 'uncle'], ['der Cousin', 'cousin (male)'], 
                  ['der Neffe', 'nephew'], ['der Ehemann', 'husband']
                ].map(([ger, eng]) => (
                  <div key={ger} className="topic-item"><b>{ger}</b><span className="text-muted">{eng}</span></div>
                ))}
              </div>

              <div className="topic-card">
                <h3 className="topic-title" style={{ color: dm ? '#f87171' : '#dc2626' }}>Feminine (die)</h3>
                {[
                  ['die Mutter', 'mother'], ['die Schwester', 'sister'], ['die Tochter', 'daughter'], 
                  ['die Oma', 'grandma'], ['die Tante', 'aunt'], ['die Cousine', 'cousin (female)'], 
                  ['die Nichte', 'niece'], ['die Ehefrau', 'wife']
                ].map(([ger, eng]) => (
                  <div key={ger} className="topic-item"><b>{ger}</b><span className="text-muted">{eng}</span></div>
                ))}
              </div>

              <div className="topic-card">
                <h3 className="topic-title" style={{ color: dm ? '#facc15' : '#ca8a04' }}>Neuter / Plural</h3>
                {[
                  ['das Baby', 'baby'], ['das Kind', 'child'], 
                  ['die Eltern', 'parents (pl)'], ['die Geschwister', 'siblings (pl)'], 
                  ['die Großeltern', 'grandparents (pl)'], ['die Kinder', 'children (pl)']
                ].map(([ger, eng]) => (
                  <div key={ger} className="topic-item"><b>{ger}</b><span className="text-muted text-right max-w-[50%]">{eng}</span></div>
                ))}
              </div>
            </div>
          )}

          {level === 'A1' && activeTab === 'Colors' && (
            <div className="topic-card fade-in w-full" style={{ animationDelay: '0.15s' }}>
              <h2 className="topic-title">Die Farben (Colors & Modifiers)</h2>
              <div className="topic-grid">
                {[
                  { c: 'rot', e: 'red', hex: '#ef4444' },
                  { c: 'blau', e: 'blue', hex: '#3b82f6' },
                  { c: 'hellblau', e: 'light blue', hex: '#93c5fd' },
                  { c: 'dunkelblau', e: 'dark blue', hex: '#1e3a8a' },
                  { c: 'gelb', e: 'yellow', hex: '#eab308' },
                  { c: 'grün', e: 'green', hex: '#22c55e' },
                  { c: 'schwarz', e: 'black', hex: '#171717' },
                  { c: 'weiß', e: 'white', hex: '#ffffff', border: true },
                  { c: 'grau', e: 'gray', hex: '#737373' },
                  { c: 'braun', e: 'brown', hex: '#78350f' },
                  { c: 'orange', e: 'orange', hex: '#f97316' },
                  { c: 'rosa', e: 'pink', hex: '#f472b6' },
                  { c: 'lila', e: 'purple', hex: '#a855f7' },
                  { c: 'bunt', e: 'colorful', hex: 'conic-gradient(red, yellow, green, blue, purple, red)' },
                  { c: 'silber', e: 'silver', hex: '#cbd5e1' },
                  { c: 'gold', e: 'gold', hex: '#fbbf24' }
                ].map(color => (
                  <div key={color.c} className="topic-item" style={{ justifyContent: 'flex-start', gap: '1rem' }}>
                    <div 
                      style={{ 
                        background: color.hex, width: '24px', height: '24px', borderRadius: '50%', flexShrink: 0,
                        border: color.border || (dm && color.c === 'schwarz') ? '1px solid #777' : 'none'
                      }}
                    ></div>
                    <div className="flex-1 flex justify-between items-center">
                      <div style={{ fontWeight: 'bold' }}>{color.c}</div>
                      <div className="text-muted" style={{ fontSize: '0.75rem' }}>{color.e}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {level === 'A1' && activeTab === 'City & Travel' && (
            <div className="topic-grid fade-in w-full" style={{ animationDelay: '0.15s' }}>
              <div className="topic-card">
                <h2 className="topic-title">Wegbeschreibung (Directions)</h2>
                {[
                  ['geradeaus', 'straight ahead', '⬆️'], ['links', 'left', '⬅️'], ['rechts', 'right', '➡️'], 
                  ['abbiegen', 'to turn', '↩️'], ['um die Ecke', 'around the corner', '🔄'],
                  ['zurück', 'back', '🔙'], ['entlang', 'along', '〰️'], ['über die Straße', 'across the street', '🚶']
                ].map(([ger, eng, icon]) => (
                  <div key={ger} className="topic-item">
                    <span style={{ fontSize: '1.2rem', minWidth: '30px' }}>{icon}</span>
                    <div style={{ textAlign: 'right' }}><b>{ger}</b><br/><span className="text-muted text-xs">{eng}</span></div>
                  </div>
                ))}
              </div>

              <div className="topic-card">
                <h2 className="topic-title">Orte & Verkehr (Places & Transport)</h2>
                {[
                  ['der Bahnhof', 'train station'], ['der Flughafen', 'airport'], 
                  ['die Bushaltestelle', 'bus stop'], ['die Ampel', 'traffic light'], 
                  ['die Kreuzung', 'intersection'], ['das Auto', 'car'], 
                  ['der Bus', 'bus'], ['der Zug / die Bahn', 'train'], 
                  ['die U-Bahn', 'subway'], ['das Fahrrad', 'bicycle']
                ].map(([ger, eng]) => (
                  <div key={ger} className="topic-item">
                    <b>{ger}</b><span className="text-muted text-right max-w-[50%]">{eng}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {level === 'A1' && activeTab === 'Food & Drink' && (
            <div className="topic-grid grid-cols-3 fade-in w-full" style={{ animationDelay: '0.15s' }}>
              <div className="topic-card">
                <h2 className="topic-title">🍽️ Essen (Food)</h2>
                {[
                  ['das Brot', 'bread'], ['das Fleisch', 'meat'], ['der Fisch', 'fish'], 
                  ['das Gemüse', 'vegetables'], ['das Obst', 'fruit'], ['der Käse', 'cheese'], 
                  ['die Nudeln (pl)', 'pasta'], ['die Kartoffel', 'potato'], ['das Ei', 'egg'],
                  ['die Tomate', 'tomato'], ['der Apfel', 'apple'], ['die Banane', 'banana']
                ].map(([ger, eng]) => (
                  <div key={ger} className="topic-item"><b>{ger}</b><span className="text-muted">{eng}</span></div>
                ))}
              </div>

              <div className="topic-card">
                <h2 className="topic-title">☕ Getränke (Drinks)</h2>
                {[
                  ['das Wasser', 'water'], ['der Kaffee', 'coffee'], ['der Tee', 'tea'], 
                  ['der Saft', 'juice'], ['die Milch', 'milk'], ['das Bier', 'beer'], 
                  ['der Wein', 'wine']
                ].map(([ger, eng]) => (
                  <div key={ger} className="topic-item"><b>{ger}</b><span className="text-muted">{eng}</span></div>
                ))}
              </div>

              <div className="topic-card">
                <h2 className="topic-title">🕰️ Mahlzeiten (Meals)</h2>
                {[
                  ['das Frühstück', 'breakfast'], ['das Mittagessen', 'lunch'], 
                  ['das Abendessen', 'dinner'], ['das Salz', 'salt'], 
                  ['der Pfeffer', 'pepper'], ['der Zucker', 'sugar'], 
                  ['der Kuchen', 'cake'], ['die Schokolade', 'chocolate'],
                  ['die Suppe', 'soup']
                ].map(([ger, eng]) => (
                  <div key={ger} className="topic-item"><b>{ger}</b><span className="text-muted text-right max-w-[50%]">{eng}</span></div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================= A2 CONTENT ========================================= */}
          {level === 'A2' && activeTab === 'Work & Tech' && (
            <div className="topic-grid fade-in w-full" style={{ animationDelay: '0.15s' }}>
              <div className="topic-card">
                <h2 className="topic-title" style={{ color: dm ? '#60a5fa' : '#2563eb' }}>💻 Technologie</h2>
                {[
                  ['der Bildschirm', 'monitor / screen'], ['die Tastatur', 'keyboard'], 
                  ['der Laptop', 'laptop'], ['das Netzwerk', 'network'], 
                  ['die Daten (pl)', 'data'], ['die Software', 'software'],
                  ['das Passwort', 'password'], ['herunterladen', 'to download']
                ].map(([ger, eng]) => (
                  <div key={ger} className="topic-item"><b>{ger}</b><span className="text-muted">{eng}</span></div>
                ))}
              </div>
              <div className="topic-card">
                <h2 className="topic-title" style={{ color: dm ? '#f59e0b' : '#d97706' }}>🏢 Im Büro</h2>
                {[
                  ['das Büro', 'office'], ['der Kollege / die Kollegin', 'colleague'], 
                  ['der Termin', 'appointment'], ['die Besprechung', 'meeting'], 
                  ['der Feierabend', 'end of workday'], ['die Abteilung', 'department'],
                  ['der Vertrag', 'contract'], ['kündigen', 'to resign / quit']
                ].map(([ger, eng]) => (
                  <div key={ger} className="topic-item"><b>{ger}</b><span className="text-muted">{eng}</span></div>
                ))}
              </div>
            </div>
          )}

          {level === 'A2' && activeTab === 'Health & Body' && (
            <div className="topic-grid grid-cols-3 fade-in w-full" style={{ animationDelay: '0.15s' }}>
              <div className="topic-card">
                <h2 className="topic-title">Der Körper (Body)</h2>
                {[
                  ['der Kopf', 'head'], ['der Bauch', 'stomach'], 
                  ['der Rücken', 'back'], ['der Arm', 'arm'], 
                  ['das Bein', 'leg'], ['der Fuß', 'foot']
                ].map(([ger, eng]) => (
                  <div key={ger} className="topic-item"><b>{ger}</b><span className="text-muted">{eng}</span></div>
                ))}
              </div>
              <div className="topic-card">
                <h2 className="topic-title">Gesundheit (Health)</h2>
                {[
                  ['die Schmerzen (pl)', 'pain'], ['das Fieber', 'fever'], 
                  ['die Erkältung', 'cold'], ['der Husten', 'cough'], 
                  ['die Verletzung', 'injury'], ['die Krankheit', 'illness']
                ].map(([ger, eng]) => (
                  <div key={ger} className="topic-item"><b>{ger}</b><span className="text-muted">{eng}</span></div>
                ))}
              </div>
              <div className="topic-card">
                <h2 className="topic-title">Medizin (Medical)</h2>
                {[
                  ['der Arzt / die Ärztin', 'doctor'], ['die Apotheke', 'pharmacy'], 
                  ['das Medikament', 'medicine'], ['das Krankenhaus', 'hospital'], 
                  ['das Pflaster', 'band-aid'], ['die Salbe', 'ointment']
                ].map(([ger, eng]) => (
                  <div key={ger} className="topic-item"><b>{ger}</b><span className="text-muted">{eng}</span></div>
                ))}
              </div>
            </div>
          )}

          {level === 'A2' && activeTab === 'Shopping' && (
            <div className="topic-card fade-in w-full max-w-3xl" style={{ animationDelay: '0.15s' }}>
              <h2 className="topic-title" style={{ color: dm ? '#10b981' : '#059669' }}>Einkaufen & Geld (Shopping & Money)</h2>
              <div className="topic-grid">
                {[
                  ['die Kasse', 'cash register'], ['die Quittung', 'receipt'], 
                  ['das Angebot', 'offer / deal'], ['der Rabatt', 'discount'], 
                  ['das Bargeld', 'cash'], ['die Kreditkarte', 'credit card'],
                  ['die Rechnung', 'bill / invoice'], ['die Größe', 'size'],
                  ['die Umkleidekabine', 'fitting room'], ['das Schaufenster', 'shop window'],
                  ['anprobieren', 'to try on'], ['ausverkauft', 'sold out']
                ].map(([ger, eng]) => (
                  <div key={ger} className="topic-item"><b>{ger}</b><span className="text-muted">{eng}</span></div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================= B1 CONTENT ========================================= */}
          {level === 'B1' && activeTab === 'Media & IT' && (
            <div className="topic-grid fade-in w-full" style={{ animationDelay: '0.15s' }}>
              <div className="topic-card">
                <h2 className="topic-title" style={{ color: dm ? '#c084fc' : '#9333ea' }}>Advanced IT & Data</h2>
                {[
                  ['die Künstliche Intelligenz', 'artificial intelligence'], 
                  ['die Datenanalyse', 'data analysis'], 
                  ['die Datenbank', 'database'],
                  ['die Virtuelle Realität', 'virtual reality'], 
                  ['der Algorithmus', 'algorithm'], 
                  ['die Cloud-Speicherung', 'cloud storage'],
                  ['das Programmieren', 'programming'],
                  ['die Bereitstellung', 'deployment']
                ].map(([ger, eng]) => (
                  <div key={ger} className="topic-item"><b>{ger}</b><span className="text-muted text-right max-w-[50%]">{eng}</span></div>
                ))}
              </div>
              <div className="topic-card">
                <h2 className="topic-title" style={{ color: dm ? '#38bdf8' : '#0284c7' }}>Media & Communication</h2>
                {[
                  ['die Nachricht', 'message / news'], ['das Netzwerk', 'network'], 
                  ['die Suchmaschine', 'search engine'], ['herunterladen', 'to download'], 
                  ['hochladen', 'to upload'], ['der Benutzername', 'username'],
                  ['die Einstellungen (pl)', 'settings'], ['die Sicherheit', 'security']
                ].map(([ger, eng]) => (
                  <div key={ger} className="topic-item"><b>{ger}</b><span className="text-muted">{eng}</span></div>
                ))}
              </div>
            </div>
          )}

          {level === 'B1' && activeTab === 'Advanced Travel' && (
            <div className="topic-grid fade-in w-full" style={{ animationDelay: '0.15s' }}>
              <div className="topic-card">
                <h2 className="topic-title">Transit & Commuting</h2>
                {[
                  ['der Elektroroller', 'electric scooter'], 
                  ['die Fahrstrecke', 'route / mileage'], 
                  ['die Batterie', 'battery'], 
                  ['das Fahrzeug', 'vehicle'], 
                  ['pendeln', 'to commute'], 
                  ['die Verbindung', 'connection (transit)'],
                  ['der Fahrplan', 'schedule']
                ].map(([ger, eng]) => (
                  <div key={ger} className="topic-item"><b>{ger}</b><span className="text-muted">{eng}</span></div>
                ))}
              </div>
              <div className="topic-card">
                <h2 className="topic-title">Long-distance & Solo Travel</h2>
                {[
                  ['allein reisen', 'to travel solo'], 
                  ['die Unterkunft', 'accommodation'], 
                  ['die Fernreise', 'long-distance trip'], 
                  ['sich erholen', 'to relax / recover'], 
                  ['die Sehenswürdigkeit', 'tourist attraction'], 
                  ['das Gepäck', 'luggage'],
                  ['der Reisepass', 'passport']
                ].map(([ger, eng]) => (
                  <div key={ger} className="topic-item"><b>{ger}</b><span className="text-muted">{eng}</span></div>
                ))}
              </div>
            </div>
          )}

          {level === 'B1' && activeTab === 'Environment & Society' && (
            <div className="topic-card fade-in w-full max-w-3xl" style={{ animationDelay: '0.15s' }}>
              <h2 className="topic-title" style={{ color: dm ? '#10b981' : '#059669' }}>Umwelt & Gesellschaft (Environment & Society)</h2>
              <div className="topic-grid">
                {[
                  ['die Umwelt', 'environment'], ['der Klimawandel', 'climate change'], 
                  ['der Müll', 'trash / garbage'], ['recyceln', 'to recycle'], 
                  ['die Wirtschaft', 'economy'], ['die Gesellschaft', 'society'],
                  ['die Ausbildung', 'education / training'], ['die Regierung', 'government'],
                  ['das Gesetz', 'law'], ['die Gerechtigkeit', 'justice'],
                  ['der Umweltschutz', 'environmental protection'], ['erneuerbare Energien', 'renewable energies']
                ].map(([ger, eng]) => (
                  <div key={ger} className="topic-item"><b>{ger}</b><span className="text-muted">{eng}</span></div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default TopicsPage;