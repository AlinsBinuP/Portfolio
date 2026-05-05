/**
 * ShelfSection.tsx
 * Visual bookshelf + music shelf — shows personality without needing work history.
 * Update BOOKS and MUSIC arrays with your actual favorites.
 *
 * SETUP:
 * import { ShelfSection } from '../components/ShelfSection';
 * Drop into Home.tsx or a dedicated /shelf section.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Music2, ExternalLink } from 'lucide-react';

// ─── CUSTOMIZE THESE ─────────────────────────────────────────────────────────
const BOOKS = [
  { title: 'Clean Architecture', author: 'Robert C. Martin', color: '#0369a1', spine: '#024e80', emoji: '🏗️', note: 'Changed how I think about code structure entirely.' },
  { title: 'The Design of Everyday Things', author: 'Don Norman', color: '#7c3aed', spine: '#5b21b6', emoji: '🔧', note: 'Every bad UI is a design failure, not a user failure.' },
  { title: 'Flutter Apprentice', author: 'Kodeco Team', color: '#059669', spine: '#047857', emoji: '📱', note: 'The book that got me serious about Flutter architecture.' },
  { title: 'Atomic Habits', author: 'James Clear', color: '#d97706', spine: '#b45309', emoji: '⚡', note: 'Systems > goals. Changed how I approach learning.' },
  { title: 'The Pragmatic Programmer', author: 'Hunt & Thomas', color: '#dc2626', spine: '#b91c1c', emoji: '🛠️', note: 'Every dev should read this before writing serious code.' },
  { title: 'Show Your Work', author: 'Austin Kleon', color: '#0891b2', spine: '#0e7490', emoji: '✏️', note: 'Why I started building in public.' },
];

const MUSIC = [
  { title: 'God\'s Plan', artist: 'Drake', genre: 'Hip-Hop', color: '#1a1a2e', note: 'Late night coding fuel' },
  { title: 'Blinding Lights', artist: 'The Weeknd', genre: 'Synthpop', color: '#4c1d95', note: 'Perfect for debugging at 2am' },
  { title: 'Kesariya', artist: 'Arijit Singh', genre: 'Bollywood', color: '#7f1d1d', note: 'When the code finally works' },
  { title: 'Levitating', artist: 'Dua Lipa', genre: 'Pop', color: '#1e3a5f', note: 'Deploy day playlist' },
  { title: 'Uyire', artist: 'AR Rahman', genre: 'Tamil Indie', color: '#064e3b', note: 'Kerala roots' },
  { title: 'Shape of You', artist: 'Ed Sheeran', genre: 'Pop', color: '#78350f', note: 'Always in the rotation' },
];
// ─────────────────────────────────────────────────────────────────────────────

const BookSpine = ({ book, index, isSelected, onClick }: {
  book: typeof BOOKS[0]; index: number; isSelected: boolean; onClick: () => void;
}) => (
  <motion.button
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.06, duration: 0.5 }}
    whileHover={{ y: -12, transition: { type: 'spring', stiffness: 400, damping: 15 } }}
    onClick={onClick}
    className="relative flex-shrink-0 w-12 cursor-pointer group"
    style={{ height: `${140 + (index % 3) * 20}px` }}
  >
    <div
      className="w-full h-full rounded-t-sm flex items-center justify-center shadow-lg"
      style={{ background: `linear-gradient(to right, ${book.spine}, ${book.color})` }}
    >
      <span
        className="text-white font-bold text-[9px] tracking-widest uppercase"
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}
      >
        {book.title.length > 16 ? book.title.slice(0, 14) + '…' : book.title}
      </span>
    </div>
    {isSelected && (
      <motion.div
        layoutId="book-indicator"
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#0369a1]"
      />
    )}
  </motion.button>
);

export const ShelfSection = () => {
  const [activeTab, setActiveTab] = useState<'books' | 'music'>('books');
  const [selectedBook, setSelectedBook] = useState<typeof BOOKS[0] | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<typeof MUSIC[0] | null>(null);

  return (
    <section className="relative bg-transparent px-8 md:px-20 py-32 border-t border-[var(--glass-border)] overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[var(--accent-primary)] font-mono text-[11px] font-bold tracking-[0.4em] uppercase opacity-70 block mb-4"
            >
              // SHELF
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-display font-black tracking-tighter text-[var(--text-primary)] uppercase leading-[0.9]"
            >
              Books &<br /><span className="font-serif italic opacity-40">Music.</span>
            </motion.h2>
          </div>

          {/* Tab switcher */}
          <div className="flex items-center gap-2 p-1.5 bg-[var(--bg-secondary)] rounded-full border border-[var(--glass-border)]">
            {([['books', BookOpen], ['music', Music2]] as const).map(([tab, Icon]) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-widest transition-all ${
                  activeTab === tab ? 'bg-[var(--bg-primary)] text-[var(--text-primary)] shadow-sm' : 'text-[var(--text-secondary)]/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'books' ? (
            <motion.div
              key="books"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              {/* Shelf */}
              <div className="bg-[var(--bg-secondary)] rounded-[32px] border border-[var(--glass-border)] p-8 pb-0 shadow-inner overflow-hidden">
                <div className="flex items-end gap-2 pb-0 overflow-x-auto no-scrollbar" style={{ minHeight: '200px' }}>
                  {BOOKS.map((book, i) => (
                    <BookSpine
                      key={book.title}
                      book={book}
                      index={i}
                      isSelected={selectedBook?.title === book.title}
                      onClick={() => setSelectedBook(selectedBook?.title === book.title ? null : book)}
                    />
                  ))}
                </div>
                {/* Shelf plank */}
                <div className="h-4 bg-gradient-to-b from-[#8b5a2b] to-[#5d3a1a] dark:from-[#3d2b1a] dark:to-[#1a130d] rounded-b-[24px] shadow-[0_4px_12px_rgba(0,0,0,0.3)]" />
              </div>

              {/* Book detail card */}
              <AnimatePresence>
                {selectedBook && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: 10, height: 0 }}
                    className="mt-4 overflow-hidden"
                  >
                    <div className="bg-[var(--card-bg)] border border-[var(--glass-border)] rounded-[20px] p-6 flex items-start gap-4">
                      <div
                        className="w-12 h-16 rounded-sm flex items-center justify-center flex-shrink-0 text-xl shadow-lg"
                        style={{ background: selectedBook.color }}
                      >
                        {selectedBook.emoji}
                      </div>
                      <div>
                        <p className="font-bold text-[15px] text-[var(--text-primary)]">{selectedBook.title}</p>
                        <p className="text-[12px] text-[var(--text-secondary)] font-mono mb-2">by {selectedBook.author}</p>
                        <p className="text-[13px] text-[var(--text-secondary)] italic leading-relaxed">"{selectedBook.note}"</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="music"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {MUSIC.map((track, i) => (
                <motion.button
                  key={track.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => setSelectedTrack(selectedTrack?.title === track.title ? null : track)}
                  className={`flex items-center gap-4 p-4 rounded-[16px] border text-left transition-all ${
                    selectedTrack?.title === track.title
                      ? 'bg-[var(--bg-primary)] border-[var(--accent-primary)] shadow-lg'
                      : 'bg-[var(--card-bg)] border-[var(--glass-border)] hover:border-[var(--text-secondary)]/30'
                  }`}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md"
                    style={{ background: track.color }}
                  >
                    <Music2 className="w-5 h-5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-[14px] text-[var(--text-primary)] truncate">{track.title}</p>
                    <p className="text-[11px] text-[var(--text-secondary)] font-mono">{track.artist} · {track.genre}</p>
                    <AnimatePresence>
                      {selectedTrack?.title === track.title && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-[11px] text-[var(--accent-primary)] font-bold italic mt-1"
                        >
                          {track.note}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                  <motion.div
                    animate={{ scale: selectedTrack?.title === track.title ? [1, 1.2, 1] : 1 }}
                    transition={{ repeat: selectedTrack?.title === track.title ? Infinity : 0, duration: 1 }}
                    className={`w-2 h-2 rounded-full flex-shrink-0 ml-auto ${selectedTrack?.title === track.title ? 'bg-emerald-400' : 'bg-[var(--glass-border)]'}`}
                  />
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
