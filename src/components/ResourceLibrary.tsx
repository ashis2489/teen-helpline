import React, { useState } from 'react';
import { 
  BookOpen, 
  Video, 
  Layers, 
  Search, 
  ExternalLink, 
  Heart, 
  Compass, 
  Briefcase, 
  Play, 
  GraduationCap, 
  Sparkles, 
  Bookmark, 
  HelpCircle,
  ThumbsUp,
  Clock,
  ArrowUpRight
} from 'lucide-react';

interface ResourceItem {
  id: string;
  category: 'mental-health' | 'career-guidance' | 'academic-wellness';
  type: 'article' | 'video' | 'toolkit';
  title: string;
  description: string;
  durationOrLength: string;
  tags: string[];
  author: string;
  contentMarkdown?: string;
  linkText?: string;
  videoDuration?: string;
  stepsCount?: number;
}

export default function ResourceLibrary() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'mental-health' | 'career-guidance' | 'academic-wellness'>('all');
  const [activeType, setActiveType] = useState<'all' | 'article' | 'video' | 'toolkit'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResource, setSelectedResource] = useState<ResourceItem | null>(null);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [helpfulCounts, setHelpfulCounts] = useState<Record<string, number>>({});

  const resources: ResourceItem[] = [
    {
      id: 'res-1',
      category: 'mental-health',
      type: 'article',
      title: 'De-escalating Panic & Chest Tightness in under 2 minutes',
      description: 'A neurological guide on how to interrupt the body\'s fight-or-flight feedback loop during panic attacks using vagus nerve stimulation.',
      durationOrLength: '3 min read',
      tags: ['Anxiety', 'Grounding', 'Nervous System'],
      author: 'Dr. Sarah Jenkins, Adolescent Specialist',
      contentMarkdown: 'Panic attacks triggers our sympathetic nervous system, leading to high heart rates and shallow chest breathing. Here is how to override this manually:\n\n1. Cold Shock Reset: Splash ice-cold water on your eyes and cheeks. This triggers the mammalian dive reflex, immediately lowering your pulse rate.\n2. Exhale Lengthening: Inhale for a count of 4, but exhale through pursed lips for a count of 8. Your exhale must be twice as long as the inhale to activate the vag parasympathetic break.\n3. Dynamic Resonator: Place one warm hand on your chest and hum low tones. The vibration stimulates the vagus nerve directly behind your throat.'
    },
    {
      id: 'res-2',
      category: 'mental-health',
      type: 'video',
      title: 'Mindful Morning Walkthrough: 5-Minute Audio Guide',
      description: 'An immersive video walk designed to establish mental clarity and release high cortisol levels before entering your exam center.',
      durationOrLength: '5:00 min video',
      videoDuration: '5:00',
      tags: ['Walkthrough', 'Exam Stress', 'Mindfulness'],
      author: 'Maya Patel, Wellness Facilitator'
    },
    {
      id: 'res-3',
      category: 'career-guidance',
      type: 'toolkit',
      title: 'The Modern Developer Portfolio Blueprint',
      description: 'The precise sections, code examples, and layouts required to showcase your bootcamp or hobby software projects to tech recruiters.',
      durationOrLength: '5 Step Checklist',
      stepsCount: 5,
      tags: ['Coding Bootcamp', 'Portfolio', 'Web Dev'],
      author: 'Marcus Thorne, STEM Pathways Advisor',
      contentMarkdown: 'A tech portfolio should be a clean single-view application, not a massive novel. Build this minimal roadmap:\n\n1. The 10-Second Pitch: A single display typography headline declaring what you build (e.g. "I build real-time responsive analytics tools").\n2. The Core Stack: Highlight exactly 4-5 technologies you are highly proficient in. Avoid placing standard generic icons for dozens of packages.\n3. The Case Study: Instead of generic repositories, document ONE complex project. Write down the problem, your architecture decisions, and the performance outcome.'
    },
    {
      id: 'res-4',
      category: 'academic-wellness',
      type: 'article',
      title: 'Strategic Task Chunking for College Applications',
      description: 'How to break down confusing university portal requirements into low-friction daily micro-sprints to bypass severe task avoidance.',
      durationOrLength: '4 min read',
      tags: ['College Prep', 'Organization', 'Burnout'],
      author: 'Jordan Rivera, College Admissions Counselor',
      contentMarkdown: 'The primary cause of college prep avoidance is structural scale. To fix this:\n\n1. Establish One Action Item: Never write "Work on college application" on your list. Write "Find the email of the reference counselor".\n2. Maintain a Daily 15m Sprint: Set a timer for 15 minutes. Stop work when the alarm sounds. This prevents exhaustion loops and builds high self-worth habits.'
    },
    {
      id: 'res-5',
      category: 'career-guidance',
      type: 'video',
      title: 'Tech Bootcamps vs. CS Majors: An Objective Breakdown',
      description: 'A comprehensive video guide comparing cost, timelines, employment success, and curricula differences between colleges and skill bootcamps.',
      durationOrLength: '8:45 min video',
      videoDuration: '8:45',
      tags: ['CS Degree', 'STEM Careers', 'Bootcamps'],
      author: 'David Chen, Software Engineer & Mentor'
    },
    {
      id: 'res-6',
      category: 'academic-wellness',
      type: 'toolkit',
      title: 'Exam Anxiety Relief Pack',
      description: 'An interactive, step-by-step workbook of self-care techniques to practice during the 48 hours leading up to a major grade evaluation.',
      durationOrLength: '4 Step Toolkit',
      stepsCount: 4,
      tags: ['Study Prep', 'Anxiety Relief', 'Self-Care'],
      author: 'Dr. Sarah Jenkins, Adolescent Specialist',
      contentMarkdown: 'Establish this standard checklist 48 hours prior to an exam:\n\n1. Study Mute: Put away books 12 hours before the exam. Cramming at the final hour scrambles prefrontal memory consolidation.\n2. The Oxygen Cycle: Do 3 rounds of box breathing right before turning over your paper.\n3. Secure Affirmation: Write down on your scratchpad: "My human worth is not defined by this exam grade." This lowers adrenaline spikes immediately.'
    }
  ];

  const toggleBookmark = (id: string) => {
    if (bookmarks.includes(id)) {
      setBookmarks(bookmarks.filter(b => b !== id));
    } else {
      setBookmarks([...bookmarks, id]);
    }
  };

  const incrementHelpful = (id: string) => {
    setHelpfulCounts(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const filteredResources = resources.filter(res => {
    const matchesCategory = activeCategory === 'all' || res.category === activeCategory;
    const matchesType = activeType === 'all' || res.type === activeType;
    const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          res.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesType && matchesSearch;
  });

  return (
    <div className="bg-white border border-outline p-6 md:p-8 space-y-8 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline pb-5">
        <div>
          <span className="font-mono text-[9px] text-secondary font-bold uppercase tracking-widest block">Independent Learning Center</span>
          <h2 className="font-serif text-2xl font-medium text-primary tracking-tight">Resource Library &amp; Video Capsules</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[9px] uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5 bg-[#fcf8f2] border border-outline px-3 py-1 font-bold text-secondary">
            <Bookmark className="w-3.5 h-3.5" /> Bookmarks ({bookmarks.length})
          </span>
        </div>
      </div>

      <p className="text-xs text-on-surface-variant leading-relaxed max-w-2xl">
        Explore curated video walkthroughs, step-by-step coping toolkits, and structured academic career articles. Filter by your preferred stage or search specific keywords.
      </p>

      {/* Filter and Search Bar */}
      <div className="bg-[#fcf8f2] border border-outline p-4 space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-on-surface-variant/75" />
            <input
              type="text"
              placeholder="Search by keywords (e.g., anxiety, coding, exam)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-outline pl-9 pr-4 py-2 text-xs focus:outline-none"
            />
          </div>

          {/* Type filters */}
          <div className="flex gap-1.5 overflow-x-auto scrollbar-none shrink-0">
            {(['all', 'article', 'video', 'toolkit'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={`px-3 py-1.5 font-mono text-[9px] uppercase tracking-wider border cursor-pointer transition-all ${
                  activeType === type
                  ? 'bg-primary text-white border-primary font-bold'
                  : 'bg-white border-outline text-on-surface-variant hover:bg-surface-dim'
                }`}
              >
                {type === 'all' ? 'All Formats' : type}
              </button>
            ))}
          </div>

        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {(['all', 'mental-health', 'career-guidance', 'academic-wellness'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 text-xs font-serif border cursor-pointer transition-all ${
                activeCategory === cat
                ? 'bg-secondary text-white border-secondary font-bold'
                : 'bg-white border-outline text-primary hover:bg-surface-dim'
              }`}
            >
              {cat === 'all' && '🌐 All Topics'}
              {cat === 'mental-health' && '🧠 Mental Health & Grounding'}
              {cat === 'career-guidance' && '💼 CS Careers & Bootcamps'}
              {cat === 'academic-wellness' && '📚 College Admissions & Prep'}
            </button>
          ))}
        </div>
      </div>

      {/* Core Body Container */}
      {!selectedResource ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((res) => {
            const isBookmarked = bookmarks.includes(res.id);
            return (
              <div 
                key={res.id}
                className="bg-white border border-outline hover:border-secondary hover:shadow-xs transition-all p-5 flex flex-col justify-between gap-5 relative group"
              >
                <div className="space-y-3.5">
                  <div className="flex justify-between items-center text-[8px] font-mono uppercase tracking-wider">
                    <span className="bg-surface-dim border border-outline/60 text-primary px-2 py-0.5 font-bold">
                      {res.type}
                    </span>
                    <span className="text-on-surface-variant flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {res.durationOrLength}
                    </span>
                  </div>

                  <h3 className="font-serif text-base font-bold text-primary group-hover:text-secondary transition-colors line-clamp-2">
                    {res.title}
                  </h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed font-sans line-clamp-3">
                    {res.description}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {res.tags.map(t => (
                      <span key={t} className="font-mono text-[7px] uppercase tracking-wide bg-[#fcf8f2] border border-outline px-1.5 py-0.5 text-secondary">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-outline/30 pt-3 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedResource(res)}
                    className="text-primary hover:text-secondary font-mono text-[9px] uppercase tracking-wider font-extrabold flex items-center gap-1 cursor-pointer"
                  >
                    {res.type === 'video' ? (
                      <>
                        <Play className="w-3.5 h-3.5" /> Play Video Capsule
                      </>
                    ) : (
                      <>
                        <BookOpen className="w-3.5 h-3.5" /> View Resource
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => toggleBookmark(res.id)}
                      className={`p-1.5 border transition-all cursor-pointer ${
                        isBookmarked 
                        ? 'bg-secondary/15 border-secondary text-secondary' 
                        : 'bg-white border-outline text-on-surface-variant hover:bg-surface-dim'
                      }`}
                      title="Bookmark Resource"
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-secondary' : ''}`} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredResources.length === 0 && (
            <div className="col-span-full border border-outline p-12 text-center text-on-surface-variant text-xs italic">
              No learning resources found matching your active filters. Try resetting search fields above.
            </div>
          )}
        </div>
      ) : (
        /* Expanded Reader/Video Panel */
        <div className="bg-[#fcf8f2]/30 border border-outline p-6 md:p-8 space-y-6 animate-in fade-in duration-300">
          <button 
            onClick={() => setSelectedResource(null)}
            className="font-mono text-[9px] uppercase tracking-wider text-secondary hover:text-primary cursor-pointer flex items-center gap-1.5"
          >
            ← Back to Resource Library
          </button>

          {/* Details */}
          <div className="space-y-3.5 border-b border-outline pb-5">
            <div className="flex flex-wrap items-center gap-2 text-[9px] font-mono uppercase tracking-wider">
              <span className="bg-primary text-white px-2 py-0.5 font-bold">{selectedResource.type}</span>
              <span className="bg-white border border-outline text-secondary px-2 py-0.5 font-bold">
                {selectedResource.category.replace('-', ' ')}
              </span>
              <span className="text-on-surface-variant">• {selectedResource.durationOrLength}</span>
            </div>

            <h3 className="font-serif text-2xl font-medium text-primary">
              {selectedResource.title}
            </h3>
            <p className="text-xs text-on-surface-variant font-sans italic leading-relaxed">
              Curated by: {selectedResource.author}
            </p>
          </div>

          {/* Content Box */}
          {selectedResource.type === 'video' ? (
            <div className="space-y-4">
              {/* Interactive Audio/Video Capsule Player Interface */}
              <div className="aspect-video max-w-2xl mx-auto bg-primary border border-outline flex flex-col justify-between p-6 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-radial from-secondary/25 to-primary/80 z-0" />
                
                <div className="flex justify-between items-center relative z-10">
                  <span className="font-mono text-[8px] uppercase tracking-widest text-secondary bg-white px-2.5 py-0.5 border text-primary font-bold">
                    Interactive Video Capsule
                  </span>
                  <span className="font-mono text-[9px] text-white/80">{selectedResource.videoDuration}</span>
                </div>

                <div className="flex flex-col items-center justify-center space-y-4 py-8 relative z-10 text-center">
                  <div className="w-16 h-16 rounded-full border-2 border-secondary bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center cursor-pointer">
                    <Play className="w-8 h-8 text-secondary fill-secondary ml-1" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-serif text-base font-bold text-white">{selectedResource.title}</p>
                    <p className="font-sans text-xs text-white/70">Press to launch simulated interactive play</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 relative z-10 w-full">
                  <span className="font-mono text-[8px] text-white/60">0:00</span>
                  <div className="flex-1 h-1 bg-white/20 relative">
                    <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-secondary" />
                  </div>
                  <span className="font-mono text-[8px] text-white/60">{selectedResource.videoDuration}</span>
                </div>
              </div>
              <p className="text-xs text-on-surface-variant text-center leading-relaxed font-sans max-w-lg mx-auto">
                This media capsule features clear voiceover and high-contrast visuals, demonstrating proper breath pacing and mental planning sequences. Press play to start.
              </p>
            </div>
          ) : (
            <div className="bg-white border border-outline p-6 md:p-8 space-y-6">
              <div className="whitespace-pre-line text-xs text-primary leading-relaxed font-sans">
                {selectedResource.contentMarkdown}
              </div>
            </div>
          )}

          {/* Helpful trigger and action buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-outline/50 pt-5">
            <div className="flex items-center gap-2">
              <button
                onClick={() => incrementHelpful(selectedResource.id)}
                className="bg-white border border-outline hover:border-primary px-4 py-2 font-mono text-[9px] uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 text-primary"
              >
                <ThumbsUp className="w-3.5 h-3.5 text-secondary" />
                <span>Helpful ({helpfulCounts[selectedResource.id] || 0})</span>
              </button>

              <button
                onClick={() => toggleBookmark(selectedResource.id)}
                className="bg-white border border-outline hover:border-primary px-4 py-2 font-mono text-[9px] uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 text-primary"
              >
                <Bookmark className={`w-3.5 h-3.5 text-secondary ${bookmarks.includes(selectedResource.id) ? 'fill-secondary' : ''}`} />
                <span>{bookmarks.includes(selectedResource.id) ? 'Bookmarked' : 'Save Resource'}</span>
              </button>
            </div>

            <button
              onClick={() => setSelectedResource(null)}
              className="bg-primary hover:bg-primary/95 text-white h-10 px-6 font-mono text-[9px] uppercase tracking-wider cursor-pointer font-bold flex items-center gap-2 self-start"
            >
              Finished Reading
            </button>
          </div>
        </div>
      )}

      {/* Bottom Advice Banner */}
      <div className="bg-[#fcf8f2] border border-outline p-5 flex flex-col md:flex-row items-center gap-5 justify-between">
        <div className="space-y-1.5 max-w-lg">
          <h4 className="font-serif text-sm font-bold text-primary flex items-center gap-1.5">
            <Sparkles className="w-4.5 h-4.5 text-secondary" />
            Empathetic Guidance Note
          </h4>
          <p className="text-[11px] text-on-surface-variant leading-relaxed">
            All educational resources are authored and vetted by clinical adolescent health counselors and certified high school academic career experts to ensure compliance with student safety protocols.
          </p>
        </div>
      </div>

    </div>
  );
}
