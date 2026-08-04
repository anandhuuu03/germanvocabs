import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 1. Updated LEVELS and TABS_BY_LEVEL for B1.1 and B1.2
const LEVELS = ['A1', 'A2', 'B1.1', 'B1.2'];

const TABS_BY_LEVEL = {
  A1: ['Articles', 'Pronouns', 'Verbs', 'Sentences'],
  A2: ['Connectors', 'Verbs', 'Cases', 'Nouns', 'Prepositions', 'Clauses'],
  'B1.1': ['Connectors', 'Prepositions', 'Infinitiv & Futur', 'Passiv & Verben', 'Relativsätze'],
  'B1.2': ['Temporale Sätze', 'Konjunktiv II', 'Pronomen & Fragen', 'Satzstrukturen', 'Verben'],
};

const GrammarPage = ({ darkMode = false }) => {
  const [level, setLevel] = useState('A1');
  const [activeTab, setActiveTab] = useState('Articles');
  const dm = darkMode;
  const navigate = useNavigate();

  const changeLevel = (lvl) => {
    setLevel(lvl);
    setActiveTab(TABS_BY_LEVEL[lvl][0]);
  };

  // ───────────────────────── Generic reusable pieces ─────────────────────────

  const Card = ({ title, color = '#3b82f6', borderSide = 'left', style = {}, children }) => (
    <div className="gr-card" style={{ [`border${borderSide[0].toUpperCase()}${borderSide.slice(1)}`]: `3px solid ${color}`, ...style }}>
      <h2 className="gr-card-title" style={{ color }}>
        <span className="accent-bar" style={{ background: color }}></span>
        {title}
      </h2>
      {children}
    </div>
  );

  const Intro = ({ children }) => (
    <p style={{ fontSize: '0.78rem', fontStyle: 'italic', opacity: 0.55, marginBottom: '1.1rem', lineHeight: 1.6 }}>{children}</p>
  );

  const DataTable = ({ headers, rows, minWidth }) => (
    <table className="gr-table" style={minWidth ? { minWidth } : undefined}>
      <thead>
        <tr>{headers.map((h, i) => <th key={i}>{h}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>
        ))}
      </tbody>
    </table>
  );

  const Examples = ({ items }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.75rem' }}>
      {items.map((ex, i) => (
        <p key={i} style={{ fontSize: '0.85rem', fontStyle: 'italic', opacity: 0.72, lineHeight: 1.5 }}>– {ex}</p>
      ))}
    </div>
  );

  const Tip = ({ children }) => <div className="gr-tip">{children}</div>;

  const PillGrid = ({ items, color }) => (
    <div className="prep-grid">
      {items.map(([word, meaning]) => (
        <div key={word} className="prep-pill" style={{
          background: dm ? `${color}14` : `${color}0d`,
          border: `1px solid ${dm ? `${color}30` : `${color}20`}`,
        }}>
          <div className="prep-pill-word" style={{ color }}>{word}</div>
          <div className="prep-pill-meaning">{meaning}</div>
        </div>
      ))}
    </div>
  );

  const SubBlock = ({ title, structure, examples, color }) => (
    <div style={{ marginBottom: '1.4rem' }}>
      <p style={{ fontWeight: 700, fontSize: '0.92rem', marginBottom: '0.4rem', color }}>{title}</p>
      {structure && (
        <div className="modal-formula" style={{ textAlign: 'left', marginBottom: '0.6rem' }}>{structure}</div>
      )}
      <Examples items={examples} />
    </div>
  );

  // ───────────────────────── A1 CONTENT ─────────────────────────

  const renderA1 = () => {
    if (activeTab === 'Articles') {
      return (
        <div className="gr-fade">
          <Card title="Bestimmte, Unbestimmte & Negative Artikel" color="#3b82f6">
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
                  <td style={{ opacity: 0.5, fontStyle: 'italic', fontWeight: 600 }}>Nominativ</td>
                  <td className="col-m">der / ein / <span className="neg">kein</span></td>
                  <td className="col-f">die / eine / <span className="neg">keine</span></td>
                  <td className="col-n">das / ein / <span className="neg">kein</span></td>
                  <td className="col-p">die / — / <span className="neg">keine</span></td>
                </tr>
                <tr className={dm ? 'akk-row-dark' : 'akk-row-light'}>
                  <td style={{ fontStyle: 'italic', fontWeight: 700 }}><span className="akk">Akkusativ</span></td>
                  <td className="col-m"><span className="akk">den / einen / <span className="neg">keinen</span></span></td>
                  <td className="col-f">die / eine / <span className="neg">keine</span></td>
                  <td className="col-n">das / ein / <span className="neg">kein</span></td>
                  <td className="col-p">die / — / <span className="neg">keine</span></td>
                </tr>
                <tr className={dm ? 'dat-row-dark' : 'dat-row-light'}>
                  <td style={{ fontStyle: 'italic', fontWeight: 700 }}><span className="dat">Dativ</span></td>
                  <td className="col-m"><span className="dat">dem / einem / keinem</span></td>
                  <td className="col-f"><span className="dat">der / einer / keiner</span></td>
                  <td className="col-n"><span className="dat">dem / einem / keinem</span></td>
                  <td className="col-p"><span className="dat">den / — / keinen (+n)</span></td>
                </tr>
              </tbody>
            </table>
            <Tip><b>Tip:</b> "Kein" follows the exact same ending pattern as "ein". Just add a 'k'!</Tip>
          </Card>

          <Card title="Wechselpräpositionen — Two-way Prepositions" color="#8b5cf6">
            <Intro>These 9 prepositions take <b>Akkusativ</b> for movement (Wohin?) or <b>Dativ</b> for location (Wo?).</Intro>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '0.6rem', marginBottom: '1.25rem' }}>
              {['an', 'auf', 'in', 'über', 'unter', 'vor', 'hinter', 'neben', 'zwischen'].map(p => (
                <div key={p} style={{
                  padding: '0.6rem', borderRadius: '12px', textAlign: 'center',
                  background: dm ? 'rgba(139,92,246,0.08)' : 'rgba(139,92,246,0.06)',
                  border: `1px solid ${dm ? 'rgba(139,92,246,0.2)' : 'rgba(139,92,246,0.15)'}`,
                  fontWeight: 700, fontSize: '0.95rem', color: '#8b5cf6',
                }}>{p}</div>
              ))}
            </div>
            <div className="wechsel-boxes">
              <div className="wechsel-box" style={{ background: dm ? 'rgba(59,130,246,0.07)' : 'rgba(59,130,246,0.05)', border: `1px solid ${dm ? 'rgba(59,130,246,0.18)' : 'rgba(59,130,246,0.12)'}` }}>
                <p style={{ fontWeight: 700, color: '#3b82f6', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Akkusativ → Movement (Wohin?)</p>
                <p style={{ fontStyle: 'italic', fontSize: '0.85rem', opacity: 0.7 }}>Ich gehe <span className="akk">in die</span> Schule.</p>
              </div>
              <div className="wechsel-box" style={{ background: dm ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.05)', border: `1px solid ${dm ? 'rgba(245,158,11,0.18)' : 'rgba(245,158,11,0.12)'}` }}>
                <p style={{ fontWeight: 700, color: '#f59e0b', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Dativ → Location (Wo?)</p>
                <p style={{ fontStyle: 'italic', fontSize: '0.85rem', opacity: 0.7 }}>Ich bin <span className="dat">in der</span> Schule.</p>
              </div>
            </div>
          </Card>

          <Card title="Kontraktionen — Preposition + Article Mergers" color="#14b8a6">
            <Intro>These preposition + article combinations are always contracted in standard German:</Intro>
            <div className="contraction-grid">
              {[
                ['an + dem', 'am', 'Ich bin am Bahnhof.'],
                ['in + dem', 'im', 'Er ist im Haus.'],
                ['zu + dem', 'zum', 'Ich gehe zum Arzt.'],
                ['zu + der', 'zur', 'Ich gehe zur Schule.'],
                ['von + dem', 'vom', 'Das ist vom Chef.'],
                ['bei + dem', 'beim', 'Er ist beim Arzt.'],
                ['an + das', 'ans', 'Ich gehe ans Meer.'],
                ['in + das', 'ins', 'Wir gehen ins Kino.'],
              ].map(([full, short, ex]) => (
                <div key={full} className="contraction-item" style={{ background: dm ? '#1a1a1a' : '#faf7f2', border: `1px solid ${dm ? '#222' : '#e8e2d6'}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                    <span style={{ opacity: 0.35, fontSize: '0.75rem', textDecoration: 'line-through' }}>{full}</span>
                    <span style={{ color: '#14b8a6', fontWeight: 800, fontSize: '1rem' }}>→ {short}</span>
                  </div>
                  <div style={{ fontSize: '0.72rem', fontStyle: 'italic', opacity: 0.5 }}>{ex}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      );
    }

    if (activeTab === 'Pronouns') {
      return (
        <div className="gr-fade">
          <Card title="Personal Pronomen" color="#f59e0b">
            <Intro>Used when the pronoun is the indirect object — the receiver (Wem?).</Intro>
            <table className="gr-table">
              <thead>
                <tr><th>Nominativ</th><th style={{ color: '#a855f7' }}>Akkusativ</th><th><span className="dat">Dativ</span></th><th>English</th></tr>
              </thead>
              <tbody>
                {[
                  ['ich', 'mich', 'mir', 'I / me / To me'],
                  ['du', 'dich', 'dir', 'you / to you '],
                  ['er', 'ihn', 'ihm', 'he / him / to him'],
                  ['sie', 'sie', 'ihr', 'she / her / to her'],
                  ['es', 'es', 'ihm', 'it / to it'],
                  ['wir', 'uns', 'uns', 'we / us / to us'],
                  ['ihr', 'euch', 'euch', 'you all / to you'],
                  ['sie / Sie', 'sie / Sie', 'ihnen / Ihnen', 'they / You (formal) / to you / to them'],
                ].map(([nom, akk, dat, eng]) => (
                  <tr key={nom}>
                    <td style={{ fontWeight: 600 }}>{nom}</td>
                    <td style={{ color: '#a855f7', fontWeight: 700 }}>{akk}</td>
                    <td><span className="dat">{dat}</span></td>
                    <td style={{ opacity: 0.4, fontSize: '0.8rem', fontStyle: 'italic' }}>{eng}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Tip>Example: Ich gebe <span className="dat">dir</span> das Buch. → I give <b>you</b> the book.</Tip>
          </Card>

          <Card title="Possessivartikel — Nominativ, Akkusativ & Dativ" color="#f59e0b">
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '0.2rem 0.65rem', borderRadius: '999px', background: 'rgba(59,130,246,0.1)', color: '#3b82f6' }}>Masc Akk: +en</span>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '0.2rem 0.65rem', borderRadius: '999px', background: 'rgba(245,158,11,0.1)', color: '#f59e0b' }}>Dat: +em (m/n) · +er (f) · +en (pl)</span>
            </div>
            <table className="gr-table">
              <thead>
                <tr><th>Pronoun</th><th className="col-m">Masc</th><th className="col-f">Fem</th><th className="col-n">Neut</th><th className="col-p">Plural</th></tr>
              </thead>
              <tbody>
                {[
                  { p: 'ich', nom: ['mein', 'meine', 'mein', 'meine'], akk: ['meinen', 'meine', 'mein', 'meine'], dat: ['meinem', 'meiner', 'meinem', 'meinen'] },
                  { p: 'du', nom: ['dein', 'deine', 'dein', 'deine'], akk: ['deinen', 'deine', 'dein', 'deine'], dat: ['deinem', 'deiner', 'deinem', 'deinen'] },
                  { p: 'er/es', nom: ['sein', 'seine', 'sein', 'seine'], akk: ['seinen', 'seine', 'sein', 'seine'], dat: ['seinem', 'seiner', 'seinem', 'seinen'] },
                  { p: 'sie (she)', nom: ['ihr', 'ihre', 'ihr', 'ihre'], akk: ['ihren', 'ihre', 'ihr', 'ihre'], dat: ['ihrem', 'ihrer', 'ihrem', 'ihren'] },
                  { p: 'wir', nom: ['unser', 'unsere', 'unser', 'unsere'], akk: ['unseren', 'unsere', 'unser', 'unsere'], dat: ['unserem', 'unserer', 'unserem', 'unseren'] },
                  { p: 'ihr (pl)', nom: ['euer', 'eure', 'euer', 'eure'], akk: ['euren', 'eure', 'euer', 'eure'], dat: ['eurem', 'eurer', 'eurem', 'euren'] },
                  { p: 'sie/Sie', nom: ['ihr/Ihr', 'ihre/Ihre', 'ihr/Ihr', 'ihre/Ihre'], akk: ['ihren/Ihren', 'ihre/Ihre', 'ihr/Ihr', 'ihre/Ihre'], dat: ['ihrem/Ihrem', 'ihrer/Ihrer', 'ihrem/Ihrem', 'ihren/Ihren'] },
                ].map(row => (
                  <React.Fragment key={row.p}>
                    <tr style={{ borderBottom: 'none' }}>
                      <td rowSpan={3} style={{ opacity: 0.55, fontSize: '0.8rem', fontWeight: 600, verticalAlign: 'top', paddingTop: '0.9rem', borderRight: `1px solid ${dm ? '#2a2a2a' : '#e8e2d6'}` }}>{row.p}</td>
                      <td className="col-m" style={{ fontSize: '0.8rem', paddingBottom: '0.2rem' }}>{row.nom[0]}</td>
                      <td className="col-f" style={{ fontSize: '0.8rem', paddingBottom: '0.2rem' }}>{row.nom[1]}</td>
                      <td className="col-n" style={{ fontSize: '0.8rem', paddingBottom: '0.2rem' }}>{row.nom[2]}</td>
                      <td className="col-p" style={{ fontSize: '0.8rem', paddingBottom: '0.2rem' }}>{row.nom[3]}</td>
                    </tr>
                    <tr style={{ borderBottom: 'none' }}>
                      <td className="col-m" style={{ fontSize: '0.8rem', paddingTop: '0.2rem', paddingBottom: '0.2rem' }}><span className="akk">{row.akk[0]}</span></td>
                      <td className="col-f" style={{ fontSize: '0.8rem', paddingTop: '0.2rem', paddingBottom: '0.2rem' }}><span className="akk">{row.akk[1]}</span></td>
                      <td className="col-n" style={{ fontSize: '0.8rem', paddingTop: '0.2rem', paddingBottom: '0.2rem' }}><span className="akk">{row.akk[2]}</span></td>
                      <td className="col-p" style={{ fontSize: '0.8rem', paddingTop: '0.2rem', paddingBottom: '0.2rem' }}><span className="akk">{row.akk[3]}</span></td>
                    </tr>
                    <tr>
                      <td className="col-m" style={{ fontSize: '0.8rem', paddingTop: '0.2rem' }}><span className="dat">{row.dat[0]}</span></td>
                      <td className="col-f" style={{ fontSize: '0.8rem', paddingTop: '0.2rem' }}><span className="dat">{row.dat[1]}</span></td>
                      <td className="col-n" style={{ fontSize: '0.8rem', paddingTop: '0.2rem' }}><span className="dat">{row.dat[2]}</span></td>
                      <td className="col-p" style={{ fontSize: '0.8rem', paddingTop: '0.2rem' }}><span className="dat">{row.dat[3]}</span></td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem', flexWrap: 'wrap', fontSize: '0.75rem', opacity: 0.55, fontStyle: 'italic' }}>
              <span>Row 1 = <b>Nominativ</b></span>
              <span style={{ color: '#3b82f6' }}>Row 2 = <b>Akkusativ</b></span>
              <span style={{ color: '#f59e0b' }}>Row 3 = <b>Dativ</b></span>
            </div>
          </Card>
        </div>
      );
    }

    if (activeTab === 'Verbs') {
      return (
        <div className="gr-fade">
          <Card title="Präsens — Present Tense Conjugation" color="#a855f7">
            <Intro>Drop the <b>-en</b> from the infinitive (e.g., mach-en) and add these endings:</Intro>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '0.75rem' }}>
              {[
                { p: 'ich', e: '-e', ex: 'mach-e' }, { p: 'du', e: '-st', ex: 'mach-st' },
                { p: 'er/es/sie', e: '-t', ex: 'mach-t' }, { p: 'wir', e: '-en', ex: 'mach-en' },
                { p: 'ihr', e: '-t', ex: 'mach-t' }, { p: 'sie/Sie', e: '-en', ex: 'mach-en' },
              ].map(item => (
                <div key={item.p} style={{ padding: '0.75rem 1rem', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: dm ? 'rgba(168,85,247,0.07)' : 'rgba(168,85,247,0.06)', border: `1px solid ${dm ? 'rgba(168,85,247,0.15)' : 'rgba(168,85,247,0.12)'}` }}>
                  <span style={{ fontWeight: 600, fontSize: '0.88rem' }}>{item.p}</span>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#a855f7' }}>{item.e}</div>
                    <div style={{ fontSize: '0.65rem', opacity: 0.45, fontFamily: 'monospace' }}>{item.ex}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Verben mit Akkusativ" color="#22c55e">
            <Intro>Structure: <b>Subject + Verb + Akkusativ Object</b> · Example: Ich sehe <span className="akk">den Mann</span>. · Ich lese <span className="akk">das Buch</span>.</Intro>
            <div className="verb-grid">
              {[
                { v: 'haben', t: 'to have', e: 'Ich habe einen Bruder.' }, { v: 'sehen', t: 'to see', e: 'Wir sehen den Lehrer.' },
                { v: 'besuchen', t: 'to visit', e: 'Ich besuche meinen Opa.' }, { v: 'essen', t: 'to eat', e: 'Er isst den Apfel.' },
                { v: 'trinken', t: 'to drink', e: 'Sie trinkt den Kaffee.' }, { v: 'kaufen', t: 'to buy', e: 'Sie kauft einen Laptop.' },
                { v: 'lieben', t: 'to love', e: 'Ich liebe dich.' }, { v: 'suchen', t: 'to search', e: 'Er sucht den Schlüssel.' },
                { v: 'finden', t: 'to find', e: 'Ich finde das Buch.' }, { v: 'bestellen', t: 'to order', e: 'Wir bestellen einen Kaffee.' },
                { v: 'buchen', t: 'to book', e: 'Sie bucht ein Hotel.' }, { v: 'nehmen', t: 'to take', e: 'Ich nehme den Bus.' },
                { v: 'lesen', t: 'to read', e: 'Ich lese das Buch.' }, { v: 'hören', t: 'to hear', e: 'Er hört die Musik.' },
                { v: 'schreiben', t: 'to write', e: 'Sie schreibt einen Brief.' }, { v: 'lernen', t: 'to learn', e: 'Ich lerne Deutsch.' },
                { v: 'besitzen', t: 'to own', e: 'Er besitzt ein Auto.' }, { v: 'aufräumen', t: 'to clean up', e: 'Ich räume das Zimmer auf.' },
                { v: 'bekommen', t: 'to get / receive', e: 'Sie bekommt einen Brief.' }, { v: 'brauchen', t: 'to need', e: 'Brauchst du einen Stift?' },
                { v: 'reparieren', t: 'to repair', e: 'Er repariert das Auto.' }, { v: 'vergessen', t: 'to forget', e: 'Ich vergesse den Namen.' },
                { v: 'verlieren', t: 'to lose', e: 'Sie verliert den Schlüssel.' }, { v: 'verstehen', t: 'to understand', e: 'Ich verstehe die Frage.' },
              ].map(item => (
                <div key={item.v} className="verb-card">
                  <span className="verb-name" style={{ color: '#22c55e' }}>{item.v}</span>
                  <span className="verb-trans">{item.t}</span>
                  <span className="verb-example">"{item.e}"</span>
                </div>
              ))}
            </div>
          </Card>

          <div className="two-col">
            <Card title="Regelmäßig" color="#888" borderSide="top">
              <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.4, fontWeight: 700, marginBottom: '1rem' }}>Regular / Weak</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[['lernen', 'to learn', 'lernst / lernt'], ['machen', 'to do/make', 'machst / macht'], ['kochen', 'to cook', 'kochst / kocht']].map(([v, t, c]) => (
                  <div key={v} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                    <span><b>{v}</b> <span style={{ opacity: 0.4, fontSize: '0.75rem' }}>({t})</span></span>
                    <span style={{ opacity: 0.4, fontSize: '0.78rem', fontFamily: 'monospace' }}>{c}</span>
                  </div>
                ))}
              </div>
            </Card>
            <Card title="Unregelmäßig" color="#ef4444" borderSide="top">
              <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#ef4444', opacity: 0.6, fontWeight: 700, marginBottom: '1rem' }}>Irregular / Strong</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[['fahren', 'to drive', 'du fährst'], ['lesen', 'to read', 'er liest'], ['essen', 'to eat', 'du isst'], ['geben', 'to give', 'du gibst']].map(([v, t, c]) => (
                  <div key={v} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                    <span><b>{v}</b> <span style={{ opacity: 0.4, fontSize: '0.75rem' }}>({t})</span></span>
                    <span style={{ color: '#ef4444', fontWeight: 700, fontSize: '0.82rem' }}>{c}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <Card title="Modalverben" color="#f59e0b" borderSide="top">
            <div className="modal-formula">Subject + <span style={{ color: '#ef4444', fontWeight: 700 }}>Modal Verb</span> + Obj + <span style={{ color: '#3b82f6', fontWeight: 700, textDecoration: 'underline' }}>Infinitiv</span></div>
            <div className="modal-grid">
              {['können (can)', 'dürfen (may)', 'mögen (like)', 'müssen (must)', 'wollen (want)', 'sollen (should)', 'möchten (would like)'].map(v => <span key={v} className="modal-pill">{v}</span>)}
            </div>
          </Card>

          <Card title="Trennbare Verben" color="#3b82f6">
            {[
              { v: 'anrufen', t: 'to call', e: 'Ich rufe dich morgen an.' },
              { v: 'einkaufen', t: 'to shop', e: 'Wir kaufen heute im Supermarkt ein.' },
              { v: 'aufstehen', t: 'to get up', e: 'Wann stehst du am Sonntag auf?' },
              { v: 'fernsehen', t: 'to watch TV', e: 'Am Abend sieht meine Familie fern.' },
              { v: 'mitbringen', t: 'to bring along', e: 'Bringst du eine Pizza mit?' },
            ].map(item => (
              <div key={item.v} className="sep-row">
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                  <span className="sep-verb" style={{ color: '#3b82f6' }}>{item.v}</span>
                  <span style={{ fontSize: '0.72rem', opacity: 0.4 }}>({item.t})</span>
                </div>
                <span className="sep-example">"{item.e}"</span>
              </div>
            ))}
          </Card>

          <Card title="Verben mit Dativ — PHDGAS" color="#f59e0b">
            <Intro>Structure: <b>Subject + Verb + Dativ object</b> · Example: Ich helfe <span className="dat">dem Mann</span>. — I help the man.</Intro>
            <div className="verb-grid">
              {[
                { letter: 'P', v: 'passen', t: 'to fit / suit', e: 'Das Hemd passt mir gut.' },
                { letter: 'H', v: 'helfen', t: 'to help', e: 'Ich helfe dir.' },
                { letter: 'D', v: 'danken', t: 'to thank', e: 'Ich danke Ihnen.' },
                { letter: 'G', v: 'gefallen', t: 'to like / please', e: 'Das gefällt mir.' },
                { letter: 'A', v: 'antworten', t: 'to answer', e: 'Er antwortet dem Lehrer.' },
                { letter: 'S', v: 'schmecken', t: 'to taste (good)', e: 'Die Suppe schmeckt mir.' },
              ].map(item => (
                <div key={item.v} className="verb-card" style={{ position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: '0.5rem', right: '0.75rem', fontFamily: 'Playfair Display, serif', fontWeight: 900, fontSize: '1.8rem', opacity: 0.07, lineHeight: 1 }}>{item.letter}</div>
                  <span className="verb-name" style={{ color: '#f59e0b' }}><span style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900, color: '#f59e0b', marginRight: '0.1rem' }}>{item.letter}</span>{item.v.slice(1)}</span>
                  <span className="verb-trans">{item.t}</span>
                  <span className="verb-example">"{item.e}"</span>
                </div>
              ))}
            </div>
            <Tip><b>Memory trick — PHDGAS:</b> Passen · Helfen · Danken · Gefallen · Antworten · Schmecken</Tip>
          </Card>

          <Card title="Imperativ — Commands" color="#ef4444">
            <DataTable headers={['Form', 'Rule', 'kommen', 'lesen']} rows={[
              ['du', 'Verb stem only', <span className="neg">Komm!</span>, <span className="neg">Lies!</span>],
              ['ihr', 'Verb stem + t', <span className="neg">Kommt!</span>, <span className="neg">Lest!</span>],
              ['Sie', 'Infinitive + Sie', <span className="neg">Kommen Sie!</span>, <span className="neg">Lesen Sie!</span>],
            ]} />
            <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.4, margin: '1rem 0 0.75rem' }}>Exceptions</p>
            <div className="two-col">
              <div className="imp-exception" style={{ background: dm ? '#1a1a1a' : '#faf7f2', border: `1px solid ${dm ? '#222' : '#e8e2d6'}` }}>
                <p style={{ fontWeight: 700, marginBottom: '0.5rem' }}>sein (to be)</p>
                <p style={{ fontSize: '0.82rem', opacity: 0.7, marginBottom: '0.2rem' }}><span className="neg">Sei</span> ruhig! <span style={{ opacity: 0.4 }}>(du)</span></p>
                <p style={{ fontSize: '0.82rem', opacity: 0.7, marginBottom: '0.2rem' }}><span className="neg">Seid</span> ruhig! <span style={{ opacity: 0.4 }}>(ihr)</span></p>
                <p style={{ fontSize: '0.82rem', opacity: 0.7 }}><span className="neg">Seien Sie</span> ruhig! <span style={{ opacity: 0.4 }}>(Sie)</span></p>
              </div>
              <div className="imp-exception" style={{ background: dm ? '#1a1a1a' : '#faf7f2', border: `1px solid ${dm ? '#222' : '#e8e2d6'}` }}>
                <p style={{ fontWeight: 700, marginBottom: '0.5rem' }}>haben (to have)</p>
                <p style={{ fontSize: '0.82rem', opacity: 0.7, marginBottom: '0.2rem' }}><span className="neg">Hab</span> Geduld! <span style={{ opacity: 0.4 }}>(du)</span></p>
                <p style={{ fontSize: '0.82rem', opacity: 0.7, marginBottom: '0.2rem' }}><span className="neg">Habt</span> Geduld! <span style={{ opacity: 0.4 }}>(ihr)</span></p>
                <p style={{ fontSize: '0.82rem', opacity: 0.7 }}><span className="neg">Haben Sie</span> Geduld! <span style={{ opacity: 0.4 }}>(Sie)</span></p>
              </div>
            </div>
          </Card>
        </div>
      );
    }

    if (activeTab === 'Sentences') {
      return (
        <div className="gr-fade">
          <Card title="Akkusativ Präpositionen" color="#3b82f6">
            <Intro>These prepositions <b>always</b> take Akkusativ — no exceptions:</Intro>
            <PillGrid color="#3b82f6" items={[['bis', 'until / up to'], ['für', 'for'], ['gegen', 'against / around'], ['um', 'around / at (time)'], ['durch', 'through'], ['ohne', 'without']]} />
            <Tip>Ich gehe <span className="akk">durch den</span> Park. &nbsp;·&nbsp; Ich kaufe Blumen <span className="akk">für meine</span> Mutter.</Tip>
          </Card>

          <Card title="Dativ Präpositionen" color="#f59e0b">
            <Intro>These prepositions <b>always</b> take Dativ — no exceptions:</Intro>
            <PillGrid color="#f59e0b" items={[['aus', 'from / out of'], ['bei', 'at / near'], ['mit', 'with'], ['nach', 'to / after'], ['seit', 'since / for'], ['von', 'from / of'], ['zu', 'to'], ['gegenüber', 'opposite'], ['ab', 'from (time/place)']]} />
            <Tip>Ich komme <span className="dat">aus dem</span> Haus. &nbsp;·&nbsp; Ich gehe <span className="dat">mit meiner</span> Mutter.</Tip>
          </Card>

          <Card title="Dativ + Akkusativ im Satz" color="#a855f7">
            <div className="modal-formula">Subject + Verb + <span className="dat">Dativ (indirect)</span> + <span className="akk">Akkusativ (direct)</span></div>
            <div className="dat-akk-example" style={{ background: dm ? '#1a1a1a' : '#faf7f2', border: `1px solid ${dm ? '#222' : '#e8e2d6'}` }}>
              <p style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.4rem' }}>Ich gebe <span className="dat">dem Mann</span> <span className="akk">das Buch</span>.</p>
              <p style={{ fontSize: '0.78rem', opacity: 0.5, fontStyle: 'italic' }}>I give the man the book.</p>
              <div className="dat-akk-pills">
                <span className="dat-akk-pill" style={{ background: 'rgba(245,158,11,0.12)', color: '#f59e0b' }}>dem Mann → Dativ (to whom?)</span>
                <span className="dat-akk-pill" style={{ background: 'rgba(59,130,246,0.12)', color: '#3b82f6' }}>das Buch → Akkusativ (what?)</span>
              </div>
            </div>
            <Tip><b>Rule:</b> When both Dativ and Akkusativ are present, <b>Dativ always comes first</b> (unless the Akkusativ is a pronoun).</Tip>
          </Card>

          <Card title="Der Frage-Trick — Identify Cases by Asking" color="#22c55e">
            <Intro>Not sure which case to use? Ask yourself:</Intro>
            {[
              { q: 'Wer?', hint: 'Who? → Subject', cas: 'Nominativ', col: '#888', bg: 'rgba(128,128,128,0.08)' },
              { q: 'Wen / Was?', hint: 'Whom / What? → Direct Object', cas: 'Akkusativ', col: '#3b82f6', bg: 'rgba(59,130,246,0.08)' },
              { q: 'Wem / Wo ?', hint: 'To whom / Where? → Indirect Object', cas: 'Dativ', col: '#f59e0b', bg: 'rgba(245,158,11,0.08)' },
            ].map(item => (
              <div key={item.q} className="q-trick-row" style={{ background: dm ? '#1a1a1a' : item.bg, border: `1px solid ${dm ? '#222' : 'transparent'}` }}>
                <span style={{ fontWeight: 800, color: item.col, fontSize: '1rem', minWidth: '90px' }}>{item.q}</span>
                <span style={{ fontSize: '0.8rem', opacity: 0.55, flex: 1 }}>{item.hint}</span>
                <span style={{ fontWeight: 700, color: item.col, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{item.cas}</span>
              </div>
            ))}
            <Tip style={{ marginTop: '1.25rem' }}>
              <b>Example:</b> <i>Ich gebe dem Mann das Buch.</i><br />
              <span style={{ opacity: 0.7 }}>Wer gibt? → <b>Ich</b> (Nominativ)</span><br />
              <span style={{ color: '#f59e0b' }}>Wem gebe ich? → <b>dem Mann</b> (Dativ)</span><br />
              <span style={{ color: '#3b82f6' }}>Was gebe ich? → <b>das Buch</b> (Akkusativ)</span>
            </Tip>
          </Card>

          <Card title="W-Fragen — Information Questions" color="#6366f1">
            <div className="modal-formula" style={{ marginBottom: '1.25rem' }}>
              <span style={{ color: '#6366f1', fontWeight: 700 }}>Fragewort</span>{' + '}
              <span style={{ color: '#ef4444', fontWeight: 700, textDecoration: 'underline' }}>Verb</span>{' + Subject + Object?'}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: '0.6rem', marginBottom: '1.25rem' }}>
              {[{ w: 'Wer?', t: 'Who?' }, { w: 'Was?', t: 'What?' }, { w: 'Wo?', t: 'Where?' }, { w: 'Woher?', t: 'Where from?' }, { w: 'Wohin?', t: 'Where to?' }, { w: 'Wann?', t: 'When?' }, { w: 'Warum?', t: 'Why?' }, { w: 'Wie?', t: 'How?' }].map(item => (
                <div key={item.w} style={{ padding: '0.6rem', borderRadius: '12px', textAlign: 'center', background: dm ? 'rgba(99,102,241,0.07)' : 'rgba(99,102,241,0.05)', border: `1px solid ${dm ? 'rgba(99,102,241,0.18)' : 'rgba(99,102,241,0.15)'}` }}>
                  <div style={{ fontWeight: 800, color: '#6366f1', fontSize: '0.95rem' }}>{item.w}</div>
                  <div style={{ fontSize: '0.65rem', opacity: 0.4, textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '0.15rem' }}>{item.t}</div>
                </div>
              ))}
            </div>
            <Tip>Example: <b>Woher</b> <span style={{ color: '#ef4444', fontWeight: 700 }}>kommst</span> du?</Tip>
          </Card>

          <Card title="Ja/Nein Fragen — Yes/No Questions" color="#14b8a6">
            <div className="modal-formula" style={{ marginBottom: '1.25rem' }}>
              <span style={{ color: '#ef4444', fontWeight: 700, textDecoration: 'underline' }}>Verb (Pos 1)</span>{' + Subject + Object?'}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[{ q: 'Kommst du aus Indien?', a: 'Ja, ich komme aus Indien. / Nein, ich komme aus Spanien.' }, { q: 'Hast du Zeit?', a: 'Ja, ich habe Zeit.' }].map((item, i) => (
                <div key={i} style={{ padding: '0.85rem 1rem', borderRadius: '12px', background: dm ? '#1a1a1a' : '#faf7f2', border: `1px solid ${dm ? '#222' : '#e8e2d6'}` }}>
                  <p style={{ fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.4rem' }}><span style={{ color: '#ef4444', fontWeight: 700 }}>{item.q.split(' ')[0]}</span>{' ' + item.q.split(' ').slice(1).join(' ')}</p>
                  <p style={{ fontSize: '0.75rem', color: '#14b8a6', fontWeight: 600 }}>→ {item.a}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      );
    }
  };

  // ───────────────────────── A2 CONTENT ─────────────────────────

  const renderA2 = () => {
    if (activeTab === 'Connectors') {
      return (
        <div className="gr-fade">
          <Card title="Connector Master Reference" color="#6366f1">
            <Intro>The single most important table in A2. Memorize the verb position column.</Intro>
            <DataTable headers={['Connector', 'Meaning', 'Verb Position', 'Example']} rows={[
              ['weil', 'because', 'End', 'Ich lerne Deutsch, weil es wichtig ist.'],
              ['denn', 'because', 'Normal (2nd)', 'Ich lerne Deutsch, denn es ist wichtig.'],
              ['dass', 'that', 'End', 'Ich denke, dass Deutsch wichtig ist.'],
              ['obwohl', 'although', 'End', 'Ich lerne, obwohl es schwierig ist.'],
              ['wenn', 'if / when', 'End', 'Wenn ich Zeit habe, komme ich.'],
              ['damit', 'so that', 'End', 'Ich lerne, damit du es verstehst.'],
              ['um...zu', 'in order to', 'zu + Infinitiv at end', 'Ich lerne, um es zu verstehen.'],
              ['deshalb', 'therefore', 'Verb immediately after', 'Deshalb lerne ich jeden Tag.'],
              ['trotzdem', 'nevertheless', 'Verb immediately after', 'Trotzdem gehe ich spazieren.'],
            ]} />
            <Tip><b>Golden trick — WDOWD group</b> (Weil, Dass, Obwohl, Wenn, Damit) all send the verb to the end. <i>deshalb</i> &amp; <i>trotzdem</i> → verb comes directly after (Verb-Second). <i>denn</i> → normal word order. <i>um...zu</i> → same subject, zu + Infinitiv at end.</Tip>
          </Card>

          <Card title="weil vs. denn vs. dass" color="#3b82f6">
            <SubBlock title="denn (coordinating) — NORMAL word order" color="#3b82f6" structure="Satz 1, denn Satz 2" examples={['Ich bin glücklich, denn ich habe eine neue Stelle.', 'Ich lerne Deutsch, denn ich möchte in Deutschland studieren.']} />
            <SubBlock title="weil (subordinating) — Verb goes to the END" color="#3b82f6" structure="Satz 1, weil ... Verb" examples={['Ich bin glücklich, weil ich eine neue Stelle habe.', 'Ich lerne Deutsch, weil ich in Deutschland studieren möchte.']} />
            <SubBlock title="dass — 'that' — Verb goes to the END (same as weil)" color="#3b82f6" structure="Main clause + dass + ... Verb (end)" examples={['Ich glaube, dass Deutsch wichtig ist.', 'Ich denke, dass er heute kommt.', 'Es ist wichtig, dass alle Kinder in die Schule gehen.']} />
            <Tip>Common starters: <i>Ich denke, dass… · Ich glaube, dass… · Ich finde, dass… · Es ist wichtig, dass… · Es ist schade, dass…</i></Tip>
          </Card>

          <Card title="obwohl vs. trotzdem — Contrast" color="#ef4444">
            <SubBlock title="obwohl — one sentence, verb at end" color="#ef4444" structure="Hauptsatz + obwohl + ... Verb (end)" examples={['Ich gehe spazieren, obwohl es regnet.', 'Er arbeitet, obwohl er krank ist.', 'Obwohl ich müde bin, lerne ich Deutsch.']} />
            <SubBlock title="trotzdem — two sentences, Verb-Second after trotzdem" color="#ef4444" structure="Sentence 1. Trotzdem + Verb + Subject ..." examples={['Es regnet. Trotzdem gehe ich spazieren.', 'Er ist müde. Trotzdem arbeitet er.']} />
            <Tip>weil = reason (because) · obwohl = contrast (although), both send the verb to the end within one sentence.</Tip>
          </Card>

          <Card title="wenn vs. als — Time Reference" color="#22c55e">
            <DataTable headers={['Word', 'Meaning', 'Time Reference', 'Example']} rows={[
              ['wenn', 'if / whenever', 'Present, future, repeated past', 'Wenn ich Zeit habe, komme ich.'],
              ['als', 'when (once)', 'One-time past event', 'Als ich ein Kind war, spielte ich Fußball.'],
            ]} />
            <Tip><b>Exam trick:</b> wenn = repeated or future. als = single past moment. Verb always goes to the end of the wenn-clause.</Tip>
          </Card>

          <Card title="damit vs. um...zu — Purpose" color="#a855f7">
            <Intro>The rule is simple: check the subjects.</Intro>
            <SubBlock title="um...zu — SAME subject in both clauses" color="#a855f7" structure="Main clause + um + ... + zu + Infinitiv" examples={['Ich lerne Deutsch, um in Deutschland zu studieren.', 'Er spart Geld, um ein Auto zu kaufen.']} />
            <SubBlock title="damit — DIFFERENT subjects in the two clauses" color="#a855f7" structure="Main clause + damit + ... Verb (end)" examples={['Ich lerne Deutsch, damit mein Bruder mir helfen kann.', 'Nimm die Tropfen, damit du besser schlafen kannst.']} />
            <Tip>When the subject is the same, both are technically correct — but A2 teachers prefer um...zu.</Tip>
          </Card>

          <Card title="deshalb & trotzdem — Verb-Second Adverbs" color="#14b8a6">
            <SubBlock title="deshalb — 'therefore / that is why'" color="#14b8a6" structure="Sentence 1. Deshalb + Verb + Subject ..." examples={['Ich habe viel gelernt. Deshalb habe ich die Prüfung bestanden.', 'Er ist krank. Deshalb kommt er nicht.']} />
            <SubBlock title="trotzdem — 'nevertheless / still'" color="#14b8a6" structure="Sentence 1. Trotzdem + Verb + Subject ..." examples={['Es regnet. Trotzdem gehe ich spazieren.', 'Er ist müde. Trotzdem arbeitet er.']} />
          </Card>
        </div>
      );
    }

    if (activeTab === 'Verbs') {
      return (
        <div className="gr-fade">
          <Card title="Reflexive Verben" color="#3b82f6">
            <Intro>The action comes back to the person performing it: 'I wash myself.'</Intro>
            <DataTable headers={['Pronomen', 'Reflexivpronomen']} rows={[['ich', 'mich'], ['du', 'dich'], ['er / sie / es', 'sich'], ['wir', 'uns'], ['ihr', 'euch'], ['sie / Sie', 'sich']]} />
            <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.4, margin: '1.25rem 0 0.75rem' }}>Core Reflexive Verbs with Prepositions</p>
            <DataTable headers={['Verb + Preposition', 'Meaning', 'Case', 'Example']} rows={[
              ['sich bewerben um', 'to apply for', 'Akk', 'Ich bewerbe mich um eine Stelle.'],
              ['sich interessieren für', 'to be interested in', 'Akk', 'Ich interessiere mich für Deutsch.'],
              ['sich bedanken für', 'to thank for', 'Akk', 'Ich bedanke mich für Ihre Hilfe.'],
              ['sich freuen auf', 'to look forward to', 'Akk', 'Ich freue mich auf den Urlaub.'],
              ['sich treffen mit', 'to meet with', 'Dat', 'Ich treffe mich mit meinem Freund.'],
              ['sich anmelden (für)', 'to register (for)', '—', 'Ich melde mich für den Kurs an.'],
              ['sich beeilen', 'to hurry up', '—', 'Ich beeile mich.'],
            ]} />
            <Tip>The reflexive pronoun stays with its subject even in commands: <i>Beeil dich! (du) · Beeilen Sie sich! (Sie) · Beeilt euch! (ihr)</i></Tip>
          </Card>

          <Card title="Modalverb dürfen — 'may / be allowed to'" color="#f59e0b">
            <DataTable headers={['Pronomen', 'dürfen']} rows={[['ich', 'darf'], ['du', 'darfst'], ['er / sie / es', 'darf'], ['wir', 'dürfen'], ['ihr', 'dürft'], ['sie / Sie', 'dürfen']]} />
            <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.4, margin: '1.25rem 0 0.75rem' }}>nicht vs. kein</p>
            <DataTable headers={['Negation', 'Use', 'Example']} rows={[
              ['nicht', 'Before verb / whole action', 'Du darfst nicht rauchen.'],
              ['kein', 'Before a noun', 'Du darfst keine Zigaretten kaufen.'],
            ]} />
          </Card>

          <Card title="Imperativ (Commands)" color="#ef4444">
            <DataTable headers={['Form', 'Rule', 'machen', 'kommen', 'bringen', 'legen']} rows={[
              ['du', "Remove -en, drop final -st", 'Mach!', 'Komm!', 'Bring!', 'Leg!'],
              ['ihr', "ihr-form without 'ihr'", 'Macht!', 'Kommt!', 'Bringt!', 'Legt!'],
              ['Sie', 'Infinitiv + Sie', 'Machen Sie!', 'Kommen Sie!', 'Bringen Sie!', 'Legen Sie!'],
            ]} minWidth="620px" />
            <Tip>Reflexive verbs keep the pronoun: <i>Beeil dich! · Beeilt euch! · Beeilen Sie sich!</i> Very common in office contexts: <i>Kommen Sie bitte herein. / Bringen Sie die Unterlagen mit.</i></Tip>
          </Card>

          <Card title="Konjunktiv II — Advice, Suggestions & Polite Requests" color="#a855f7">
            <DataTable headers={['Infinitiv', 'Konjunktiv II', 'Use']} rows={[
              ['sollen', 'sollte', "Advice — 'should'"],
              ['können', 'könnte', "Suggestion — 'could'"],
              ['haben', 'hätte', 'Hypothetical possession'],
              ['sein', 'wäre', 'Hypothetical state'],
              ['werden', 'würde', 'General Konjunktiv II for all verbs'],
              ['müssen', 'müsste', 'Mild obligation'],
              ['mögen', 'möchte', 'Polite wish'],
            ]} />
            <Examples items={['Du solltest mehr lernen. → You should study more.', 'Wir könnten nach Bonn fahren. → We could go to Bonn.', 'Könnten Sie mir helfen? → Could you help me?', 'Ich hätte gern einen Kaffee. → I would like a coffee.', 'Für regular verbs: würde + Infinitiv — Ich würde nach Deutschland reisen.']} />
            <Tip><b>sollte vs. könnte:</b> sollte = stronger advice (like a teacher recommending); könnte = softer suggestion, one option among several. Priority forms for A2: sollte, könnte, möchte, hätte, wäre, würde.</Tip>
          </Card>

          <Card title="Präteritum der Modalverben — Modal Verbs in the Past" color="#14b8a6">
            <Intro>Only the modal verb changes to Präteritum; the rest of the sentence stays the same.</Intro>
            <DataTable headers={['Infinitiv', 'Present (ich)', 'Präteritum (ich)', 'English']} rows={[
              ['wollen', 'will', 'wollte', 'wanted to'],
              ['können', 'kann', 'konnte', 'was able to'],
              ['müssen', 'muss', 'musste', 'had to'],
              ['sollen', 'soll', 'sollte', 'was supposed to'],
              ['dürfen', 'darf', 'durfte', 'was allowed to'],
            ]} />
            <Examples items={['Ich kann Deutsch sprechen. → Ich konnte Deutsch sprechen.', 'Wir müssen arbeiten. → Wir mussten arbeiten.', 'Er will Pilot werden. → Er wollte Pilot werden.', 'Als Kind wollte ich Lehrer werden. / Als Kind durfte ich lange spielen.']} />
            <Tip>haben → hatte, sein → war also follow this pattern: <i>Ich war krank. / Ich hatte keine Zeit.</i> Note: sollte can mean either Präteritum ('was supposed to') or Konjunktiv II ('should') — context decides.</Tip>
          </Card>
        </div>
      );
    }

    if (activeTab === 'Cases') {
      return (
        <div className="gr-fade">
          <Card title="Demonstrativpronomen — 'this one / that one'" color="#3b82f6">
            <Intro>Replaces a noun to avoid repetition: <i>Der Pullover ist toll. Ich kaufe den Pullover.</i> → <i>Der Pullover ist toll. Den kaufe ich.</i></Intro>
            <DataTable headers={['Case', 'Maskulin', 'Feminin', 'Neutral', 'Plural']} rows={[
              ['Nominativ', 'der', 'die', 'das', 'die'],
              ['Akkusativ', 'den', 'die', 'das', 'die'],
              ['Dativ', 'dem', 'der', 'dem', 'denen'],
              ['Genitiv', 'dessen', 'deren', 'dessen', 'deren'],
            ]} />
            <Tip>A2 exam focus is mainly Nom + Akk — only Maskulin changes in Akkusativ (der → den). Dativ example: <i>Der Mann ist nett. Ich helfe dem.</i></Tip>
          </Card>

          <Card title="Possessivpronomen im Dativ & Akkusativ" color="#f59e0b">
            <DataTable headers={['Case', 'Maskulin', 'Feminin', 'Neutral', 'Plural']} rows={[
              ['Dativ', 'meinem', 'meiner', 'meinem', 'meinen'],
              ['Akkusativ', 'meinen', 'meine', 'mein', 'meine'],
            ]} />
            <Tip>Only Maskulin changes in Akkusativ (mein → meinen), just as der → den. The Dativ pattern meinem/meiner/meinem/meinen applies identically to deinem, seinem, ihrem, unserem, eurem.</Tip>
            <Examples items={['Ich helfe meinem Chef.', 'Er antwortet seiner Kollegin.', 'Wir schreiben unserem Kunden.', 'Ich nehme meinen Kurs. / Ich kaufe meine Salbe.']} />
          </Card>

          <Card title="Indefinitpronomen" color="#22c55e">
            <DataTable headers={['German', 'English', 'Example']} rows={[
              ['jemand', 'someone', 'Jemand wartet draußen.'],
              ['niemand', 'nobody', 'Niemand ist zu Hause.'],
              ['etwas', 'something', 'Ich möchte etwas essen.'],
              ['nichts', 'nothing', 'Ich weiß nichts.'],
              ['alle', 'everyone / all', 'Alle Kinder lernen Deutsch.'],
              ['man', 'one / people / you (general)', 'Man muss viel lernen.'],
            ]} />
            <Tip><i>man</i> is very common for general truths: <i>Man muss pünktlich sein. / Man darf hier nicht rauchen.</i></Tip>
          </Card>

          <Card title="Verben mit Dativ" color="#a855f7">
            <Intro>These verbs require Dativ (Wem?), NOT Akkusativ — a frequent exam trap.</Intro>
            <DataTable headers={['Verb', 'English', 'Example']} rows={[
              ['helfen', 'to help', 'Ich helfe meinem Freund.'],
              ['antworten', 'to answer', 'Ich antworte meinem Chef.'],
              ['zuhören', 'to listen to', 'Ich höre meiner Mutter zu.'],
              ['gehören', 'to belong to', 'Das Auto gehört meinem Bruder.'],
              ['danken', 'to thank', 'Ich danke meiner Kollegin.'],
            ]} />
            <Tip>Memory trick: all these verbs answer <b>Wem?</b> (to/for whom?) — that always signals Dativ.</Tip>
          </Card>

          <Card title="Verben mit Dativ AND Akkusativ — Two Objects" color="#14b8a6">
            <div className="modal-formula">Verb + Person (Dativ) + Thing (Akkusativ)</div>
            <DataTable headers={['Verb', 'English', 'Example']} rows={[
              ['geben', 'to give', 'Ich gebe Ihnen eine Salbe.'],
              ['schenken', 'to gift', 'Ich schenke ihr einen Yogakurs.'],
              ['zeigen', 'to show', 'Er zeigt mir sein Handy.'],
              ['schicken', 'to send', 'Wir schicken ihm eine E-Mail.'],
              ['bringen', 'to bring', 'Bring mir bitte den Stift.'],
              ['kaufen', 'to buy', 'Er kauft ihr Blumen.'],
              ['empfehlen', 'to recommend', 'Ich empfehle dir das Buch.'],
              ['erzählen', 'to tell', 'Er erzählt uns eine Geschichte.'],
              ['leihen', 'to lend', 'Kannst du mir das Auto leihen?'],
            ]} />
          </Card>
        </div>
      );
    }

    if (activeTab === 'Nouns') {
      return (
        <div className="gr-fade">
          <Card title="Adjektivdeklination (Adjective Declension)" color="#3b82f6">
            <Intro>Key insight: only the ADJECTIVE ending changes. The noun itself stays the same.</Intro>
            <p style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.5rem' }}>1. With Definite Article</p>
            <DataTable headers={['Case', 'Maskulin', 'Feminin', 'Neutral', 'Plural']} rows={[
              ['Nominativ', 'der rote Mantel', 'die rote Jacke', 'das rote Handy', 'die roten Schuhe'],
              ['Akkusativ', 'den roten Mantel', 'die rote Jacke', 'das rote Handy', 'die roten Schuhe'],
            ]} minWidth="620px" />
            <p style={{ fontWeight: 700, fontSize: '0.85rem', margin: '1.25rem 0 0.5rem' }}>2. With Indefinite Article</p>
            <DataTable headers={['Case', 'Maskulin', 'Feminin', 'Neutral']} rows={[
              ['Nominativ', 'ein roter Mantel', 'eine rote Jacke', 'ein rotes Handy'],
              ['Akkusativ', 'einen roten Mantel', 'eine rote Jacke', 'ein rotes Handy'],
            ]} minWidth="560px" />
            <Tip><b>Cheat sheet:</b> der-word Nom → der rote / die rote / das rote / die roten. der-word Akk → den roten / die rote / das rote / die roten. ein-word Nom → ein roter / eine rote / ein rotes. ein-word Akk → einen roten / eine rote / ein rotes.</Tip>
          </Card>

          <Card title="jeder / jede / jedes — 'every / each'" color="#22c55e">
            <Intro>Declines like a der-word. Only Maskulin Akkusativ changes: jeder → jeden.</Intro>
            <DataTable headers={['Gender', 'Nominativ', 'Akkusativ']} rows={[
              ['Maskulin', 'jeder Schüler', 'jeden Schüler'],
              ['Feminin', 'jede Frau', 'jede Frau'],
              ['Neutral', 'jedes Kind', 'jedes Kind'],
            ]} />
            <Examples items={['Jedes Kind muss die Hausaufgaben machen.', 'Jeder Mensch ist anders.', 'Jede Schule hat Regeln.']} />
          </Card>

          <Card title="Genitiv — Possession & Ownership" color="#f59e0b">
            <Intro>Equivalent to 's in English (Maria's book).</Intro>
            <DataTable headers={['Nominativ', 'Genitiv Article', 'Example']} rows={[
              ['der Mann (M)', 'des Mannes', 'Das Auto des Mannes.'],
              ['das Kind (N)', 'des Kindes', 'Die Spielsachen des Kindes.'],
              ['die Frau (F)', 'der Frau', 'Die Tasche der Frau.'],
              ['die Kinder (Pl)', 'der Kinder', 'Die Bücher der Kinder.'],
            ]} />
            <p style={{ fontWeight: 700, fontSize: '0.85rem', margin: '1.25rem 0 0.5rem' }}>Noun Endings (Maskulin & Neutral only)</p>
            <DataTable headers={['Noun Type', 'Rule', 'Examples']} rows={[
              ['1 syllable', 'Add -es', 'Mann → Mannes, Hund → Hundes, Kind → Kindes'],
              ['2+ syllables', 'Add -s', 'Lehrer → Lehrers, Computer → Computers, Auto → Autos'],
              ['Ends in s/ß/x/z/tz/sch', 'Add -es', 'Bus → Busses, Platz → Platzes, Fuchs → Fuchses'],
            ]} />
            <Tip>Proper names: <i>Peters Auto / Marias Buch</i> (add -s). Names ending in s/ß/x/z: <i>Thomas' Auto / Hans' Bruder</i> (apostrophe only).</Tip>
            <p style={{ fontWeight: 700, fontSize: '0.85rem', margin: '1.25rem 0 0.5rem' }}>Genitiv Prepositions</p>
            <DataTable headers={['Preposition', 'Meaning', 'Example']} rows={[
              ['wegen', 'because of', 'Wegen des Regens bleiben wir zu Hause.'],
              ['trotz', 'despite', 'Trotz des Problems arbeitet er weiter.'],
              ['während', 'during', 'Während des Unterrichts darf man nicht telefonieren.'],
              ['statt', 'instead of', 'Statt des Autos nehme ich das Fahrrad.'],
            ]} />
          </Card>
        </div>
      );
    }

    if (activeTab === 'Prepositions') {
      return (
        <div className="gr-fade">
          <Card title="Zeitangaben — bis, ab, für" color="#3b82f6">
            <DataTable headers={['Preposition', 'English', 'Use', 'Question', 'Examples']} rows={[
              ['bis', 'until / by', 'Deadline / end point', 'Bis wann?', 'Bis zum 30. Juni / bis 18 Uhr'],
              ['ab', 'from (starting)', 'Starting point', 'Ab wann?', 'Ab Montag / ab nächster Woche'],
              ['für', 'for (duration)', 'Period of time', 'Für wie lange?', 'für sechs Monate / für ein Jahr'],
            ]} minWidth="640px" />
            <Tip><b>Memory trick:</b> bis → end point · ab → starting point · für → duration</Tip>
          </Card>

          <Card title="seit vs. vor — 'since/for' vs. 'ago'" color="#f59e0b">
            <DataTable headers={['Preposition', 'English', 'Use', 'Tense', 'Example']} rows={[
              ['seit', 'since / for', 'Started in the past, STILL continuing', 'Present', 'Ich lerne seit zwei Jahren Deutsch.'],
              ['vor', 'ago', 'Happened & completed in the past', 'Perfekt / Präteritum', 'Ich habe vor zwei Jahren Deutsch gelernt.'],
            ]} minWidth="640px" />
            <Tip>seit → arrow reaches NOW (still ongoing). vor → happened and stopped (no arrow to now). <i>Wir wohnen seit 2020 hier.</i> vs <i>Er hat vor einer Woche angerufen.</i></Tip>
          </Card>

          <Card title="Wechselpräpositionen — Two-Way Prepositions" color="#8b5cf6">
            <Intro>These 9 take Akkusativ for movement (Wohin?) and Dativ for location (Wo?).</Intro>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '0.6rem', marginBottom: '1.25rem' }}>
              {['an', 'auf', 'hinter', 'in', 'neben', 'über', 'unter', 'vor', 'zwischen'].map(p => (
                <div key={p} style={{ padding: '0.6rem', borderRadius: '12px', textAlign: 'center', background: dm ? 'rgba(139,92,246,0.08)' : 'rgba(139,92,246,0.06)', border: `1px solid ${dm ? 'rgba(139,92,246,0.2)' : 'rgba(139,92,246,0.15)'}`, fontWeight: 700, fontSize: '0.95rem', color: '#8b5cf6' }}>{p}</div>
              ))}
            </div>
            <DataTable headers={['Preposition', 'Wohin? → Akkusativ', 'Wo? → Dativ']} rows={[
              ['in', 'Ich gehe in die Schule.', 'Ich bin in der Schule.'],
              ['auf', 'Ich lege das Buch auf den Tisch.', 'Das Buch liegt auf dem Tisch.'],
              ['an', 'Ich gehe an den Strand.', 'Ich bin am Strand. (an+dem=am)'],
              ['vor', 'Ich stelle das Auto vor das Haus.', 'Das Auto steht vor dem Haus.'],
            ]} minWidth="600px" />
            <Tip>Contractions: an+dem=am · in+dem=im · an+das=ans · in+das=ins. Motion verbs → Akk: gehen, fahren, legen, stellen, hängen, setzen, stecken. Position verbs → Dat: sein, liegen, stehen, hängen, sitzen, stecken.</Tip>
          </Card>

          <Card title="Verben mit Präpositionen — Fixed Combinations" color="#14b8a6">
            <Intro>Learn these as complete units — the case is determined by the preposition, not the verb.</Intro>
            <DataTable headers={['Verb + Preposition', 'English', 'Case', 'Example']} rows={[
              ['denken an', 'to think about', 'Akk', 'Ich denke an meinen Urlaub.'],
              ['warten auf', 'to wait for', 'Akk', 'Wir warten auf den Bus.'],
              ['sich freuen auf', 'to look forward to', 'Akk', 'Ich freue mich auf den Urlaub.'],
              ['sich interessieren für', 'to be interested in', 'Akk', 'Ich interessiere mich für Deutsch.'],
              ['sprechen über', 'to talk about', 'Akk', 'Wir sprechen über das Problem.'],
              ['anfangen mit', 'to start with', 'Dat', 'Ich fange mit Deutsch an.'],
              ['helfen bei', 'to help with', 'Dat', 'Er hilft bei der Arbeit.'],
              ['teilnehmen an', 'to take part in', 'Dat', 'Wir nehmen an dem Kurs teil.'],
            ]} />
            <Tip><b>Ultra-priority to memorize first:</b> sich interessieren für, sich freuen auf, warten auf, denken an, anfangen mit, teilnehmen an.</Tip>
          </Card>
        </div>
      );
    }

    if (activeTab === 'Clauses') {
      return (
        <div className="gr-fade">
          <Card title="Indirekte Fragen (Indirect Questions)" color="#6366f1">
            <Intro>Polite ways to ask something. Rule: keep the question word, verb goes to the END (like weil, dass, obwohl).</Intro>
            <DataTable headers={['Direct Question', 'Indirect Question']} rows={[
              ['Wo wohnst du?', 'Kannst du mir sagen, wo du wohnst?'],
              ['Wann kommt der Zug?', 'Weißt du, wann der Zug kommt?'],
              ['Warum bist du traurig?', 'Kannst du mir sagen, warum du traurig bist?'],
            ]} />
            <Tip>Common starters: <i>Können Sie mir sagen, wo…? · Wissen Sie, wann…? · Weißt du, warum…?</i></Tip>
          </Card>

          <Card title="Relativsätze (Relative Clauses)" color="#a855f7">
            <Intro>Adds extra information about a noun, introduced by a Relativpronomen. Verb goes to the END.</Intro>
            <DataTable headers={['Case', 'Maskulin', 'Feminin', 'Neutral', 'Plural']} rows={[
              ['Nominativ', 'der', 'die', 'das', 'die'],
              ['Akkusativ', 'den', 'die', 'das', 'die'],
              ['Dativ', 'dem', 'der', 'dem', 'denen'],
              ['Genitiv', 'dessen', 'deren', 'dessen', 'deren'],
            ]} />
            <Examples items={[
              'Nominativ: Das ist der Mann, der Deutsch spricht.',
              'Akkusativ: Das ist der Mann, den ich kenne.',
              'Dativ: Das ist der Mann, dem ich helfe. (helfen + Dativ)',
              'Genitiv: Das ist der Mann, dessen Auto neu ist. (whose car)',
            ]} />
            <p style={{ fontWeight: 700, fontSize: '0.85rem', margin: '1.25rem 0 0.5rem' }}>Relativsätze mit Präpositionen</p>
            <DataTable headers={['Original', 'Relativsatz', 'Prep + Case']} rows={[
              ['Ich spreche mit dem Mann.', 'Das ist der Mann, mit dem ich spreche.', 'mit + Dativ'],
              ['Ich arbeite für die Firma.', 'Das ist die Firma, für die ich arbeite.', 'für + Akkusativ'],
              ['Ich wohne in der Stadt.', 'Das ist die Stadt, in der ich wohne.', 'in + Dativ'],
            ]} minWidth="600px" />
            <Tip><b>dessen vs. deren:</b> dessen = Maskulin & Neutral ('his/its'). deren = Feminin & Plural ('her/their'). Same forms as the Demonstrativpronomen table, different function.</Tip>
          </Card>
        </div>
      );
    }
  };

  // ───────────────────────── B1.1 CONTENT ─────────────────────────

  const renderB1_1 = () => {
    if (activeTab === 'Connectors') {
      return (
        <div className="gr-fade">
          <Card title="Zweiteilige Konnektoren — Two-Part Connectors" color="#6366f1">
            <Intro>Both parts must appear — you cannot use just one half.</Intro>
            <DataTable headers={['Konnektor', 'Bedeutung']} rows={[
              ['nicht nur … sondern auch', 'not only … but also'],
              ['sowohl … als auch', 'both … and / as well as'],
              ['entweder … oder', 'either … or'],
              ['weder … noch', 'neither … nor'],
              ['zwar … aber', 'certainly / admittedly … but'],
              ['einerseits … andererseits', 'on one hand … on the other hand'],
              ['je … desto', 'the more … the better (comparative)'],
            ]} />
          </Card>

          <Card title="nicht nur … sondern auch / sowohl … als auch" color="#3b82f6">
            <SubBlock title="nicht nur … sondern auch" color="#3b82f6" structure="Subjekt + Verb + nicht nur + X, sondern auch + Y" examples={['Ich lerne nicht nur Deutsch, sondern auch Englisch.', 'Ich möchte nicht nur meinen Wortschatz verbessern, sondern auch fließender sprechen.']} />
            <SubBlock title="sowohl … als auch" color="#3b82f6" structure="Subjekt + Verb + sowohl + X + als auch + Y" examples={['Ich mag sowohl Kaffee als auch Tee.', 'Ich interessiere mich sowohl für Datenanalyse als auch für Business Analytics.']} />
          </Card>

          <Card title="entweder … oder / weder … noch" color="#22c55e">
            <SubBlock title="entweder … oder — exactly one of two choices" color="#22c55e" structure="Entweder + Hauptsatz 1, oder + Hauptsatz 2" examples={['Wir fahren entweder nach Berlin oder nach München.', 'Entweder rufst du an, oder du schreibst eine Nachricht.']} />
            <SubBlock title="weder … noch — rejects BOTH (no extra 'nicht')" color="#22c55e" structure="Weder + X + noch + Y" examples={['Ich trinke weder Kaffee noch Tee.', 'Er kann weder Deutsch noch Französisch sprechen.']} />
          </Card>

          <Card title="zwar … aber / einerseits … andererseits" color="#f59e0b">
            <SubBlock title="zwar … aber — concession then contrast" color="#f59e0b" structure="Zwar + Information 1, aber + Information 2" examples={['Das Auto ist zwar alt, aber es funktioniert gut.', 'Der B1-Kurs ist zwar schwierig, aber er ist sehr interessant.']} />
            <SubBlock title="einerseits … andererseits — two balanced perspectives" color="#f59e0b" structure="Einerseits + Satz 1, andererseits + Satz 2" examples={['Einerseits ist die Stadt groß, andererseits ist sie teuer.', 'Einerseits möchte ich in Deutschland studieren, andererseits mache ich mir Sorgen über die Kosten.']} />
          </Card>

          <Card title="je … desto — Comparative Pairing" color="#ef4444">
            <div className="modal-formula">Je + Komparativ + Verb (Satz 1), desto + Komparativ + Verb (Satz 2)</div>
            <Examples items={['Je mehr ich lerne, desto besser werden meine Noten.', 'Je später es wird, desto müder bin ich.', 'Je mehr ich Deutsch lerne, desto selbstbewusster werde ich.']} />
            <Tip>Always uses comparative forms (mehr, besser, schneller — never the base adjective). je-clause has verb at end; desto-clause has verb directly after the adjective.</Tip>
          </Card>
        </div>
      );
    }

    if (activeTab === 'Prepositions') {
      return (
        <div className="gr-fade">
          <Card title="Genitiv-Präpositionen" color="#3b82f6">
            <Intro>In spoken German, Dativ is also acceptable, but Genitiv is standard in written/formal use.</Intro>
            <DataTable headers={['Präposition', 'Bedeutung']} rows={[
              ['wegen', 'because of'], ['während', 'during'], ['statt / anstatt', 'instead of'],
              ['trotz', 'despite'], ['innerhalb', 'within'], ['außerhalb', 'outside of'],
            ]} />
            <Examples items={[
              'Wegen des Regens bleibe ich zu Hause.',
              'Während des Unterrichts sprechen wir nur Deutsch.',
              'Statt des Busses nehme ich die U-Bahn.',
              'Trotz des Regens gehen wir spazieren.',
              'Innerhalb einer Woche bekomme ich eine Antwort.',
              'Außerhalb der Stadt liegt das Hotel.',
            ]} />
            <Tip>statt and anstatt are interchangeable as prepositions. All six always take Genitiv: wegen, während, statt, trotz, innerhalb, außerhalb.</Tip>
          </Card>

          <Card title="Präpositionaladverbien — Wo-/Da-Komposita" color="#8b5cf6">
            <Intro>Used to ask about or refer back to THINGS (not people). Add -r- before vowel-starting prepositions.</Intro>
            <DataTable headers={['Präposition', 'Fragewort (wo-)', 'Antwort (da-)']} rows={[
              ['an', 'woran', 'daran'], ['auf', 'worauf', 'darauf'], ['aus', 'woraus', 'daraus'],
              ['in', 'worin', 'darin'], ['um', 'worum', 'darum'], ['unter', 'worunter', 'darunter'],
              ['über', 'worüber', 'darüber'], ['für', 'wofür', 'dafür'], ['mit', 'womit', 'damit'], ['von', 'wovon', 'davon'],
            ]} />
            <Examples items={[
              'Woran denkst du? → Ich denke an meine Familie. → Ich denke daran.',
              'Worüber sprichst du? → Ich spreche über den Film. → Ich spreche darüber.',
              'Wofür interessierst du dich? → Ich interessiere mich dafür.',
            ]} />
            <Tip>Not for people — use preposition + Personalpronomen instead (<i>mit ihm, für sie</i>). Note: <i>damit</i> (da-Kompositum) looks identical to <i>damit</i> (conjunction 'so that') — context tells them apart.</Tip>
          </Card>
        </div>
      );
    }

    if (activeTab === 'Infinitiv & Futur') {
      return (
        <div className="gr-fade">
          <Card title="Infinitiv mit „zu“" color="#3b82f6">
            <Intro>When two verbs are linked and share the same subject, the second verb uses zu + Infinitiv. No own subject; always separated by a comma.</Intro>
            <p style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.5rem' }}>A. Verben + zu + Infinitiv</p>
            <PillGrid color="#3b82f6" items={[['anfangen', 'to start'], ['vergessen', 'to forget'], ['vorhaben', 'to plan'], ['empfehlen', 'to recommend'], ['versuchen', 'to try'], ['helfen', 'to help'], ['aufhören', 'to stop'], ['hoffen', 'to hope'], ['planen', 'to plan']]} />
            <Examples items={['Ich fange an, Deutsch zu lernen.', 'Ich habe vergessen, das Buch mitzubringen.', 'Ich habe vor, in Deutschland zu studieren.', 'Kannst du mir helfen, die Aufgabe zu lösen?']} />
            <p style={{ fontWeight: 700, fontSize: '0.85rem', margin: '1.25rem 0 0.5rem' }}>B. Nomen + zu + Infinitiv</p>
            <Examples items={['Ich habe den Wunsch, in Deutschland zu studieren.', 'Ich habe die Möglichkeit, online Deutsch zu lernen.', 'Er hat die Chance, ein Praktikum zu machen.']} />
            <p style={{ fontWeight: 700, fontSize: '0.85rem', margin: '1.25rem 0 0.5rem' }}>C. Adjektive + zu + Infinitiv</p>
            <div className="modal-formula" style={{ marginBottom: '0.75rem' }}>Es ist [Adjektiv], zu + Infinitiv</div>
            <Examples items={['Es ist gesund, viel Wasser zu trinken.', 'Es ist wichtig, Deutsch zu lernen.', 'Es ist schwer, neue Wörter zu merken.']} />
            <Tip><b>Separable verbs:</b> zu goes between prefix and stem — <i>auf+zu+machen = aufzumachen</i>. Example: <i>Ich versuche, das Fenster aufzumachen.</i></Tip>
          </Card>

          <Card title="Kein „zu“ — Three Fixed Exceptions" color="#ef4444">
            <Examples items={[
              'Nach Modalverben (können, müssen, dürfen, sollen, wollen, möchten): Ich kann Deutsch sprechen. NOT: Ich kann Deutsch zu sprechen.',
              'Futur I mit werden: Ich werde morgen kommen. NOT: Ich werde Deutsch zu lernen.',
              'Wahrnehmung & Bewegung (hören, sehen, fühlen, kommen, gehen, fahren, bleiben, fliegen, lassen, haben, finden): Ich höre ihn singen. / Ich gehe einkaufen.',
            ]} />
          </Card>

          <Card title="Futur I (Future Tense) — werden" color="#22c55e">
            <Intro>werden has two completely different roles depending on what follows it.</Intro>
            <DataTable headers={['Person', 'werden']} rows={[['ich', 'werde'], ['du', 'wirst'], ['er / sie / es', 'wird'], ['wir', 'werden'], ['ihr', 'werdet'], ['sie / Sie', 'werden']]} />
            <p style={{ fontWeight: 700, fontSize: '0.85rem', margin: '1.25rem 0 0.5rem' }}>A. werden + Infinitiv (Hilfsverb — Futur I)</p>
            <Examples items={['Ich werde morgen arbeiten.', 'Wir werden nach Berlin fahren.', 'Ich werde mein B1-Zertifikat bestehen.']} />
            <p style={{ fontWeight: 700, fontSize: '0.85rem', margin: '1.25rem 0 0.5rem' }}>B. werden + Nomen (to become a profession, no article)</p>
            <Examples items={['Er wird Arzt.', 'Sie wird Lehrerin.', 'Ich werde Data Analyst.']} />
            <p style={{ fontWeight: 700, fontSize: '0.85rem', margin: '1.25rem 0 0.5rem' }}>C. werden + Adjektiv (to become a quality)</p>
            <Examples items={['Das Wetter wird besser.', 'Mein Deutsch wird besser.', 'Ich werde selbstbewusster.']} />
          </Card>

          <Card title="ohne zu / anstatt zu" color="#a855f7">
            <SubBlock title="ohne zu — 'without doing' (same subject)" color="#a855f7" structure="Hauptsatz + ohne + zu + Infinitiv" examples={['Er ging nach Hause, ohne sich zu verabschieden.', 'Sie schläft, ohne das Licht auszuschalten.']} />
            <SubBlock title="anstatt zu — 'instead of doing' (same subject)" color="#a855f7" structure="Hauptsatz + anstatt + zu + Infinitiv" examples={['Er spielt Fußball, anstatt zu lernen.', 'Sie isst Fast Food, anstatt zu kochen.']} />
            <Tip>If subjects differ → use ohne dass / anstatt dass + full clause instead. statt + Genitiv is a separate preposition pattern (<i>Statt des Kaffees trinke ich Tee</i>).</Tip>
          </Card>

          <Card title="um … zu vs. damit — Purpose Clauses" color="#14b8a6">
            <DataTable headers={['Konstruktion', 'Wann?']} rows={[
              ['um … zu + Infinitiv', 'Both clauses have the SAME subject (shorter, preferred)'],
              ['damit + Nebensatz', 'The two clauses have DIFFERENT subjects (conjugated verb)'],
            ]} />
            <Examples items={['Ich lerne Deutsch, um in Deutschland zu studieren. (same subject)', 'Ich lerne Deutsch, damit meine Eltern stolz sind. (different subjects)']} />
            <Tip>Wozu? (For what purpose?) is answered with um … zu — <i>Wozu lernst du Deutsch? — Um in Deutschland zu studieren.</i></Tip>
          </Card>
        </div>
      );
    }

    if (activeTab === 'Passiv & Verben') {
      return (
        <div className="gr-fade">
          <Card title="Verbformen — Principal Parts" color="#3b82f6">
            <DataTable headers={['Verb Type', 'Pattern']} rows={[
              ['Schwache Verben (weak)', 'Infinitiv → -te → ge-…-t'],
              ['Starke Verben (strong)', 'Infinitiv → vowel change → ge-…-en'],
              ['Gemischte Verben (mixed)', 'Infinitiv → vowel change + -te → ge-…-t'],
            ]} />
            <p style={{ fontWeight: 700, fontSize: '0.85rem', margin: '1.25rem 0 0.5rem' }}>Starke Verben — Must Memorise</p>
            <DataTable headers={['Infinitiv', 'Präteritum', 'Partizip II']} rows={[
              ['sein', 'war', 'gewesen'], ['haben', 'hatte', 'gehabt'], ['werden', 'wurde', 'geworden'],
              ['gehen', 'ging', 'gegangen'], ['kommen', 'kam', 'gekommen'], ['fahren', 'fuhr', 'gefahren'],
              ['sehen', 'sah', 'gesehen'], ['sprechen', 'sprach', 'gesprochen'], ['schreiben', 'schrieb', 'geschrieben'],
              ['lesen', 'las', 'gelesen'], ['essen', 'aß', 'gegessen'], ['trinken', 'trank', 'getrunken'],
              ['nehmen', 'nahm', 'genommen'], ['geben', 'gab', 'gegeben'], ['schlafen', 'schlief', 'geschlafen'],
            ]} />
            <p style={{ fontWeight: 700, fontSize: '0.85rem', margin: '1.25rem 0 0.5rem' }}>Gemischte Verben</p>
            <DataTable headers={['Infinitiv', 'Präteritum', 'Partizip II']} rows={[
              ['bringen', 'brachte', 'gebracht'], ['denken', 'dachte', 'gedacht'], ['kennen', 'kannte', 'gekannt'], ['wissen', 'wusste', 'gewusst'],
            ]} />
            <Tip>Partizip II with <b>haben</b>: transitive verbs (<i>Ich habe das Buch gelesen.</i>) Partizip II with <b>sein</b>: motion & change-of-state verbs (<i>Ich bin nach Berlin gefahren. / Er ist eingeschlafen.</i>)</Tip>
          </Card>

          <Card title="Passiv (Passive Voice)" color="#ef4444">
            <Intro>Active focuses on the DOER; passive focuses on the ACTION or the thing being done.</Intro>
            <DataTable headers={['Zeitform', 'Bildung']} rows={[
              ['Präsens Passiv', 'wird + Partizip II'],
              ['Präteritum Passiv', 'wurde + Partizip II'],
              ['Passiv + Modal', 'Modalverb + Partizip II + werden'],
            ]} />
            <Examples items={[
              'Aktiv: Der Arzt operiert den Patienten. → Passiv: Der Patient wird (vom Arzt) operiert.',
              'Aktiv: Man backt das Brot täglich. → Passiv: Das Brot wird täglich gebacken.',
              'Präteritum: Der Patient wurde operiert. / Das Haus wurde gebaut.',
              'Mit Modal: Der Patient muss operiert werden. / Das Formular muss ausgefüllt werden.',
            ]} />
            <Tip>Agent (Handelnde Person): <b>von + Dativ</b> — <i>Der Brief wird vom Lehrer korrigiert.</i> Passiv only possible with TRANSITIVE verbs (verbs that take an Akkusativ object) — intransitive verbs like schlafen/liegen cannot form a personal passive.</Tip>
          </Card>
        </div>
      );
    }

    if (activeTab === 'Relativsätze') {
      return (
        <div className="gr-fade">
          <Card title="Relativsätze — Full Case Table" color="#a855f7">
            <Intro>Gender matches the noun described; case depends on the pronoun's role inside the relative clause. Verb always goes to the END.</Intro>
            <DataTable headers={['Kasus', 'Maskulin', 'Feminin', 'Neutral', 'Plural']} rows={[
              ['Nominativ', 'der', 'die', 'das', 'die'],
              ['Akkusativ', 'den', 'die', 'das', 'die'],
              ['Dativ', 'dem', 'der', 'dem', 'denen'],
            ]} />
            <Examples items={[
              'Der Mann, der dort steht, ist mein Lehrer. (Masc., Nominativ)',
              'Das Buch, das ich lese, ist interessant. (Neut., Akkusativ)',
              'Der Mann, dem ich helfe, ist krank. (Masc., Dativ)',
              'Die Kinder, denen ich erkläre, lernen schnell. (Plural, Dativ)',
            ]} />
          </Card>

          <Card title="Relativsatz mit „was“" color="#14b8a6">
            <Intro>Use was (not das/welches) after indefinite pronouns and neuter superlatives.</Intro>
            <DataTable headers={['Verwendet nach…', 'Beispiel']} rows={[
              ['alles', 'Alles, was er sagt, ist richtig.'],
              ['nichts', 'Es gibt nichts, was ich tun kann.'],
              ['etwas', 'Das ist etwas, was ich nicht verstehe.'],
              ['vieles', 'Vieles, was wir lernen, ist nützlich.'],
              ['das Beste (superlative)', 'Das ist das Beste, was ich je gegessen habe.'],
            ]} />
            <Tip>✗ NOT: <i>alles, das er sagt</i> — must be <b>was</b> after alles/nichts/etwas/vieles/neuter superlatives.</Tip>
          </Card>
        </div>
      );
    }
  };

  // ───────────────────────── B1.2 CONTENT ─────────────────────────

  const renderB1_2 = () => {
    if (activeTab === 'Temporale Sätze') {
      return (
        <div className="gr-fade">
          <Card title="als vs. wenn" color="#3b82f6">
            <DataTable headers={['Konnektor', 'Bedeutung', 'Beispiel']} rows={[
              ['als', 'One-time event in the past (Vergangenheit only)', 'Als ich nach Deutschland kam, war ich 24.'],
              ['wenn', 'Present, Future, Repeated past, Conditional (if)', 'Wenn ich Zeit habe, rufe ich dich an.']
            ]} />
          </Card>
          <Card title="bevor vs. nachdem" color="#f59e0b">
             <Intro>Shortcut: <b>nachdem</b> = 1. Handlung (First action), <b>bevor</b> = 2. Handlung (Second action)</Intro>
             <SubBlock title="bevor (before)" color="#f59e0b" structure="Main Clause + bevor + Subject + Verb (End)" examples={[
                'Bevor ich mich gewaschen habe, habe ich meine Zähne geputzt.'
             ]} />
             <SubBlock title="nachdem (after)" color="#f59e0b" structure="Nachdem + Subject + Plusquamperfekt, Main Clause (Präteritum)" examples={[
                'Nachdem ich meine Zähne geputzt hatte, wusch ich mich.'
             ]} />
          </Card>
          <Card title="während & seitdem" color="#14b8a6">
             <SubBlock title="während (while)" color="#14b8a6" structure="Two actions at the same time." examples={[
                'Während ich lernte, hörte mein Bruder Musik.'
             ]} />
             <SubBlock title="seitdem (since)" color="#14b8a6" structure="Started in the past and continues until now." examples={[
                'Seitdem ich Deutsch lerne, spreche ich besser.'
             ]} />
          </Card>
        </div>
      );
    }

    if (activeTab === 'Konjunktiv II') {
      return (
        <div className="gr-fade">
          <Card title="Indikativ vs Konjunktiv II" color="#ef4444">
            <DataTable headers={['Form', 'Bedeutung', 'Beispiel']} rows={[
              ['Indikativ', 'Reality / Facts', 'Ich habe Zeit.'],
              ['Konjunktiv II', 'Wish / Polite request / Advice / Imaginary', 'Ich hätte Zeit.']
            ]} />
          </Card>

          <Card title="Konjunktiv II (Präsens)" color="#a855f7">
             <DataTable headers={['Verb', 'Konjunktiv II']} rows={[
                ['haben', 'hätte'],
                ['sein', 'wäre'],
                ['werden', 'würde'],
                ['können', 'könnte'],
                ['müssen', 'müsste'],
                ['wissen', 'wüsste'],
             ]} />
             <p style={{ fontWeight: 700, fontSize: '0.85rem', margin: '1.25rem 0 0.5rem' }}>Anwendung (Usage)</p>
             <Examples items={[
                'Wunsch (Wish): Ich hätte gern einen Kaffee. / Ich wäre gern Lehrer.',
                'Höfliche Bitte (Request): Könnten Sie mir helfen? / Würden Sie mir bitte helfen?',
                'Ratschlag (Advice): Du könntest mehr Sport machen.'
             ]} />
          </Card>

          <Card title="Konjunktiv II (Vergangenheit) & Irreale Bedingungssätze" color="#22c55e">
             <SubBlock title="Vergangenheit (Past)" color="#22c55e" structure="hätte + Partizip II / wäre + Partizip II" examples={[
                'Ich hätte mehr gelernt.',
                'Wäre ich früher gekommen.'
             ]} />
             <SubBlock title="Irreale Bedingungssätze (Imaginary If-Sentences)" color="#22c55e" structure="Wenn + Konjunktiv II, Konjunktiv II" examples={[
                'Wenn ich mehr Geld hätte, könnte ich ein Auto kaufen.',
                'Wenn ich Zeit hätte, würde ich mehr Deutsch lernen.'
             ]} />
          </Card>
        </div>
      );
    }

    if (activeTab === 'Pronomen & Fragen') {
      return (
        <div className="gr-fade">
          <Card title="Direkte und Indirekte Fragen" color="#6366f1">
             <DataTable headers={['Direct Question', 'Indirect Question']} rows={[
               ['Wo wohnst du? (W-Frage)', 'Kannst du mir sagen, wo du wohnst?'],
               ['Kommst du? (Ja/Nein-Frage)', 'Kannst du mir sagen, ob du kommst?']
             ]} />
             <Tip>W-Fragen use the same W-word. Ja/Nein-Fragen use <b>ob</b>. The verb goes to the end!</Tip>
          </Card>

          <Card title="Präpositionaladverbien" color="#f59e0b">
             <DataTable headers={['Frage (Wo + Präposition)', 'Antwort (Da + Präposition)']} rows={[
                ['Wofür', 'Dafür'],
                ['Womit', 'Damit'],
                ['Worauf', 'Darauf'],
                ['Worüber', 'Darüber'],
                ['Woraus', 'Daraus'],
                ['Wovon', 'Davon'],
                ['Woran', 'Daran'],
                ['Worum', 'Darum'],
             ]} />
             <Tip><b>Rule:</b> Add <b>r</b> if the preposition starts with a vowel (e.g. worauf).</Tip>
          </Card>

          <Card title="Indefinitpronomen" color="#eab308">
             <PillGrid color="#eab308" items={[
               ['irgendwo', 'somewhere'], 
               ['irgendwann', 'sometime'], 
               ['irgendwer', 'someone'], 
               ['irgendwas', 'something'], 
               ['irgendwie', 'somehow'], 
               ['irgendwelche', 'some / any']
             ]} />
             <p style={{ fontWeight: 700, fontSize: '0.85rem', margin: '1.25rem 0 0.5rem' }}>jemand vs. niemand</p>
             <DataTable headers={['Case', 'jemand (someone)', 'niemand (nobody)']} rows={[
               ['Nominativ', 'jemand', 'niemand'],
               ['Akkusativ', 'jemanden', 'niemanden'],
               ['Dativ', 'jemandem', 'niemandem'],
             ]} />
          </Card>
        </div>
      );
    }

    if (activeTab === 'Satzstrukturen') {
      return (
        <div className="gr-fade">
          <Card title="indem (by doing something)" color="#3b82f6">
             <div className="modal-formula" style={{ marginBottom: '1.25rem' }}>
               Main Clause + indem + Subject + ... + Verb (End)
             </div>
             <Examples items={[
               'Ich verbessere mein Deutsch, indem ich jeden Tag übe.',
               'Wir schützen die Umwelt, indem wir Energie sparen.'
             ]} />
          </Card>

          <Card title="Je ... desto / umso (The more..., the more...)" color="#ef4444">
             <div className="modal-formula" style={{ marginBottom: '1.25rem' }}>
               Je + Comparative ... Verb (End), desto + Comparative + Verb (Pos 2)
             </div>
             <Examples items={[
               'Je schneller du fährst, desto größer ist das Unfallrisiko.',
               'Je mehr du lernst, desto besser sprichst du Deutsch.'
             ]} />
          </Card>

          <Card title="Plusquamperfekt" color="#a855f7">
             <Intro>Used when one past action happened before another past action.</Intro>
             <div className="modal-formula" style={{ marginBottom: '1.25rem' }}>
               hatte + Partizip II / war + Partizip II
             </div>
             <Examples items={[
               'Ich hatte gegessen, bevor ich ins Kino ging.',
               'Der Unfall war schon passiert, als ich ankam.'
             ]} />
          </Card>

          <Card title="Partizip II als Adjektiv" color="#14b8a6">
             <Intro>Partizip II can be used like an adjective and follows adjective endings.</Intro>
             <Examples items={[
               'das gestohlene Auto',
               'der gestohlene Computer',
               'die verlorene Tasche',
               'der geschlossene Supermarkt'
             ]} />
          </Card>
        </div>
      );
    }

    if (activeTab === 'Verben') {
      return (
        <div className="gr-fade">
          <Card title="Lassen (to have/get something done)" color="#f59e0b">
             <Intro>Acts like a modal verb.</Intro>
             <div className="modal-formula" style={{ marginBottom: '1.25rem' }}>
               Subject + lassen + Object + Infinitive
             </div>
             <Examples items={[
               'Ich lasse mein Handy reparieren.',
               'Ich muss mein Handy reparieren lassen.'
             ]} />
          </Card>

          <Card title="brauchen + zu + Infinitiv" color="#22c55e">
             <SubBlock title="brauchen nicht zu (don't need to)" color="#22c55e" examples={[
               'Ich brauche heute nicht zu arbeiten. (instead of: Ich muss nicht arbeiten)'
             ]} />
             <SubBlock title="brauchen nur zu (only need to)" color="#22c55e" examples={[
               'Du brauchst nur zu lernen.'
             ]} />
             <SubBlock title="brauchen kein + zu" color="#22c55e" examples={[
               'Ich brauche keinen Brief zu schreiben.'
             ]} />
          </Card>
        </div>
      );
    }
  };

  const renderContent = () => {
    if (level === 'A1') return renderA1();
    if (level === 'A2') return renderA2();
    if (level === 'B1.1') return renderB1_1();
    if (level === 'B1.2') return renderB1_2();
  };

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

        .gr-header { margin-bottom: 1.75rem; }
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

        /* Level pills (A1 / A2 / B1.1 / B1.2) */
        .gr-level-row { display: flex; gap: 0.5rem; margin-bottom: 1.25rem; max-width: 400px; flex-wrap: wrap; }
        .gr-level-btn {
          flex: 1; padding: 0.55rem 0.5rem; border-radius: 10px; min-width: 60px;
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

        .gr-tabs {
          display: flex; gap: 0.4rem; margin-bottom: 2.5rem;
          padding: 0.35rem; border-radius: 16px; width: fit-content;
          overflow-x: auto; max-width: 100%;
        }
        .light .gr-tabs { background: white; box-shadow: 0 2px 12px rgba(0,0,0,0.07); }
        .dark  .gr-tabs { background: #1a1a1a; box-shadow: 0 2px 12px rgba(0,0,0,0.4); }

        .gr-tab {
          padding: 0.55rem 1.2rem; border-radius: 10px;
          font-family: 'DM Sans', sans-serif; font-size: 0.8rem;
          font-weight: 600; letter-spacing: 0.02em; border: none;
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

        .prep-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 0.6rem; margin-bottom: 1.25rem; }
        .prep-pill { padding: 0.65rem 0.85rem; border-radius: 12px; }
        .prep-pill-word { font-weight: 800; font-size: 0.95rem; }
        .prep-pill-meaning { font-size: 0.68rem; opacity: 0.5; margin-top: 0.15rem; }

        .wechsel-boxes { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem; }
        @media (max-width: 500px) { .wechsel-boxes { grid-template-columns: 1fr; } }
        .wechsel-box { padding: 1rem; border-radius: 14px; }

        .contraction-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(155px, 1fr)); gap: 0.75rem; }
        .contraction-item { padding: 0.75rem 1rem; border-radius: 12px; }

        .imp-exception { padding: 0.85rem 1rem; border-radius: 12px; }

        .q-trick-row { display: flex; align-items: center; gap: 1rem; padding: 0.75rem 1rem; border-radius: 12px; margin-bottom: 0.5rem; }

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
            <p className="gr-subtitle">Einfach gut! · {level}</p>
            <h1 className="gr-title">Grammar Hub</h1>
          </div>

          {/* Level Row (A1 / A2 / B1.1 / B1.2) */}
          <div className="gr-level-row">
            {LEVELS.map(lvl => (
              <button key={lvl} onClick={() => changeLevel(lvl)} className={`gr-level-btn ${level === lvl ? 'active' : ''}`}>
                {lvl}
              </button>
            ))}
          </div>

          {/* Tabs */}
          <div className="gr-tabs">
            {TABS_BY_LEVEL[level].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`gr-tab ${activeTab === tab ? 'active' : ''}`}>
                {tab}
              </button>
            ))}
          </div>

          {renderContent()}

          {/* Master Patterns — A1 only */}
          {level === 'A1' && (
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
                    <span className="pattern-label" style={{ color: p.color }}>{p.label}</span>
                    <p className="pattern-text">{p.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {level === 'A2' && (
            <div className={`patterns-section ${dm ? 'dark' : 'light'}`}>
              <div className="patterns-glow" />
              <h2 className="patterns-title">💡 A2 Exam Master Patterns</h2>
              <div className="patterns-grid">
                {[
                  { label: 'WDOWD Group', color: '#6366f1', text: 'Weil, Dass, Obwohl, Wenn, Damit — all five send the verb to the end of the clause.' },
                  { label: 'denn = Normal', color: '#3b82f6', text: 'denn is the only connector that keeps normal word order — everything else in WDOWD sends verb to end.' },
                  { label: 'um...zu vs damit', color: '#a855f7', text: 'Same subject → um...zu + Infinitiv. Different subjects → damit + conjugated verb.' },
                  { label: 'Dativ Trap', color: '#f59e0b', text: 'helfen, antworten, zuhören, gehören, danken all take Dativ, never Akkusativ.' },
                  { label: 'Wechsel Rule', color: '#8b5cf6', text: 'Wohin? = Akkusativ (movement). Wo? = Dativ (location). Same 9 prepositions, different case.' },
                  { label: 'Adjektiv Endings', color: '#22c55e', text: 'Only the adjective ending changes with case — the noun itself never changes.' },
                  { label: 'Genitiv Preps', color: '#14b8a6', text: 'wegen, trotz, während, statt all take Genitiv: des Mannes, der Frau.' },
                  { label: 'Relativsatz', color: '#ef4444', text: 'Gender from the noun, case from the pronoun\'s role inside the relative clause.' },
                ].map(p => (
                  <div key={p.label} className="pattern-card">
                    <span className="pattern-label" style={{ color: p.color }}>{p.label}</span>
                    <p className="pattern-text">{p.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {level === 'B1.1' && (
            <div className={`patterns-section ${dm ? 'dark' : 'light'}`}>
              <div className="patterns-glow" />
              <h2 className="patterns-title">💡 B1.1 Exam Master Patterns</h2>
              <div className="patterns-grid">
                {[
                  { label: 'Zweiteilige Konnektoren', color: '#6366f1', text: 'weder…noch rejects both with no extra nicht. je…desto always pairs two comparatives.' },
                  { label: 'Genitiv-Präpositionen', color: '#3b82f6', text: 'wegen, während, statt, trotz, innerhalb, außerhalb — all six always take Genitiv.' },
                  { label: 'Futur I', color: '#22c55e', text: 'werden + Infinitiv → future. werden + Nomen/Adjektiv → to become. Infinitiv always at the end.' },
                  { label: 'Kein zu', color: '#ef4444', text: 'Never use zu after modal verbs, after werden (Futur I), or after hören/sehen/lassen/gehen/kommen.' },
                  { label: 'um...zu vs damit', color: '#a855f7', text: 'Same subject → um...zu + Infinitiv. Different subjects → damit + Nebensatz.' },
                  { label: 'Passiv Formula', color: '#f59e0b', text: 'Präsens: wird + Partizip II. Präteritum: wurde + Partizip II. +Modal: Modalverb + Partizip II + werden.' },
                  { label: 'wo-/da-Komposita', color: '#8b5cf6', text: 'Add -r- before vowel-starting prepositions: woran, worauf, worum — only for things, not people.' },
                  { label: 'was-Relativsatz', color: '#14b8a6', text: "Use was (not das) after alles, nichts, etwas, vieles, and neuter superlatives." },
                ].map(p => (
                  <div key={p.label} className="pattern-card">
                    <span className="pattern-label" style={{ color: p.color }}>{p.label}</span>
                    <p className="pattern-text">{p.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default GrammarPage;