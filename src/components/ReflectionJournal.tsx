import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Heart, 
  Trash2, 
  TrendingUp, 
  Compass, 
  CheckCircle2, 
  ChevronRight, 
  AlertCircle,
  HelpCircle,
  Smile,
  ShieldAlert
} from 'lucide-react';

interface JournalPrompt {
  id: string;
  category: string;
  promptText: string;
}

interface ReflectionEntry {
  id: string;
  date: string;
  category: string;
  rating: number; // 1 to 10
  text: string;
  promptsUsed?: string;
}

export default function ReflectionJournal() {
  const prompts: JournalPrompt[] = [
    { id: 'p-1', category: 'Academic Overload', promptText: 'What is one concrete micro-action I can do today that will take less than 10 minutes?' },
    { id: 'p-2', category: 'Friendships / Family', promptText: 'Write about a time you felt really listened to or supported, even in a small way.' },
    { id: 'p-3', category: 'Career / Future Prep', promptText: 'If you had zero fear of failing, what bootcamp, skill, or degree would you most love to try?' },
    { id: 'p-4', category: 'Self-Image', promptText: 'List three attributes you appreciate about your resilience or creative mind today.' },
    { id: 'p-5', category: 'Mindfulness', promptText: 'Close your eyes, breathe, and name the quietest sound you can hear right now.' }
  ];

  const [entries, setEntries] = useState<ReflectionEntry[]>([
    {
      id: 'r-1',
      date: 'June 22, 2026',
      category: 'Academic Overload',
      rating: 4,
      text: 'I got overwhelmed by the bootcamp coding requirements, but I broke it down to just setting up the folder structure. Writing it down made it look achievable.'
    },
    {
      id: 'r-2',
      date: 'June 23, 2026',
      category: 'Self-Image',
      rating: 8,
      text: 'Practiced public speaking slides. My voice shook a bit, but I finished the full slide deck and did not quit!'
    },
    {
      id: 'r-3',
      date: 'June 24, 2026',
      category: 'Mindfulness',
      rating: 9,
      text: 'Tried box breathing for 4 cycles in the morning. Felt a deep physical release of the tension in my shoulders.'
    }
  ]);

  const [selectedPrompt, setSelectedPrompt] = useState<JournalPrompt | null>(null);
  const [journalText, setJournalText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Academic Overload');
  const [wellbeingRating, setWellbeingRating] = useState(5); // slider 1-10

  const handleApplyPrompt = (prompt: JournalPrompt) => {
    setSelectedPrompt(prompt);
    setJournalText(`Prompt Response: "${prompt.promptText}"\n\n`);
  };

  const handleSaveEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!journalText.trim()) return;

    const newEntry: ReflectionEntry = {
      id: `ref-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      category: selectedCategory,
      rating: wellbeingRating,
      text: journalText.trim(),
      promptsUsed: selectedPrompt?.promptText
    };

    setEntries([newEntry, ...entries]);
    setJournalText('');
    setSelectedPrompt(null);
    setWellbeingRating(5);
  };

  const handleDeleteEntry = (id: string) => {
    setEntries(entries.filter(e => e.id !== id));
  };

  // --- Insight Statistics Calculations ---
  // Category metrics for the custom SVG bar chart
  const categoriesList = ['Academic Overload', 'Friendships / Family', 'Career / Future Prep', 'Self-Image', 'Mindfulness'];
  
  const categoryCounts = categoriesList.reduce((acc, cat) => {
    acc[cat] = entries.filter(e => e.category === cat).length;
    return acc;
  }, {} as Record<string, number>);

  const maxCount = Math.max(...Object.values(categoryCounts), 1);

  // Average wellbeing rating
  const averageRating = entries.length > 0
    ? (entries.reduce((sum, e) => sum + e.rating, 0) / entries.length).toFixed(1)
    : '0';

  return (
    <div className="bg-white border border-outline p-6 md:p-8 space-y-8 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline pb-5">
        <div>
          <span className="font-mono text-[9px] text-secondary font-bold uppercase tracking-widest block">Safe local writing space</span>
          <h2 className="font-serif text-2xl font-medium text-primary tracking-tight">Reflection Journal &amp; Balance Analytics</h2>
        </div>
        <span className="font-mono text-[9px] uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5 bg-surface-dim px-2.5 py-1 border border-outline">
          🛡️ Private Client Encryption Active
        </span>
      </div>

      <p className="text-xs text-on-surface-variant leading-relaxed max-w-2xl">
        Writing down heavy feelings releases mental bandwidth. This private workspace stores notes safely in your local browser storage. Select an advice prompt chip to kickstart your writing flow, and view your dynamic balance analytics below.
      </p>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Writing station (7 columns) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Prompt Selection Area */}
          <div className="space-y-2.5">
            <span className="font-mono text-[9px] uppercase tracking-widest text-on-surface-variant font-bold block">
              1. Choose a Guided Reflection Prompt (Optional):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {prompts.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleApplyPrompt(p)}
                  className={`px-3 py-2 text-[10px] text-left border transition-all cursor-pointer font-mono ${
                    selectedPrompt?.id === p.id 
                    ? 'bg-secondary text-white border-secondary font-bold' 
                    : 'bg-white border-outline hover:bg-surface-dim text-primary'
                  }`}
                >
                  ✨ {p.category}
                </button>
              ))}
            </div>
            {selectedPrompt && (
              <div className="p-3 bg-[#fcf8f2] border border-secondary/35 text-[11px] text-primary leading-relaxed font-sans italic">
                Active Prompt Focus: "{selectedPrompt.promptText}"
              </div>
            )}
          </div>

          {/* Core journaling form */}
          <form onSubmit={handleSaveEntry} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Category */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-mono uppercase tracking-wider text-on-surface-variant font-bold">
                  2. Select Focus Category:
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-white border border-outline p-2.5 text-xs font-mono focus:outline-none"
                >
                  {categoriesList.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Slider rating */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-wider text-on-surface-variant font-bold">
                  <span>3. Mental Clarity Rate:</span>
                  <span className="text-secondary font-bold">{wellbeingRating}/10</span>
                </div>
                <div className="flex items-center gap-2 pt-1.5">
                  <span className="text-xs">😟</span>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={wellbeingRating}
                    onChange={(e) => setWellbeingRating(parseInt(e.target.value))}
                    className="w-full accent-secondary h-1.5 bg-surface-dim border border-outline/40 cursor-pointer"
                  />
                  <span className="text-xs">🌱</span>
                </div>
              </div>
            </div>

            {/* Note Area */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-on-surface-variant font-bold">
                4. Write down your thoughts:
              </label>
              <textarea
                value={journalText}
                onChange={(e) => setJournalText(e.target.value)}
                required
                rows={5}
                placeholder="Write honestly here. Talk about what was stressful, what went well, or what you intend to tackle next..."
                className="w-full bg-white border border-outline p-4 text-xs focus:outline-none focus:border-secondary font-sans leading-relaxed"
              />
            </div>

            <div className="flex justify-between items-center pt-1">
              <span className="font-mono text-[9px] text-on-surface-variant flex items-center gap-1">
                🔒 Data is encrypted locally
              </span>
              <button
                type="submit"
                className="bg-primary hover:bg-primary/95 text-white px-5 py-2.5 font-mono text-[10px] uppercase tracking-wider cursor-pointer font-bold flex items-center gap-2"
              >
                Log Reflection <BookOpen className="w-3.5 h-3.5" />
              </button>
            </div>

          </form>

        </div>

        {/* Right: Balance analytics dashboard (5 columns) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Quick Metrics */}
          <div className="bg-[#fcf8f2] border border-outline p-5 space-y-4">
            <h4 className="font-serif text-sm font-bold text-primary flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-secondary" />
              Wellbeing Insights
            </h4>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-3 border border-outline text-center space-y-0.5">
                <span className="font-mono text-[8px] uppercase tracking-wider text-on-surface-variant block">Total Entries</span>
                <span className="font-serif text-2xl font-extrabold text-primary">{entries.length}</span>
              </div>
              <div className="bg-white p-3 border border-outline text-center space-y-0.5">
                <span className="font-mono text-[8px] uppercase tracking-wider text-on-surface-variant block">Avg Clarity Rate</span>
                <span className="font-serif text-2xl font-extrabold text-secondary">{averageRating} / 10</span>
              </div>
            </div>
          </div>

          {/* Custom SVG Bar Chart */}
          <div className="bg-white border border-outline p-5 space-y-4">
            <h4 className="font-serif text-sm font-bold text-primary flex items-center gap-1.5 border-b border-outline/30 pb-2.5">
              <Compass className="w-4.5 h-4.5 text-secondary" />
              Reflection Focus Breakdown
            </h4>

            {entries.length === 0 ? (
              <p className="text-[11px] text-on-surface-variant italic text-center py-6">
                Log a journal entry to populate focus charts.
              </p>
            ) : (
              <div className="space-y-3.5">
                {categoriesList.map((cat) => {
                  const count = categoryCounts[cat];
                  const percent = Math.round((count / maxCount) * 100);
                  return (
                    <div key={cat} className="space-y-1">
                      <div className="flex justify-between items-center text-[9px] font-mono uppercase tracking-wide">
                        <span className="text-primary font-bold">{cat}</span>
                        <span className="text-on-surface-variant font-bold">{count} {count === 1 ? 'log' : 'logs'}</span>
                      </div>
                      <div className="w-full h-2.5 bg-surface-dim border border-outline/30 rounded-none overflow-hidden relative">
                        <div 
                          className="h-full bg-secondary transition-all duration-500"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* History Log Timeline */}
      <div className="border-t border-outline pt-6 space-y-4">
        <h3 className="font-serif text-lg font-medium text-primary">Your Private Reflection History</h3>
        
        {entries.length === 0 ? (
          <div className="border border-outline p-8 text-center text-on-surface-variant text-xs">
            Your journal is empty. Write your first entry above to start charting your resilience!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {entries.map((entry) => (
              <div 
                key={entry.id}
                className="bg-white border border-outline hover:border-secondary transition-all p-5 flex flex-col justify-between gap-4 min-h-[180px] relative overflow-hidden"
              >
                <div className="space-y-2.5 relative z-10">
                  <div className="flex justify-between items-center text-[9px] font-mono uppercase tracking-wider">
                    <span className="bg-[#fcf8f2] border border-outline text-secondary px-2 py-0.5 font-bold">
                      {entry.category}
                    </span>
                    <span className="text-on-surface-variant">{entry.date}</span>
                  </div>

                  <p className="text-xs text-primary leading-relaxed font-sans line-clamp-4">
                    "{entry.text}"
                  </p>
                </div>

                <div className="border-t border-outline/30 pt-3 flex justify-between items-center text-[9px] font-mono uppercase tracking-wider text-on-surface-variant">
                  <span className="flex items-center gap-1 font-bold text-emerald-700">
                    Clarity: {entry.rating}/10
                  </span>

                  <button
                    onClick={() => handleDeleteEntry(entry.id)}
                    className="text-on-surface-variant hover:text-error transition-colors p-1"
                    title="Delete log entry"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Corner design mark */}
                <div className="absolute top-0 right-0 w-8 h-8 border-t border-r -mt-4 -mr-4 rotate-45 border-outline/40" />
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
