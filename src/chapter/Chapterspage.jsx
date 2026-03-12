import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChaptersPage = ({ darkMode = false }) => {
  const dm = darkMode;
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');

  const lektionen = [
    {
      n: 1, title: "Hallo! Wie geht's?",
      color: '#3b82f6',
      inhalt: [
        { de: 'Guten Tag, ich heiße...', en: 'Good day, my name is...' },
        { de: 'Wie geht es Ihnen?', en: 'How are you? (formal)' },
        { de: 'Sprechen Sie Englisch?', en: 'Do you speak English?' },
      ],
      lernziele: [
        { de: 'Sich und andere vorstellen', en: 'Introduce yourself and others' },
        { de: 'Die Herkunft sagen und erfragen', en: 'Say and ask where you are from' },
        { de: 'Sich begrüßen und verabschieden', en: 'Greet and say goodbye' },
        { de: 'Nach dem Befinden fragen', en: 'Ask how someone is doing' },
        { de: 'Sagen, welche Sprachen man spricht', en: 'Say which languages you speak' },
      ],
      grammatik: [
        { de: 'Verbstellung in Aussagesätzen', en: 'Verb position in statements' },
        { de: 'W-Fragen: Wie? Woher? Wo?', en: 'Question words: How? Where from? Where?' },
        { de: 'Ja-/Nein-Fragen', en: 'Yes/No questions' },
        { de: 'Präsens: kommen, heißen, sprechen, sein', en: 'Present tense: come, be called, speak, be' },
      ],
      vocab: [
        { de: 'Guten Morgen', en: 'Good morning' },
        { de: 'Guten Tag', en: 'Good day' },
        { de: 'Guten Abend', en: 'Good evening' },
        { de: 'Auf Wiedersehen', en: 'Goodbye (formal)' },
        { de: 'Tschüss', en: 'Bye (informal)' },
        { de: 'Wie heißen Sie?', en: 'What is your name? (formal)' },
        { de: 'Ich heiße...', en: 'My name is...' },
        { de: 'Woher kommen Sie?', en: 'Where are you from?' },
        { de: 'Ich komme aus...', en: 'I come from...' },
        { de: 'Sehr gut, danke!', en: 'Very well, thank you!' },
        { de: 'Es geht so.', en: 'So-so.' },
        { de: 'Nicht so gut.', en: 'Not so well.' },
        { de: 'Welche Sprache sprechen Sie?', en: 'What language do you speak?' },
        { de: 'Ich spreche Deutsch.', en: 'I speak German.' },
      ],
      keyPhrases: [
        { de: 'Ich heiße Anna und komme aus Deutschland.', en: 'My name is Anna and I come from Germany.', note: 'Subject + Verb + ... (normal word order)' },
        { de: 'Sprechen Sie Deutsch?', en: 'Do you speak German?', note: 'Verb first → Yes/No question' },
        { de: 'Woher kommen Sie?', en: 'Where do you come from?', note: 'W-word + Verb + Subject' },
      ],
      tip: { text: 'Sie (capital S) = formal "you". sie (lowercase) = she OR they. Context tells you which!', icon: '💡' },
      verbs: [
        { verb: 'sein', en: 'to be', conj: [['ich','bin'],['du','bist'],['er/sie','ist'],['wir','sind'],['ihr','seid'],['Sie','sind']] },
        { verb: 'kommen', en: 'to come', conj: [['ich','komme'],['du','kommst'],['er/sie','kommt'],['wir','kommen'],['ihr','kommt'],['Sie','kommen']] },
        { verb: 'sprechen', en: 'to speak', conj: [['ich','spreche'],['du','sprichst'],['er/sie','spricht'],['wir','sprechen'],['ihr','sprecht'],['Sie','sprechen']] },
      ],
      structures: [
        { label: 'Statement', pattern: 'Subject + Verb + Rest', example: 'Ich komme aus Iran.', translation: 'I come from Iran.' },
        { label: 'W-Question', pattern: 'W-word + Verb + Subject + Rest', example: 'Woher kommen Sie?', translation: 'Where do you come from?' },
        { label: 'Yes/No Question', pattern: 'Verb + Subject + Rest + ?', example: 'Kommen Sie aus Deutschland?', translation: 'Do you come from Germany?' },
      ],
    },
    {
      n: 2, title: 'Meine Familie und ich',
      color: '#a855f7',
      inhalt: [
        { de: 'Das ist meine Familie.', en: 'This is my family.' },
        { de: 'Meine Adresse ist...', en: 'My address is...' },
        { de: 'Wie alt sind Sie?', en: 'How old are you?' },
      ],
      lernziele: [
        { de: 'Familienmitglieder vorstellen', en: 'Introduce family members' },
        { de: 'Auskunft über den Familienstand geben', en: 'Give information about marital status' },
        { de: 'Den Namen buchstabieren', en: 'Spell out a name' },
        { de: 'Alter nennen und erfragen', en: 'State and ask age' },
        { de: 'Adresse und Telefonnummer nennen', en: 'Give address and phone number' },
      ],
      grammatik: [
        { de: 'Possessivpronomen: mein / meine', en: 'Possessive: my (m/n) / my (f/pl)' },
        { de: 'sie vs. Sie vs. sie (Pl.)', en: 'she / you (formal) / they' },
        { de: 'Konjugation: haben, wohnen, leben, sein', en: 'Conjugation: have, live, reside, be' },
        { de: 'Zahlen für Alter und Telefonnummern', en: 'Numbers for age and phone numbers' },
      ],
      vocab: [
        { de: 'der Mann', en: 'husband / man' },
        { de: 'die Frau', en: 'wife / woman' },
        { de: 'das Kind / die Kinder', en: 'child / children' },
        { de: 'der Sohn / die Tochter', en: 'son / daughter' },
        { de: 'der Vater / die Mutter', en: 'father / mother' },
        { de: 'der Bruder / die Schwester', en: 'brother / sister' },
        { de: 'die Eltern', en: 'parents' },
        { de: 'verheiratet', en: 'married' },
        { de: 'ledig', en: 'single' },
        { de: 'geschieden', en: 'divorced' },
        { de: 'verwitwet', en: 'widowed' },
        { de: 'Wie alt sind Sie?', en: 'How old are you?' },
        { de: 'Ich bin ... Jahre alt.', en: 'I am ... years old.' },
        { de: 'Wo wohnen Sie?', en: 'Where do you live?' },
      ],
      keyPhrases: [
        { de: 'Das ist mein Bruder. Er heißt Thomas.', en: 'This is my brother. His name is Thomas.', note: 'mein (masc.) — use meine for fem./plural' },
        { de: 'Ich bin verheiratet und habe zwei Kinder.', en: 'I am married and have two children.', note: 'haben conjugation in action' },
        { de: 'Meine Frau wohnt in Berlin.', en: 'My wife lives in Berlin.', note: 'meine (feminine noun)' },
      ],
      tip: { text: 'mein vs meine: use mein before masculine/neuter nouns, meine before feminine and plural nouns.', icon: '⚠️' },
      verbs: [
        { verb: 'haben', en: 'to have', conj: [['ich','habe'],['du','hast'],['er/sie','hat'],['wir','haben'],['ihr','habt'],['Sie','haben']] },
        { verb: 'wohnen', en: 'to live', conj: [['ich','wohne'],['du','wohnst'],['er/sie','wohnt'],['wir','wohnen'],['ihr','wohnt'],['Sie','wohnen']] },
      ],
      structures: [
        { label: 'Introducing someone', pattern: 'Das ist + mein/meine + [family member].', example: 'Das ist meine Mutter.', translation: 'This is my mother.' },
        { label: 'Stating age', pattern: 'Ich bin + [number] + Jahre alt.', example: 'Ich bin 32 Jahre alt.', translation: 'I am 32 years old.' },
        { label: 'Marital status', pattern: 'Ich bin + [status].', example: 'Ich bin verheiratet.', translation: 'I am married.' },
      ],
    },
    {
      n: 3, title: 'Im Deutschkurs',
      color: '#22c55e',
      inhalt: [
        { de: 'Wie heißt das auf Deutsch?', en: 'What is that called in German?' },
        { de: 'Was lernt ihr heute?', en: 'What are you learning today?' },
        { de: 'Jeder Tag ist anders.', en: 'Every day is different.' },
      ],
      lernziele: [
        { de: 'Gegenstände im Kursraum benennen', en: 'Name objects in the classroom' },
        { de: 'Aktivitäten im Unterricht beschreiben', en: 'Describe classroom activities' },
        { de: 'Arbeitsaufträge verstehen', en: 'Understand instructions' },
        { de: 'Um Erklärungen und Wiederholung bitten', en: 'Ask for explanations and repetition' },
        { de: 'Wochentage nennen', en: 'Name the days of the week' },
      ],
      grammatik: [
        { de: 'Bestimmter Artikel: der / die / das', en: 'Definite article: the (m/f/n)' },
        { de: 'Unbestimmter Artikel: ein / eine', en: 'Indefinite article: a/an' },
        { de: 'Verneinung mit nicht und kein / keine', en: 'Negation with not / no' },
        { de: 'Komposita: Kursbuch, Familienname...', en: 'Compound nouns' },
        { de: 'Präsens: sein, machen, sprechen, lesen', en: 'Present tense: be, do, speak, read' },
      ],
      vocab: [
        { de: 'das Buch', en: 'book' },
        { de: 'das Heft', en: 'notebook' },
        { de: 'der Stift / Bleistift', en: 'pen / pencil' },
        { de: 'die Tafel', en: 'blackboard' },
        { de: 'der Tisch / der Stuhl', en: 'desk / chair' },
        { de: 'die Tür / das Fenster', en: 'door / window' },
        { de: 'der Rucksack', en: 'backpack' },
        { de: 'das Wörterbuch', en: 'dictionary' },
        { de: 'hören / sprechen', en: 'to listen / to speak' },
        { de: 'schreiben / lesen', en: 'to write / to read' },
        { de: 'fragen / antworten', en: 'to ask / to answer' },
        { de: 'Wie heißt das auf Deutsch?', en: 'What is this in German?' },
        { de: 'Ich verstehe das nicht.', en: "I don't understand that." },
        { de: 'Können Sie das wiederholen?', en: 'Can you repeat that?' },
        { de: 'Montag bis Sonntag', en: 'Monday through Sunday' },
      ],
      keyPhrases: [
        { de: 'Das ist ein Buch. Das Buch ist neu.', en: 'That is a book. The book is new.', note: 'ein (indefinite) → das (definite, known)' },
        { de: 'Das ist kein Stift. Das ist ein Bleistift.', en: "That is not a pen. That is a pencil.", note: 'kein negates a noun (like "not a")' },
        { de: 'Der Lehrer spricht nicht schnell.', en: 'The teacher does not speak fast.', note: 'nicht negates a verb or adjective' },
      ],
      tip: { text: 'kein/keine negates nouns ("no book"), nicht negates verbs/adjectives ("not fast"). Never mix them up!', icon: '⚠️' },
      verbs: [
        { verb: 'machen', en: 'to do/make', conj: [['ich','mache'],['du','machst'],['er/sie','macht'],['wir','machen'],['ihr','macht'],['Sie','machen']] },
        { verb: 'lesen', en: 'to read', conj: [['ich','lese'],['du','liest'],['er/sie','liest'],['wir','lesen'],['ihr','lest'],['Sie','lesen']] },
      ],
      structures: [
        { label: 'Indefinite → Definite', pattern: 'ein/eine → der/die/das (once known)', example: 'Das ist ein Tisch. Der Tisch ist groß.', translation: 'That is a table. The table is big.' },
        { label: 'Negation with kein', pattern: 'kein/keine + Noun', example: 'Das ist kein Buch.', translation: "That is not a book." },
        { label: 'Negation with nicht', pattern: 'Verb + nicht', example: 'Ich verstehe nicht.', translation: "I don't understand." },
      ],
    },
    {
      n: 4, title: 'Im Supermarkt',
      color: '#f59e0b',
      inhalt: [
        { de: 'Was isst du gern?', en: 'What do you like to eat?' },
        { de: 'Was gibt es heute im Angebot?', en: "What's on offer today?" },
        { de: 'Darf es sonst noch etwas sein?', en: 'Anything else?' },
      ],
      lernziele: [
        { de: 'Lebensmittel benennen und erfragen', en: 'Name and ask about food items' },
        { de: 'Gefallen und Missfallen äußern', en: 'Express likes and dislikes' },
        { de: 'Vorlieben beim Essen beschreiben', en: 'Describe food preferences' },
        { de: 'Nach Preisen und Mengen fragen', en: 'Ask about prices and quantities' },
        { de: 'Sonderangebote verstehen', en: 'Understand special offers' },
      ],
      grammatik: [
        { de: 'Artikel im Nominativ und Akkusativ', en: 'Articles in nominative and accusative' },
        { de: 'W-Fragen: Wie viel? / Wie viele?', en: 'How much? / How many?' },
        { de: 'Nomen im Plural: -er, -e, -(e)n, -s', en: 'Noun plurals: 4 patterns' },
        { de: 'Verben: brauchen, kaufen, essen, mögen, möchten', en: 'Verbs: need, buy, eat, like, would like' },
      ],
      vocab: [
        { de: 'der Apfel / die Banane', en: 'apple / banana' },
        { de: 'die Orange / die Tomate', en: 'orange / tomato' },
        { de: 'die Kartoffel / die Möhre', en: 'potato / carrot' },
        { de: 'das Brot / das Brötchen', en: 'bread / bread roll' },
        { de: 'das Ei / die Eier', en: 'egg / eggs' },
        { de: 'die Milch / der Käse', en: 'milk / cheese' },
        { de: 'das Fleisch / der Fisch', en: 'meat / fish' },
        { de: 'die Packung / die Flasche', en: 'packet / bottle' },
        { de: 'das Kilo / der Liter', en: 'kilogram / litre' },
        { de: 'Was kostet das?', en: 'How much does that cost?' },
        { de: 'Das ist zu teuer.', en: 'That is too expensive.' },
        { de: 'Ich möchte bitte...', en: 'I would like... please' },
        { de: 'Ich esse gern...', en: 'I like to eat...' },
        { de: "Ich mag kein(e)...", en: "I don't like..." },
      ],
      keyPhrases: [
        { de: 'Ich kaufe einen Apfel und eine Flasche Milch.', en: 'I am buying an apple and a bottle of milk.', note: 'Akkusativ: einen (masc.) / eine (fem.)' },
        { de: 'Wie viel kostet das Brot?', en: 'How much does the bread cost?', note: 'Wie viel? for uncountable, Wie viele? for countable' },
        { de: 'Ich esse gern Käse, aber ich mag keine Tomaten.', en: 'I like eating cheese but I do not like tomatoes.', note: 'gern = like doing; mögen = like (a thing)' },
      ],
      tip: { text: 'gern ≠ mögen: "Ich esse gern Käse" (I like eating cheese) vs "Ich mag Käse" (I like cheese). Both correct, different structure!', icon: '💡' },
      verbs: [
        { verb: 'essen', en: 'to eat', conj: [['ich','esse'],['du','isst'],['er/sie','isst'],['wir','essen'],['ihr','esst'],['Sie','essen']] },
        { verb: 'mögen', en: 'to like', conj: [['ich','mag'],['du','magst'],['er/sie','mag'],['wir','mögen'],['ihr','mögt'],['Sie','mögen']] },
        { verb: 'möchten', en: 'would like', conj: [['ich','möchte'],['du','möchtest'],['er/sie','möchte'],['wir','möchten'],['ihr','möchtet'],['Sie','möchten']] },
      ],
      structures: [
        { label: 'Nominativ vs Akkusativ', pattern: '[Subject] kauft + [Akk. article] + [Noun]', example: 'Ich kaufe einen Apfel.', translation: 'I am buying an apple.' },
        { label: 'Expressing preference', pattern: 'Ich esse/trinke gern + [Noun]', example: 'Ich trinke gern Kaffee.', translation: 'I like drinking coffee.' },
        { label: 'Dislike', pattern: 'Ich mag + kein/keine + [Noun]', example: 'Ich mag keine Zwiebeln.', translation: "I don't like onions." },
      ],
    },
    {
      n: 5, title: 'Von morgens bis abends',
      color: '#14b8a6',
      inhalt: [
        { de: 'Was machst du heute?', en: 'What are you doing today?' },
        { de: 'Wie viel Uhr ist es?', en: 'What time is it?' },
        { de: 'Ich plane meinen Tag.', en: 'I am planning my day.' },
      ],
      lernziele: [
        { de: 'Den Tagesablauf beschreiben', en: 'Describe a daily routine' },
        { de: 'Nach der Uhrzeit fragen und antworten', en: 'Ask and tell the time' },
        { de: 'Über den Tagesplan sprechen', en: 'Talk about plans for the day' },
        { de: 'Terminvorschläge annehmen oder ablehnen', en: 'Accept or decline appointments' },
      ],
      grammatik: [
        { de: 'Trennbare Verben: aufstehen, anrufen, einkaufen, fernsehen', en: 'Separable verbs: get up, call, shop, watch TV' },
        { de: 'Temporale Adverbien: immer, oft, manchmal, nie', en: 'Frequency adverbs: always, often, sometimes, never' },
        { de: 'Zeitangaben an Position 1', en: 'Time expressions at sentence position 1' },
      ],
      vocab: [
        { de: 'der Morgen / der Abend', en: 'morning / evening' },
        { de: 'der Mittag / die Nacht', en: 'midday / night' },
        { de: 'aufstehen', en: 'to get up' },
        { de: 'frühstücken', en: 'to have breakfast' },
        { de: 'einkaufen', en: 'to go shopping' },
        { de: 'fernsehen', en: 'to watch TV' },
        { de: 'anrufen', en: 'to call (someone)' },
        { de: 'kochen / schlafen', en: 'to cook / to sleep' },
        { de: 'Wie spät ist es?', en: 'What time is it?' },
        { de: 'Es ist halb neun.', en: 'It is 8:30.' },
        { de: 'Viertel nach drei', en: 'quarter past three (3:15)' },
        { de: 'Viertel vor fünf', en: 'quarter to five (4:45)' },
        { de: 'Um wie viel Uhr...?', en: 'At what time...?' },
        { de: 'Hast du Zeit?', en: 'Do you have time?' },
        { de: 'Ich bin leider beschäftigt.', en: "I'm busy, unfortunately." },
      ],
      keyPhrases: [
        { de: 'Ich stehe um 7 Uhr auf.', en: 'I get up at 7 o\'clock.', note: 'Separable verb: auf- splits off to end' },
        { de: 'Morgens sehe ich nie fern.', en: 'In the mornings I never watch TV.', note: 'Time at position 1 → verb still second' },
        { de: 'Manchmal rufe ich abends meine Mutter an.', en: 'Sometimes I call my mother in the evenings.', note: 'an- goes to the end of the clause' },
      ],
      tip: { text: 'halb neun = 8:30, NOT 9:30! "halb" means "half before" in German — half an hour before 9.', icon: '⚠️' },
      verbs: [
        { verb: 'aufstehen', en: 'to get up', conj: [['ich','stehe ... auf'],['du','stehst ... auf'],['er/sie','steht ... auf'],['wir','stehen ... auf'],['ihr','steht ... auf'],['Sie','stehen ... auf']] },
        { verb: 'fernsehen', en: 'to watch TV', conj: [['ich','sehe ... fern'],['du','siehst ... fern'],['er/sie','sieht ... fern'],['wir','sehen ... fern'],['ihr','seht ... fern'],['Sie','sehen ... fern']] },
      ],
      structures: [
        { label: 'Separable Verb', pattern: 'Subject + [Verb stem] + Rest + [Prefix]', example: 'Ich stehe um 7 auf.', translation: 'I get up at 7.' },
        { label: 'Time at Position 1', pattern: '[Time] + Verb + Subject + Rest', example: 'Um 8 Uhr frühstücke ich.', translation: 'At 8 o\'clock I have breakfast.' },
        { label: 'Frequency adverb', pattern: 'Subject + Verb + [frequency] + Rest', example: 'Ich koche manchmal abends.', translation: 'I sometimes cook in the evenings.' },
      ],
    },
    {
      n: 6, title: 'Wohnungssuche',
      color: '#ef4444',
      inhalt: [
        { de: '4 ZKB ab sofort frei', en: '4-room apartment available now' },
        { de: 'Die Wohnung ist perfekt!', en: 'The apartment is perfect!' },
        { de: 'Wir brauchen neue Möbel.', en: 'We need new furniture.' },
      ],
      lernziele: [
        { de: 'Über Wohnungssuche sprechen', en: 'Talk about searching for a flat' },
        { de: 'Abkürzungen in Anzeigen verstehen', en: 'Understand abbreviations in ads' },
        { de: 'Eine Wohnung beschreiben', en: 'Describe an apartment' },
        { de: 'Zufriedenheit und Unzufriedenheit ausdrücken', en: 'Express satisfaction/dissatisfaction' },
        { de: 'Einrichtungsgegenstände benennen', en: 'Name furniture and fittings' },
      ],
      grammatik: [
        { de: 'Personalpronomen 3. Person: er, sie, es, sie (Pl.)', en: 'Personal pronouns: he, she, it, they' },
        { de: 'Possessivpronomen: mein(-e), dein(-e), ihr(-e), Ihr(-e)', en: 'Possessives: my, your (inf./form.), her' },
        { de: 'Negation mit nicht (Stellung im Satz)', en: 'Negation with "not" — sentence position' },
      ],
      vocab: [
        { de: 'das Wohnzimmer', en: 'living room' },
        { de: 'das Schlafzimmer', en: 'bedroom' },
        { de: 'das Badezimmer / die Küche', en: 'bathroom / kitchen' },
        { de: 'der Flur', en: 'hallway' },
        { de: 'das Sofa / das Bett', en: 'sofa / bed' },
        { de: 'der Schrank / der Teppich', en: 'wardrobe / carpet' },
        { de: 'der Kühlschrank / der Herd', en: 'fridge / stove' },
        { de: 'die Waschmaschine', en: 'washing machine' },
        { de: 'groß / klein', en: 'big / small' },
        { de: 'hell / dunkel', en: 'bright / dark' },
        { de: 'laut / ruhig', en: 'noisy / quiet' },
        { de: 'teuer / billig', en: 'expensive / cheap' },
        { de: 'ZKB = Zimmer, Küche, Bad', en: 'rooms, kitchen, bathroom' },
        { de: 'die Nebenkosten (NK)', en: 'additional costs / utilities' },
        { de: 'qm = Quadratmeter', en: 'square metres' },
      ],
      keyPhrases: [
        { de: 'Die Wohnung ist groß, aber sie ist sehr teuer.', en: 'The apartment is large, but it is very expensive.', note: 'sie = die Wohnung (feminine pronoun)' },
        { de: 'Das Sofa gefällt mir nicht. Es ist zu klein.', en: 'I do not like the sofa. It is too small.', note: 'es = das Sofa (neuter pronoun)' },
        { de: 'Sein Zimmer ist nicht ruhig.', en: 'His room is not quiet.', note: 'nicht after sein + adjective' },
      ],
      tip: { text: 'Pronoun = gender of the noun it replaces: die Wohnung → sie, der Schrank → er, das Zimmer → es. Not the person!', icon: '💡' },
      verbs: [
        { verb: 'wohnen', en: 'to live', conj: [['ich','wohne'],['du','wohnst'],['er/sie','wohnt'],['wir','wohnen'],['ihr','wohnt'],['Sie','wohnen']] },
        { verb: 'suchen', en: 'to look for', conj: [['ich','suche'],['du','suchst'],['er/sie','sucht'],['wir','suchen'],['ihr','sucht'],['Sie','suchen']] },
      ],
      structures: [
        { label: 'Describing with pronoun', pattern: '[Noun] ist ... — [Pronoun] ist ...', example: 'Der Schrank ist alt. Er ist kaputt.', translation: 'The wardrobe is old. It is broken.' },
        { label: 'Negation: nicht', pattern: 'Subject + Verb + nicht + Adjective', example: 'Die Wohnung ist nicht ruhig.', translation: 'The apartment is not quiet.' },
        { label: 'Possession', pattern: 'mein/meine/dein/deine + Noun', example: 'Meine Wohnung hat drei Zimmer.', translation: 'My apartment has three rooms.' },
      ],
    },
    {
      n: 7, title: 'In der Stadt unterwegs',
      color: '#6366f1',
      inhalt: [
        { de: 'Lass uns den Bus nehmen!', en: "Let's take the bus!" },
        { de: 'Wo ist die Bank?', en: 'Where is the bank?' },
        { de: 'Wie komme ich zum Bahnhof?', en: 'How do I get to the station?' },
      ],
      lernziele: [
        { de: 'Nach dem besten Verkehrsmittel fragen', en: 'Ask about the best means of transport' },
        { de: 'Abfahrtszeiten und Fahrpreise verstehen', en: 'Understand departure times and prices' },
        { de: 'Nach dem Weg fragen', en: 'Ask for directions' },
        { de: 'Wegbeschreibungen verstehen', en: 'Understand directions' },
        { de: 'Orte in der Stadt benennen', en: 'Name places in the city' },
      ],
      grammatik: [
        { de: 'Dativpräpositionen: mit, zu, in, an, bei', en: 'Dative prepositions: with, to, in, at, near' },
        { de: 'Lokale Präpositionen: vor, neben, hinter, über, unter, zwischen', en: 'Location prepositions' },
        { de: 'Imperativ (Sie): Fahren Sie! Gehen Sie!', en: 'Formal imperative: Drive! Go!' },
        { de: 'Verben: fahren, nehmen, gehen', en: 'Verbs: to drive/ride, to take, to go' },
      ],
      vocab: [
        { de: 'der Bus / die U-Bahn', en: 'bus / underground' },
        { de: 'die S-Bahn / der Zug', en: 'suburban train / train' },
        { de: 'das Taxi / das Fahrrad', en: 'taxi / bicycle' },
        { de: 'der Bahnhof', en: 'train station' },
        { de: 'die Haltestelle', en: 'bus/tram stop' },
        { de: 'die Kreuzung / die Ampel', en: 'junction / traffic light' },
        { de: 'links / rechts / geradeaus', en: 'left / right / straight ahead' },
        { de: 'die erste / nächste Straße', en: 'first / next street' },
        { de: 'Wie weit ist es?', en: 'How far is it?' },
        { de: 'Es ist zu Fuß erreichbar.', en: "It's reachable on foot." },
        { de: 'gegenüber / neben / vor', en: 'opposite / next to / in front of' },
        { de: 'Entschuldigung, wo ist...?', en: 'Excuse me, where is...?' },
      ],
      keyPhrases: [
        { de: 'Nehmen Sie die U-Bahn bis zum Hauptbahnhof.', en: 'Take the underground to the main station.', note: 'Imperativ Sie + bis zu + Dativ' },
        { de: 'Gehen Sie geradeaus und dann links.', en: 'Go straight ahead and then left.', note: 'Imperativ Sie: Gehen Sie!' },
        { de: 'Die Bank ist neben dem Supermarkt.', en: 'The bank is next to the supermarket.', note: 'neben + Dativ: dem (masc./neut.)' },
      ],
      tip: { text: 'zu + dem = zum (masc./neut.), zu + der = zur (fem.). Always: Ich gehe zum Bahnhof / zur Bank.', icon: '💡' },
      verbs: [
        { verb: 'fahren', en: 'to drive/ride', conj: [['ich','fahre'],['du','fährst'],['er/sie','fährt'],['wir','fahren'],['ihr','fahrt'],['Sie','fahren']] },
        { verb: 'gehen', en: 'to go/walk', conj: [['ich','gehe'],['du','gehst'],['er/sie','geht'],['wir','gehen'],['ihr','geht'],['Sie','gehen']] },
        { verb: 'nehmen', en: 'to take', conj: [['ich','nehme'],['du','nimmst'],['er/sie','nimmt'],['wir','nehmen'],['ihr','nehmt'],['Sie','nehmen']] },
      ],
      structures: [
        { label: 'Formal Imperative', pattern: 'Verb + Sie + Rest + !', example: 'Fahren Sie geradeaus!', translation: 'Drive straight ahead!' },
        { label: 'Location (Dativ)', pattern: 'Place + ist + [prep] + dem/der + Noun', example: 'Das Café ist neben dem Bahnhof.', translation: 'The café is next to the station.' },
        { label: 'Direction (zu + Dativ)', pattern: 'zum/zur + [destination]', example: 'Ich fahre zum Bahnhof.', translation: 'I am going to the station.' },
      ],
    },
    {
      n: 8, title: 'Mein Beruf',
      color: '#f97316',
      inhalt: [
        { de: 'Was machen Sie beruflich?', en: 'What do you do for work?' },
        { de: 'Das muss ich noch machen.', en: 'I still have to do that.' },
        { de: 'Diese Stelle passt zu mir.', en: 'This position suits me.' },
      ],
      lernziele: [
        { de: 'Berufe benennen', en: 'Name professions' },
        { de: 'Sagen, wo man arbeitet', en: 'Say where you work' },
        { de: 'Fähigkeiten und Wünsche äußern', en: 'Express abilities and wishes' },
        { de: 'Sich über Arbeitszeiten abstimmen', en: 'Coordinate working hours' },
        { de: 'Eine Stellenanzeige verstehen', en: 'Understand a job advert' },
      ],
      grammatik: [
        { de: 'Modalverb können: Ich kann gut kochen.', en: '"can": I can cook well.' },
        { de: 'Modalverb müssen: Ich muss arbeiten.', en: '"must": I must work.' },
        { de: 'Verbklammer: modal in pos. 2, infinitiv at end', en: 'Verb bracket: modal + infinitive at end' },
        { de: 'Trennbares Verb: anfangen', en: 'Separable verb: to start/begin' },
      ],
      vocab: [
        { de: 'der Arzt / die Ärztin', en: 'doctor (m/f)' },
        { de: 'der Lehrer / die Lehrerin', en: 'teacher (m/f)' },
        { de: 'der Koch / der Bäcker', en: 'cook / baker' },
        { de: 'der Kellner / der Techniker', en: 'waiter / technician' },
        { de: 'der Krankenpfleger', en: 'nurse (m)' },
        { de: 'das Büro / das Krankenhaus', en: 'office / hospital' },
        { de: 'die Werkstatt / die Bäckerei', en: 'workshop / bakery' },
        { de: 'Ich arbeite bei...', en: 'I work at/for...' },
        { de: 'Ich kann gut... sprechen.', en: 'I can speak... well.' },
        { de: 'Ich muss um 8 Uhr anfangen.', en: "I have to start at 8 o'clock." },
        { de: 'Feierabend haben', en: 'to finish work for the day' },
        { de: 'Stress haben / viel zu tun', en: 'to be stressed / have a lot to do' },
      ],
      keyPhrases: [
        { de: 'Ich kann gut mit Computern arbeiten.', en: 'I can work well with computers.', note: 'können: modal in pos.2, infinitiv at end' },
        { de: 'Sie muss heute bis 20 Uhr arbeiten.', en: 'She has to work until 8 pm today.', note: 'müssen conjugated: muss (er/sie)' },
        { de: 'Ich fange morgen um 9 Uhr an.', en: 'I start tomorrow at 9 o\'clock.', note: 'anfangen separable: fange...an' },
      ],
      tip: { text: 'Modal verbs kick the main verb to the END: "Ich muss morgen früh [position 2] aufstehen [END]." Never forget this bracket!', icon: '⚠️' },
      verbs: [
        { verb: 'können', en: 'can', conj: [['ich','kann'],['du','kannst'],['er/sie','kann'],['wir','können'],['ihr','könnt'],['Sie','können']] },
        { verb: 'müssen', en: 'must', conj: [['ich','muss'],['du','musst'],['er/sie','muss'],['wir','müssen'],['ihr','müsst'],['Sie','müssen']] },
      ],
      structures: [
        { label: 'Modal verb bracket', pattern: 'Subject + [Modal] + Rest + [Infinitiv]', example: 'Ich kann gut Deutsch sprechen.', translation: 'I can speak German well.' },
        { label: 'Obligation', pattern: 'Subject + muss + Rest + [Infinitiv]', example: 'Sie muss heute arbeiten.', translation: 'She has to work today.' },
        { label: 'Separable + Modal', pattern: 'Subject + Modal + ... + [prefix+verb]', example: 'Ich muss um 8 Uhr anfangen.', translation: 'I must start at 8 o\'clock.' },
      ],
    },
    {
      n: 9, title: 'Beim Arzt',
      color: '#ec4899',
      inhalt: [
        { de: 'Ich habe Schmerzen!', en: 'I am in pain!' },
        { de: 'In der Sprechstunde', en: "At the doctor's appointment" },
        { de: 'Haben Sie eine Krankmeldung?', en: 'Do you have a sick note?' },
      ],
      lernziele: [
        { de: 'Sich krankmelden', en: 'Call in sick' },
        { de: 'Mitteilen, was wehtut', en: 'Say what hurts' },
        { de: 'Körperteile benennen', en: 'Name body parts' },
        { de: 'Ärztliche Empfehlungen verstehen', en: 'Understand medical advice' },
        { de: 'Einen Arzttermin vereinbaren', en: "Make a doctor's appointment" },
      ],
      grammatik: [
        { de: 'Possessivpronomen im Nominativ: mein Kopf, mein Arm', en: 'Possessives: my head, my arm' },
        { de: 'Modalverb sollen: Sie sollen viel trinken.', en: '"should/supposed to": You should drink a lot.' },
        { de: 'Modalverb dürfen: Sie dürfen nicht arbeiten.', en: '"allowed to": You may not work.' },
        { de: 'Imperativ du / ihr: Ruh dich aus! / Ruht euch aus!', en: 'Informal imperative singular/plural' },
      ],
      vocab: [
        { de: 'der Kopf / der Hals', en: 'head / throat' },
        { de: 'der Bauch / der Rücken', en: 'stomach / back' },
        { de: 'der Arm / das Bein', en: 'arm / leg' },
        { de: 'das Ohr / das Auge', en: 'ear / eye' },
        { de: 'der Zahn / die Zähne', en: 'tooth / teeth' },
        { de: 'die Hand / der Fuß', en: 'hand / foot' },
        { de: 'die Schulter / das Knie', en: 'shoulder / knee' },
        { de: 'Kopfschmerzen / Bauchschmerzen', en: 'headache / stomachache' },
        { de: 'die Erkältung / die Grippe', en: 'cold / flu' },
        { de: 'das Fieber', en: 'fever' },
        { de: 'die Tablette / der Hustensaft', en: 'tablet / cough syrup' },
        { de: 'Mir ist schlecht.', en: 'I feel sick/nauseous.' },
        { de: 'Sie sollen im Bett bleiben.', en: 'You should stay in bed.' },
      ],
      keyPhrases: [
        { de: 'Mein Kopf tut weh. Ich habe Kopfschmerzen.', en: 'My head hurts. I have a headache.', note: 'wehtun = to hurt; Schmerzen = pain/ache' },
        { de: 'Sie sollen viel Wasser trinken und ausruhen.', en: 'You should drink lots of water and rest.', note: 'sollen = should (doctor\'s orders)' },
        { de: 'Sie dürfen heute nicht arbeiten.', en: 'You are not allowed to work today.', note: 'dürfen nicht = not allowed to' },
      ],
      tip: { text: 'sollen ≠ dürfen: sollen = "you should" (advice), dürfen nicht = "you must not" (prohibition). The doctor uses both!', icon: '⚠️' },
      verbs: [
        { verb: 'sollen', en: 'should', conj: [['ich','soll'],['du','sollst'],['er/sie','soll'],['wir','sollen'],['ihr','sollt'],['Sie','sollen']] },
        { verb: 'dürfen', en: 'may/allowed', conj: [['ich','darf'],['du','darfst'],['er/sie','darf'],['wir','dürfen'],['ihr','dürft'],['Sie','dürfen']] },
      ],
      structures: [
        { label: 'Expressing pain', pattern: 'Mein/Meine + [body part] + tut/tun weh.', example: 'Mein Rücken tut weh.', translation: 'My back hurts.' },
        { label: 'Medical advice (sollen)', pattern: 'Sie sollen + Rest + [Infinitiv]', example: 'Sie sollen viel trinken.', translation: 'You should drink a lot.' },
        { label: 'Prohibition (dürfen nicht)', pattern: 'Sie dürfen nicht + [Infinitiv]', example: 'Sie dürfen nicht rauchen.', translation: 'You are not allowed to smoke.' },
      ],
    },
    {
      n: 10, title: 'Gestern und heute',
      color: '#8b5cf6',
      inhalt: [
        { de: 'Was hast du gestern gemacht?', en: 'What did you do yesterday?' },
        { de: 'Gestern bin ich...', en: 'Yesterday I went...' },
        { de: 'Wie war dein Urlaub?', en: 'How was your holiday?' },
      ],
      lernziele: [
        { de: 'Über vergangene Aktivitäten sprechen', en: 'Talk about past activities' },
        { de: 'Ereignisse zeitlich einordnen', en: 'Place events in time' },
        { de: 'Vergangene Ereignisse bewerten', en: 'Evaluate past events' },
        { de: 'Einen Urlaub beschreiben', en: 'Describe a holiday' },
      ],
      grammatik: [
        { de: 'Perfekt mit haben: Ich habe gekauft / gemacht', en: 'Perfect with "have": bought / done' },
        { de: 'Perfekt mit sein: Ich bin gefahren / gegangen', en: 'Perfect with "be": drove / went' },
        { de: 'Partizip II: ge-...-t (regelmäßig) / ge-...-en (unregelm.)', en: 'Past participle: regular -t / irregular -en' },
        { de: 'Verbklammer im Perfekt: habe/bin ... [P.II]', en: 'Verb bracket: auxiliary + past participle at end' },
        { de: 'Präteritum: war, hatte', en: 'Simple past: was, had' },
      ],
      vocab: [
        { de: 'gestern / vorgestern', en: 'yesterday / day before yesterday' },
        { de: 'letzte Woche / letzten Monat', en: 'last week / last month' },
        { de: 'letztes Jahr / vor zwei Jahren', en: 'last year / two years ago' },
        { de: 'früher / schon / noch nie', en: 'in the past / already / never yet' },
        { de: 'gekauft / gemacht', en: 'bought / done' },
        { de: 'gegessen / getrunken', en: 'eaten / drunk' },
        { de: 'gefahren / gegangen', en: 'driven / gone' },
        { de: 'gewesen / geblieben', en: 'been / stayed' },
        { de: 'Es war super / stressig.', en: 'It was great / stressful.' },
        { de: 'Ich war in Urlaub.', en: 'I was on holiday.' },
        { de: 'war / hatte', en: 'was / had (Präteritum)' },
      ],
      keyPhrases: [
        { de: 'Gestern habe ich Fußball gespielt.', en: 'Yesterday I played football.', note: 'haben + Partizip II at end (regular: ge+t)' },
        { de: 'Am Wochenende bin ich nach Berlin gefahren.', en: 'At the weekend I went to Berlin.', note: 'sein + Partizip II for motion/change of state' },
        { de: 'Letztes Jahr war ich in Spanien. Es war fantastisch!', en: 'Last year I was in Spain. It was fantastic!', note: 'war = Präteritum of sein (not Perfekt)' },
      ],
      tip: { text: 'haben vs sein in Perfekt: use sein with motion verbs (gehen, fahren, fliegen) and state changes (aufwachen, werden). All others take haben.', icon: '⚠️' },
      verbs: [
        { verb: 'haben (Perfekt)', en: 'have (aux.)', conj: [['ich','habe ... gemacht'],['du','hast ... gemacht'],['er/sie','hat ... gemacht'],['wir','haben ... gemacht'],['ihr','habt ... gemacht'],['Sie','haben ... gemacht']] },
        { verb: 'sein (Perfekt)', en: 'be (aux.)', conj: [['ich','bin ... gegangen'],['du','bist ... gegangen'],['er/sie','ist ... gegangen'],['wir','sind ... gegangen'],['ihr','seid ... gegangen'],['Sie','sind ... gegangen']] },
      ],
      structures: [
        { label: 'Perfekt with haben', pattern: 'Subject + haben + Rest + [Partizip II]', example: 'Ich habe gestern Fußball gespielt.', translation: 'I played football yesterday.' },
        { label: 'Perfekt with sein', pattern: 'Subject + sein + Rest + [Partizip II]', example: 'Wir sind nach Hause gegangen.', translation: 'We went home.' },
        { label: 'Präteritum (sein/haben)', pattern: 'Subject + war/hatte + Rest', example: 'Das Wetter war schön.', translation: 'The weather was nice.' },
      ],
    },
    {
      n: 11, title: 'Wir gehen shoppen!',
      color: '#06b6d4',
      inhalt: [
        { de: 'Ich brauche neue Kleidung.', en: 'I need new clothes.' },
        { de: 'Haben Sie das eine Nummer größer?', en: 'Do you have that one size bigger?' },
        { de: 'Welche Farbe steht mir besser?', en: 'Which colour suits me better?' },
      ],
      lernziele: [
        { de: 'Verkäufer um Hilfe bitten', en: 'Ask a shop assistant for help' },
        { de: 'Über Kleidungsgrößen und Farben sprechen', en: 'Talk about sizes and colours' },
        { de: 'Vorlieben und Abneigungen äußern', en: 'Express preferences and dislikes' },
        { de: 'Etwas reklamieren oder umtauschen', en: 'Make a complaint / exchange an item' },
      ],
      grammatik: [
        { de: 'Unbestimmter Artikel im Dativ: einem / einer', en: 'Indefinite article in dative: einem/einer' },
        { de: 'Personalpronomen Dativ: mir, dir, ihm, ihr, uns, euch, ihnen', en: 'Dative personal pronouns' },
        { de: 'Komparativ: schöner, größer, teurer', en: 'Comparative: more beautiful, bigger, pricier' },
        { de: 'Superlativ: am schönsten, am besten', en: 'Superlative: most beautiful, best' },
        { de: 'welcher / dieser im Nom. und Akk.', en: 'which / this in nominative and accusative' },
      ],
      vocab: [
        { de: 'das Kleid / die Hose', en: 'dress / trousers' },
        { de: 'der Pullover / die Jacke', en: 'jumper / jacket' },
        { de: 'das Hemd / die Bluse', en: 'shirt / blouse' },
        { de: 'der Rock / der Mantel', en: 'skirt / coat' },
        { de: 'die Schuhe / die Socken', en: 'shoes / socks' },
        { de: 'rot / blau / grün', en: 'red / blue / green' },
        { de: 'schwarz / weiß / grau', en: 'black / white / grey' },
        { de: 'braun / beige / lila', en: 'brown / beige / purple' },
        { de: 'Das steht mir gut!', en: 'That suits me well!' },
        { de: 'Das ist zu eng / weit.', en: 'That is too tight / loose.' },
        { de: 'Welche Größe haben Sie?', en: 'What size are you?' },
        { de: 'Kann ich das umtauschen?', en: 'Can I exchange this?' },
        { de: 'Das gefällt mir besser.', en: 'I like this one better.' },
      ],
      keyPhrases: [
        { de: 'Das Kleid steht dir sehr gut!', en: 'The dress suits you very well!', note: 'stehen + Dativ pronoun (dir = you informal)' },
        { de: 'Diese Jacke gefällt mir besser als die rote.', en: 'I like this jacket better than the red one.', note: 'gefallen + Dativ; besser = comparative' },
        { de: 'Haben Sie das in einer kleineren Größe?', en: 'Do you have that in a smaller size?', note: 'Dativ: in + einer (feminine)' },
      ],
      tip: { text: 'Verbs like gefallen, stehen, passen take DATIV: "Das steht mir" (not mich). Think: "it suits TO me."', icon: '⚠️' },
      verbs: [
        { verb: 'gefallen', en: 'to please/like', conj: [['mir','gefällt'],['dir','gefällt'],['ihm/ihr','gefällt'],['uns','gefällt'],['euch','gefällt'],['Ihnen','gefällt']] },
        { verb: 'stehen', en: 'to suit', conj: [['mir','steht'],['dir','steht'],['ihm/ihr','steht'],['uns','steht'],['euch','steht'],['Ihnen','steht']] },
      ],
      structures: [
        { label: 'Dative verb (gefallen)', pattern: '[Noun/es] + gefällt/gefallen + [Dativ pronoun]', example: 'Das Hemd gefällt mir.', translation: 'I like the shirt.' },
        { label: 'Comparative', pattern: '[Adj.]-er + als', example: 'Diese Hose ist schöner als die blaue.', translation: 'These trousers are nicer than the blue ones.' },
        { label: 'Superlative', pattern: 'am + [Adj.]-sten', example: 'Diese Jacke gefällt mir am besten.', translation: 'I like this jacket the most.' },
      ],
    },
    {
      n: 12, title: 'Endlich Frühling!',
      color: '#22c55e',
      inhalt: [
        { de: 'Heute kann es regnen, stürmen oder schneien...', en: 'Today it can rain, storm or snow...' },
        { de: 'Feste und Jahreszeiten', en: 'Festivals and seasons' },
        { de: 'Wir feiern eine Party.', en: 'We are having a party.' },
      ],
      lernziele: [
        { de: 'Über das Wetter sprechen', en: 'Talk about the weather' },
        { de: 'Die Jahreszeiten beschreiben', en: 'Describe the seasons' },
        { de: 'Datumsangaben machen und verstehen', en: 'Give and understand dates' },
        { de: 'Einladungen verfassen', en: 'Write invitations' },
        { de: 'Einladungen annehmen und absagen', en: 'Accept and decline invitations' },
      ],
      grammatik: [
        { de: 'Modalverb wollen: Ich will feiern.', en: '"want to": I want to celebrate.' },
        { de: 'Komposita: Osterfest, Weihnachtsbaum', en: 'Compound nouns: Easter festival, Christmas tree' },
        { de: 'Temporale Präpositionen + Dativ: im, am', en: 'Time prepositions + dative: in (month/season), on (day)' },
        { de: 'Ordinalzahlen: der erste, zweite, dritte...', en: 'Ordinal numbers: the first, second, third...' },
      ],
      vocab: [
        { de: 'der Frühling / der Sommer', en: 'spring / summer' },
        { de: 'der Herbst / der Winter', en: 'autumn / winter' },
        { de: 'Es regnet / Es schneit.', en: 'It is raining / snowing.' },
        { de: 'Es ist sonnig / bewölkt.', en: 'It is sunny / cloudy.' },
        { de: 'Es ist windig / nebelig.', en: 'It is windy / foggy.' },
        { de: 'Es ist kalt / warm / heiß.', en: 'It is cold / warm / hot.' },
        { de: 'Weihnachten / Ostern', en: 'Christmas / Easter' },
        { de: 'der Geburtstag / die Hochzeit', en: 'birthday / wedding' },
        { de: 'Ich lade dich ein!', en: 'I am inviting you!' },
        { de: 'Ich komme gerne!', en: "I'd love to come!" },
        { de: 'Leider kann ich nicht.', en: "Unfortunately I can't." },
        { de: 'Am ersten Januar', en: 'On the first of January' },
        { de: 'im Juli / im August', en: 'in July / in August' },
      ],
      keyPhrases: [
        { de: 'Im Winter kann es sehr kalt werden.', en: 'In winter it can get very cold.', note: 'im + season (Dativ); können for possibility' },
        { de: 'Die Party ist am dritten März um 19 Uhr.', en: 'The party is on the third of March at 7 pm.', note: 'am + ordinal (Dativ): am dritten' },
        { de: 'Ich will im Sommer nach Italien fahren.', en: 'I want to go to Italy in the summer.', note: 'wollen: modal verb bracket' },
      ],
      tip: { text: 'Dates: "am dritten März" (spoken) but "am 3. März" (written). The dot after the number signals an ordinal in German!', icon: '💡' },
      verbs: [
        { verb: 'wollen', en: 'to want', conj: [['ich','will'],['du','willst'],['er/sie','will'],['wir','wollen'],['ihr','wollt'],['Sie','wollen']] },
        { verb: 'werden', en: 'to become', conj: [['ich','werde'],['du','wirst'],['er/sie','wird'],['wir','werden'],['ihr','werdet'],['Sie','werden']] },
      ],
      structures: [
        { label: 'Weather expression', pattern: 'Es + [weather verb / ist + adjective]', example: 'Es regnet. / Es ist sonnig.', translation: 'It rains. / It is sunny.' },
        { label: 'Date (am + ordinal)', pattern: 'am + [ordinal number] + [month]', example: 'Am fünften Juli ist mein Geburtstag.', translation: 'My birthday is on the fifth of July.' },
        { label: 'wollen (want to)', pattern: 'Subject + will + Rest + [Infinitiv]', example: 'Wir wollen eine Party feiern.', translation: 'We want to have a party.' },
      ],
    },
  ];

  const filters = ['All', 'Grammatik', 'Vocabulary', 'Goals', 'Phrases', 'Structures'];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .cp-root { min-height: 100vh; font-family: 'DM Sans', sans-serif; transition: background 0.4s, color 0.4s; position: relative; }
        .cp-root.light { background: #f5f0e8; color: #1a1a1a; }
        .cp-root.dark  { background: #0f0f0f; color: #f0ebe0; }
        .cp-root::before {
          content: ''; position: fixed; inset: 0; opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          pointer-events: none; z-index: 0;
        }

        .cp-content { position: relative; z-index: 1; max-width: 780px; margin: 0 auto; padding: 2.5rem 1.5rem 6rem; }

        .cp-back { display: inline-flex; align-items: center; gap: 0.4rem; font-size: 0.78rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; border: none; background: none; cursor: pointer; padding: 0.4rem 0; margin-bottom: 1rem; opacity: 0.45; transition: opacity 0.2s; font-family: 'DM Sans', sans-serif; color: inherit; }
        .cp-back:hover { opacity: 1; }
        .cp-subtitle { font-size: 0.82rem; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; opacity: 0.4; font-style: italic; margin-bottom: 0.3rem; }
        .cp-title { font-family: 'Playfair Display', serif; font-weight: 900; font-size: clamp(2rem, 6vw, 3rem); line-height: 1; letter-spacing: -0.02em; margin-bottom: 0.5rem; }
        .cp-meta { font-size: 0.8rem; opacity: 0.35; margin-bottom: 2.5rem; font-style: italic; }

        .cp-filters { display: flex; gap: 0.4rem; flex-wrap: wrap; margin-bottom: 2.5rem; }
        .cp-filter { padding: 0.4rem 1rem; border-radius: 999px; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; cursor: pointer; border: none; font-family: 'DM Sans', sans-serif; transition: all 0.2s; }
        .light .cp-filter { background: white; color: #888; border: 1px solid #e8e2d6; }
        .light .cp-filter:hover { color: #1a1a1a; }
        .light .cp-filter.active { background: #1a1a1a; color: #f5f0e8; border-color: #1a1a1a; }
        .dark  .cp-filter { background: #1a1a1a; color: #555; border: 1px solid #222; }
        .dark  .cp-filter:hover { color: #f0ebe0; }
        .dark  .cp-filter.active { background: #f0ebe0; color: #0f0f0f; border-color: #f0ebe0; }

        .cp-timeline { position: relative; }
        .cp-timeline::before { content: ''; position: absolute; left: 28px; top: 0; bottom: 0; width: 1px; }
        .light .cp-timeline::before { background: linear-gradient(to bottom, transparent, #d0c8b8 5%, #d0c8b8 95%, transparent); }
        .dark  .cp-timeline::before { background: linear-gradient(to bottom, transparent, #2a2a2a 5%, #2a2a2a 95%, transparent); }

        .cp-entry { display: flex; gap: 1.5rem; margin-bottom: 2.5rem; animation: cpFade 0.4s ease both; }
        @keyframes cpFade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        .cp-num { flex-shrink: 0; width: 56px; height: 56px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: 'Playfair Display', serif; font-weight: 900; font-size: 1.15rem; position: relative; z-index: 1; margin-top: 0.15rem; color: white; box-shadow: 0 4px 16px rgba(0,0,0,0.18); }

        .cp-card { flex: 1; border-radius: 20px; padding: 1.5rem; overflow: hidden; position: relative; }
        .light .cp-card { background: white; border: 1px solid #e8e2d6; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
        .dark  .cp-card { background: #141414; border: 1px solid #222; box-shadow: 0 4px 20px rgba(0,0,0,0.4); }

        .cp-stripe { position: absolute; top: 0; left: 0; right: 0; height: 3px; border-radius: 20px 20px 0 0; }
        .cp-lektion-label { font-size: 0.65rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; opacity: 0.4; margin-bottom: 0.3rem; }
        .cp-card-title { font-family: 'Playfair Display', serif; font-size: 1.2rem; font-weight: 700; line-height: 1.2; margin-bottom: 1rem; }

        /* Inhalt */
        .cp-topics { display: flex; flex-direction: column; gap: 0.3rem; margin-bottom: 1.4rem; }
        .cp-topic { font-size: 0.78rem; line-height: 1.4; display: flex; align-items: baseline; gap: 0.4rem; flex-wrap: wrap; }
        .cp-topic-de { font-style: italic; opacity: 0.7; }
        .cp-topic-sep { opacity: 0.2; font-size: 0.65rem; }
        .cp-topic-en { font-size: 0.7rem; opacity: 0.38; }

        /* Section */
        .cp-section { margin-bottom: 1.2rem; }
        .cp-section:last-child { margin-bottom: 0; }
        .cp-section-label { font-size: 0.62rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 0.6rem; display: flex; align-items: center; gap: 0.4rem; }
        .cp-section-label::after { content: ''; flex: 1; height: 1px; opacity: 0.12; background: currentColor; }

        /* Lernziele */
        .cp-goals { display: flex; flex-direction: column; gap: 0.35rem; }
        .cp-goal { font-size: 0.8rem; line-height: 1.5; padding-left: 1rem; position: relative; }
        .cp-goal::before { content: '→'; position: absolute; left: 0; font-size: 0.65rem; opacity: 0.4; top: 0.1rem; }
        .cp-goal-de { opacity: 0.8; }
        .cp-goal-en { font-size: 0.71rem; opacity: 0.38; font-style: italic; margin-left: 0.3rem; }

        /* Grammatik */
        .cp-grammar-list { display: flex; flex-direction: column; gap: 0.35rem; }
        .cp-grammar-item { font-size: 0.78rem; line-height: 1.5; padding: 0.4rem 0.75rem; border-radius: 8px; }
        .light .cp-grammar-item { background: #faf7f2; }
        .dark  .cp-grammar-item { background: #1a1a1a; }
        .cp-grammar-de { opacity: 0.82; }
        .cp-grammar-en { font-size: 0.7rem; opacity: 0.38; font-style: italic; margin-left: 0.25rem; }

        /* Vocab */
        .cp-vocab-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); gap: 0.35rem; }
        .cp-vocab-item { display: flex; flex-direction: column; gap: 0.1rem; padding: 0.4rem 0.7rem; border-radius: 10px; }
        .cp-vocab-de { font-size: 0.78rem; font-weight: 600; }
        .cp-vocab-en { font-size: 0.67rem; opacity: 0.42; font-style: italic; }

        /* Key Phrases */
        .cp-phrases { display: flex; flex-direction: column; gap: 0.6rem; }
        .cp-phrase { border-radius: 12px; padding: 0.8rem 1rem; }
        .light .cp-phrase { background: #faf7f2; border: 1px solid #e8e2d6; }
        .dark  .cp-phrase { background: #1a1a1a; border: 1px solid #252525; }
        .cp-phrase-de { font-size: 0.85rem; font-weight: 600; margin-bottom: 0.2rem; }
        .cp-phrase-en { font-size: 0.75rem; opacity: 0.5; font-style: italic; margin-bottom: 0.3rem; }
        .cp-phrase-note { font-size: 0.7rem; opacity: 0.55; padding: 0.2rem 0.5rem; border-radius: 6px; display: inline-block; }

        /* Tip box */
        .cp-tip { border-radius: 12px; padding: 0.75rem 1rem; display: flex; gap: 0.6rem; align-items: flex-start; margin-bottom: 1.2rem; }
        .light .cp-tip { background: #fffbeb; border: 1px solid #fde68a; }
        .dark  .cp-tip { background: #1c1800; border: 1px solid #3d2e00; }
        .cp-tip-icon { font-size: 1rem; flex-shrink: 0; margin-top: 0.05rem; }
        .cp-tip-text { font-size: 0.78rem; line-height: 1.5; opacity: 0.85; }

        /* Verb conjugation table */
        .cp-verb-tables { display: flex; flex-wrap: wrap; gap: 0.75rem; }
        .cp-verb-table { flex: 1; min-width: 180px; border-radius: 12px; overflow: hidden; }
        .light .cp-verb-table { border: 1px solid #e8e2d6; }
        .dark  .cp-verb-table { border: 1px solid #252525; }
        .cp-verb-header { padding: 0.4rem 0.75rem; display: flex; justify-content: space-between; align-items: center; }
        .cp-verb-name { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 0.9rem; }
        .cp-verb-en { font-size: 0.65rem; opacity: 0.45; font-style: italic; }
        .cp-verb-row { display: flex; justify-content: space-between; padding: 0.22rem 0.75rem; font-size: 0.75rem; }
        .light .cp-verb-row:nth-child(odd)  { background: #faf7f2; }
        .light .cp-verb-row:nth-child(even) { background: white; }
        .dark  .cp-verb-row:nth-child(odd)  { background: #111; }
        .dark  .cp-verb-row:nth-child(even) { background: #1a1a1a; }
        .cp-verb-pronoun { opacity: 0.45; }
        .cp-verb-form { font-weight: 600; }

        /* Sentence structures */
        .cp-struct-list { display: flex; flex-direction: column; gap: 0.6rem; }
        .cp-struct { border-radius: 12px; overflow: hidden; }
        .light .cp-struct { border: 1px solid #e8e2d6; }
        .dark  .cp-struct { border: 1px solid #252525; }
        .cp-struct-header { padding: 0.35rem 0.8rem; font-size: 0.65rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; }
        .cp-struct-body { padding: 0.5rem 0.8rem; }
        .light .cp-struct-body { background: #faf7f2; }
        .dark  .cp-struct-body { background: #111; }
        .cp-struct-pattern { font-size: 0.72rem; opacity: 0.5; font-style: italic; margin-bottom: 0.3rem; font-family: monospace; }
        .cp-struct-example { font-size: 0.82rem; font-weight: 600; margin-bottom: 0.15rem; }
        .cp-struct-trans { font-size: 0.72rem; opacity: 0.45; font-style: italic; }

        @media (max-width: 500px) {
          .cp-timeline::before { left: 20px; }
          .cp-num { width: 40px; height: 40px; font-size: 0.95rem; }
          .cp-entry { gap: 1rem; }
          .cp-vocab-grid { grid-template-columns: 1fr 1fr; }
          .cp-verb-tables { flex-direction: column; }
        }
      `}</style>

      <div className={`cp-root ${dm ? 'dark' : 'light'}`}>
        <div className="cp-content">

          <button className="cp-back" onClick={() => navigate('/')}>← Back</button>
          <p className="cp-subtitle">Einfach gut! · A1</p>
          <h1 className="cp-title">Lektionen</h1>
          <p className="cp-meta">12 Kapitel · Vollständiger Kursüberblick</p>

          <div className="cp-filters">
            {filters.map(f => (
              <button key={f} className={`cp-filter ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
                {f === 'All' ? 'Alles' : f === 'Goals' ? 'Lernziele' : f === 'Phrases' ? 'Sätze' : f === 'Structures' ? 'Satzbau' : f}
              </button>
            ))}
          </div>

          <div className="cp-timeline">
            {lektionen.map((lek, idx) => (
              <div key={lek.n} className="cp-entry" style={{ animationDelay: `${idx * 0.04}s` }}>

                <div className="cp-num" style={{ background: lek.color }}>{lek.n}</div>

                <div className="cp-card">
                  <div className="cp-stripe" style={{ background: lek.color }} />
                  <p className="cp-lektion-label">Lektion {lek.n}</p>
                  <h2 className="cp-card-title">{lek.title}</h2>

                  {/* Inhalt — always shown */}
                  <div className="cp-topics">
                    {lek.inhalt.map(t => (
                      <div key={t.de} className="cp-topic">
                        <span className="cp-topic-de">"{t.de}"</span>
                        <span className="cp-topic-sep">·</span>
                        <span className="cp-topic-en">{t.en}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tip — always shown */}
                  <div className="cp-tip">
                    <span className="cp-tip-icon">{lek.tip.icon}</span>
                    <span className="cp-tip-text">{lek.tip.text}</span>
                  </div>

                  {/* Lernziele */}
                  {(filter === 'All' || filter === 'Goals') && (
                    <div className="cp-section">
                      <p className="cp-section-label" style={{ color: lek.color }}>Lernziele</p>
                      <div className="cp-goals">
                        {lek.lernziele.map(g => (
                          <p key={g.de} className="cp-goal">
                            <span className="cp-goal-de">{g.de}</span>
                            <span className="cp-goal-en">— {g.en}</span>
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Grammatik */}
                  {(filter === 'All' || filter === 'Grammatik') && (
                    <div className="cp-section">
                      <p className="cp-section-label" style={{ color: lek.color }}>Grammatik</p>
                      <div className="cp-grammar-list">
                        {lek.grammatik.map(g => (
                          <div key={g.de} className="cp-grammar-item">
                            <span className="cp-grammar-de">· {g.de}</span>
                            <span className="cp-grammar-en"> — {g.en}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Vocabulary */}
                  {(filter === 'All' || filter === 'Vocabulary') && (
                    <div className="cp-section">
                      <p className="cp-section-label" style={{ color: lek.color }}>Sprachbausteine</p>
                      <div className="cp-vocab-grid">
                        {lek.vocab.map(v => (
                          <div key={v.de} className="cp-vocab-item" style={{ background: `${lek.color}10`, border: `1px solid ${lek.color}22` }}>
                            <span className="cp-vocab-de">{v.de}</span>
                            <span className="cp-vocab-en">{v.en}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Key Phrases */}
                  {(filter === 'All' || filter === 'Phrases') && (
                    <div className="cp-section">
                      <p className="cp-section-label" style={{ color: lek.color }}>Schlüsselsätze</p>
                      <div className="cp-phrases">
                        {lek.keyPhrases.map(p => (
                          <div key={p.de} className="cp-phrase">
                            <p className="cp-phrase-de">{p.de}</p>
                            <p className="cp-phrase-en">{p.en}</p>
                            <span className="cp-phrase-note" style={{ background: `${lek.color}15`, color: lek.color }}>📌 {p.note}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Verb Tables */}
                  {(filter === 'All' || filter === 'Grammatik') && (
                    <div className="cp-section">
                      <p className="cp-section-label" style={{ color: lek.color }}>Konjugation</p>
                      <div className="cp-verb-tables">
                        {lek.verbs.map(v => (
                          <div key={v.verb} className="cp-verb-table">
                            <div className="cp-verb-header" style={{ background: `${lek.color}18` }}>
                              <span className="cp-verb-name" style={{ color: lek.color }}>{v.verb}</span>
                              <span className="cp-verb-en">{v.en}</span>
                            </div>
                            {v.conj.map(([pronoun, form]) => (
                              <div key={pronoun} className="cp-verb-row">
                                <span className="cp-verb-pronoun">{pronoun}</span>
                                <span className="cp-verb-form">{form}</span>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Sentence Structures */}
                  {(filter === 'All' || filter === 'Structures') && (
                    <div className="cp-section">
                      <p className="cp-section-label" style={{ color: lek.color }}>Satzbau</p>
                      <div className="cp-struct-list">
                        {lek.structures.map(s => (
                          <div key={s.label} className="cp-struct">
                            <div className="cp-struct-header" style={{ background: `${lek.color}18`, color: lek.color }}>{s.label}</div>
                            <div className="cp-struct-body">
                              <p className="cp-struct-pattern">{s.pattern}</p>
                              <p className="cp-struct-example">{s.example}</p>
                              <p className="cp-struct-trans">{s.translation}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChaptersPage;