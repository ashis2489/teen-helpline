import React, { useState } from 'react';
import { 
  Smile, 
  Frown, 
  Zap, 
  Sparkles, 
  Coffee, 
  ShieldCheck, 
  Trash2,
  Bookmark
} from 'lucide-react';

interface JournalEntry {
  id: string;
  mood: string;
  emoji: string;
  note: string;
  time: string;
}

export default function MoodLogger() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [journalNote, setJournalNote] = useState('');
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([
    {
      id: '1',
      mood: 'Anxious',
      emoji: '😟',
      note: 'Had a lot of chemistry exam anxiety this morning, but writing it down helped.',
      time: 'Today, 9:15 AM'
    }
  ]);

  const moods = [
    { label: 'Anxious', emoji: '😟', color: 'border-amber-300 text-amber-700 bg-amber-50/50', tip: "It's completely okay to feel anxious. Your mind is processing a lot. Let's ground ourselves together." },
    { label: 'Exhausted', emoji: '🥱', color: 'border-blue-200 text-blue-700 bg-blue-50/50', tip: "Listen to your body. You don't have to carry it all today. Rest is productive!" },
    { label: 'Overwhelmed', emoji: '🤯', color: 'border-purple-300 text-purple-700 bg-purple-50/50', tip: "Try to break things into tiny micro-steps. Focus on just the next 15 minutes." },
    { label: 'Neutral/Okay', emoji: '😐', color: 'border-slate-300 text-slate-700 bg-slate-50/50', tip: "Steady is a beautiful place to be. Take a moment to appreciate this quiet space." },
    { label: 'Hopeful', emoji: '🌱', color: 'border-emerald-300 text-emerald-700 bg-emerald-50/50', tip: "That positive spark is powerful! Write down what is exciting you so you can remember it later." },
    { label: 'Brave', emoji: '🦁', color: 'border-rose-300 text-rose-700 bg-rose-50/50', tip: "Standing up to pressure takes serious guts. You're doing amazing!" }
  ];

  const handleSaveEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMood) return;

    const chosenMoodObj = moods.find(m => m.label === selectedMood);
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      mood: selectedMood,
      emoji: chosenMoodObj?.emoji || '🧘',
      note: journalNote.trim() || 'Logged my mood',
      time: 'Just now'
    };

    setJournalEntries([newEntry, ...journalEntries]);
    setJournalNote('');
    // keep selectedMood to show the tip, but reset journal note
  };

  const selectedMoodObj = moods.find(m => m.label === selectedMood);

  return (
    <div className="bg-white border border-outline p-6 md:p-8 space-y-6">
      
      {/* Header */}
      <div className="flex justify-between items-center border-b border-outline pb-4">
        <div className="flex items-center gap-2">
          <Smile className="w-5 h-5 text-secondary" />
          <h3 className="font-serif text-lg font-medium text-primary">How are you feeling today?</h3>
        </div>
        <span className="font-mono text-[9px] uppercase tracking-wider text-on-surface-variant flex items-center gap-1 bg-surface-dim px-2.5 py-1 border border-outline">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Private Mood Check-In
        </span>
      </div>

      <p className="text-xs text-on-surface-variant leading-relaxed">
        Select your current headspace to receive tailored supportive tips. Your entries are stored locally on your device.
      </p>

      {/* Mood Selector Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
        {moods.map((m) => {
          const isSelected = selectedMood === m.label;
          return (
            <button
              key={m.label}
              onClick={() => setSelectedMood(m.label)}
              className={`p-3 border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                isSelected 
                ? 'bg-primary text-white border-primary scale-[1.03] font-bold shadow-xs' 
                : 'bg-white border-outline hover:bg-surface-dim text-primary'
              }`}
            >
              <span className="text-2xl">{m.emoji}</span>
              <span className="font-mono text-[9px] uppercase tracking-wider">{m.label}</span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Empathetic Tip Box */}
      {selectedMoodObj && (
        <div className={`p-4 border transition-all duration-300 ${selectedMoodObj.color}`}>
          <div className="flex gap-2.5 items-start">
            <Sparkles className="w-4 h-4 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-mono text-[9px] uppercase tracking-widest font-bold">Empathetic Insight</p>
              <p className="text-xs leading-relaxed font-sans">{selectedMoodObj.tip}</p>
            </div>
          </div>
        </div>
      )}

      {/* Journal Entry Form */}
      {selectedMood && (
        <form onSubmit={handleSaveEntry} className="space-y-3 pt-2">
          <label className="block text-xs font-mono uppercase tracking-wider text-on-surface-variant font-bold">
            Write a quick thought (Optional):
          </label>
          <textarea
            value={journalNote}
            onChange={(e) => setJournalNote(e.target.value)}
            rows={2}
            placeholder="What is making you feel this way? (e.g., studies, friends, family...)"
            className="w-full bg-white border border-outline p-3.5 text-xs focus:outline-none focus:border-secondary font-sans leading-relaxed"
          />
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-on-surface-variant font-mono">
              🔒 Confidential local log
            </span>
            <button
              type="submit"
              className="bg-primary hover:bg-primary/95 text-white px-5 py-2 font-mono text-[10px] uppercase tracking-wider cursor-pointer font-bold flex items-center gap-1.5"
            >
              <Bookmark className="w-3.5 h-3.5" /> Log Check-In
            </button>
          </div>
        </form>
      )}

      {/* Past Journal Entries Timeline */}
      {journalEntries.length > 0 && (
        <div className="space-y-3 pt-4 border-t border-outline">
          <p className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
            Your Coping Journal History
          </p>
          <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
            {journalEntries.map((entry) => (
              <div 
                key={entry.id}
                className="bg-surface-dim/40 border border-outline p-3 flex justify-between items-start gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 font-mono text-[9px] text-on-surface-variant font-bold uppercase">
                    <span>{entry.emoji}</span>
                    <span className="text-primary">{entry.mood}</span>
                    <span className="opacity-70">•</span>
                    <span className="opacity-70">{entry.time}</span>
                  </div>
                  <p className="text-xs text-primary leading-relaxed font-sans">{entry.note}</p>
                </div>
                <button
                  onClick={() => setJournalEntries(journalEntries.filter(e => e.id !== entry.id))}
                  className="text-on-surface-variant hover:text-error transition-colors p-1"
                  title="Delete entry"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
