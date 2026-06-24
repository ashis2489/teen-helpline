import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  Sparkles, 
  VolumeX, 
  Music, 
  Flame, 
  Timer, 
  Clock, 
  Compass, 
  CheckCircle2, 
  Coffee, 
  BookOpen, 
  CloudRain, 
  Waves, 
  TreePine, 
  Radio
} from 'lucide-react';

interface SoundLayer {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  isPlaying: boolean;
  volume: number;
  description: string;
}

export default function CalmCorner() {
  // --- Audio Mixer States ---
  const [sounds, setSounds] = useState<SoundLayer[]>([
    { id: 'rain', name: 'Cozy Rainfall', icon: CloudRain, isPlaying: false, volume: 50, description: 'Soft raindrops hitting the window' },
    { id: 'lofi', name: 'Chill Lo-Fi Beat', icon: Radio, isPlaying: false, volume: 40, description: 'Lofi keystrokes and study chords' },
    { id: 'ocean', name: 'Ocean Shorelines', icon: Waves, isPlaying: false, volume: 30, description: 'Subtle rhythmic shoreline tides' },
    { id: 'forest', name: 'Morning Forest Birds', icon: TreePine, isPlaying: false, volume: 20, description: 'Distant birdsong and wind in pines' }
  ]);

  const [masterPlaying, setMasterPlaying] = useState(false);

  const toggleSound = (id: string) => {
    setSounds(sounds.map(s => {
      if (s.id === id) {
        const nextState = !s.isPlaying;
        if (nextState) setMasterPlaying(true);
        return { ...s, isPlaying: nextState };
      }
      return s;
    }));
  };

  const handleVolumeChange = (id: string, value: number) => {
    setSounds(sounds.map(s => {
      if (s.id === id) {
        return { ...s, volume: value };
      }
      return s;
    }));
  };

  const toggleMaster = () => {
    if (masterPlaying) {
      // Mute all temporarily
      setSounds(sounds.map(s => ({ ...s, isPlaying: false })));
      setMasterPlaying(false);
    } else {
      // Resume the first one or keep previous
      setSounds(sounds.map((s, idx) => idx === 0 ? { ...s, isPlaying: true } : s));
      setMasterPlaying(true);
    }
  };

  // --- Pomodoro Study Companion States ---
  const [timeLeft, setTimeLeft] = useState(1500); // 25 mins
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerPreset, setTimerPreset] = useState<'study' | 'short-break' | 'long-break'>('study');
  const [completedCycles, setCompletedCycles] = useState(0);

  useEffect(() => {
    let interval: any = null;
    if (timerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && timerRunning) {
      setTimerRunning(false);
      setCompletedCycles(prev => prev + 1);
      alert('🌟 Focus Interval Completed! Time to take a mindful breather.');
    }
    return () => clearInterval(interval);
  }, [timerRunning, timeLeft]);

  const selectPreset = (type: 'study' | 'short-break' | 'long-break') => {
    setTimerPreset(type);
    setTimerRunning(false);
    if (type === 'study') {
      setTimeLeft(1500); // 25 min
    } else if (type === 'short-break') {
      setTimeLeft(300); // 5 min
    } else if (type === 'long-break') {
      setTimeLeft(900); // 15 min
    }
  };

  const toggleTimer = () => {
    setTimerRunning(!timerRunning);
  };

  const resetTimer = () => {
    setTimerRunning(false);
    selectPreset(timerPreset);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = () => {
    const total = timerPreset === 'study' ? 1500 : timerPreset === 'short-break' ? 300 : 900;
    return ((total - timeLeft) / total) * 100;
  };

  return (
    <div className="bg-white border border-outline p-6 md:p-8 space-y-8 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline pb-5">
        <div>
          <span className="font-mono text-[9px] text-secondary font-bold uppercase tracking-widest block">Study Companion &amp; Focus Oasis</span>
          <h2 className="font-serif text-2xl font-medium text-primary tracking-tight">The Calm Corner</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[9px] uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5 bg-[#fcf8f2] border border-outline px-3 py-1 font-bold text-secondary">
            <Music className="w-3.5 h-3.5" /> Ambient Focus Active
          </span>
        </div>
      </div>

      <p className="text-xs text-on-surface-variant leading-relaxed max-w-2xl">
        Feeling high stress from school applications or upcoming chemistry exams? Mix gentle background noise, play peaceful simulated beats, or start a structured Pomodoro study session. Designed to maintain focus and alleviate brain fatigue.
      </p>

      {/* Grid: 2 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Pomodoro Focus Timer (7 columns) */}
        <div className="lg:col-span-7 border border-outline p-6 space-y-6 flex flex-col justify-between min-h-[380px] bg-white">
          <div className="flex items-center justify-between border-b border-outline/30 pb-3">
            <div className="flex items-center gap-2">
              <Timer className="w-4.5 h-4.5 text-secondary" />
              <h3 className="font-serif text-sm font-bold text-primary">Task Focus &amp; Breathing Companion</h3>
            </div>
            <span className="font-mono text-[8px] uppercase tracking-widest bg-surface-dim px-2 py-0.5 border text-on-surface-variant">
              Cycles Finished: {completedCycles}
            </span>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-around gap-6 py-4">
            
            {/* Visual Timer Progress wheel (represented beautifully with SVG and circular path) */}
            <div className="relative w-44 h-44 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle 
                  cx="88" 
                  cy="88" 
                  r="75" 
                  className="stroke-outline/40 fill-transparent stroke-2" 
                />
                <circle 
                  cx="88" 
                  cy="88" 
                  r="75" 
                  className="stroke-secondary fill-transparent stroke-3 transition-all duration-1000" 
                  strokeDasharray="471"
                  strokeDashoffset={471 - (471 * progressPercentage()) / 100}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center space-y-1">
                <span className="font-mono text-[8px] uppercase tracking-widest text-on-surface-variant font-bold">
                  {timerPreset === 'study' && 'Study Deeply'}
                  {timerPreset === 'short-break' && 'Take A Breath'}
                  {timerPreset === 'long-break' && 'Walk / Hydrate'}
                </span>
                <span className="font-serif text-3xl font-extrabold text-primary">
                  {formatTime(timeLeft)}
                </span>
                <span className="font-mono text-[8px] text-emerald-600 font-bold uppercase flex items-center gap-1">
                  {timerRunning ? '● FOCUS STATE' : 'PAUSED'}
                </span>
              </div>
            </div>

            {/* Presets Column */}
            <div className="flex flex-col gap-2 w-full md:w-auto">
              <button
                onClick={() => selectPreset('study')}
                className={`px-4 py-2 text-left font-mono text-[9px] uppercase tracking-widest border transition-all flex items-center gap-2 cursor-pointer ${
                  timerPreset === 'study'
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white border-outline text-on-surface-variant hover:bg-surface-dim'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 shrink-0" />
                <span>25m Exam Study</span>
              </button>
              <button
                onClick={() => selectPreset('short-break')}
                className={`px-4 py-2 text-left font-mono text-[9px] uppercase tracking-widest border transition-all flex items-center gap-2 cursor-pointer ${
                  timerPreset === 'short-break'
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white border-outline text-on-surface-variant hover:bg-surface-dim'
                }`}
              >
                <Coffee className="w-3.5 h-3.5 shrink-0" />
                <span>5m Mini-Breather</span>
              </button>
              <button
                onClick={() => selectPreset('long-break')}
                className={`px-4 py-2 text-left font-mono text-[9px] uppercase tracking-widest border transition-all flex items-center gap-2 cursor-pointer ${
                  timerPreset === 'long-break'
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white border-outline text-on-surface-variant hover:bg-surface-dim'
                }`}
              >
                <Compass className="w-3.5 h-3.5 shrink-0" />
                <span>15m Mindful Walk</span>
              </button>
            </div>

          </div>

          {/* Core Timer Controls */}
          <div className="flex gap-3 justify-center">
            <button
              onClick={toggleTimer}
              className="bg-primary hover:bg-primary/95 text-white h-11 px-8 font-mono text-[10px] uppercase tracking-wider font-bold cursor-pointer transition-all flex items-center gap-2"
            >
              {timerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{timerRunning ? 'Pause Session' : 'Begin Focus'}</span>
            </button>
            
            <button
              onClick={resetTimer}
              className="bg-transparent hover:bg-surface-dim text-primary border border-primary h-11 px-6 font-mono text-[10px] uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

        </div>

        {/* Right: Ambient Soundscape Mixer (5 columns) */}
        <div className="lg:col-span-5 border border-outline p-6 space-y-6 min-h-[380px] bg-[#fcf8f2]">
          
          <div className="flex items-center justify-between border-b border-outline/30 pb-3">
            <div className="flex items-center gap-2">
              <Music className="w-4.5 h-4.5 text-secondary" />
              <h3 className="font-serif text-sm font-bold text-primary">Custom Soundscape Mixer</h3>
            </div>
            
            <button
              onClick={toggleMaster}
              className={`p-1.5 border transition-all cursor-pointer ${
                masterPlaying 
                ? 'bg-secondary text-white border-secondary' 
                : 'bg-white border-outline text-on-surface-variant hover:bg-surface-dim'
              }`}
              title="Toggle Master Sound"
            >
              {masterPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>

          <p className="text-[10px] text-on-surface-variant font-mono uppercase tracking-wide leading-relaxed">
            Mix multiple ambient signals together. Slide to set your ideal workspace texture:
          </p>

          <div className="space-y-4 pt-1">
            {sounds.map((sound) => {
              const IconComp = sound.icon;
              return (
                <div key={sound.id} className="bg-white p-3.5 border border-outline space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 border ${sound.isPlaying ? 'bg-secondary/15 border-secondary text-secondary' : 'bg-surface-dim border-outline text-on-surface-variant'}`}>
                        <IconComp className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-serif text-xs font-bold text-primary leading-none">{sound.name}</p>
                        <p className="text-[9px] text-on-surface-variant mt-0.5 leading-none">{sound.description}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleSound(sound.id)}
                      className={`px-3 py-1 font-mono text-[8px] uppercase tracking-wider border cursor-pointer transition-all ${
                        sound.isPlaying
                        ? 'bg-primary text-white border-primary'
                        : 'bg-white border-outline text-on-surface-variant hover:bg-surface-dim'
                      }`}
                    >
                      {sound.isPlaying ? 'Mute' : 'Play'}
                    </button>
                  </div>

                  {/* Volume slider */}
                  <div className="flex items-center gap-2 pt-1">
                    <Volume2 className="w-3.5 h-3.5 text-on-surface-variant shrink-0" />
                    <input 
                      type="range"
                      min="0"
                      max="100"
                      value={sound.volume}
                      disabled={!sound.isPlaying}
                      onChange={(e) => handleVolumeChange(sound.id, parseInt(e.target.value))}
                      className="w-full accent-secondary h-1 bg-surface-dim border border-outline/40 cursor-pointer disabled:opacity-30" 
                    />
                    <span className="font-mono text-[9px] text-on-surface-variant min-w-[20px] text-right">
                      {sound.isPlaying ? `${sound.volume}%` : 'Off'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sound wave simulation animation if any sound is playing */}
          {masterPlaying && (
            <div className="bg-white border border-outline p-3 flex items-center justify-center gap-1.5 py-4">
              <span className="font-mono text-[8px] text-secondary font-bold uppercase tracking-widest mr-2">Vibe Wave:</span>
              <div className="w-1.5 h-6 bg-secondary animate-pulse rounded-full" style={{ animationDelay: '0.1s' }} />
              <div className="w-1.5 h-10 bg-secondary animate-pulse rounded-full" style={{ animationDelay: '0.3s' }} />
              <div className="w-1.5 h-8 bg-secondary animate-pulse rounded-full" style={{ animationDelay: '0.5s' }} />
              <div className="w-1.5 h-12 bg-secondary animate-pulse rounded-full" style={{ animationDelay: '0.2s' }} />
              <div className="w-1.5 h-5 bg-secondary animate-pulse rounded-full" style={{ animationDelay: '0.4s' }} />
              <div className="w-1.5 h-9 bg-secondary animate-pulse rounded-full" style={{ animationDelay: '0.6s' }} />
            </div>
          )}

        </div>

      </div>

      {/* Footer advice */}
      <div className="p-4 bg-surface-dim/40 border border-outline flex gap-3.5 items-start text-xs text-on-surface-variant leading-relaxed font-sans">
        <Sparkles className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-mono text-[8px] uppercase tracking-widest font-bold">Scientific Context</p>
          <p className="text-[11px]">
            Studies show combining stable auditory tracks (like simulated brown noise or low-bpm tempos) with a 25-minute Pomodoro protocol prevents executive dysfunction paralysis, reduces task avoidance, and triggers the brain's prefrontal cortex to process academic information comfortably.
          </p>
        </div>
      </div>

    </div>
  );
}
