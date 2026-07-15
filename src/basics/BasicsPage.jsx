import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LEVELS = ['A1', 'A2', 'B1'];

const TABS_BY_LEVEL = {
  A1: ['Greetings', 'Numbers', 'Time & Dates'],
  A2: ['Emails & Letters', 'Telephone', 'Opinions'],
  B1: ['Discussions', 'Presentations', 'Feedback & Advice'],
};

const BasicsPage = ({ darkMode = false }) => {
  const [level, setLevel] = useState('A1');
  const [activeTab, setActiveTab] = useState(TABS_BY_LEVEL['A1'][0]);
  const dm = darkMode;
  const navigate = useNavigate();

  const changeLevel = (lvl) => {
    setLevel(lvl);
    setActiveTab(TABS_BY_LEVEL[lvl][0]);
  };

  const renderA1 = () => {
    if (activeTab === 'Greetings') {
      return (
        <div className="bs-fade">
          <div className="bs-card" style={{ borderLeft: '3px solid #3b82f6' }}>
            <h2 className="bs-card-title" style={{ color: '#3b82f6' }}>
              <span className="accent-bar" style={{ background: '#3b82f6' }}></span>
              Begrüßung & Verabschiedung
            </h2>
            <div className="vocab-grid">
              {[
                { g: 'Hallo', e: 'Hello', type: 'informal' },
                { g: 'Hi', e: 'Hi (very casual)', type: 'informal' },
                { g: 'Guten Morgen', e: 'Good morning (until ~10am)', type: 'formal' },
                { g: 'Guten Tag', e: 'Good day (10am–6pm)', type: 'formal' },
                { g: 'Guten Abend', e: 'Good evening (after 6pm)', type: 'formal' },
                { g: 'Gute Nacht', e: 'Good night (before sleep)', type: 'standard' },
                { g: 'Tschüss', e: 'Bye', type: 'informal' },
                { g: 'Tschau', e: 'Ciao / Bye', type: 'informal' },
                { g: 'Auf Wiedersehen', e: 'Goodbye (formal)', type: 'formal' },
                { g: 'Auf Wiederhören', e: 'Goodbye (on phone)', type: 'formal' },
                { g: 'Bis bald', e: 'See you soon', type: 'informal' },
                { g: 'Bis später', e: 'See you later', type: 'informal' },
                { g: 'Bis morgen', e: 'See you tomorrow', type: 'informal' },
                { g: 'Bis dann', e: 'Until then / Later', type: 'informal' },
              ].map(item => (
                <div key={item.g} className="vocab-item">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.4rem' }}>
                    <span className="vocab-de" style={{ color: item.type === 'informal' ? '#f97316' : item.type === 'formal' ? '#3b82f6' : '#888' }}>{item.g}</span>
                    <span className={`tag tag-${item.type}`}>{item.type}</span>
                  </div>
                  <span className="vocab-en">{item.e}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bs-card" style={{ borderLeft: '3px solid #a855f7' }}>
            <h2 className="bs-card-title" style={{ color: '#a855f7' }}>
              <span className="accent-bar" style={{ background: '#a855f7' }}></span>
              Höflichkeit & Small Talk
            </h2>
            <div className="vocab-grid">
              {[
                { g: 'Danke', e: 'Thank you' },
                { g: 'Vielen Dank', e: 'Thanks a lot' },
                { g: 'Danke schön', e: 'Thank you kindly' },
                { g: 'Bitte', e: 'Please / You\'re welcome' },
                { g: 'Gerne', e: 'Gladly / My pleasure' },
                { g: 'Entschuldigung', e: 'Excuse me / Sorry' },
                { g: 'Es tut mir leid', e: 'I am sorry (sincere)' },
                { g: 'Kein Problem', e: 'No problem' },
                { g: 'Wie geht es Ihnen?', e: 'How are you? (formal)' },
                { g: 'Wie geht\'s?', e: 'How are you? (informal)' },
                { g: 'Mir geht es gut.', e: 'I\'m doing well.' },
                { g: 'Nicht so gut.', e: 'Not so good.' },
                { g: 'Ich verstehe nicht.', e: 'I don\'t understand.' },
                { g: 'Können Sie langsamer sprechen?', e: 'Can you speak slower?' },
                { g: 'Wie bitte?', e: 'Pardon? / Could you repeat?' },
                { g: 'Was bedeutet...?', e: 'What does ... mean?' },
              ].map(item => (
                <div key={item.g} className="vocab-item">
                  <span className="vocab-de" style={{ color: '#a855f7' }}>{item.g}</span>
                  <span className="vocab-en">{item.e}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bs-card" style={{ borderLeft: '3px solid #22c55e' }}>
            <h2 className="bs-card-title" style={{ color: '#22c55e' }}>
              <span className="accent-bar" style={{ background: '#22c55e' }}></span>
              Sich vorstellen — Introducing Yourself
            </h2>
            <div className="vocab-grid">
              {[
                { g: 'Ich heiße...', e: 'My name is...' },
                { g: 'Ich bin...', e: 'I am...' },
                { g: 'Mein Name ist...', e: 'My name is... (formal)' },
                { g: 'Ich komme aus...', e: 'I come from...' },
                { g: 'Ich wohne in...', e: 'I live in...' },
                { g: 'Ich bin ... Jahre alt.', e: 'I am ... years old.' },
                { g: 'Ich bin Student/in.', e: 'I am a student.' },
                { g: 'Ich spreche Deutsch.', e: 'I speak German.' },
                { g: 'Ich lerne Deutsch.', e: 'I am learning German.' },
                { g: 'Freut mich!', e: 'Nice to meet you!' },
                { g: 'Wie heißen Sie?', e: 'What\'s your name? (formal)' },
                { g: 'Wie heißt du?', e: 'What\'s your name? (informal)' },
              ].map(item => (
                <div key={item.g} className="vocab-item">
                  <span className="vocab-de" style={{ color: '#22c55e' }}>{item.g}</span>
                  <span className="vocab-en">{item.e}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (activeTab === 'Numbers') {
      return (
        <div className="bs-fade">
          <div className="three-col">
            <div className="bs-card" style={{ borderTop: '3px solid #22c55e' }}>
              <h2 className="bs-card-title" style={{ color: '#22c55e' }}>
                <span className="accent-bar" style={{ background: '#22c55e' }}></span>
                0 — 12
              </h2>
              <table className="num-table">
                <tbody>
                  {[['0', 'null'], ['1', 'eins'], ['2', 'zwei'], ['3', 'drei'], ['4', 'vier'],
                  ['5', 'fünf'], ['6', 'sechs'], ['7', 'sieben'], ['8', 'acht'],
                  ['9', 'neun'], ['10', 'zehn'], ['11', 'elf'], ['12', 'zwölf']
                  ].map(([n, w]) => (
                    <tr key={n}><td className="num-num">{n}</td><td className="num-word">{w}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bs-card" style={{ borderTop: '3px solid #14b8a6' }}>
              <h2 className="bs-card-title" style={{ color: '#14b8a6' }}>
                <span className="accent-bar" style={{ background: '#14b8a6' }}></span>
                13 — 20
              </h2>
              <table className="num-table">
                <tbody>
                  {[['13', 'dreizehn'], ['14', 'vierzehn'], ['15', 'fünfzehn'],
                  ['16', 'sechzehn *'], ['17', 'siebzehn *'],
                  ['18', 'achtzehn'], ['19', 'neunzehn'], ['20', 'zwanzig']
                  ].map(([n, w]) => (
                    <tr key={n}><td className="num-num">{n}</td><td className="num-word">{w}</td></tr>
                  ))}
                </tbody>
              </table>
              <div className="bs-tip">* 16 drops the "s", 17 drops the "en"</div>
            </div>

            <div className="bs-card" style={{ borderTop: '3px solid #6366f1' }}>
              <h2 className="bs-card-title" style={{ color: '#6366f1' }}>
                <span className="accent-bar" style={{ background: '#6366f1' }}></span>
                Tens
              </h2>
              <table className="num-table">
                <tbody>
                  {[['20', 'zwanzig'], ['30', 'dreißig *'], ['40', 'vierzig'],
                  ['50', 'fünfzig'], ['60', 'sechzig'], ['70', 'siebzig'],
                  ['80', 'achtzig'], ['90', 'neunzig'], ['100', 'hundert']
                  ].map(([n, w]) => (
                    <tr key={n}><td className="num-num">{n}</td><td className="num-word">{w}</td></tr>
                  ))}
                </tbody>
              </table>
              <div className="bs-tip">* 30 uses ß (dreißig), not "z"</div>
            </div>
          </div>

          <div className="bs-card" style={{ borderLeft: '3px solid #f59e0b' }}>
            <h2 className="bs-card-title" style={{ color: '#f59e0b' }}>
              <span className="accent-bar" style={{ background: '#f59e0b' }}></span>
              100 — 1.000+ &nbsp;<span style={{ fontSize: '0.7rem', opacity: 0.5, fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}>Hundreds & Thousands</span>
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '0.75rem' }}>
              {[['100', 'hundert'], ['101', 'hunderteins'], ['150', 'hundertfünfzig'],
              ['200', 'zweihundert'], ['500', 'fünfhundert'], ['999', 'neunhundertneunundneunzig'],
              ['1.000', 'tausend'], ['2.000', 'zweitausend'], ['1.000.000', 'eine Million']
              ].map(([n, w]) => (
                <div key={n} style={{
                  padding: '0.75rem', borderRadius: '12px', textAlign: 'center',
                  background: dm ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.06)',
                  border: `1px solid ${dm ? 'rgba(245,158,11,0.15)' : 'rgba(245,158,11,0.15)'}`,
                }}>
                  <div style={{ fontWeight: 800, fontSize: '1.3rem', color: '#f59e0b' }}>{n}</div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 600, opacity: 0.7, marginTop: '0.2rem' }}>{w}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hack-box">
            <div className="hack-glow" style={{ background: '#22c55e' }} />
            <h2 className="hack-title" style={{ color: '#22c55e' }}>⚡ The 21+ Hack — Reading Backwards</h2>
            <p className="hack-body" style={{ marginBottom: '1rem' }}>
              Numbers 21–99 are said backwards in German: <b style={{ color: '#f0ebe0' }}>"One-and-twenty"</b>. Always: ones digit + "und" + tens.
            </p>
            <div style={{
              display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center',
              gap: '0.75rem', padding: '1.25rem', borderRadius: '14px',
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
              fontFamily: 'monospace', fontSize: '1.1rem', position: 'relative', zIndex: 1,
            }}>
              <span style={{ fontSize: '1.8rem', fontWeight: 800 }}>21</span>
              <span style={{ opacity: 0.4 }}>=</span>
              <span style={{ color: '#22c55e', fontWeight: 700 }}>ein</span>
              <span style={{ opacity: 0.4, fontSize: '0.9rem' }}>und</span>
              <span style={{ color: '#3b82f6', fontWeight: 700 }}>zwanzig</span>
            </div>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
              gap: '0.5rem', marginTop: '1rem', position: 'relative', zIndex: 1,
            }}>
              {[['21', 'einundzwanzig'], ['35', 'fünfunddreißig'], ['47', 'siebenundvierzig'], ['99', 'neunundneunzig']].map(([n, w]) => (
                <div key={n} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '0.5rem 0.75rem', textAlign: 'center' }}>
                  <div style={{ fontWeight: 800, color: '#f0ebe0' }}>{n}</div>
                  <div style={{ fontSize: '0.68rem', color: 'rgba(240,235,224,0.5)', marginTop: '0.15rem' }}>{w}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bs-card" style={{ borderLeft: '3px solid #ef4444', marginTop: '1.5rem' }}>
            <h2 className="bs-card-title" style={{ color: '#ef4444' }}>
              <span className="accent-bar" style={{ background: '#ef4444' }}></span>
              Ordinalzahlen — Ordinal Numbers
            </h2>
            <p style={{ fontSize: '0.78rem', fontStyle: 'italic', opacity: 0.5, marginBottom: '1.1rem' }}>
              Add <b>-te</b> (1–19) or <b>-ste</b> (20+) to form ordinals. Exceptions: erste, dritte, siebte, achte.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '0.6rem' }}>
              {[['1.', 'erst-'], ['2.', 'zweit-'], ['3.', 'dritt-'], ['4.', 'viert-'],
              ['5.', 'fünft-'], ['7.', 'siebt-'], ['8.', 'acht-'], ['10.', 'zehnt-'],
              ['20.', 'zwanzigst-'], ['100.', 'hundertst-']
              ].map(([n, w]) => (
                <div key={n} style={{
                  padding: '0.6rem 0.75rem', borderRadius: '10px',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  background: dm ? '#1a1a1a' : '#faf7f2',
                  border: `1px solid ${dm ? '#222' : '#e8e2d6'}`,
                }}>
                  <span style={{ fontWeight: 800, color: '#ef4444' }}>{n}</span>
                  <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>{w}</span>
                </div>
              ))}
            </div>
            <div className="bs-tip">Used with dates: <b>am ersten Januar</b> (on the 1st of January)</div>
          </div>
        </div>
      );
    }

    if (activeTab === 'Time & Dates') {
      return (
        <div className="bs-fade">
          <div className="bs-card">
            <h2 className="bs-card-title" style={{ color: '#3b82f6' }}>
              <span className="accent-bar" style={{ background: '#3b82f6' }}></span>
              Relative Tage — Relative Days
            </h2>
            <div className="day-timeline">
              {[
                { g: 'vorgestern', e: 'day before yesterday' },
                { g: 'gestern', e: 'yesterday' },
                { g: 'heute', e: 'today', today: true },
                { g: 'morgen', e: 'tomorrow' },
                { g: 'übermorgen', e: 'day after tomorrow' },
              ].map(item => (
                <div key={item.g} className={`day-item ${item.today ? 'today' : ''}`}>
                  <div className="day-de">{item.g}</div>
                  <div className="day-en">{item.e}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bs-card" style={{ borderLeft: '3px solid #6366f1' }}>
            <h2 className="bs-card-title" style={{ color: '#6366f1' }}>
              <span className="accent-bar" style={{ background: '#6366f1' }}></span>
              Uhrzeit — Telling the Time
            </h2>
            <div className="formula">
              <b>Wie spät ist es?</b> / <b>Wie viel Uhr ist es?</b> — What time is it?
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem' }}>
              {[
                ['8:00', 'Es ist acht Uhr.'],
                ['8:15', 'Es ist Viertel nach acht.'],
                ['8:30', 'Es ist halb neun. *'],
                ['8:45', 'Es ist Viertel vor neun.'],
                ['12:00', 'Es ist zwölf Uhr / Mittag.'],
                ['13:00', 'Es ist dreizehn Uhr. (24h)'],
                ['0:00', 'Es ist Mitternacht.'],
              ].map(([time, phrase]) => (
                <div key={time} style={{
                  padding: '0.75rem 1rem', borderRadius: '12px',
                  background: dm ? '#1a1a1a' : '#faf7f2',
                  border: `1px solid ${dm ? '#222' : '#e8e2d6'}`,
                }}>
                  <div style={{ fontWeight: 800, color: '#6366f1', fontSize: '1rem', marginBottom: '0.2rem' }}>{time}</div>
                  <div style={{ fontSize: '0.8rem', fontStyle: 'italic', opacity: 0.65 }}>{phrase}</div>
                </div>
              ))}
            </div>
            <div className="bs-tip">* <b>halb neun</b> = half past eight (literally "half to nine"). Very confusing for beginners!</div>
          </div>

          <div className="two-col">
            <div className="bs-card" style={{ borderLeft: '3px solid #f59e0b' }}>
              <h2 className="bs-card-title" style={{ color: '#f59e0b' }}>
                <span className="accent-bar" style={{ background: '#f59e0b' }}></span>
                Zeiteinheiten
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
                {[
                  ['der', 'Tag', 'day', '#3b82f6'],
                  ['die', 'Stunde', 'hour', '#ef4444'],
                  ['die', 'Minute', 'minute', '#ef4444'],
                  ['die', 'Sekunde', 'second', '#ef4444'],
                  ['die', 'Woche', 'week', '#ef4444'],
                  ['der', 'Monat', 'month', '#3b82f6'],
                  ['das', 'Jahr', 'year', '#22c55e'],
                  ['das', 'Jahrhundert', 'century', '#22c55e'],
                ].map(([art, word, eng, col]) => (
                  <div key={word} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '0.4rem 0', borderBottom: `1px solid ${dm ? '#1e1e1e' : '#f0ebe8'}`
                  }}>
                    <span>
                      <span style={{ color: col, fontSize: '0.72rem', fontWeight: 700, marginRight: '0.3rem' }}>{art}</span>
                      <b>{word}</b>
                    </span>
                    <span style={{ opacity: 0.45, fontSize: '0.78rem', fontStyle: 'italic' }}>{eng}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bs-card" style={{ borderLeft: '3px solid #8b5cf6' }}>
              <h2 className="bs-card-title" style={{ color: '#8b5cf6' }}>
                <span className="accent-bar" style={{ background: '#8b5cf6' }}></span>
                Tageszeiten
              </h2>
              <p style={{ fontSize: '0.72rem', opacity: 0.5, marginBottom: '1rem', lineHeight: 1.5 }}>
                Add <b>-s</b> to noun → adverb for recurring actions.<br />
                <i>morgens</i> = in the mornings (every day)
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem' }}>
                {[
                  ['der Morgen', 'morgens', 'morning'],
                  ['der Vormittag', 'vormittags', 'late morning'],
                  ['der Mittag', 'mittags', 'midday'],
                  ['der Nachmittag', 'nachmittags', 'afternoon'],
                  ['der Abend', 'abends', 'evening'],
                  ['die Nacht', 'nachts', 'night'],
                ].map(([noun, adv, eng]) => (
                  <div key={noun} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '0.4rem 0.5rem', borderRadius: '8px',
                    background: dm ? 'rgba(139,92,246,0.06)' : 'rgba(139,92,246,0.04)'
                  }}>
                    <span style={{ fontWeight: 600, fontSize: '0.82rem' }}>{noun}</span>
                    <span style={{ color: '#8b5cf6', fontWeight: 700, fontSize: '0.82rem' }}>{adv}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="two-col">
            <div className="bs-card" style={{ borderTop: '3px solid #f59e0b' }}>
              <h2 className="bs-card-title" style={{ color: '#f59e0b' }}>
                <span className="accent-bar" style={{ background: '#f59e0b' }}></span>
                Wochentage
              </h2>
              <span className="pill" style={{ background: 'rgba(245,158,11,0.1)', color: '#f59e0b', marginBottom: '1rem', display: 'inline-block' }}>
                Preposition: am (am Montag)
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.75rem', fontSize: '0.85rem' }}>
                {[['Montag', 'Monday'], ['Dienstag', 'Tuesday'], ['Mittwoch', 'Wednesday'],
                ['Donnerstag', 'Thursday'], ['Freitag', 'Friday'],
                ['Samstag', 'Saturday'], ['Sonntag', 'Sunday']
                ].map(([g, e]) => (
                  <div key={g} style={{
                    display: 'flex', justifyContent: 'space-between',
                    padding: '0.4rem 0', borderBottom: `1px solid ${dm ? '#1e1e1e' : '#f0ebe8'}`
                  }}>
                    <b>{g}</b>
                    <span style={{ opacity: 0.45 }}>{e}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bs-card" style={{ borderTop: '3px solid #ec4899' }}>
              <h2 className="bs-card-title" style={{ color: '#ec4899' }}>
                <span className="accent-bar" style={{ background: '#ec4899' }}></span>
                Monate
              </h2>
              <span className="pill" style={{ background: 'rgba(236,72,153,0.1)', color: '#ec4899', marginBottom: '1rem', display: 'inline-block' }}>
                Preposition: im (im Mai)
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.35rem 1rem', marginTop: '0.75rem', fontSize: '0.85rem' }}>
                {['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
                  'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
                ].map((m, i) => (
                  <div key={m} style={{
                    display: 'flex', gap: '0.5rem', alignItems: 'center',
                    padding: '0.3rem 0', borderBottom: `1px solid ${dm ? '#1e1e1e' : '#f0ebe8'}`
                  }}>
                    <span style={{ opacity: 0.3, fontWeight: 700, fontSize: '0.7rem', width: '18px' }}>{i + 1}</span>
                    <b>{m}</b>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bs-card" style={{ borderLeft: '3px solid #22c55e' }}>
            <h2 className="bs-card-title" style={{ color: '#22c55e' }}>
              <span className="accent-bar" style={{ background: '#22c55e' }}></span>
              Nützliche Zeitausdrücke — Useful Time Expressions
            </h2>
            <div className="vocab-grid">
              {[
                { g: 'jetzt', e: 'now' }, { g: 'gleich', e: 'in a moment / soon' },
                { g: 'bald', e: 'soon' }, { g: 'schon', e: 'already' },
                { g: 'noch', e: 'still / yet' }, { g: 'nie', e: 'never' },
                { g: 'immer', e: 'always' }, { g: 'manchmal', e: 'sometimes' },
                { g: 'oft', e: 'often' }, { g: 'selten', e: 'rarely' },
                { g: 'jeden Tag', e: 'every day' }, { g: 'nächste Woche', e: 'next week' },
                { g: 'letzte Woche', e: 'last week' }, { g: 'letztes Jahr', e: 'last year' },
                { g: 'in einer Stunde', e: 'in one hour' }, { g: 'vor zwei Tagen', e: 'two days ago' },
              ].map(item => (
                <div key={item.g} className="vocab-item">
                  <span className="vocab-de" style={{ color: '#22c55e' }}>{item.g}</span>
                  <span className="vocab-en">{item.e}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      );
    }
    return null;
  };

  const renderA2 = () => {
    if (activeTab === 'Emails & Letters') {
      return (
        <div className="bs-fade">
          <div className="two-col">
            <div className="bs-card" style={{ borderTop: '3px solid #3b82f6' }}>
              <h2 className="bs-card-title" style={{ color: '#3b82f6' }}>
                <span className="accent-bar" style={{ background: '#3b82f6' }}></span>
                Formell (Formal)
              </h2>
              <div className="vocab-grid" style={{ gridTemplateColumns: '1fr' }}>
                {[
                  { g: 'Sehr geehrte Damen und Herren,', e: 'Dear Sir or Madam,' },
                  { g: 'Sehr geehrte Frau Müller,', e: 'Dear Ms. Müller,' },
                  { g: 'Sehr geehrter Herr Schmidt,', e: 'Dear Mr. Schmidt,' },
                  { g: 'Ich schreibe Ihnen, weil...', e: 'I am writing to you because...' },
                  { g: 'Mit freundlichen Grüßen', e: 'Yours sincerely,' },
                ].map(item => (
                  <div key={item.g} className="vocab-item">
                    <span className="vocab-de" style={{ color: '#3b82f6' }}>{item.g}</span>
                    <span className="vocab-en">{item.e}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bs-card" style={{ borderTop: '3px solid #f97316' }}>
              <h2 className="bs-card-title" style={{ color: '#f97316' }}>
                <span className="accent-bar" style={{ background: '#f97316' }}></span>
                Informell (Informal)
              </h2>
              <div className="vocab-grid" style={{ gridTemplateColumns: '1fr' }}>
                {[
                  { g: 'Liebe Maria,', e: 'Dear Maria,' },
                  { g: 'Lieber Tom,', e: 'Dear Tom,' },
                  { g: 'Hallo zusammen,', e: 'Hello everyone,' },
                  { g: 'Wie geht es dir?', e: 'How are you?' },
                  { g: 'Viele Grüße / Liebe Grüße', e: 'Best regards / Lots of love' },
                ].map(item => (
                  <div key={item.g} className="vocab-item">
                    <span className="vocab-de" style={{ color: '#f97316' }}>{item.g}</span>
                    <span className="vocab-en">{item.e}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bs-card" style={{ borderLeft: '3px solid #8b5cf6' }}>
            <h2 className="bs-card-title" style={{ color: '#8b5cf6' }}>
              <span className="accent-bar" style={{ background: '#8b5cf6' }}></span>
              Nützliche Sätze (Useful Phrases)
            </h2>
            <div className="vocab-grid">
              {[
                { g: 'Vielen Dank für Ihre E-Mail.', e: 'Thank you for your email.' },
                { g: 'Ich habe eine Frage zu...', e: 'I have a question regarding...' },
                { g: 'Könnten Sie mir bitte... schicken?', e: 'Could you please send me...?' },
                { g: 'Ich interessiere mich für das Praktikum im Bereich Data Science.', e: 'I am interested in the internship in data science.' },
                { g: 'Ich freue mich auf Ihre Antwort.', e: 'I look forward to your reply.' },
                { g: 'Bitte antworten Sie mir bis Freitag.', e: 'Please reply to me by Friday.' },
              ].map(item => (
                <div key={item.g} className="vocab-item">
                  <span className="vocab-de" style={{ color: '#8b5cf6' }}>{item.g}</span>
                  <span className="vocab-en">{item.e}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (activeTab === 'Telephone') {
      return (
        <div className="bs-fade">
          <div className="bs-card" style={{ borderLeft: '3px solid #22c55e' }}>
            <h2 className="bs-card-title" style={{ color: '#22c55e' }}>
              <span className="accent-bar" style={{ background: '#22c55e' }}></span>
              Am Telefon (On the Phone)
            </h2>
            <div className="vocab-grid">
              {[
                { g: 'Am Apparat.', e: 'Speaking. (literally: on the device)' },
                { g: 'Hier ist [Name].', e: 'This is [Name].' },
                { g: 'Könnte ich bitte mit Herrn Meyer sprechen?', e: 'Could I please speak with Mr. Meyer?' },
                { g: 'Er ist leider nicht da.', e: 'Unfortunately, he is not here.' },
                { g: 'Möchten Sie eine Nachricht hinterlassen?', e: 'Would you like to leave a message?' },
                { g: 'Können Sie ihm etwas ausrichten?', e: 'Can you give him a message?' },
                { g: 'Ich rufe später noch einmal an.', e: 'I will call again later.' },
                { g: 'Können Sie das bitte buchstabieren?', e: 'Can you spell that please?' },
              ].map(item => (
                <div key={item.g} className="vocab-item">
                  <span className="vocab-de" style={{ color: '#22c55e' }}>{item.g}</span>
                  <span className="vocab-en">{item.e}</span>
                </div>
              ))}
            </div>
            <div className="bs-tip">Germans usually answer the phone by stating their last name immediately.</div>
          </div>
        </div>
      );
    }

    if (activeTab === 'Opinions') {
      return (
        <div className="bs-fade">
          <div className="bs-card" style={{ borderLeft: '3px solid #ef4444' }}>
            <h2 className="bs-card-title" style={{ color: '#ef4444' }}>
              <span className="accent-bar" style={{ background: '#ef4444' }}></span>
              Meinung äußern (Expressing Opinion)
            </h2>
            <div className="formula">
              Always push the conjugated verb to the END after <b>dass</b>!
            </div>
            <div className="vocab-grid">
              {[
                { g: 'Ich glaube, dass...', e: 'I believe that...' },
                { g: 'Ich denke, dass...', e: 'I think that...' },
                { g: 'Ich finde, dass...', e: 'I find/think that...' },
                { g: 'Meiner Meinung nach...', e: 'In my opinion... (+ Verb-Second)' },
                { g: 'Ich bin der Meinung, dass...', e: 'I am of the opinion that...' },
                { g: 'Was denkst du darüber?', e: 'What do you think about that?' },
                { g: 'Wie findest du das?', e: 'How do you like that? / What do you think?' },
                { g: 'Mir gefällt das (nicht).', e: 'I (don\'t) like that.' },
              ].map(item => (
                <div key={item.g} className="vocab-item">
                  <span className="vocab-de" style={{ color: '#ef4444' }}>{item.g}</span>
                  <span className="vocab-en">{item.e}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const renderB1 = () => {
    if (activeTab === 'Discussions') {
      return (
        <div className="bs-fade">
          <div className="two-col">
            <div className="bs-card" style={{ borderTop: '3px solid #22c55e' }}>
              <h2 className="bs-card-title" style={{ color: '#22c55e' }}>
                <span className="accent-bar" style={{ background: '#22c55e' }}></span>
                Zustimmung (Agreement)
              </h2>
              <div className="vocab-grid" style={{ gridTemplateColumns: '1fr' }}>
                {[
                  { g: 'Da haben Sie völlig recht.', e: 'You are absolutely right there.' },
                  { g: 'Das sehe ich auch so.', e: 'I see it that way too.' },
                  { g: 'Genau!', e: 'Exactly!' },
                  { g: 'Ich bin ganz deiner Meinung.', e: 'I completely agree with you.' },
                  { g: 'Da stimme ich zu.', e: 'I agree with that.' },
                ].map(item => (
                  <div key={item.g} className="vocab-item">
                    <span className="vocab-de" style={{ color: '#22c55e' }}>{item.g}</span>
                    <span className="vocab-en">{item.e}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bs-card" style={{ borderTop: '3px solid #ef4444' }}>
              <h2 className="bs-card-title" style={{ color: '#ef4444' }}>
                <span className="accent-bar" style={{ background: '#ef4444' }}></span>
                Widerspruch (Disagreement)
              </h2>
              <div className="vocab-grid" style={{ gridTemplateColumns: '1fr' }}>
                {[
                  { g: 'Da bin ich ganz anderer Meinung.', e: 'I am of a completely different opinion there.' },
                  { g: 'Das stimmt nicht ganz.', e: 'That is not entirely correct.' },
                  { g: 'Ich sehe das etwas anders.', e: 'I see that a little differently.' },
                  { g: 'Da muss ich Ihnen widersprechen.', e: 'I have to disagree with you there.' },
                ].map(item => (
                  <div key={item.g} className="vocab-item">
                    <span className="vocab-de" style={{ color: '#ef4444' }}>{item.g}</span>
                    <span className="vocab-en">{item.e}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="hack-box">
            <div className="hack-glow" style={{ background: '#3b82f6' }} />
            <h2 className="hack-title" style={{ color: '#3b82f6' }}>⚡ The "Zwar... aber" Debate Hack</h2>
            <p className="hack-body" style={{ marginBottom: '1rem' }}>
              In B1 oral exams, show you can weigh pros and cons by starting with a concession.
            </p>
            <div style={{
              display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: '1.25rem', borderRadius: '14px',
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', position: 'relative', zIndex: 1,
            }}>
              <div><b style={{ color: '#60a5fa' }}>Zwar</b> ist dieses Projekt teuer, <b style={{ color: '#60a5fa' }}>aber</b> es ist sehr wichtig für uns.</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.6, fontStyle: 'italic' }}>Admittedly this project is expensive, but it is very important for us.</div>
            </div>
          </div>
        </div>
      );
    }

    if (activeTab === 'Presentations') {
      return (
        <div className="bs-fade">
          <div className="bs-card" style={{ borderLeft: '3px solid #8b5cf6' }}>
            <h2 className="bs-card-title" style={{ color: '#8b5cf6' }}>
              <span className="accent-bar" style={{ background: '#8b5cf6' }}></span>
              Präsentationen (Presentations)
            </h2>
            <div className="vocab-grid">
              {[
                { g: 'Mein Thema heute ist die Zukunft der Datenanalyse.', e: 'My topic today is the future of data analysis.' },
                { g: 'Zuerst spreche ich über meine persönlichen Erfahrungen.', e: 'First I will talk about my personal experiences.' },
                { g: 'Danach nenne ich einige Vor- und Nachteile.', e: 'After that I will name some pros and cons.' },
                { g: 'Ein großer Vorteil ist, dass...', e: 'A big advantage is that...' },
                { g: 'Auf der anderen Seite gibt es auch Nachteile.', e: 'On the other hand there are also disadvantages.' },
                { g: 'Zusammenfassend kann man sagen, dass...', e: 'In summary one can say that...' },
                { g: 'Vielen Dank für Ihre Aufmerksamkeit.', e: 'Thank you for your attention.' },
                { g: 'Haben Sie noch Fragen?', e: 'Do you have any questions?' },
              ].map(item => (
                <div key={item.g} className="vocab-item">
                  <span className="vocab-de" style={{ color: '#8b5cf6' }}>{item.g}</span>
                  <span className="vocab-en">{item.e}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (activeTab === 'Feedback & Advice') {
      return (
        <div className="bs-fade">
          <div className="bs-card" style={{ borderLeft: '3px solid #f59e0b' }}>
            <h2 className="bs-card-title" style={{ color: '#f59e0b' }}>
              <span className="accent-bar" style={{ background: '#f59e0b' }}></span>
              Ratschläge geben (Giving Advice)
            </h2>
            <div className="formula">
              Use <b>Konjunktiv II</b> (sollte, könnte, würde) to sound polite!
            </div>
            <div className="vocab-grid">
              {[
                { g: 'An deiner Stelle würde ich...', e: 'In your place I would...' },
                { g: 'Du solltest...', e: 'You should...' },
                { g: 'Es wäre besser, wenn...', e: 'It would be better if...' },
                { g: 'Ich schlage vor, dass...', e: 'I suggest that...' },
                { g: 'Du könntest versuchen, ... zu + Infinitiv', e: 'You could try to...' },
                { g: 'Hast du schon einmal daran gedacht, ...?', e: 'Have you ever thought about...?' },
              ].map(item => (
                <div key={item.g} className="vocab-item">
                  <span className="vocab-de" style={{ color: '#f59e0b' }}>{item.g}</span>
                  <span className="vocab-en">{item.e}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; }

        .bs-root {
          min-height: 100vh;
          font-family: 'DM Sans', sans-serif;
          transition: background 0.4s ease, color 0.4s ease;
          position: relative;
        }
        .bs-root.light { background: #f5f0e8; color: #1a1a1a; }
        .bs-root.dark  { background: #0f0f0f; color: #f0ebe0; }

        .bs-root::before {
          content: '';
          position: fixed; inset: 0;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          pointer-events: none; z-index: 0;
        }

        .bs-content {
          position: relative; z-index: 1;
          max-width: 900px; margin: 0 auto;
          padding: 2.5rem 1.5rem 5rem;
        }

        .bs-header { margin-bottom: 2.5rem; }
        .bs-back {
          display: inline-flex; align-items: center; gap: 0.4rem;
          font-size: 0.78rem; font-weight: 600; letter-spacing: 0.06em;
          text-transform: uppercase; border: none; background: none;
          cursor: pointer; padding: 0.4rem 0; margin-bottom: 1rem;
          opacity: 0.45; transition: opacity 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .light .bs-back { color: #1a1a1a; }
        .dark  .bs-back { color: #f0ebe0; }
        .bs-back:hover { opacity: 1; }

        .bs-title {
          font-family: 'Playfair Display', serif;
          font-weight: 900;
          font-size: clamp(2rem, 6vw, 3rem);
          line-height: 1; letter-spacing: -0.02em; margin-bottom: 0.3rem;
        }
        .bs-subtitle {
          font-size: 0.82rem; font-weight: 500;
          letter-spacing: 0.16em; text-transform: uppercase;
          opacity: 0.4; font-style: italic;
        }

        /* Level pills */
        .bs-level-row { display: flex; gap: 0.5rem; margin-bottom: 1.25rem; width: 100%; max-width: 340px; }
        .bs-level-btn {
          flex: 1; padding: 0.55rem 0.5rem; border-radius: 10px;
          font-family: 'Playfair Display', serif; font-size: 0.95rem; font-weight: 700;
          letter-spacing: 0.04em; border: 1.5px solid transparent; cursor: pointer;
          transition: all 0.2s ease; text-align: center;
        }
        .light .bs-level-btn { background: white; color: #888; border-color: #e0d8cc; }
        .light .bs-level-btn:hover { border-color: #aaa; color: #1a1a1a; }
        .light .bs-level-btn.active { background: #2563eb; color: white; border-color: #2563eb; }
        .dark .bs-level-btn { background: #1e1e1e; color: #777; border-color: #2e2e2e; }
        .dark .bs-level-btn:hover { border-color: #555; color: #f0ebe0; }
        .dark .bs-level-btn.active { background: #2563eb; color: white; border-color: #2563eb; }

        /* Tabs */
        .bs-tabs {
          display: flex; flex-wrap: wrap; gap: 0.4rem;
          margin-bottom: 2.5rem; padding: 0.35rem;
          border-radius: 16px; width: fit-content;
        }
        .light .bs-tabs { background: white; box-shadow: 0 2px 12px rgba(0,0,0,0.07); }
        .dark  .bs-tabs { background: #1a1a1a; box-shadow: 0 2px 12px rgba(0,0,0,0.4); }
        .bs-tab {
          padding: 0.55rem 1.4rem; border-radius: 10px;
          font-family: 'DM Sans', sans-serif; font-size: 0.82rem;
          font-weight: 600; letter-spacing: 0.04em;
          border: none; cursor: pointer; transition: all 0.2s ease; white-space: nowrap;
        }
        .light .bs-tab         { background: transparent; color: #888; }
        .light .bs-tab:hover   { color: #1a1a1a; }
        .light .bs-tab.active  { background: #1a1a1a; color: #f5f0e8; }
        .dark  .bs-tab         { background: transparent; color: #555; }
        .dark  .bs-tab:hover   { color: #f0ebe0; }
        .dark  .bs-tab.active  { background: #f0ebe0; color: #0f0f0f; }

        /* Cards */
        .bs-card {
          border-radius: 24px; padding: 1.75rem;
          margin-bottom: 1.5rem; overflow-x: auto;
          transition: background 0.3s, border-color 0.3s;
        }
        .light .bs-card { background: white; border: 1px solid #e8e2d6; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
        .dark  .bs-card { background: #141414; border: 1px solid #222; box-shadow: 0 4px 20px rgba(0,0,0,0.4); }

        .bs-card-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.2rem; font-weight: 700;
          margin-bottom: 1.25rem;
          display: flex; align-items: center; gap: 0.6rem;
        }
        .accent-bar { width: 3px; height: 1.2rem; border-radius: 999px; flex-shrink: 0; }

        /* Vocab grid */
        .vocab-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 0.85rem;
        }
        .vocab-item {
          padding: 0.85rem 1rem; border-radius: 14px;
          display: flex; flex-direction: column; gap: 0.3rem;
          transition: transform 0.15s ease;
        }
        .vocab-item:hover { transform: translateY(-1px); }
        .light .vocab-item { background: #faf7f2; border: 1px solid #e8e2d6; }
        .dark  .vocab-item { background: #1a1a1a; border: 1px solid #222; }
        .vocab-de { font-weight: 700; font-size: 0.95rem; }
        .vocab-en { font-size: 0.78rem; font-style: italic; opacity: 0.5; line-height: 1.4; }

        /* Tag badge */
        .tag {
          font-size: 0.62rem; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
          padding: 0.15rem 0.5rem; border-radius: 999px;
          width: fit-content;
        }
        .tag-informal { background: rgba(249,115,22,0.1); color: #f97316; }
        .tag-formal   { background: rgba(59,130,246,0.1); color: #3b82f6; }
        .tag-standard { background: rgba(100,100,100,0.1); color: #888; }

        /* Number table */
        .num-table { width: 100%; font-size: 0.85rem; border-collapse: collapse; }
        .num-table tr { transition: background 0.15s; }
        .light .num-table tr:hover { background: #faf7f2; }
        .dark  .num-table tr:hover { background: #1a1a1a; }
        .light .num-table tr { border-bottom: 1px solid #f0ebe8; }
        .dark  .num-table tr { border-bottom: 1px solid #1e1e1e; }
        .num-table tr:last-child { border-bottom: none; }
        .num-table td { padding: 0.55rem 0.75rem; }
        .num-num { font-weight: 800; opacity: 0.35; text-align: right; width: 40px; }
        .num-word { font-weight: 600; }

        /* Two-col */
        .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
        @media (max-width: 600px) { .two-col { grid-template-columns: 1fr; } }
        .three-col { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1.25rem; }
        @media (max-width: 700px) { .three-col { grid-template-columns: 1fr; } }

        /* Tip box */
        .bs-tip {
          margin-top: 1rem; padding: 0.85rem 1.1rem;
          border-radius: 12px; font-size: 0.78rem; line-height: 1.6;
        }
        .light .bs-tip { background: #faf7f2; color: #888; }
        .dark  .bs-tip { background: #1a1a1a; color: #666; }

        /* Day timeline */
        .day-timeline {
          display: flex; gap: 0.5rem; overflow-x: auto;
          padding-bottom: 0.5rem;
        }
        .day-item {
          flex-shrink: 0; padding: 0.75rem 1rem;
          border-radius: 14px; text-align: center; min-width: 100px;
          transition: transform 0.15s;
        }
        .day-item:hover { transform: translateY(-2px); }
        .day-item.today {
          background: #3b82f6 !important;
          color: white !important;
          transform: scale(1.05);
          box-shadow: 0 6px 20px rgba(59,130,246,0.35);
        }
        .light .day-item:not(.today) { background: white; border: 1px solid #e8e2d6; }
        .dark  .day-item:not(.today) { background: #1a1a1a; border: 1px solid #222; }
        .day-de { font-weight: 800; font-size: 0.9rem; }
        .day-en { font-size: 0.68rem; opacity: 0.55; margin-top: 0.15rem; text-transform: uppercase; letter-spacing: 0.06em; }
        .day-item.today .day-en { opacity: 0.8; }

        /* Hack box */
        .hack-box {
          border-radius: 24px; padding: 2rem;
          position: relative; overflow: hidden;
        }
        .light .hack-box { background: #1a1a1a; color: #f0ebe0; }
        .dark  .hack-box { background: #0a0a0a; color: #f0ebe0; border: 1px solid #222; }
        .hack-glow {
          position: absolute; top: -40px; right: -40px;
          width: 180px; height: 180px; border-radius: 50%;
          filter: blur(80px); opacity: 0.25; pointer-events: none;
        }
        .hack-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.3rem; font-weight: 900; margin-bottom: 0.75rem;
          position: relative; z-index: 1;
        }
        .hack-body {
          font-size: 0.82rem; line-height: 1.65;
          color: rgba(240,235,224,0.65); position: relative; z-index: 1;
        }

        /* Formula box */
        .formula {
          padding: 0.85rem 1.25rem; border-radius: 12px;
          font-size: 0.85rem; text-align: center; margin-bottom: 1rem;
          font-family: 'DM Sans', sans-serif; letter-spacing: 0.02em;
        }
        .light .formula { background: #faf7f2; border: 1px solid #e8e2d6; }
        .dark  .formula { background: #1a1a1a; border: 1px solid #222; }

        /* Small pill badge */
        .pill {
          display: inline-block; padding: 0.2rem 0.65rem;
          border-radius: 999px; font-size: 0.68rem;
          font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
        }

        .bs-fade { animation: bsFade 0.35s ease both; }
        @keyframes bsFade {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className={`bs-root ${dm ? 'dark' : 'light'}`}>
        <div className="bs-content">

          <div className="bs-header">
            <button className="bs-back" onClick={() => navigate('/')}>← Back</button>
            <p className="bs-subtitle">Einfach gut! · {level}</p>
            <h1 className="bs-title">Basics</h1>
          </div>

          <div className="bs-level-row">
            {LEVELS.map(lvl => (
              <button key={lvl} onClick={() => changeLevel(lvl)} className={`bs-level-btn ${level === lvl ? 'active' : ''}`}>
                {lvl}
              </button>
            ))}
          </div>

          <div className="bs-tabs">
            {TABS_BY_LEVEL[level].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`bs-tab ${activeTab === tab ? 'active' : ''}`}>
                {tab}
              </button>
            ))}
          </div>

          {level === 'A1' && renderA1()}
          {level === 'A2' && renderA2()}
          {level === 'B1' && renderB1()}

        </div>
      </div>
    </>
  );
};

export default BasicsPage;