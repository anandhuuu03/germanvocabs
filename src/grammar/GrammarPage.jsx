import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GrammarPage = ({ darkMode = false }) => {
  const [activeTab, setActiveTab] = useState('Articles');
  const tabs = ['Articles', 'Pronouns', 'Verbs', 'Sentences'];
  const dm = darkMode;
  const navigate = useNavigate();

  const possessiveData = [
    { p: 'ich (I)', v: 'mein' },
    { p: 'du (you)', v: 'dein' },
    { p: 'er (he) / es (it)', v: 'sein' },
    { p: 'sie (she)', v: 'ihr' },
    { p: 'wir (we)', v: 'unser' },
    { p: 'ihr (you pl)', v: 'euer' },
    { p: 'sie (they) / Sie (formal)', v: 'ihr/Ihr' }
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        * { box-sizing: border-box; }

        .gr-root {
          min-height: 100vh;
          font-family: 'DM Sans', sans-serif;
          transition: background 0.4s ease, color 0.4s ease;
          position: relative;
        }
        .gr-root.light { background: #f5f0e8; color: #1a1a1a; }
        .gr-root.dark  { background: #0f0f0f; color: #f0ebe0; }

        .gr-root::before {
          content: '';
          position: fixed;
          inset: 0;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
        }

        .gr-content {
          position: relative;
          z-index: 1;
          max-width: 860px;
          margin: 0 auto;
          padding: 2.5rem 1.5rem 5rem;
        }

        .gr-header { margin-bottom: 2.5rem; }
        .gr-back {
          display: inline-flex; align-items: center; gap: 0.4rem;
          font-size: 0.78rem; font-weight: 600; letter-spacing: 0.06em;
          text-transform: uppercase; border: none; background: none;
          cursor: pointer; padding: 0.4rem 0; margin-bottom: 1rem;
          opacity: 0.45; transition: opacity 0.2s; font-family: 'DM Sans', sans-serif;
        }
        .light .gr-back { color: #1a1a1a; }
        .dark  .gr-back { color: #f0ebe0; }
        .gr-back:hover { opacity: 1; }
        .gr-title {
          font-family: 'Playfair Display', serif; font-weight: 900;
          font-size: clamp(2rem, 6vw, 3rem); line-height: 1;
          letter-spacing: -0.02em; margin-bottom: 0.3rem;
        }
        .gr-subtitle {
          font-size: 0.82rem; font-weight: 500; letter-spacing: 0.16em;
          text-transform: uppercase; opacity: 0.4; font-style: italic;
        }

        .gr-tabs {
          display: flex; gap: 0.4rem; margin-bottom: 2.5rem;
          padding: 0.35rem; border-radius: 16px; width: fit-content;
        }
        .light .gr-tabs { background: white; box-shadow: 0 2px 12px rgba(0,0,0,0.07); }
        .dark  .gr-tabs { background: #1a1a1a; box-shadow: 0 2px 12px rgba(0,0,0,0.4); }

        .gr-tab {
          padding: 0.55rem 1.4rem; border-radius: 10px;
          font-family: 'DM Sans', sans-serif; font-size: 0.82rem;
          font-weight: 600; letter-spacing: 0.04em; border: none;
          cursor: pointer; transition: all 0.2s ease; white-space: nowrap;
        }
        .light .gr-tab         { background: transparent; color: #888; }
        .light .gr-tab:hover   { color: #1a1a1a; }
        .light .gr-tab.active  { background: #1a1a1a; color: #f5f0e8; }
        .dark  .gr-tab         { background: transparent; color: #555; }
        .dark  .gr-tab:hover   { color: #f0ebe0; }
        .dark  .gr-tab.active  { background: #f0ebe0; color: #0f0f0f; }

        .gr-card {
          border-radius: 24px; padding: 1.75rem; margin-bottom: 1.5rem;
          overflow-x: auto; transition: background 0.3s, border-color 0.3s;
        }
        .light .gr-card { background: white; border: 1px solid #e8e2d6; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
        .dark  .gr-card { background: #141414; border: 1px solid #222; box-shadow: 0 4px 20px rgba(0,0,0,0.4); }

        .gr-card-title {
          font-family: 'Playfair Display', serif; font-size: 1.15rem;
          font-weight: 700; margin-bottom: 1.25rem;
          display: flex; align-items: center; gap: 0.6rem;
        }
        .gr-card-title .accent-bar { width: 3px; height: 1.2rem; border-radius: 999px; flex-shrink: 0; }

        .gr-table {
          width: 100%; border-collapse: collapse; font-size: 0.85rem; min-width: 560px;
        }
        .gr-table thead tr { font-size: 0.68rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; }
        .light .gr-table thead tr { color: #aaa; background: #faf7f2; }
        .dark  .gr-table thead tr { color: #555; background: #1a1a1a; }
        .gr-table th, .gr-table td { padding: 0.75rem 1rem; text-align: left; }
        .light .gr-table tbody tr { border-bottom: 1px solid #f0ebe8; }
        .dark  .gr-table tbody tr { border-bottom: 1px solid #1e1e1e; }
        .light .gr-table tbody tr:hover { background: #faf7f2; }
        .dark  .gr-table tbody tr:hover { background: #1a1a1a; }

        .col-m { border-left: 3px solid #3b82f6; }
        .col-f { border-left: 3px solid #ef4444; }
        .col-n { border-left: 3px solid #22c55e; }
        .col-p { border-left: 3px solid #f59e0b; }

        .akk-row-light { background: rgba(59,130,246,0.04); }
        .dat-row-light { background: rgba(245,158,11,0.04); }
        .akk-row-dark  { background: rgba(59,130,246,0.06); }
        .dat-row-dark  { background: rgba(245,158,11,0.06); }

        .gr-tip {
          margin-top: 1rem; padding: 0.85rem 1.1rem;
          border-radius: 12px; font-size: 0.78rem; line-height: 1.6;
        }
        .light .gr-tip { background: #faf7f2; color: #888; }
        .dark  .gr-tip { background: #1a1a1a; color: #666; }

        .verb-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 0.85rem; }
        .verb-card {
          padding: 0.85rem 1rem; border-radius: 14px;
          display: flex; flex-direction: column; gap: 0.3rem; transition: background 0.2s;
        }
        .light .verb-card { background: #faf7f2; border: 1px solid #e8e2d6; }
        .dark  .verb-card { background: #1a1a1a; border: 1px solid #222; }
        .verb-name { font-weight: 700; font-size: 0.95rem; }
        .verb-trans {
          font-size: 0.68rem; font-weight: 700; letter-spacing: 0.08em;
          text-transform: uppercase; padding: 0.15rem 0.5rem;
          border-radius: 999px; width: fit-content;
        }
        .light .verb-trans { background: white; color: #aaa; border: 1px solid #e8e2d6; }
        .dark  .verb-trans { background: #222; color: #555; border: 1px solid #2a2a2a; }
        .verb-example { font-size: 0.78rem; font-style: italic; opacity: 0.5; line-height: 1.4; }

        .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
        @media (max-width: 600px) { .two-col { grid-template-columns: 1fr; } }

        .modal-grid { display: flex; flex-wrap: wrap; gap: 0.6rem; }
        .modal-pill { padding: 0.5rem 1rem; border-radius: 999px; font-size: 0.82rem; font-weight: 600; }
        .light .modal-pill { background: #faf7f2; border: 1px solid #e8e2d6; color: #1a1a1a; }
        .dark  .modal-pill { background: #1a1a1a; border: 1px solid #2a2a2a; color: #f0ebe0; }

        .modal-formula {
          padding: 0.85rem 1.25rem; border-radius: 12px; font-size: 0.85rem;
          text-align: center; font-family: 'DM Sans', sans-serif;
          margin-bottom: 1rem; letter-spacing: 0.02em;
        }
        .light .modal-formula { background: #faf7f2; border: 1px solid #e8e2d6; }
        .dark  .modal-formula  { background: #1a1a1a; border: 1px solid #222; }

        .sep-row {
          display: flex; flex-direction: column; gap: 0.25rem;
          transition: background 0.15s; border-radius: 10px; padding: 0.75rem;
        }
        .light .sep-row { border-bottom: 1px solid #f0ebe8; }
        .dark  .sep-row { border-bottom: 1px solid #1e1e1e; }
        .light .sep-row:hover { background: #faf7f2; }
        .dark  .sep-row:hover { background: #1a1a1a; }
        .sep-row:last-child { border-bottom: none; }
        .sep-verb { font-family: 'Playfair Display', serif; font-size: 1.1rem; font-weight: 700; }
        .sep-example { font-size: 0.78rem; font-style: italic; opacity: 0.55; line-height: 1.5; }

        .patterns-section { border-radius: 28px; padding: 2rem; margin-top: 2rem; position: relative; overflow: hidden; }
        .light .patterns-section { background: #1a1a1a; color: #f0ebe0; }
        .dark  .patterns-section { background: #0a0a0a; color: #f0ebe0; border: 1px solid #222; }
        .patterns-glow {
          position: absolute; top: -60px; right: -60px; width: 240px; height: 240px;
          background: #3b82f6; border-radius: 50%; filter: blur(100px); opacity: 0.12; pointer-events: none;
        }
        .patterns-title { font-family: 'Playfair Display', serif; font-size: 1.6rem; font-weight: 900; margin-bottom: 1.5rem; position: relative; z-index: 1; }
        .patterns-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 1rem; position: relative; z-index: 1; }
        .pattern-card { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 1.1rem; backdrop-filter: blur(8px); }
        .pattern-label { font-size: 0.62rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; margin-bottom: 0.5rem; display: block; }
        .pattern-text { font-size: 0.8rem; line-height: 1.55; color: rgba(240,235,224,0.65); }

        .gr-fade { animation: grFade 0.35s ease both; }
        @keyframes grFade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

        .akk { color: #3b82f6; font-weight: 700; }
        .neg { color: #ef4444; font-weight: 700; }
        .dat { color: #f59e0b; font-weight: 700; }

        /* prep pill grid */
        .prep-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 0.6rem; margin-bottom: 1.25rem; }
        .prep-pill {
          padding: 0.65rem 0.85rem; border-radius: 12px;
        }
        .prep-pill-word { font-weight: 800; font-size: 0.95rem; }
        .prep-pill-meaning { font-size: 0.68rem; opacity: 0.5; margin-top: 0.15rem; }

        /* wechsel two-box */
        .wechsel-boxes { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem; }
        @media (max-width: 500px) { .wechsel-boxes { grid-template-columns: 1fr; } }
        .wechsel-box { padding: 1rem; border-radius: 14px; }

        /* contraction grid */
        .contraction-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(155px, 1fr)); gap: 0.75rem; }
        .contraction-item { padding: 0.75rem 1rem; border-radius: 12px; }

        /* imperative exception boxes */
        .imp-exception { padding: 0.85rem 1rem; border-radius: 12px; }

        /* question trick rows */
        .q-trick-row { display: flex; align-items: center; gap: 1rem; padding: 0.75rem 1rem; border-radius: 12px; margin-bottom: 0.5rem; }

        /* dativ+akk example */
        .dat-akk-example { padding: 1rem; border-radius: 14px; margin-bottom: 0.75rem; }
        .dat-akk-pills { display: flex; gap: 0.75rem; flex-wrap: wrap; margin-top: 0.75rem; }
        .dat-akk-pill { padding: 0.4rem 1rem; border-radius: 999px; font-weight: 700; font-size: 0.82rem; }
      `}</style>

      <div className={`gr-root ${dm ? 'dark' : 'light'}`}>
        <div className="gr-content">

          {/* Header */}
          <div className="gr-header">
            <button
              onClick={() => navigate('/')}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                fontSize: '0.78rem', fontFamily: 'DM Sans, sans-serif',
                fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
                opacity: 0.4, marginBottom: '1rem', padding: 0,
                color: 'inherit', transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = 1}
              onMouseLeave={e => e.currentTarget.style.opacity = 0.4}
            >
              ← Back
            </button>
            <p className="gr-subtitle">Einfach gut! · A1</p>
            <h1 className="gr-title">Grammar Hub</h1>
          </div>

          {/* Tabs */}
          <div className="gr-tabs">
            {tabs.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`gr-tab ${activeTab === tab ? 'active' : ''}`}>
                {tab}
              </button>
            ))}
          </div>

          {/* ── ARTICLES ── */}
          {activeTab === 'Articles' && (
            <div className="gr-fade">

              {/* Definite / Indefinite / Negative Articles */}
              <div className="gr-card">
                <h2 className="gr-card-title" style={{color: '#3b82f6'}}>
                  <span className="accent-bar" style={{background: '#3b82f6'}}></span>
                  Bestimmte, Unbestimmte &amp; Negative Artikel
                </h2>
                <table className="gr-table">
                  <thead>
                    <tr>
                      <th>Case</th>
                      <th className="col-m">Masculine (der)</th>
                      <th className="col-f">Feminine (die)</th>
                      <th className="col-n">Neuter (das)</th>
                      <th className="col-p">Plural (die)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{opacity:0.5, fontStyle:'italic', fontWeight:600}}>Nominativ</td>
                      <td className="col-m">der / ein / <span className="neg">kein</span></td>
                      <td className="col-f">die / eine / <span className="neg">keine</span></td>
                      <td className="col-n">das / ein / <span className="neg">kein</span></td>
                      <td className="col-p">die / — / <span className="neg">keine</span></td>
                    </tr>
                    <tr className={dm ? 'akk-row-dark' : 'akk-row-light'}>
                      <td style={{fontStyle:'italic', fontWeight:700}}><span className="akk">Akkusativ</span></td>
                      <td className="col-m"><span className="akk">den / einen / <span className="neg">keinen</span></span></td>
                      <td className="col-f">die / eine / <span className="neg">keine</span></td>
                      <td className="col-n">das / ein / <span className="neg">kein</span></td>
                      <td className="col-p">die / — / <span className="neg">keine</span></td>
                    </tr>
                    <tr className={dm ? 'dat-row-dark' : 'dat-row-light'}>
                      <td style={{fontStyle:'italic', fontWeight:700}}><span className="dat">Dativ</span></td>
                      <td className="col-m"><span className="dat">dem / einem / keinem</span></td>
                      <td className="col-f"><span className="dat">der / einer / keiner</span></td>
                      <td className="col-n"><span className="dat">dem / einem / keinem</span></td>
                      <td className="col-p"><span className="dat">den / — / keinen (+n)</span></td>
                    </tr>
                  </tbody>
                </table>
                <div className="gr-tip"><b>Tip:</b> "Kein" follows the exact same ending pattern as "ein". Just add a 'k'!</div>
              </div>

              {/* ── NEW: Wechselpräpositionen ── */}
              <div className="gr-card" style={{borderLeft:'3px solid #8b5cf6'}}>
                <h2 className="gr-card-title" style={{color:'#8b5cf6'}}>
                  <span className="accent-bar" style={{background:'#8b5cf6'}}></span>
                  Wechselpräpositionen — Two-way Prepositions
                </h2>
                <p style={{fontSize:'0.78rem', fontStyle:'italic', opacity:0.5, marginBottom:'1.25rem'}}>
                  These 9 prepositions take <b>Akkusativ</b> for movement (Wohin?) or <b>Dativ</b> for location (Wo?).
                </p>
                <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(80px, 1fr))', gap:'0.6rem', marginBottom:'1.25rem'}}>
                  {['an','auf','in','über','unter','vor','hinter','neben','zwischen'].map(p => (
                    <div key={p} style={{
                      padding:'0.6rem', borderRadius:'12px', textAlign:'center',
                      background: dm ? 'rgba(139,92,246,0.08)' : 'rgba(139,92,246,0.06)',
                      border: `1px solid ${dm ? 'rgba(139,92,246,0.2)' : 'rgba(139,92,246,0.15)'}`,
                      fontWeight:700, fontSize:'0.95rem', color:'#8b5cf6',
                    }}>{p}</div>
                  ))}
                </div>
                <div className="wechsel-boxes">
                  <div className="wechsel-box" style={{
                    background: dm ? 'rgba(59,130,246,0.07)' : 'rgba(59,130,246,0.05)',
                    border: `1px solid ${dm ? 'rgba(59,130,246,0.18)' : 'rgba(59,130,246,0.12)'}`,
                  }}>
                    <p style={{fontWeight:700, color:'#3b82f6', fontSize:'0.72rem', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.5rem'}}>Akkusativ → Movement (Wohin?)</p>
                    <p style={{fontStyle:'italic', fontSize:'0.85rem', opacity:0.7}}>Ich gehe <span className="akk">in die</span> Schule.</p>
                  </div>
                  <div className="wechsel-box" style={{
                    background: dm ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.05)',
                    border: `1px solid ${dm ? 'rgba(245,158,11,0.18)' : 'rgba(245,158,11,0.12)'}`,
                  }}>
                    <p style={{fontWeight:700, color:'#f59e0b', fontSize:'0.72rem', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.5rem'}}>Dativ → Location (Wo?)</p>
                    <p style={{fontStyle:'italic', fontSize:'0.85rem', opacity:0.7}}>Ich bin <span className="dat">in der</span> Schule.</p>
                  </div>
                </div>
              </div>

              {/* ── NEW: Contractions ── */}
              <div className="gr-card" style={{borderLeft:'3px solid #14b8a6'}}>
                <h2 className="gr-card-title" style={{color:'#14b8a6'}}>
                  <span className="accent-bar" style={{background:'#14b8a6'}}></span>
                  Kontraktionen — Preposition + Article Mergers
                </h2>
                <p style={{fontSize:'0.78rem', fontStyle:'italic', opacity:0.5, marginBottom:'1.25rem'}}>
                  These preposition + article combinations are always contracted in standard German:
                </p>
                <div className="contraction-grid">
                  {[
                    ['an + dem','am','Ich bin am Bahnhof.'],
                    ['in + dem','im','Er ist im Haus.'],
                    ['zu + dem','zum','Ich gehe zum Arzt.'],
                    ['zu + der','zur','Ich gehe zur Schule.'],
                    ['von + dem','vom','Das ist vom Chef.'],
                    ['bei + dem','beim','Er ist beim Arzt.'],
                    ['an + das','ans','Ich gehe ans Meer.'],
                    ['in + das','ins','Wir gehen ins Kino.'],
                  ].map(([full, short, ex]) => (
                    <div key={full} className="contraction-item" style={{
                      background: dm ? '#1a1a1a' : '#faf7f2',
                      border: `1px solid ${dm ? '#222' : '#e8e2d6'}`,
                    }}>
                      <div style={{display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'0.3rem'}}>
                        <span style={{opacity:0.35, fontSize:'0.75rem', textDecoration:'line-through'}}>{full}</span>
                        <span style={{color:'#14b8a6', fontWeight:800, fontSize:'1rem'}}>→ {short}</span>
                      </div>
                      <div style={{fontSize:'0.72rem', fontStyle:'italic', opacity:0.5}}>{ex}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ── PRONOUNS ── */}
          {activeTab === 'Pronouns' && (
            <div className="gr-fade">

              {/* ── NEW: Dativ Pronouns ── */}
              <div className="gr-card">
                <h2 className="gr-card-title" style={{color:'#f59e0b'}}>
                  <span className="accent-bar" style={{background:'#f59e0b'}}></span>
                  Personal Pronomen
                </h2>
                <p style={{fontSize:'0.78rem', fontStyle:'italic', opacity:0.5, marginBottom:'1.25rem'}}>
                  Used when the pronoun is the indirect object — the receiver (Wem?).
                </p>
                <table className="gr-table">
                  <thead>
                    <tr>
                      <th>Nominativ</th>
                      <th style={{color:'#a855f7'}}>Akkusativ</th>
                      <th><span className="dat">Dativ</span></th>
                      <th>English</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['ich','mich','mir','I / me / To me'],
                      ['du','dich','dir','you / to you '],
                      ['er','ihn','ihm','he / him / to him'],
                      ['sie','sie','ihr','she / her / to her'],
                      ['es','es','ihm','it / to it'],
                      ['wir','uns','uns','we / us / to us'],
                      ['ihr','euch','euch','you all / to you'],
                      ['sie / Sie','sie / Sie','ihnen / Ihnen','they / You (formal) / to you / to them'],
                    ].map(([nom, akk, dat, eng]) => (
                      <tr key={nom}>
                        <td style={{fontWeight:600}}>{nom}</td>
                        <td style={{color:'#a855f7', fontWeight:700}}>{akk}</td>
                        <td><span className="dat">{dat}</span></td>
                        <td style={{opacity:0.4, fontSize:'0.8rem', fontStyle:'italic'}}>{eng}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="gr-tip">
                  Example: Ich gebe <span className="dat">dir</span> das Buch. → I give <b>you</b> the book.
                </div>
              </div>

              {/* Possessive Articles — Nom, Akk, Dat */}
              <div className="gr-card">
                <h2 className="gr-card-title" style={{color:'#f59e0b'}}>
                  <span className="accent-bar" style={{background:'#f59e0b'}}></span>
                  Possessivartikel — Nominativ, Akkusativ &amp; Dativ
                </h2>
                <div style={{display:'flex', gap:'1rem', flexWrap:'wrap', marginBottom:'1rem'}}>
                  <span style={{fontSize:'0.7rem', fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', padding:'0.2rem 0.65rem', borderRadius:'999px', background:'rgba(59,130,246,0.1)', color:'#3b82f6'}}>Masc Akk: +en</span>
                  <span style={{fontSize:'0.7rem', fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', padding:'0.2rem 0.65rem', borderRadius:'999px', background:'rgba(245,158,11,0.1)', color:'#f59e0b'}}>Dat: +em (m/n) · +er (f) · +en (pl)</span>
                </div>
                <table className="gr-table">
                  <thead>
                    <tr>
                      <th>Pronoun</th>
                      <th className="col-m">Masc</th>
                      <th className="col-f">Fem</th>
                      <th className="col-n">Neut</th>
                      <th className="col-p">Plural</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { p:'ich', nom:['mein','meine','mein','meine'], akk:['meinen','meine','mein','meine'], dat:['meinem','meiner','meinem','meinen'] },
                      { p:'du', nom:['dein','deine','dein','deine'], akk:['deinen','deine','dein','deine'], dat:['deinem','deiner','deinem','deinen'] },
                      { p:'er/es', nom:['sein','seine','sein','seine'], akk:['seinen','seine','sein','seine'], dat:['seinem','seiner','seinem','seinen'] },
                      { p:'sie (she)', nom:['ihr','ihre','ihr','ihre'], akk:['ihren','ihre','ihr','ihre'], dat:['ihrem','ihrer','ihrem','ihren'] },
                      { p:'wir', nom:['unser','unsere','unser','unsere'], akk:['unseren','unsere','unser','unsere'], dat:['unserem','unserer','unserem','unseren'] },
                      { p:'ihr (pl)', nom:['euer','eure','euer','eure'], akk:['euren','eure','euer','eure'], dat:['eurem','eurer','eurem','euren'] },
                      { p:'sie/Sie', nom:['ihr/Ihr','ihre/Ihre','ihr/Ihr','ihre/Ihre'], akk:['ihren/Ihren','ihre/Ihre','ihr/Ihr','ihre/Ihre'], dat:['ihrem/Ihrem','ihrer/Ihrer','ihrem/Ihrem','ihren/Ihren'] },
                    ].map(row => (
                      <React.Fragment key={row.p}>
                        <tr style={{borderBottom:'none'}}>
                          <td rowSpan={3} style={{opacity:0.55, fontSize:'0.8rem', fontWeight:600, verticalAlign:'top', paddingTop:'0.9rem', borderRight:`1px solid ${dm ? '#2a2a2a' : '#e8e2d6'}`}}>{row.p}</td>
                          <td className="col-m" style={{fontSize:'0.8rem', paddingBottom:'0.2rem'}}>{row.nom[0]}</td>
                          <td className="col-f" style={{fontSize:'0.8rem', paddingBottom:'0.2rem'}}>{row.nom[1]}</td>
                          <td className="col-n" style={{fontSize:'0.8rem', paddingBottom:'0.2rem'}}>{row.nom[2]}</td>
                          <td className="col-p" style={{fontSize:'0.8rem', paddingBottom:'0.2rem'}}>{row.nom[3]}</td>
                        </tr>
                        <tr style={{borderBottom:'none'}}>
                          <td className="col-m" style={{fontSize:'0.8rem', paddingTop:'0.2rem', paddingBottom:'0.2rem'}}><span className="akk">{row.akk[0]}</span></td>
                          <td className="col-f" style={{fontSize:'0.8rem', paddingTop:'0.2rem', paddingBottom:'0.2rem'}}><span className="akk">{row.akk[1]}</span></td>
                          <td className="col-n" style={{fontSize:'0.8rem', paddingTop:'0.2rem', paddingBottom:'0.2rem'}}><span className="akk">{row.akk[2]}</span></td>
                          <td className="col-p" style={{fontSize:'0.8rem', paddingTop:'0.2rem', paddingBottom:'0.2rem'}}><span className="akk">{row.akk[3]}</span></td>
                        </tr>
                        <tr>
                          <td className="col-m" style={{fontSize:'0.8rem', paddingTop:'0.2rem'}}><span className="dat">{row.dat[0]}</span></td>
                          <td className="col-f" style={{fontSize:'0.8rem', paddingTop:'0.2rem'}}><span className="dat">{row.dat[1]}</span></td>
                          <td className="col-n" style={{fontSize:'0.8rem', paddingTop:'0.2rem'}}><span className="dat">{row.dat[2]}</span></td>
                          <td className="col-p" style={{fontSize:'0.8rem', paddingTop:'0.2rem'}}><span className="dat">{row.dat[3]}</span></td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
                <div style={{display:'flex', gap:'1.5rem', marginTop:'1rem', flexWrap:'wrap', fontSize:'0.75rem', opacity:0.55, fontStyle:'italic'}}>
                  <span>Row 1 = <b>Nominativ</b></span>
                  <span style={{color:'#3b82f6'}}>Row 2 = <b>Akkusativ</b></span>
                  <span style={{color:'#f59e0b'}}>Row 3 = <b>Dativ</b></span>
                </div>
              </div>

            </div>
          )}

          {/* ── VERBS ── */}
          {activeTab === 'Verbs' && (
            <div className="gr-fade">

              {/* Präsens Conjugation */}
              <div className="gr-card" style={{borderLeft: '3px solid #a855f7'}}>
                <h2 className="gr-card-title" style={{color:'#a855f7'}}>
                  <span className="accent-bar" style={{background:'#a855f7'}}></span>
                  Präsens — Present Tense Conjugation
                </h2>
                <p style={{fontSize:'0.78rem', fontStyle:'italic', opacity:0.5, marginBottom:'1.25rem'}}>
                  Drop the <b>-en</b> from the infinitive (e.g., mach-en) and add these endings:
                </p>
                <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(140px, 1fr))', gap:'0.75rem'}}>
                  {[
                    { p: 'ich', e: '-e', ex: 'mach-e' },
                    { p: 'du', e: '-st', ex: 'mach-st' },
                    { p: 'er/es/sie', e: '-t', ex: 'mach-t' },
                    { p: 'wir', e: '-en', ex: 'mach-en' },
                    { p: 'ihr', e: '-t', ex: 'mach-t' },
                    { p: 'sie/Sie', e: '-en', ex: 'mach-en' }
                  ].map(item => (
                    <div key={item.p} style={{
                      padding: '0.75rem 1rem', borderRadius: '12px',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      background: dm ? 'rgba(168,85,247,0.07)' : 'rgba(168,85,247,0.06)',
                      border: `1px solid ${dm ? 'rgba(168,85,247,0.15)' : 'rgba(168,85,247,0.12)'}`,
                    }}>
                      <span style={{fontWeight:600, fontSize:'0.88rem'}}>{item.p}</span>
                      <div style={{textAlign:'right'}}>
                        <div style={{fontWeight:800, fontSize:'1.1rem', color:'#a855f7'}}>{item.e}</div>
                        <div style={{fontSize:'0.65rem', opacity:0.45, fontFamily:'monospace'}}>{item.ex}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── NEW: Akkusativ Verbs — expanded to 24 ── */}
              <div className="gr-card" style={{borderLeft: '3px solid #22c55e'}}>
                <h2 className="gr-card-title" style={{color:'#22c55e'}}>
                  <span className="accent-bar" style={{background:'#22c55e'}}></span>
                  Verben mit Akkusativ
                </h2>
                <p style={{fontSize:'0.78rem', fontStyle:'italic', opacity:0.5, marginBottom:'0.4rem'}}>
                  Structure: <b>Subject + Verb + Akkusativ Object</b>
                </p>
                <p style={{fontSize:'0.78rem', fontStyle:'italic', opacity:0.5, marginBottom:'1.25rem'}}>
                  Example: Ich sehe <span className="akk">den Mann</span>. · Ich lese <span className="akk">das Buch</span>.
                </p>
                <div className="verb-grid">
                  {[
                    { v: 'haben', t: 'to have', e: 'Ich habe einen Bruder.' },
                    { v: 'sehen', t: 'to see', e: 'Wir sehen den Lehrer.' },
                    { v: 'besuchen', t: 'to visit', e: 'Ich besuche meinen Opa.' },
                    { v: 'essen', t: 'to eat', e: 'Er isst den Apfel.' },
                    { v: 'trinken', t: 'to drink', e: 'Sie trinkt den Kaffee.' },
                    { v: 'kaufen', t: 'to buy', e: 'Sie kauft einen Laptop.' },
                    { v: 'lieben', t: 'to love', e: 'Ich liebe dich.' },
                    { v: 'suchen', t: 'to search', e: 'Er sucht den Schlüssel.' },
                    { v: 'finden', t: 'to find', e: 'Ich finde das Buch.' },
                    { v: 'bestellen', t: 'to order', e: 'Wir bestellen einen Kaffee.' },
                    { v: 'buchen', t: 'to book', e: 'Sie bucht ein Hotel.' },
                    { v: 'nehmen', t: 'to take', e: 'Ich nehme den Bus.' },
                    { v: 'lesen', t: 'to read', e: 'Ich lese das Buch.' },
                    { v: 'hören', t: 'to hear', e: 'Er hört die Musik.' },
                    { v: 'schreiben', t: 'to write', e: 'Sie schreibt einen Brief.' },
                    { v: 'lernen', t: 'to learn', e: 'Ich lerne Deutsch.' },
                    { v: 'besitzen', t: 'to own', e: 'Er besitzt ein Auto.' },
                    { v: 'aufräumen', t: 'to clean up', e: 'Ich räume das Zimmer auf.' },
                    { v: 'bekommen', t: 'to get / receive', e: 'Sie bekommt einen Brief.' },
                    { v: 'brauchen', t: 'to need', e: 'Brauchst du einen Stift?' },
                    { v: 'reparieren', t: 'to repair', e: 'Er repariert das Auto.' },
                    { v: 'vergessen', t: 'to forget', e: 'Ich vergesse den Namen.' },
                    { v: 'verlieren', t: 'to lose', e: 'Sie verliert den Schlüssel.' },
                    { v: 'verstehen', t: 'to understand', e: 'Ich verstehe die Frage.' },
                  ].map(item => (
                    <div key={item.v} className="verb-card">
                      <span className="verb-name" style={{color:'#22c55e'}}>{item.v}</span>
                      <span className="verb-trans">{item.t}</span>
                      <span className="verb-example">"{item.e}"</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Regular vs Irregular */}
              <div className="two-col">
                <div className="gr-card">
                  <h2 className="gr-card-title">
                    <span className="accent-bar" style={{background:'#888'}}></span>
                    Regelmäßig
                  </h2>
                  <p style={{fontSize:'0.7rem', textTransform:'uppercase', letterSpacing:'0.08em', opacity:0.4, fontWeight:700, marginBottom:'1rem'}}>Regular / Weak</p>
                  <div style={{display:'flex', flexDirection:'column', gap:'0.75rem'}}>
                    {[
                      ['lernen', 'to learn', 'lernst / lernt'],
                      ['machen', 'to do/make', 'machst / macht'],
                      ['kochen', 'to cook', 'kochst / kocht'],
                    ].map(([v, t, c]) => (
                      <div key={v} style={{display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:'0.85rem'}}>
                        <span><b>{v}</b> <span style={{opacity:0.4, fontSize:'0.75rem'}}>({t})</span></span>
                        <span style={{opacity:0.4, fontSize:'0.78rem', fontFamily:'monospace'}}>{c}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="gr-card" style={{borderTop: '3px solid #ef4444'}}>
                  <h2 className="gr-card-title" style={{color:'#ef4444'}}>
                    <span className="accent-bar" style={{background:'#ef4444'}}></span>
                    Unregelmäßig
                  </h2>
                  <p style={{fontSize:'0.7rem', textTransform:'uppercase', letterSpacing:'0.08em', color:'#ef4444', opacity:0.6, fontWeight:700, marginBottom:'1rem'}}>Irregular / Strong</p>
                  <div style={{display:'flex', flexDirection:'column', gap:'0.75rem'}}>
                    {[
                      ['fahren', 'to drive', 'du fährst'],
                      ['lesen', 'to read', 'er liest'],
                      ['essen', 'to eat', 'du isst'],
                      ['geben', 'to give', 'du gibst'],
                    ].map(([v, t, c]) => (
                      <div key={v} style={{display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:'0.85rem'}}>
                        <span><b>{v}</b> <span style={{opacity:0.4, fontSize:'0.75rem'}}>({t})</span></span>
                        <span style={{color:'#ef4444', fontWeight:700, fontSize:'0.82rem'}}>{c}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Verbs */}
              <div className="gr-card" style={{borderTop: '3px solid #f59e0b'}}>
                <h2 className="gr-card-title" style={{color:'#f59e0b'}}>
                  <span className="accent-bar" style={{background:'#f59e0b'}}></span>
                  Modalverben
                </h2>
                <div className="modal-formula">
                  Subject + <span style={{color:'#ef4444', fontWeight:700}}>Modal Verb</span> + Obj + <span style={{color:'#3b82f6', fontWeight:700, textDecoration:'underline'}}>Infinitiv</span>
                </div>
                <div className="modal-grid">
                  {['können (can)', 'dürfen (may)', 'mögen (like)', 'müssen (must)', 'wollen (want)', 'sollen (should)', 'möchten (would like)'].map(v => (
                    <span key={v} className="modal-pill">{v}</span>
                  ))}
                </div>
              </div>

              {/* Separable Verbs */}
              <div className="gr-card" style={{borderLeft: '3px solid #3b82f6'}}>
                <h2 className="gr-card-title" style={{color:'#3b82f6'}}>
                  <span className="accent-bar" style={{background:'#3b82f6'}}></span>
                  Trennbare Verben
                </h2>
                <div>
                  {[
                    { v: 'anrufen', t: 'to call', e: 'Ich rufe dich morgen an.' },
                    { v: 'einkaufen', t: 'to shop', e: 'Wir kaufen heute im Supermarkt ein.' },
                    { v: 'aufstehen', t: 'to get up', e: 'Wann stehst du am Sonntag auf?' },
                    { v: 'fernsehen', t: 'to watch TV', e: 'Am Abend sieht meine Familie fern.' },
                    { v: 'mitbringen', t: 'to bring along', e: 'Bringst du eine Pizza mit?' }
                  ].map(item => (
                    <div key={item.v} className="sep-row">
                      <div style={{display:'flex', alignItems:'baseline', gap:'0.5rem'}}>
                        <span className="sep-verb" style={{color:'#3b82f6'}}>{item.v}</span>
                        <span style={{fontSize:'0.72rem', opacity:0.4}}>({item.t})</span>
                      </div>
                      <span className="sep-example">"{item.e}"</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Verbs that take Dativ (PHDGAS) ── */}
              <div className="gr-card" style={{borderLeft:'3px solid #f59e0b'}}>
                <h2 className="gr-card-title" style={{color:'#f59e0b'}}>
                  <span className="accent-bar" style={{background:'#f59e0b'}}></span>
                  Verben mit Dativ — PHDGAS
                </h2>
                <p style={{fontSize:'0.78rem', fontStyle:'italic', opacity:0.5, marginBottom:'0.5rem'}}>
                  Structure: <b>Subject + Verb + Dativ object</b>
                </p>
                <p style={{fontSize:'0.78rem', fontStyle:'italic', opacity:0.5, marginBottom:'1.25rem'}}>
                  Example: Ich helfe <span className="dat">dem Mann</span>. — I help the man.
                </p>
                <div className="verb-grid">
                  {[
                    { letter:'P', v:'passen', t:'to fit / suit', e:'Das Hemd passt mir gut.' },
                    { letter:'H', v:'helfen', t:'to help', e:'Ich helfe dir.' },
                    { letter:'D', v:'danken', t:'to thank', e:'Ich danke Ihnen.' },
                    { letter:'G', v:'gefallen', t:'to like / please', e:'Das gefällt mir.' },
                    { letter:'A', v:'antworten', t:'to answer', e:'Er antwortet dem Lehrer.' },
                    { letter:'S', v:'schmecken', t:'to taste (good)', e:'Die Suppe schmeckt mir.' },
                  ].map(item => (
                    <div key={item.v} className="verb-card" style={{position:'relative', overflow:'hidden'}}>
                      <div style={{
                        position:'absolute', top:'0.5rem', right:'0.75rem',
                        fontFamily:'Playfair Display, serif', fontWeight:900,
                        fontSize:'1.8rem', opacity:0.07, lineHeight:1,
                      }}>{item.letter}</div>
                      <span className="verb-name" style={{color:'#f59e0b'}}>
                        <span style={{fontFamily:'Playfair Display, serif', fontWeight:900, color:'#f59e0b', marginRight:'0.1rem'}}>{item.letter}</span>{item.v.slice(1)}
                      </span>
                      <span className="verb-trans">{item.t}</span>
                      <span className="verb-example">"{item.e}"</span>
                    </div>
                  ))}
                </div>
                <div className="gr-tip">
                  <b>Memory trick — PHDGAS:</b> <span style={{color:'#f59e0b', fontWeight:700}}>P</span>assen · <span style={{color:'#f59e0b', fontWeight:700}}>H</span>elfen · <span style={{color:'#f59e0b', fontWeight:700}}>D</span>anken · <span style={{color:'#f59e0b', fontWeight:700}}>G</span>efallen · <span style={{color:'#f59e0b', fontWeight:700}}>A</span>ntworten · <span style={{color:'#f59e0b', fontWeight:700}}>S</span>chmecken
                </div>
              </div>

              {/* ── NEW: Imperativ ── */}
              <div className="gr-card" style={{borderLeft:'3px solid #ef4444'}}>
                <h2 className="gr-card-title" style={{color:'#ef4444'}}>
                  <span className="accent-bar" style={{background:'#ef4444'}}></span>
                  Imperativ — Commands
                </h2>
                <table className="gr-table" style={{minWidth:'unset', marginBottom:'1.25rem'}}>
                  <thead>
                    <tr>
                      <th>Form</th>
                      <th>Rule</th>
                      <th>kommen</th>
                      <th>lesen</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{fontWeight:700}}>du</td>
                      <td style={{opacity:0.5, fontSize:'0.8rem'}}>Verb stem only</td>
                      <td><span className="neg">Komm!</span></td>
                      <td><span className="neg">Lies!</span></td>
                    </tr>
                    <tr>
                      <td style={{fontWeight:700}}>ihr</td>
                      <td style={{opacity:0.5, fontSize:'0.8rem'}}>Verb stem + t</td>
                      <td><span className="neg">Kommt!</span></td>
                      <td><span className="neg">Lest!</span></td>
                    </tr>
                    <tr>
                      <td style={{fontWeight:700}}>Sie</td>
                      <td style={{opacity:0.5, fontSize:'0.8rem'}}>Infinitive + Sie</td>
                      <td><span className="neg">Kommen Sie!</span></td>
                      <td><span className="neg">Lesen Sie!</span></td>
                    </tr>
                  </tbody>
                </table>
                <p style={{fontSize:'0.72rem', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', opacity:0.4, marginBottom:'0.75rem'}}>Exceptions</p>
                <div className="two-col">
                  <div className="imp-exception" style={{background: dm ? '#1a1a1a' : '#faf7f2', border:`1px solid ${dm ? '#222' : '#e8e2d6'}`}}>
                    <p style={{fontWeight:700, marginBottom:'0.5rem'}}>sein (to be)</p>
                    <p style={{fontSize:'0.82rem', opacity:0.7, marginBottom:'0.2rem'}}><span className="neg">Sei</span> ruhig! <span style={{opacity:0.4}}>(du)</span></p>
                    <p style={{fontSize:'0.82rem', opacity:0.7, marginBottom:'0.2rem'}}><span className="neg">Seid</span> ruhig! <span style={{opacity:0.4}}>(ihr)</span></p>
                    <p style={{fontSize:'0.82rem', opacity:0.7}}><span className="neg">Seien Sie</span> ruhig! <span style={{opacity:0.4}}>(Sie)</span></p>
                  </div>
                  <div className="imp-exception" style={{background: dm ? '#1a1a1a' : '#faf7f2', border:`1px solid ${dm ? '#222' : '#e8e2d6'}`}}>
                    <p style={{fontWeight:700, marginBottom:'0.5rem'}}>haben (to have)</p>
                    <p style={{fontSize:'0.82rem', opacity:0.7, marginBottom:'0.2rem'}}><span className="neg">Hab</span> Geduld! <span style={{opacity:0.4}}>(du)</span></p>
                    <p style={{fontSize:'0.82rem', opacity:0.7, marginBottom:'0.2rem'}}><span className="neg">Habt</span> Geduld! <span style={{opacity:0.4}}>(ihr)</span></p>
                    <p style={{fontSize:'0.82rem', opacity:0.7}}><span className="neg">Haben Sie</span> Geduld! <span style={{opacity:0.4}}>(Sie)</span></p>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ── SENTENCES ── */}
          {activeTab === 'Sentences' && (
            <div className="gr-fade">

              {/* ── NEW: Akkusativ Prepositions ── */}
              <div className="gr-card" style={{borderLeft:'3px solid #3b82f6'}}>
                <h2 className="gr-card-title" style={{color:'#3b82f6'}}>
                  <span className="accent-bar" style={{background:'#3b82f6'}}></span>
                  Akkusativ Präpositionen
                </h2>
                <p style={{fontSize:'0.78rem', fontStyle:'italic', opacity:0.5, marginBottom:'1.25rem'}}>
                  These prepositions <b>always</b> take Akkusativ — no exceptions:
                </p>
                <div className="prep-grid">
                  {[
                    ['bis','until / up to'],
                    ['für','for'],
                    ['gegen','against / around'],
                    ['um','around / at (time)'],
                    ['durch','through'],
                    ['ohne','without'],
                  ].map(([prep, meaning]) => (
                    <div key={prep} className="prep-pill" style={{
                      background: dm ? 'rgba(59,130,246,0.07)' : 'rgba(59,130,246,0.05)',
                      border: `1px solid ${dm ? 'rgba(59,130,246,0.18)' : 'rgba(59,130,246,0.12)'}`,
                    }}>
                      <div className="prep-pill-word" style={{color:'#3b82f6'}}>{prep}</div>
                      <div className="prep-pill-meaning">{meaning}</div>
                    </div>
                  ))}
                </div>
                <div className="gr-tip">
                  Ich gehe <span className="akk">durch den</span> Park. &nbsp;·&nbsp; Ich kaufe Blumen <span className="akk">für meine</span> Mutter.
                </div>
              </div>

              {/* ── NEW: Dativ Prepositions ── */}
              <div className="gr-card" style={{borderLeft:'3px solid #f59e0b'}}>
                <h2 className="gr-card-title" style={{color:'#f59e0b'}}>
                  <span className="accent-bar" style={{background:'#f59e0b'}}></span>
                  Dativ Präpositionen
                </h2>
                <p style={{fontSize:'0.78rem', fontStyle:'italic', opacity:0.5, marginBottom:'1.25rem'}}>
                  These prepositions <b>always</b> take Dativ — no exceptions:
                </p>
                <div className="prep-grid">
                  {[
                    ['aus','from / out of'],
                    ['bei','at / near'],
                    ['mit','with'],
                    ['nach','to / after'],
                    ['seit','since / for'],
                    ['von','from / of'],
                    ['zu','to'],
                    ['gegenüber','opposite'],
                    ['ab','from (time/place)'],
                  ].map(([prep, meaning]) => (
                    <div key={prep} className="prep-pill" style={{
                      background: dm ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.05)',
                      border: `1px solid ${dm ? 'rgba(245,158,11,0.18)' : 'rgba(245,158,11,0.12)'}`,
                    }}>
                      <div className="prep-pill-word" style={{color:'#f59e0b'}}>{prep}</div>
                      <div className="prep-pill-meaning">{meaning}</div>
                    </div>
                  ))}
                </div>
                <div className="gr-tip">
                  Ich komme <span className="dat">aus dem</span> Haus. &nbsp;·&nbsp; Ich gehe <span className="dat">mit meiner</span> Mutter.
                </div>
              </div>

              {/* ── NEW: Dativ + Akkusativ in a sentence ── */}
              <div className="gr-card" style={{borderLeft:'3px solid #a855f7'}}>
                <h2 className="gr-card-title" style={{color:'#a855f7'}}>
                  <span className="accent-bar" style={{background:'#a855f7'}}></span>
                  Dativ + Akkusativ im Satz
                </h2>
                <div className="modal-formula">
                  Subject + Verb + <span className="dat">Dativ (indirect)</span> + <span className="akk">Akkusativ (direct)</span>
                </div>
                <div className="dat-akk-example" style={{background: dm ? '#1a1a1a' : '#faf7f2', border:`1px solid ${dm ? '#222' : '#e8e2d6'}`}}>
                  <p style={{fontSize:'1.05rem', fontWeight:600, marginBottom:'0.4rem'}}>
                    Ich gebe <span className="dat">dem Mann</span> <span className="akk">das Buch</span>.
                  </p>
                  <p style={{fontSize:'0.78rem', opacity:0.5, fontStyle:'italic'}}>I give the man the book.</p>
                  <div className="dat-akk-pills">
                    <span className="dat-akk-pill" style={{background:'rgba(245,158,11,0.12)', color:'#f59e0b'}}>dem Mann → Dativ (to whom?)</span>
                    <span className="dat-akk-pill" style={{background:'rgba(59,130,246,0.12)', color:'#3b82f6'}}>das Buch → Akkusativ (what?)</span>
                  </div>
                </div>
                <div className="gr-tip"><b>Rule:</b> When both Dativ and Akkusativ are present, <b>Dativ always comes first</b> (unless the Akkusativ is a pronoun).</div>
              </div>

              {/* ── NEW: Question Trick ── */}
              <div className="gr-card" style={{borderLeft:'3px solid #22c55e'}}>
                <h2 className="gr-card-title" style={{color:'#22c55e'}}>
                  <span className="accent-bar" style={{background:'#22c55e'}}></span>
                  Der Frage-Trick — Identify Cases by Asking
                </h2>
                <p style={{fontSize:'0.78rem', fontStyle:'italic', opacity:0.5, marginBottom:'1.25rem'}}>
                  Not sure which case to use? Ask yourself:
                </p>
                {[
                  { q:'Wer?', hint:'Who? → Subject', cas:'Nominativ', col:'#888', bg:'rgba(128,128,128,0.08)' },
                  { q:'Wen / Was?', hint:'Whom / What? → Direct Object', cas:'Akkusativ', col:'#3b82f6', bg:'rgba(59,130,246,0.08)' },
                  { q:'Wem / Wo ?', hint:'To whom / Where? → Indirect Object', cas:'Dativ', col:'#f59e0b', bg:'rgba(245,158,11,0.08)' },
                ].map(item => (
                  <div key={item.q} className="q-trick-row" style={{background: dm ? '#1a1a1a' : item.bg, border:`1px solid ${dm ? '#222' : 'transparent'}`}}>
                    <span style={{fontWeight:800, color:item.col, fontSize:'1rem', minWidth:'90px'}}>{item.q}</span>
                    <span style={{fontSize:'0.8rem', opacity:0.55, flex:1}}>{item.hint}</span>
                    <span style={{fontWeight:700, color:item.col, fontSize:'0.75rem', textTransform:'uppercase', letterSpacing:'0.08em'}}>{item.cas}</span>
                  </div>
                ))}
                <div className="gr-tip" style={{marginTop:'1.25rem'}}>
                  <b>Example:</b> <i>Ich gebe dem Mann das Buch.</i><br/>
                  <span style={{opacity:0.7}}>Wer gibt? → <b>Ich</b> (Nominativ)</span><br/>
                  <span style={{color:'#f59e0b'}}>Wem gebe ich? → <b>dem Mann</b> (Dativ)</span><br/>
                  <span style={{color:'#3b82f6'}}>Was gebe ich? → <b>das Buch</b> (Akkusativ)</span>
                </div>
              </div>

              {/* W-Fragen */}
              <div className="gr-card" style={{borderLeft: '3px solid #6366f1'}}>
                <h2 className="gr-card-title" style={{color:'#6366f1'}}>
                  <span className="accent-bar" style={{background:'#6366f1'}}></span>
                  W-Fragen — Information Questions
                </h2>
                <div className="modal-formula" style={{marginBottom:'1.25rem'}}>
                  <span style={{color:'#6366f1', fontWeight:700}}>Fragewort</span>
                  {' + '}
                  <span style={{color:'#ef4444', fontWeight:700, textDecoration:'underline'}}>Verb</span>
                  {' + Subject + Object?'}
                </div>
                <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(110px, 1fr))', gap:'0.6rem', marginBottom:'1.25rem'}}>
                  {[
                    { w: 'Wer?', t: 'Who?' }, { w: 'Was?', t: 'What?' },
                    { w: 'Wo?', t: 'Where?' }, { w: 'Woher?', t: 'Where from?' },
                    { w: 'Wohin?', t: 'Where to?' }, { w: 'Wann?', t: 'When?' },
                    { w: 'Warum?', t: 'Why?' }, { w: 'Wie?', t: 'How?' }
                  ].map(item => (
                    <div key={item.w} style={{
                      padding: '0.6rem', borderRadius: '12px', textAlign: 'center',
                      background: dm ? 'rgba(99,102,241,0.07)' : 'rgba(99,102,241,0.05)',
                      border: `1px solid ${dm ? 'rgba(99,102,241,0.18)' : 'rgba(99,102,241,0.15)'}`,
                    }}>
                      <div style={{fontWeight:800, color:'#6366f1', fontSize:'0.95rem'}}>{item.w}</div>
                      <div style={{fontSize:'0.65rem', opacity:0.4, textTransform:'uppercase', letterSpacing:'0.06em', marginTop:'0.15rem'}}>{item.t}</div>
                    </div>
                  ))}
                </div>
                <div className="gr-tip">
                  Example: <b>Woher</b> <span style={{color:'#ef4444', fontWeight:700}}>kommst</span> du?
                </div>
              </div>

              {/* Ja/Nein Fragen */}
              <div className="gr-card" style={{borderLeft: '3px solid #14b8a6'}}>
                <h2 className="gr-card-title" style={{color:'#14b8a6'}}>
                  <span className="accent-bar" style={{background:'#14b8a6'}}></span>
                  Ja/Nein Fragen — Yes/No Questions
                </h2>
                <div className="modal-formula" style={{marginBottom:'1.25rem'}}>
                  <span style={{color:'#ef4444', fontWeight:700, textDecoration:'underline'}}>Verb (Pos 1)</span>
                  {' + Subject + Object?'}
                </div>
                <div style={{display:'flex', flexDirection:'column', gap:'0.75rem'}}>
                  {[
                    { q: 'Kommst du aus Indien?', a: 'Ja, ich komme aus Indien. / Nein, ich komme aus Spanien.' },
                    { q: 'Hast du Zeit?', a: 'Ja, ich habe Zeit.' },
                  ].map((item, i) => (
                    <div key={i} style={{
                      padding: '0.85rem 1rem', borderRadius: '12px',
                      background: dm ? '#1a1a1a' : '#faf7f2',
                      border: `1px solid ${dm ? '#222' : '#e8e2d6'}`,
                    }}>
                      <p style={{fontSize:'0.88rem', fontWeight:600, marginBottom:'0.4rem'}}>
                        <span style={{color:'#ef4444', fontWeight:700}}>{item.q.split(' ')[0]}</span>
                        {' ' + item.q.split(' ').slice(1).join(' ')}
                      </p>
                      <p style={{fontSize:'0.75rem', color:'#14b8a6', fontWeight:600}}>→ {item.a}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* Master Patterns — always visible */}
          <div className={`patterns-section ${dm ? 'dark' : 'light'}`}>
            <div className="patterns-glow" />
            <h2 className="patterns-title">💡 Master Patterns</h2>
            <div className="patterns-grid">
              {[
                { label: 'Akkusativ King', color: '#3b82f6', text: 'Only Masculine changes! Look for the -en ending: den, einen, meinen, ihn.' },
                { label: 'E-Drop Rule', color: '#a855f7', text: "When adding endings to euer, the middle 'e' vanishes → eure, euren, eurem." },
                { label: 'Verb Position', color: '#22c55e', text: 'Verbs always take Position 2. In Ja/Nein questions they jump to Position 1. Separable prefixes go to the very end.' },
                { label: 'Kein Pattern', color: '#f59e0b', text: 'Negative articles (kein) follow ein endings exactly in Nom / Akk / Dat.' },
                { label: 'Dativ = Receiver', color: '#f59e0b', text: 'Dativ = indirect object. Ask "Wem?" (to whom?). Feminine changes der → der in Dativ.' },
                { label: 'Prep Memory', color: '#ef4444', text: 'Akk preps: bis, für, gegen, ohne, um, durch. Dat preps: aus, bei, mit, nach, seit, von, zu, gegenüber, ab.' },
                { label: 'Wechsel Trick', color: '#8b5cf6', text: 'Wohin? (where to?) = Akkusativ. Wo? (where?) = Dativ. "in die Schule" vs "in der Schule".' },
                { label: 'Contractions', color: '#14b8a6', text: 'an+dem=am, in+dem=im, zu+dem=zum, zu+der=zur, von+dem=vom, in+das=ins, an+das=ans.' },
              ].map(p => (
                <div key={p.label} className="pattern-card">
                  <span className="pattern-label" style={{color: p.color}}>{p.label}</span>
                  <p className="pattern-text">{p.text}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default GrammarPage;