import React, { useState } from 'react';
import { 
  PenTool, 
  Trash2, 
  Search, 
  Calendar, 
  Lock, 
  Sparkles, 
  Heart, 
  Smile, 
  Compass, 
  Plus, 
  BookOpen, 
  Info,
  CheckCircle2,
  Bookmark,
  Download
} from 'lucide-react';

export interface JournalEntry {
  id: string;
  date: string;
  time: string;
  content: string;
  mood: string;
  moodEmoji: string;
  promptMode: string;
}

interface DailyJournalProps {
  entries?: JournalEntry[];
  onAddEntry?: (entry: JournalEntry) => void;
  onDeleteEntry?: (id: string) => void;
}

export default function DailyJournal({ 
  entries: propEntries, 
  onAddEntry, 
  onDeleteEntry 
}: DailyJournalProps) {
  const [localEntries, setLocalEntries] = useState<JournalEntry[]>([
    {
      id: 'dj-1',
      date: 'June 23, 2026',
      time: '09:15 PM',
      content: 'Spent some time coding today and hit a roadblock with state updates, but instead of getting frustrated, I stepped away for a walk. Came back and solved it in five minutes!',
      mood: 'Resilient',
      moodEmoji: '🌱',
      promptMode: 'Three Good Things'
    },
    {
      id: 'dj-2',
      date: 'June 24, 2026',
      time: '08:00 AM',
      content: 'Starting the morning with a fresh cup of tea and some box breathing. Today is a clean slate.',
      mood: 'Peaceful',
      moodEmoji: '🌊',
      promptMode: 'Morning Intention'
    }
  ]);

  const entries = propEntries || localEntries;

  const [reflectionText, setReflectionText] = useState('');
  const [selectedMood, setSelectedMood] = useState({ label: 'Peaceful', emoji: '🌊' });
  const [activePromptMode, setActivePromptMode] = useState('Free Writing');
  const [searchQuery, setSearchQuery] = useState('');

  const moodOptions = [
    { label: 'Peaceful', emoji: '🌊' },
    { label: 'Joyful', emoji: '☀️' },
    { label: 'Resilient', emoji: '🌱' },
    { label: 'Anxious / Heavy', emoji: '☁️' },
    { label: 'Motivated', emoji: '⚡' }
  ];

  const writingModes = [
    'Free Writing',
    'Three Good Things',
    'Morning Intention',
    'Anxiety Release'
  ];

  const getPlaceholderText = () => {
    switch (activePromptMode) {
      case 'Three Good Things':
        return "1. What is one thing that made you smile today?\n2. What is something nice someone did for you?\n3. What is a small personal win?";
      case 'Morning Intention':
        return "My core focus for today is... \nI will protect my energy by... \nOne thing I want to feel at the end of the day is...";
      case 'Anxiety Release':
        return "Right now, my mind is spinning about... \nI cannot control... \nBut I CAN choose to focus on...";
      default:
        return "Write down any thoughts, feelings, or small events from your day. This is a secure space just for you...";
    }
  };

  const handleSaveEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reflectionText.trim()) return;

    const now = new Date();
    const newEntry: JournalEntry = {
      id: `dj-entry-${Date.now()}`,
      date: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      content: reflectionText.trim(),
      mood: selectedMood.label,
      moodEmoji: selectedMood.emoji,
      promptMode: activePromptMode
    };

    if (onAddEntry) {
      onAddEntry(newEntry);
    } else {
      setLocalEntries([newEntry, ...localEntries]);
    }
    setReflectionText('');
  };

  const handleDeleteEntry = (id: string) => {
    if (onDeleteEntry) {
      onDeleteEntry(id);
    } else {
      setLocalEntries(localEntries.filter(entry => entry.id !== id));
    }
  };

  const filteredEntries = entries.filter(entry => {
    const query = searchQuery.toLowerCase();
    return (
      entry.content.toLowerCase().includes(query) ||
      entry.mood.toLowerCase().includes(query) ||
      entry.promptMode.toLowerCase().includes(query)
    );
  });

  const handleExportEntries = () => {
    if (entries.length === 0) return;
    
    let textContent = `DAILY JOURNAL REFLECTIONS EXPORT\n`;
    textContent += `Exported on: ${new Date().toLocaleString()}\n`;
    textContent += `Total Entries: ${entries.length}\n`;
    textContent += `========================================\n\n`;

    entries.forEach((entry, idx) => {
      textContent += `Entry #${entries.length - idx}\n`;
      textContent += `Date: ${entry.date} at ${entry.time}\n`;
      textContent += `Reflection Mode: ${entry.promptMode}\n`;
      textContent += `Mood: ${entry.moodEmoji} ${entry.mood}\n`;
      textContent += `Content:\n"${entry.content}"\n`;
      textContent += `----------------------------------------\n\n`;
    });

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Daily_Journal_Reflections_${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white border border-outline p-6 md:p-8 space-y-8 max-w-5xl mx-auto">
      
      {/* Title bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline pb-5">
        <div>
          <span className="font-mono text-[9px] text-secondary font-bold uppercase tracking-widest block">Mindful micro-reflections</span>
          <h2 className="font-serif text-2xl font-medium text-primary tracking-tight">Daily Micro-Journal</h2>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {entries.length > 0 && (
            <button
              type="button"
              onClick={handleExportEntries}
              className="font-mono text-[9px] uppercase tracking-wider text-primary hover:text-secondary hover:border-secondary transition-all flex items-center gap-1.5 bg-white border border-outline px-3 py-1 cursor-pointer font-bold"
              title="Export Journal to TXT"
            >
              <Download className="w-3.5 h-3.5 text-secondary" /> Export Logs (.txt)
            </button>
          )}
          <span className="font-mono text-[9px] uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5 bg-[#fcf8f2] px-3 py-1 border border-outline">
            <Lock className="w-3.5 h-3.5 text-secondary" /> Offline Safe State
          </span>
        </div>
      </div>

      <p className="text-xs text-on-surface-variant leading-relaxed max-w-2xl">
        Take 60 seconds to release whatever is top-of-mind. Keep it short, private, and honest. All reflections stay entirely within your browser session state.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Log a Reflection Form */}
        <form onSubmit={handleSaveEntry} className="lg:col-span-7 space-y-5">
          
          {/* Prompt Mode Selectors */}
          <div className="space-y-2">
            <span className="font-mono text-[9px] uppercase tracking-widest text-on-surface-variant font-bold block">
              1. Choose a Reflection Mode:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {writingModes.map((mode) => (
                <button
                  type="button"
                  key={mode}
                  onClick={() => {
                    setActivePromptMode(mode);
                    setReflectionText('');
                  }}
                  className={`px-3 py-1.5 text-[10px] font-mono border transition-all cursor-pointer ${
                    activePromptMode === mode
                    ? 'bg-primary text-white border-primary font-bold'
                    : 'bg-white border-outline text-primary hover:bg-surface-dim'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Mood tagging */}
          <div className="space-y-2">
            <span className="font-mono text-[9px] uppercase tracking-widest text-on-surface-variant font-bold block">
              2. Tag your active energy:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {moodOptions.map((opt) => {
                const isSelected = selectedMood.label === opt.label;
                return (
                  <button
                    type="button"
                    key={opt.label}
                    onClick={() => setSelectedMood(opt)}
                    className={`px-3 py-1.5 text-[10px] font-sans border flex items-center gap-1.5 transition-all cursor-pointer ${
                      isSelected
                      ? 'bg-secondary text-white border-secondary font-bold'
                      : 'bg-white border-outline text-primary hover:bg-surface-dim'
                    }`}
                  >
                    <span>{opt.emoji}</span>
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Text Area */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-[9px] font-mono uppercase tracking-widest text-on-surface-variant font-bold">
              <span>3. Write Reflection:</span>
              <span className="text-secondary">{reflectionText.length} characters</span>
            </div>
            <textarea
              required
              rows={5}
              value={reflectionText}
              onChange={(e) => setReflectionText(e.target.value)}
              placeholder={getPlaceholderText()}
              className="w-full bg-white border border-outline p-4 text-xs focus:outline-none focus:border-secondary font-sans leading-relaxed text-primary"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary/95 text-white py-3 font-mono text-[10px] uppercase tracking-widest cursor-pointer font-bold flex items-center justify-center gap-2"
          >
            <PenTool className="w-4 h-4" /> Save reflection entry
          </button>
        </form>

        {/* Right Column: Mini Sidebar & Searchable Feed */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-[#fcf8f2] border border-outline p-4 space-y-3.5">
            <h4 className="font-serif text-xs font-bold text-primary flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-secondary" />
              Mindfulness Tip
            </h4>
            <p className="text-[10px] text-on-surface-variant leading-relaxed">
              Expressive micro-writing helps lower cardiovascular stress markers. Reflecting on just one nice moment is enough to reset high exam panic.
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-on-surface-variant/75" />
            <input
              type="text"
              placeholder="Search previous reflections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-outline pl-8 pr-3 py-2 text-[11px] focus:outline-none font-mono"
            />
          </div>

          {/* Reflection Feed */}
          <div className="space-y-4">
            <span className="font-mono text-[9px] uppercase tracking-widest text-on-surface-variant font-bold block">
              Active Session feed ({filteredEntries.length})
            </span>

            <div className="space-y-3.5 max-h-[290px] overflow-y-auto scrollbar-none pr-1">
              {filteredEntries.map((entry) => (
                <div 
                  key={entry.id}
                  className="bg-white border border-outline p-4 space-y-3 relative group hover:border-secondary/50 transition-colors"
                >
                  <div className="flex justify-between items-center text-[8px] font-mono uppercase tracking-wider text-on-surface-variant">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {entry.date} at {entry.time}
                    </span>
                    <span className="bg-[#fcf8f2] text-secondary border border-outline px-1.5 py-0.2 font-bold">
                      {entry.promptMode}
                    </span>
                  </div>

                  <p className="text-xs text-primary leading-relaxed font-sans whitespace-pre-line">
                    "{entry.content}"
                  </p>

                  <div className="flex items-center justify-between pt-1 border-t border-outline/30 text-[9px] font-mono">
                    <span className="flex items-center gap-1.5 text-primary font-bold">
                      <span>{entry.moodEmoji}</span> {entry.mood}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleDeleteEntry(entry.id)}
                      className="text-on-surface-variant hover:text-error transition-colors p-1"
                      title="Delete Entry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}

              {filteredEntries.length === 0 && (
                <p className="text-[10px] text-on-surface-variant italic text-center py-8 border border-outline bg-white">
                  No previous entries found matching query.
                </p>
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
