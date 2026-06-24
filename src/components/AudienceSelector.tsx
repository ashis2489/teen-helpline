import React from 'react';
import { 
  Sparkles, 
  Baby, 
  BookOpen, 
  GraduationCap, 
  HeartHandshake, 
  Globe, 
  Check, 
  Info,
  ShieldCheck
} from 'lucide-react';
import { AudienceMode } from '../types';

interface AudienceSelectorProps {
  currentMode: AudienceMode;
  onModeChange: (mode: AudienceMode) => void;
  variant?: 'floating' | 'banner' | 'embedded';
}

export default function AudienceSelector({ currentMode, onModeChange, variant = 'floating' }: AudienceSelectorProps) {
  const options = [
    {
      id: 'all' as AudienceMode,
      title: 'Global Teen',
      emoji: '🌐',
      icon: Globe,
      description: 'Standard safe view with standard guides, habits, and advisor recommendations.',
      bgColor: 'bg-slate-50',
      activeColor: 'bg-primary text-white border-primary',
      accentColor: 'text-primary'
    },
    {
      id: 'early' as AudienceMode,
      title: 'Early Teens (13-14)',
      emoji: '🐣',
      icon: Baby,
      description: 'Focusing on school transitions, identity, early hobbies, and safe friendship circles.',
      bgColor: 'bg-rose-50/50',
      activeColor: 'bg-rose-700 text-white border-rose-700',
      accentColor: 'text-rose-600'
    },
    {
      id: 'mid' as AudienceMode,
      title: 'Mid Teens (15-16)',
      emoji: '🎒',
      icon: BookOpen,
      description: 'Focusing on heavy exam stress, study routines, peer relationships, and body wellness.',
      bgColor: 'bg-amber-50/50',
      activeColor: 'bg-amber-700 text-white border-amber-700',
      accentColor: 'text-amber-600'
    },
    {
      id: 'late' as AudienceMode,
      title: 'Late Teens (17-19)',
      emoji: '🎓',
      icon: GraduationCap,
      description: 'Focusing on university applications, STEM career directions, coding bootcamps, and resume builds.',
      bgColor: 'bg-[#fcf8f2]',
      activeColor: 'bg-secondary text-white border-secondary',
      accentColor: 'text-secondary'
    },
    {
      id: 'parent' as AudienceMode,
      title: 'Parents & Supporters',
      emoji: '👥',
      icon: HeartHandshake,
      description: 'Guiding parents on non-confrontational listening, school stress relief, and teen privacy safety.',
      bgColor: 'bg-emerald-50/50',
      activeColor: 'bg-emerald-700 text-white border-emerald-700',
      accentColor: 'text-emerald-600'
    }
  ];

  if (variant === 'floating') {
    return (
      <div className="bg-[#fcf8f2] border border-outline p-4 md:p-5 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-secondary animate-spin-slow" />
            <h4 className="font-serif text-xs font-bold text-primary tracking-tight uppercase">Customizer: Select Your Audience Stage</h4>
          </div>
          <span className="font-mono text-[8px] uppercase tracking-wider text-on-surface-variant flex items-center gap-1 bg-white px-2 py-0.5 border border-outline">
            <ShieldCheck className="w-3 h-3 text-secondary" /> Instant Adapt
          </span>
        </div>
        
        <p className="text-[10px] text-on-surface-variant leading-relaxed font-sans">
          Our helpline platform customizes its daily habits tracker, articles, coping exercises, and advisor recommendations to match your specific profile stage.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {options.map((opt) => {
            const IconComp = opt.icon;
            const isSelected = currentMode === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => onModeChange(opt.id)}
                className={`p-2 border.5 border text-left transition-all cursor-pointer flex flex-col justify-between gap-1 select-none ${
                  isSelected 
                  ? opt.activeColor + ' shadow-xs ring-1 ring-offset-1 ring-secondary/30' 
                  : 'bg-white border-outline text-primary hover:bg-surface-dim'
                }`}
              >
                <div className="flex justify-between items-center w-full">
                  <span className="text-sm leading-none">{opt.emoji}</span>
                  {isSelected && <Check className="w-3 h-3 text-white fill-white" />}
                </div>
                <div className="space-y-0.5 pt-1">
                  <p className="font-serif text-[10px] font-bold leading-none">{opt.title.split(' ')[0]} {opt.title.split(' ')[1] || ''}</p>
                  <p className="font-mono text-[7px] uppercase tracking-wide leading-none opacity-80">
                    {opt.id === 'all' ? 'Standard' : opt.id === 'parent' ? 'Mentor' : 'Teen Stage'}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Mode Summary */}
        <div className="bg-white p-2.5 border border-outline flex gap-2.5 items-start text-[10px] text-on-surface-variant leading-normal">
          <Info className="w-3.5 h-3.5 text-secondary shrink-0 mt-0.5" />
          <span>
            <strong>Active Target Adaptation:</strong> {options.find(o => o.id === currentMode)?.description}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-outline p-6 space-y-5 bg-white">
      <div className="space-y-1">
        <span className="font-mono text-[9px] uppercase tracking-widest text-secondary font-bold block">Dynamic Personalization Engine</span>
        <h3 className="font-serif text-lg font-bold text-primary">Customize website for your stage</h3>
        <p className="text-xs text-on-surface-variant leading-relaxed">
          Select who is using the website. We immediately adjust advice tags, recommended tools, and counselor tags.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {options.map((opt) => {
          const isSelected = currentMode === opt.id;
          return (
            <div
              key={opt.id}
              onClick={() => onModeChange(opt.id)}
              className={`p-4 border transition-all cursor-pointer flex flex-col justify-between gap-4 select-none ${
                isSelected 
                ? 'border-primary bg-[#fcf8f2] shadow-sm' 
                : 'border-outline bg-white hover:border-primary/50'
              }`}
            >
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xl">{opt.emoji}</span>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-primary bg-primary text-white' : 'border-outline'}`}>
                    {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                  </div>
                </div>
                <h4 className="font-serif text-xs font-bold text-primary">{opt.title}</h4>
                <p className="text-[10px] text-on-surface-variant leading-relaxed font-sans">
                  {opt.description}
                </p>
              </div>
              <span className={`font-mono text-[8px] uppercase tracking-wider font-bold ${opt.accentColor}`}>
                {isSelected ? '● Selected Mode' : 'Activate Stage'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
