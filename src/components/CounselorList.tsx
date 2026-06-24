import React, { useState } from 'react';
import { 
  Heart, 
  Search, 
  ArrowLeft, 
  ChevronRight, 
  Sparkles, 
  Compass, 
  Languages, 
  Award
} from 'lucide-react';
import { Counselor, AudienceMode } from '../types';
import { COUNSELORS } from '../data';

interface CounselorListProps {
  audienceMode: AudienceMode;
  onSelectCounselor: (counselor: Counselor) => void;
  onBackToDashboard: () => void;
}

export default function CounselorList({ audienceMode, onSelectCounselor, onBackToDashboard }: CounselorListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('All');

  const allTags = ['All', 'STEM Careers', 'University Prep', 'Humanities', 'Creative Arts', 'Medical', 'Study Abroad', 'Bootcamps'];

  const filteredCounselors = COUNSELORS.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTag = selectedTag === 'All' || c.tags.includes(selectedTag);
    
    return matchesSearch && matchesTag;
  });

  const isBestMatch = (c: Counselor) => {
    switch (audienceMode) {
      case 'early':
        return c.id === 'sarah-jenkins' || c.id === 'maya-patel';
      case 'mid':
        return c.id === 'david-chen' || c.id === 'sarah-jenkins';
      case 'late':
        return c.id === 'marcus-thorne' || c.id === 'jordan-rivera';
      case 'parent':
        return c.id === 'jordan-rivera';
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-background text-primary font-sans select-none">
      
      {/* Navigation Header */}
      <header className="bg-white/80 backdrop-blur-md h-20 border-b border-outline px-6 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBackToDashboard}
            className="w-9 h-9 bg-surface-dim border border-outline hover:bg-white flex items-center justify-center text-on-surface-variant transition-colors cursor-pointer"
            title="Go back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <span className="font-mono text-[9px] uppercase tracking-wider text-on-surface-variant">Step 1 of 3</span>
            <h1 className="font-serif text-lg font-medium text-primary leading-tight">Book an Advisor</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary flex items-center justify-center text-white">
            <Heart className="w-4 h-4 fill-white" />
          </div>
          <span className="font-serif text-lg font-medium text-primary hidden sm:inline">Teens Helpline</span>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-6 py-8 md:py-12 space-y-8">
        
        {/* Intro */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#fcf8f2] border border-outline text-secondary font-mono text-[9px] uppercase tracking-wider font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            Empathy-Led Mentorship
          </div>
          <h2 className="font-serif text-3xl font-medium text-primary tracking-tight">
            Find Your Safe Space
          </h2>
          <div className="w-12 h-px bg-secondary mx-auto my-2" />
          <p className="text-xs text-on-surface-variant leading-relaxed font-sans">
            Choose an empathetic mentor or peer expert who shares your interests or has navigated the pathways you're exploring. All conversations are private and supportive.
          </p>
        </div>

        {/* Filters and Search panel */}
        <div className="bg-white p-6 border border-outline space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-on-surface-variant absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search advisor specialties, interests, or background..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-background pl-11 pr-4 py-3 rounded-none text-xs border border-outline focus:outline-none focus:border-primary font-mono"
            />
          </div>

          {/* Filtering Chips */}
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 font-mono text-[10px] uppercase tracking-wider transition-all cursor-pointer ${
                  selectedTag === tag 
                  ? 'bg-primary text-white border border-primary' 
                  : 'bg-white border border-outline text-on-surface-variant hover:bg-surface-dim'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Counselors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCounselors.length === 0 ? (
            <div className="col-span-full bg-white p-12 text-center border border-outline space-y-3">
              <Compass className="w-12 h-12 text-on-surface-variant/40 mx-auto" />
              <h3 className="font-serif text-lg font-medium text-primary">No counselors found</h3>
              <p className="text-xs text-on-surface-variant max-w-sm mx-auto leading-relaxed">
                Try modifying your search or changing the filter chip categories to find available advisors!
              </p>
            </div>
          ) : (
            filteredCounselors.map((counselor) => (
              <div 
                key={counselor.id}
                className="bg-white border border-outline hover:border-primary transition-all duration-300 p-6 flex flex-col justify-between gap-6 relative"
              >
                <div className="space-y-4">
                  {/* Avatar + Basic Details */}
                  <div className="flex gap-4 items-start">
                    <img 
                      className="w-16 h-16 rounded-full object-cover border border-outline shrink-0 filter contrast-105"
                      src={counselor.avatar}
                      referrerPolicy="no-referrer"
                      alt={counselor.name}
                    />
                    <div className="space-y-1">
                      {isBestMatch(counselor) && (
                        <div className="inline-block bg-rose-50 text-rose-700 text-[8px] font-mono uppercase tracking-widest font-extrabold px-2 py-0.5 border border-rose-200 mb-1.5 animate-pulse">
                          🎯 RECOMMENDED MATCH
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <h3 className="font-serif text-lg font-bold text-primary leading-none">{counselor.name}</h3>
                        <span className="text-[9px] font-mono tracking-widest bg-[#fcf8f2] border border-outline text-secondary px-1.5 py-0.5 uppercase font-bold">
                          ★ 4.9
                        </span>
                      </div>
                      <p className="font-mono text-[10px] uppercase tracking-wider text-secondary font-bold">{counselor.specialty}</p>
                      <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-on-surface-variant">
                        <Award className="w-3.5 h-3.5 text-secondary" />
                        <span>{counselor.experience}</span>
                      </div>
                    </div>
                  </div>

                  {/* Quote */}
                  <blockquote className="bg-background p-4 border-l-2 border-secondary text-xs text-on-surface-variant italic relative">
                    "{counselor.quote}"
                  </blockquote>

                  {/* Description text */}
                  <p className="text-xs text-on-surface-variant leading-relaxed font-sans">
                    {counselor.description}
                  </p>

                  {/* Tags and Languages */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {counselor.tags.map(t => (
                      <span key={t} className="text-[9px] font-mono uppercase tracking-wider bg-surface-dim text-on-surface-variant px-2 py-1 border border-outline">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-outline flex justify-between items-center gap-4">
                  <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-on-surface-variant">
                    <Languages className="w-3.5 h-3.5 text-secondary" />
                    <span>Speaks {counselor.languages.join(', ')}</span>
                  </div>

                  <button 
                    onClick={() => onSelectCounselor(counselor)}
                    className="bg-primary hover:bg-primary/95 text-white px-5 py-2.5 font-mono text-[10px] uppercase tracking-wider inline-flex items-center gap-1 transition-all"
                  >
                    Select 
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </main>
    </div>
  );
}
