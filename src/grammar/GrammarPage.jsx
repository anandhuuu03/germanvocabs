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

        /* Header */
        .gr-header {
          margin-bottom: 2.5rem;
        }
        .gr-back {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          border: none;
          background: none;
          cursor: pointer;
          padding: 0.4rem 0;
          margin-bottom: 1rem;
          opacity: 0.45;
          transition: opacity 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .light .gr-back { color: #1a1a1a; }
        .dark  .gr-back { color: #f0ebe0; }
        .gr-back:hover { opacity: 1; }
        .gr-title {
          font-family: 'Playfair Display', serif;
          font-weight: 900;
          font-size: clamp(2rem, 6vw, 3rem);
          line-height: 1;
          letter-spacing: -0.02em;
          margin-bottom: 0.3rem;
        }
        .gr-subtitle {
          font-size: 0.82rem;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          opacity: 0.4;
          font-style: italic;
        }

        /* Tab bar */
        .gr-tabs {
          display: flex;
          gap: 0.4rem;
          margin-bottom: 2.5rem;
          padding: 0.35rem;
          border-radius: 16px;
          width: fit-content;
        }
        .light .gr-tabs { background: white; box-shadow: 0 2px 12px rgba(0,0,0,0.07); }
        .dark  .gr-tabs { background: #1a1a1a; box-shadow: 0 2px 12px rgba(0,0,0,0.4); }

        .gr-tab {
          padding: 0.55rem 1.4rem;
          border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .light .gr-tab         { background: transparent; color: #888; }
        .light .gr-tab:hover   { color: #1a1a1a; }
        .light .gr-tab.active  { background: #1a1a1a; color: #f5f0e8; }
        .dark  .gr-tab         { background: transparent; color: #555; }
        .dark  .gr-tab:hover   { color: #f0ebe0; }
        .dark  .gr-tab.active  { background: #f0ebe0; color: #0f0f0f; }

        /* Section card */
        .gr-card {
          border-radius: 24px;
          padding: 1.75rem;
          margin-bottom: 1.5rem;
          overflow-x: auto;
          transition: background 0.3s, border-color 0.3s;
        }
        .light .gr-card { background: white; border: 1px solid #e8e2d6; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
        .dark  .gr-card { background: #141414; border: 1px solid #222; box-shadow: 0 4px 20px rgba(0,0,0,0.4); }

        .gr-card-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.15rem;
          font-weight: 700;
          margin-bottom: 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .gr-card-title .accent-bar {
          width: 3px;
          height: 1.2rem;
          border-radius: 999px;
          flex-shrink: 0;
        }

        /* Tables */
        .gr-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.85rem;
          min-width: 560px;
        }
        .gr-table thead tr {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .light .gr-table thead tr { color: #aaa; background: #faf7f2; }
        .dark  .gr-table thead tr { color: #555; background: #1a1a1a; }

        .gr-table th, .gr-table td {
          padding: 0.75rem 1rem;
          text-align: left;
        }
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

        /* Tip box */
        .gr-tip {
          margin-top: 1rem;
          padding: 0.85rem 1.1rem;
          border-radius: 12px;
          font-size: 0.78rem;
          line-height: 1.6;
        }
        .light .gr-tip { background: #faf7f2; color: #888; }
        .dark  .gr-tip { background: #1a1a1a; color: #666; }

        /* Verb cards grid */
        .verb-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 0.85rem;
        }
        .verb-card {
          padding: 0.85rem 1rem;
          border-radius: 14px;
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          transition: background 0.2s;
        }
        .light .verb-card { background: #faf7f2; border: 1px solid #e8e2d6; }
        .dark  .verb-card { background: #1a1a1a; border: 1px solid #222; }
        .verb-name { font-weight: 700; font-size: 0.95rem; }
        .verb-trans {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 0.15rem 0.5rem;
          border-radius: 999px;
          width: fit-content;
        }
        .light .verb-trans { background: white; color: #aaa; border: 1px solid #e8e2d6; }
        .dark  .verb-trans { background: #222; color: #555; border: 1px solid #2a2a2a; }
        .verb-example { font-size: 0.78rem; font-style: italic; opacity: 0.5; line-height: 1.4; }

        /* Two-col layout */
        .two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }
        @media (max-width: 600px) { .two-col { grid-template-columns: 1fr; } }

        /* Modal verbs grid */
        .modal-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
        }
        .modal-pill {
          padding: 0.5rem 1rem;
          border-radius: 999px;
          font-size: 0.82rem;
          font-weight: 600;
        }
        .light .modal-pill { background: #faf7f2; border: 1px solid #e8e2d6; color: #1a1a1a; }
        .dark  .modal-pill { background: #1a1a1a; border: 1px solid #2a2a2a; color: #f0ebe0; }

        .modal-formula {
          padding: 0.85rem 1.25rem;
          border-radius: 12px;
          font-size: 0.85rem;
          text-align: center;
          font-family: 'DM Sans', sans-serif;
          margin-bottom: 1rem;
          letter-spacing: 0.02em;
        }
        .light .modal-formula { background: #faf7f2; border: 1px solid #e8e2d6; }
        .dark  .modal-formula  { background: #1a1a1a; border: 1px solid #222; }

        /* Separable verb rows */
        .sep-row {
          display: flex;
          flex-direction: column;
          padding: 0.85rem 0;
          border-bottom: 1px solid transparent;
          gap: 0.25rem;
          transition: background 0.15s;
          border-radius: 10px;
          padding: 0.75rem;
        }
        .light .sep-row { border-bottom-color: #f0ebe8; }
        .dark  .sep-row { border-bottom-color: #1e1e1e; }
        .light .sep-row:hover { background: #faf7f2; }
        .dark  .sep-row:hover { background: #1a1a1a; }
        .sep-row:last-child { border-bottom: none; }
        .sep-verb { font-family: 'Playfair Display', serif; font-size: 1.1rem; font-weight: 700; }
        .sep-example {
          font-size: 0.78rem;
          font-style: italic;
          opacity: 0.55;
          line-height: 1.5;
        }

        /* Master patterns section */
        .patterns-section {
          border-radius: 28px;
          padding: 2rem;
          margin-top: 2rem;
          position: relative;
          overflow: hidden;
        }
        .light .patterns-section { background: #1a1a1a; color: #f0ebe0; }
        .dark  .patterns-section { background: #0a0a0a; color: #f0ebe0; border: 1px solid #222; }

        .patterns-glow {
          position: absolute;
          top: -60px; right: -60px;
          width: 240px; height: 240px;
          background: #3b82f6;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.12;
          pointer-events: none;
        }
        .patterns-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.6rem;
          font-weight: 900;
          margin-bottom: 1.5rem;
          position: relative;
          z-index: 1;
        }
        .patterns-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 1rem;
          position: relative;
          z-index: 1;
        }
        .pattern-card {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 1.1rem;
          backdrop-filter: blur(8px);
        }
        .pattern-label {
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          margin-bottom: 0.5rem;
          display: block;
        }
        .pattern-text {
          font-size: 0.8rem;
          line-height: 1.55;
          color: rgba(240,235,224,0.65);
        }

        /* Fade in */
        .gr-fade {
          animation: grFade 0.35s ease both;
        }
        @keyframes grFade {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Akk highlight */
        .akk { color: #3b82f6; font-weight: 700; }
        .neg { color: #ef4444; font-weight: 700; }
        .dat { color: #f59e0b; font-weight: 700; }
      `}</style>

      <div className={`gr-root ${dm ? 'dark' : 'light'}`}>
        <div className="gr-content">

          {/* Header */}
          <div className="gr-header">
            <button
              onClick={() => navigate('/')}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.78rem',
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                opacity: 0.4,
                marginBottom: '1rem',
                padding: 0,
                color: 'inherit',
                transition: 'opacity 0.2s',
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
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`gr-tab ${activeTab === tab ? 'active' : ''}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* ── ARTICLES ── */}
          {activeTab === 'Articles' && (
            <div className="gr-fade">
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
                <div className="gr-tip">
                  <b>Tip:</b> "Kein" follows the exact same ending pattern as "ein". Just add a 'k'!
                </div>
              </div>
            </div>
          )}

          {/* ── PRONOUNS ── */}
          {activeTab === 'Pronouns' && (
            <div className="gr-fade">
              {/* Personal Pronouns */}
              <div className="gr-card">
                <h2 className="gr-card-title" style={{color: '#a855f7'}}>
                  <span className="accent-bar" style={{background: '#a855f7'}}></span>
                  Personalpronomen
                </h2>
                <table className="gr-table">
                  <thead>
                    <tr>
                      <th>Nominativ (Subject)</th>
                      <th style={{color:'#a855f7'}}>Akkusativ (Object)</th>
                      <th>English</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['ich','mich','I / me'], ['du','dich','you'], ['er','ihn','he / him'],
                      ['sie','sie','she / her'], ['es','es','it'], ['wir','uns','we / us'],
                      ['ihr','euch','you all'], ['sie / Sie','sie / Sie','they / You (formal)']
                    ].map(([nom, akk, eng]) => (
                      <tr key={nom}>
                        <td style={{fontWeight:600}}>{nom}</td>
                        <td style={{color:'#a855f7', fontWeight:700}}>{akk}</td>
                        <td style={{opacity:0.4, fontSize:'0.8rem', fontStyle:'italic'}}>{eng}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Possessive Articles */}
              <div className="gr-card">
                <h2 className="gr-card-title" style={{color:'#f59e0b'}}>
                  <span className="accent-bar" style={{background:'#f59e0b'}}></span>
                  Possessivartikel (Nominativ &amp; Akkusativ)
                </h2>
                <p style={{fontSize:'0.7rem', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'#f59e0b', opacity:0.7, marginBottom:'1rem'}}>
                  Only Masculine changes in Akkusativ (+en)
                </p>
                <table className="gr-table">
                  <thead>
                    <tr>
                      <th>Pronoun</th>
                      <th className="col-m">Masc (Nom / <span style={{color:'#3b82f6'}}>Akk</span>)</th>
                      <th className="col-f">Fem (Nom / Akk)</th>
                      <th className="col-n">Neut (Nom / Akk)</th>
                      <th className="col-p">Plur (Nom / Akk)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {possessiveData.map(item => {
                      const b = item.v;
                      const isEuer = b === 'euer';
                      const fP = isEuer ? 'eure' : `${b}e`;
                      return (
                        <tr key={item.p}>
                          <td style={{opacity:0.55, fontSize:'0.82rem'}}>{item.p}</td>
                          <td className="col-m">{b} / <span className="akk">{b}en</span></td>
                          <td className="col-f">{fP} / {fP}</td>
                          <td className="col-n">{b} / {b}</td>
                          <td className="col-p">{fP} / {fP}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
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
                      padding: '0.75rem 1rem',
                      borderRadius: '12px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
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

              {/* Akkusativ Verbs */}
              <div className="gr-card" style={{borderLeft: '3px solid #22c55e'}}>
                <h2 className="gr-card-title" style={{color:'#22c55e'}}>
                  <span className="accent-bar" style={{background:'#22c55e'}}></span>
                  Verben mit Akkusativ
                </h2>
                <p style={{fontSize:'0.78rem', fontStyle:'italic', opacity:0.5, marginBottom:'1.25rem'}}>
                  These verbs require a direct object in Akkusativ case:
                </p>
                <div className="verb-grid">
                  {[
                    { v: 'haben', t: 'to have', e: 'Ich habe einen Bruder.' },
                    { v: 'brauchen', t: 'to need', e: 'Brauchst du einen Stift?' },
                    { v: 'essen / trinken', t: 'to eat / drink', e: 'Er isst den Apfel.' },
                    { v: 'sehen', t: 'to see', e: 'Wir sehen den Lehrer.' },
                    { v: 'kaufen', t: 'to buy', e: 'Sie kauft einen Laptop.' },
                    { v: 'besuchen', t: 'to visit', e: 'Ich besuche meinen Opa.' }
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
            </div>
          )}

          {/* ── SENTENCES ── */}
          {activeTab === 'Sentences' && (
            <div className="gr-fade">

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
                      padding: '0.6rem',
                      borderRadius: '12px',
                      textAlign: 'center',
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
                      padding: '0.85rem 1rem',
                      borderRadius: '12px',
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
                { label: 'E-Drop Rule', color: '#a855f7', text: 'When adding endings to euer, the middle \'e\' vanishes → eure, euren, eurem.' },
                { label: 'Verb Position', color: '#22c55e', text: 'Verbs always take Position 2. In Ja/Nein questions they jump to Position 1. Separable prefixes go to the very end.' },
                { label: 'Kein Pattern', color: '#f59e0b', text: 'Negative articles (kein) follow ein endings exactly in Nom / Akk / Dat.' },
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