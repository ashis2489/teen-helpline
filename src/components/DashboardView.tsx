import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Search, 
  Bell, 
  ArrowRight, 
  Brain, 
  Plus, 
  LogOut, 
  Compass, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  ShieldAlert, 
  Phone, 
  Calendar,
  MessageSquare,
  Smile,
  Music,
  BookOpen,
  PenTool,
  Award,
  Flame,
  Zap,
  Trophy,
  Sun,
  Moon,
  Users
} from 'lucide-react';
import { Counselor, BookingSession, Habit, AudienceMode } from '../types';
import { COUNSELORS } from '../data';

import MoodLogger from './MoodLogger';
import CopingToolkit from './CopingToolkit';
import CommunityBoard from './CommunityBoard';
import SafetyPrivacyGuide from './SafetyPrivacyGuide';
import CalmCorner from './CalmCorner';
import ReflectionJournal from './ReflectionJournal';
import LearnHub from './LearnHub';
import AudienceSelector from './AudienceSelector';
import ResourceLibrary from './ResourceLibrary';
import DailyJournal, { JournalEntry } from './DailyJournal';
import AnonymousMentorship from './AnonymousMentorship';

interface DashboardViewProps {
  audienceMode: AudienceMode;
  onAudienceChange: (mode: AudienceMode) => void;
  upcomingSessions: BookingSession[];
  onBookCounselor: () => void;
  onJoinSession: (session: BookingSession) => void;
  onLogout: () => void;
  onQuickHelp: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const HABITS_BY_MODE: Record<AudienceMode, Habit[]> = {
  all: [
    { id: 'all-1', text: 'Drink 8 glasses of water', completed: false },
    { id: 'all-2', text: 'Take a 10-minute mindful break', completed: false },
    { id: 'all-3', text: 'Log my daily headspace mood', completed: false }
  ],
  early: [
    { id: 'early-1', text: 'Spend 15m on a creative drawing or hobby', completed: false },
    { id: 'early-2', text: 'Write down one positive thing that happened today', completed: false },
    { id: 'early-3', text: 'Listen to a soothing soundtrack in Calm Corner', completed: false }
  ],
  mid: [
    { id: 'mid-1', text: 'Complete a 25-minute Pomodoro study sprint', completed: false },
    { id: 'mid-2', text: 'Do 5 minutes of focused deep breathing', completed: false },
    { id: 'mid-3', text: 'Check the Peer Advice board for helpful study tips', completed: false }
  ],
  late: [
    { id: 'late-1', text: 'Draft or edit one section of my resume', completed: false },
    { id: 'late-2', text: 'Explore one university portal or coding bootcamp options', completed: false },
    { id: 'late-3', text: 'Write down a 3-month career or study goals roadmap', completed: false }
  ],
  parent: [
    { id: 'parent-1', text: 'Ask your teenager an open-ended supportive question', completed: false },
    { id: 'parent-2', text: 'Practice 10 minutes of uninterrupted active listening', completed: false },
    { id: 'parent-3', text: 'Review the digital teen Safety & Privacy guidelines', completed: false }
  ]
};

export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconName: 'Flame' | 'PenTool' | 'MessageSquare' | 'Heart' | 'Zap' | 'Trophy';
  color: string;
  borderColor: string;
  badgeBg: string;
  criteria: string;
  unlocked: boolean;
  unlockedAt?: string;
}

const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_habit',
    title: 'Self-Care Starter',
    description: 'Completed your first daily self-care habit!',
    iconName: 'Zap',
    color: 'text-amber-600',
    borderColor: 'border-amber-200',
    badgeBg: 'bg-amber-50/70',
    criteria: 'Complete 1 daily habit',
    unlocked: false
  },
  {
    id: 'all_habits_completed',
    title: 'Streak Champion',
    description: 'Achieved 100% progress on your self-care checklist!',
    iconName: 'Flame',
    color: 'text-rose-600',
    borderColor: 'border-rose-200',
    badgeBg: 'bg-rose-50/70',
    criteria: 'Complete all daily habits',
    unlocked: false
  },
  {
    id: 'first_reflection',
    title: 'First Reflection',
    description: 'Logged your first micro-journal entry!',
    iconName: 'PenTool',
    color: 'text-emerald-600',
    borderColor: 'border-emerald-200',
    badgeBg: 'bg-emerald-50/70',
    criteria: 'Add 1 journal reflection',
    unlocked: false
  },
  {
    id: 'first_post',
    title: 'Priceless Thoughts',
    description: 'Shared your first anonymous community post!',
    iconName: 'MessageSquare',
    color: 'text-sky-600',
    borderColor: 'border-sky-200',
    badgeBg: 'bg-sky-50/70',
    criteria: 'Post 1 community thought',
    unlocked: false
  },
  {
    id: 'first_reply',
    title: 'Compassionate Peer',
    description: 'Left your first supportive reply to another peer!',
    iconName: 'Heart',
    color: 'text-purple-600',
    borderColor: 'border-purple-200',
    badgeBg: 'bg-purple-50/70',
    criteria: 'Reply to a community post',
    unlocked: false
  },
  {
    id: 'mindful_mastery',
    title: 'Mindful Mastery',
    description: 'Unlocked all other 5 active badges!',
    iconName: 'Trophy',
    color: 'text-yellow-600',
    borderColor: 'border-yellow-300',
    badgeBg: 'bg-yellow-50/80',
    criteria: 'Unlock 5 previous badges',
    unlocked: false
  }
];

export default function DashboardView({ 
  audienceMode,
  onAudienceChange,
  upcomingSessions, 
  onBookCounselor, 
  onJoinSession, 
  onLogout,
  onQuickHelp,
  theme,
  onToggleTheme
}: DashboardViewProps) {
  const [habits, setHabits] = useState<Habit[]>(HABITS_BY_MODE[audienceMode]);

  React.useEffect(() => {
    setHabits(HABITS_BY_MODE[audienceMode]);
  }, [audienceMode]);
  const [newHabitText, setNewHabitText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'portal' | 'mood' | 'toolkit' | 'forum' | 'safety' | 'calm' | 'reflection' | 'learn' | 'resources' | 'journal' | 'mentorship'>('portal');

  // Achievements State
  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    const saved = localStorage.getItem('mindful_achievements');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse achievements", e);
      }
    }
    return INITIAL_ACHIEVEMENTS;
  });

  const [celebrationBadge, setCelebrationBadge] = useState<Achievement | null>(null);

  // Save achievements to localStorage when updated
  useEffect(() => {
    localStorage.setItem('mindful_achievements', JSON.stringify(achievements));
  }, [achievements]);

  // Method to safely unlock badges and prompt a beautiful celebration modal/toast
  const unlockBadge = (badgeId: string) => {
    setAchievements(prev => {
      const existing = prev.find(a => a.id === badgeId);
      if (existing && !existing.unlocked) {
        const nowStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        const updated = prev.map(a => a.id === badgeId ? { ...a, unlocked: true, unlockedAt: nowStr } : a);
        
        // Trigger celebration
        setCelebrationBadge({ ...existing, unlocked: true, unlockedAt: nowStr });

        // Check if all OTHER badges are now unlocked to automatically trigger Mindful Mastery
        const otherBadgesUnlocked = updated.filter(a => a.id !== 'mindful_mastery' && a.unlocked).length;
        if (otherBadgesUnlocked === 5) {
          const mastery = updated.find(a => a.id === 'mindful_mastery');
          if (mastery && !mastery.unlocked) {
            // Also unlock Mindful Mastery after a slight delay
            setTimeout(() => {
              setAchievements(current => {
                const isMasteryAlreadyUnlocked = current.find(a => a.id === 'mindful_mastery')?.unlocked;
                if (isMasteryAlreadyUnlocked) return current;
                
                const finalStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                const final = current.map(a => a.id === 'mindful_mastery' ? { ...a, unlocked: true, unlockedAt: finalStr } : a);
                const updatedMastery = final.find(a => a.id === 'mindful_mastery');
                if (updatedMastery) {
                  setCelebrationBadge(updatedMastery);
                }
                return final;
              });
            }, 3000);
          }
        }
        return updated;
      }
      return prev;
    });
  };

  // Scan for automatic habit progress unlocks
  useEffect(() => {
    if (habits.some(h => h.completed)) {
      unlockBadge('first_habit');
    }
    if (habits.length > 0 && habits.every(h => h.completed)) {
      unlockBadge('all_habits_completed');
    }
  }, [habits]);

  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([
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

  // Scan for journal entries count
  useEffect(() => {
    // Since we seed 2 default journal entries, a length > 2 indicates the user logged their own entry
    if (journalEntries.length > 2) {
      unlockBadge('first_reflection');
    }
  }, [journalEntries]);

  const handleAddJournalEntry = (newEntry: JournalEntry) => {
    setJournalEntries([newEntry, ...journalEntries]);
  };

  const handleDeleteJournalEntry = (id: string) => {
    setJournalEntries(journalEntries.filter(entry => entry.id !== id));
  };

  // Quick exit handler
  const handleQuickExit = () => {
    window.location.href = 'https://www.google.com';
  };

  const getDashboardWelcomeContent = () => {
    switch (audienceMode) {
      case 'early':
        return {
          roleBadge: '🐣 Early Teen Mode (13-14)',
          headline: (
            <>
              Hey James! Finding your feet? <br />
              <span className="italic text-secondary font-serif font-bold">Explore & grow with us.</span>
            </>
          ),
          desc: 'High school transition, new friend circles, and daily headspaces are easier to talk about here. Log your moods, look at early teen guidance articles, and book confidential mentors who share your hobbies!'
        };
      case 'mid':
        return {
          roleBadge: '🎒 Mid Teen Mode (15-16)',
          headline: (
            <>
              Hey James! Crushing those study goals? <br />
              <span className="italic text-secondary font-serif font-bold">Manage exam pressure.</span>
            </>
          ),
          desc: 'School pressures, test anxiety, and general mental health are 100% normal. Build strong study habits with our micro-habit tracker, chill out in the Calm Corner, and get tips on the Peer advice board!'
        };
      case 'late':
        return {
          roleBadge: '🎓 College & Career Mode (17-19)',
          headline: (
            <>
              Hey James! Building your roadmap? <br />
              <span className="italic text-secondary font-serif font-bold">Plan college & bootcamps.</span>
            </>
          ),
          desc: 'Navigating coding bootcamps, resume formatting, university requirements, or searching for scholarships? Talk directly with senior university experts, use the study tracker, and prepare with the Learn Hub quizzes!'
        };
      case 'parent':
        return {
          roleBadge: '👥 Parent & Mentor Mode',
          headline: (
            <>
              Welcome Parent/Supporter! <br />
              <span className="italic text-secondary font-serif font-bold">Safe boundaries & active support.</span>
            </>
          ),
          desc: 'Access specialized counseling channels and parenting articles on speaking to teens, handling examination panic phases, and establishing empathetic safe habits. All guidelines are written by certified family experts.'
        };
      default:
        return {
          roleBadge: 'Welcome Student',
          headline: (
            <>
              Hey James! Feeling lost? <br />
              <span className="italic text-secondary font-serif font-bold">Choose your pathway</span> and let's work it out.
            </>
          ),
          desc: 'Connect with highly empathetic, certified advisors who specialize in adolescent health, university applications, study stress, and bootcamps. All sessions are 100% free and confidential.'
        };
    }
  };

  const welcome = getDashboardWelcomeContent();

  const toggleHabit = (id: string) => {
    setHabits(habits.map(h => h.id === id ? { ...h, completed: !h.completed } : h));
  };

  const handleAddHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHabitText.trim()) return;
    setHabits([...habits, { id: Date.now().toString(), text: newHabitText, completed: false }]);
    setNewHabitText('');
  };

  const completedCount = habits.filter(h => h.completed).length;
  const progressPercent = habits.length > 0 ? Math.round((completedCount / habits.length) * 100) : 0;

  // Filter counselors based on search query
  const filteredCounselors = COUNSELORS.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesTag = selectedTag ? c.tags.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  const allTags = Array.from(new Set(COUNSELORS.flatMap(c => c.tags)));

  return (
    <div className="min-h-screen bg-background flex text-primary font-sans overflow-x-hidden">
      
      {/* Sidebar - Persistent left column */}
      <aside className="w-72 bg-white border-r border-outline flex flex-col justify-between shrink-0 hidden lg:flex">
        <div className="p-6 space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary flex items-center justify-center text-white">
              <Heart className="w-5 h-5 fill-white" />
            </div>
            <span className="font-serif text-xl font-medium tracking-tight">Teens Helpline</span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <button 
              onClick={() => setActiveTab('portal')}
              className={`w-full flex items-center gap-3 px-4 py-2 text-left transition-all cursor-pointer border-l-2 font-mono text-[10px] uppercase tracking-wider ${
                activeTab === 'portal'
                ? 'bg-secondary/15 text-primary border-secondary font-bold'
                : 'text-on-surface-variant hover:bg-surface-dim border-transparent'
              }`}
            >
              <Brain className="w-4 h-4 text-secondary" />
              <span>My Portal</span>
            </button>
            <button 
              onClick={() => setActiveTab('mood')}
              className={`w-full flex items-center gap-3 px-4 py-2 text-left transition-all cursor-pointer border-l-2 font-mono text-[10px] uppercase tracking-wider ${
                activeTab === 'mood'
                ? 'bg-secondary/15 text-primary border-secondary font-bold'
                : 'text-on-surface-variant hover:bg-surface-dim border-transparent'
              }`}
            >
              <Smile className="w-4 h-4 text-secondary" />
              <span>Daily Headspace</span>
            </button>
            <button 
              onClick={() => setActiveTab('toolkit')}
              className={`w-full flex items-center gap-3 px-4 py-2 text-left transition-all cursor-pointer border-l-2 font-mono text-[10px] uppercase tracking-wider ${
                activeTab === 'toolkit'
                ? 'bg-secondary/15 text-primary border-secondary font-bold'
                : 'text-on-surface-variant hover:bg-surface-dim border-transparent'
              }`}
            >
              <Sparkles className="w-4 h-4 text-secondary" />
              <span>Coping Toolkit</span>
            </button>
            <button 
              onClick={() => setActiveTab('calm')}
              className={`w-full flex items-center gap-3 px-4 py-2 text-left transition-all cursor-pointer border-l-2 font-mono text-[10px] uppercase tracking-wider ${
                activeTab === 'calm'
                ? 'bg-secondary/15 text-primary border-secondary font-bold'
                : 'text-on-surface-variant hover:bg-surface-dim border-transparent'
              }`}
            >
              <Music className="w-4 h-4 text-secondary" />
              <span>The Calm Corner</span>
            </button>
            <button 
              onClick={() => setActiveTab('reflection')}
              className={`w-full flex items-center gap-3 px-4 py-2 text-left transition-all cursor-pointer border-l-2 font-mono text-[10px] uppercase tracking-wider ${
                activeTab === 'reflection'
                ? 'bg-secondary/15 text-primary border-secondary font-bold'
                : 'text-on-surface-variant hover:bg-surface-dim border-transparent'
              }`}
            >
              <BookOpen className="w-4 h-4 text-secondary" />
              <span>Reflection Journal</span>
            </button>
            <button 
              onClick={() => setActiveTab('journal')}
              className={`w-full flex items-center gap-3 px-4 py-2 text-left transition-all cursor-pointer border-l-2 font-mono text-[10px] uppercase tracking-wider ${
                activeTab === 'journal'
                ? 'bg-secondary/15 text-primary border-secondary font-bold'
                : 'text-on-surface-variant hover:bg-surface-dim border-transparent'
              }`}
            >
              <PenTool className="w-4 h-4 text-secondary" />
              <span>Daily Micro-Journal</span>
            </button>
            <button 
              onClick={() => setActiveTab('learn')}
              className={`w-full flex items-center gap-3 px-4 py-2 text-left transition-all cursor-pointer border-l-2 font-mono text-[10px] uppercase tracking-wider ${
                activeTab === 'learn'
                ? 'bg-secondary/15 text-primary border-secondary font-bold'
                : 'text-on-surface-variant hover:bg-surface-dim border-transparent'
              }`}
            >
              <Compass className="w-4 h-4 text-secondary" />
              <span>Learn Hub &amp; Quizzes</span>
            </button>
            <button 
              onClick={() => setActiveTab('resources')}
              className={`w-full flex items-center gap-3 px-4 py-2 text-left transition-all cursor-pointer border-l-2 font-mono text-[10px] uppercase tracking-wider ${
                activeTab === 'resources'
                ? 'bg-secondary/15 text-primary border-secondary font-bold'
                : 'text-on-surface-variant hover:bg-surface-dim border-transparent'
              }`}
            >
              <BookOpen className="w-4 h-4 text-secondary" />
              <span>Resource Library</span>
            </button>
            <button 
              onClick={() => setActiveTab('forum')}
              className={`w-full flex items-center gap-3 px-4 py-2 text-left transition-all cursor-pointer border-l-2 font-mono text-[10px] uppercase tracking-wider ${
                activeTab === 'forum'
                ? 'bg-secondary/15 text-primary border-secondary font-bold'
                : 'text-on-surface-variant hover:bg-surface-dim border-transparent'
              }`}
            >
              <MessageSquare className="w-4 h-4 text-secondary" />
              <span>Peer Advice Board</span>
            </button>
            <button 
              onClick={() => setActiveTab('mentorship')}
              className={`w-full flex items-center gap-3 px-4 py-2 text-left transition-all cursor-pointer border-l-2 font-mono text-[10px] uppercase tracking-wider ${
                activeTab === 'mentorship'
                ? 'bg-secondary/15 text-primary border-secondary font-bold'
                : 'text-on-surface-variant hover:bg-surface-dim border-transparent'
              }`}
            >
              <Users className="w-4 h-4 text-secondary" />
              <span>Anonymous Mentorship</span>
            </button>
            <button 
              onClick={() => setActiveTab('safety')}
              className={`w-full flex items-center gap-3 px-4 py-2 text-left transition-all cursor-pointer border-l-2 font-mono text-[10px] uppercase tracking-wider ${
                activeTab === 'safety'
                ? 'bg-secondary/15 text-primary border-secondary font-bold'
                : 'text-on-surface-variant hover:bg-surface-dim border-transparent'
              }`}
            >
              <ShieldAlert className="w-4 h-4 text-secondary" />
              <span>Privacy &amp; Safety FAQs</span>
            </button>

            <div className="pt-2 pb-1">
              <div className="h-px bg-outline/40 my-2 mx-4" />
            </div>

            <button 
              onClick={onBookCounselor}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-on-surface-variant hover:bg-surface-dim font-mono text-[10px] uppercase tracking-wider text-left transition-all cursor-pointer border-l-2 border-transparent"
            >
              <Calendar className="w-4 h-4 text-on-surface-variant" />
              <span>Book Counselor</span>
            </button>
            <button 
              onClick={onQuickHelp}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-error hover:bg-error-container/40 font-mono text-[10px] uppercase tracking-wider text-left transition-all cursor-pointer font-bold border-l-2 border-transparent"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Quick Help Lines</span>
            </button>
          </nav>
        </div>

        {/* User Card at the bottom of the sidebar */}
        <div className="p-6 border-t border-outline space-y-4 bg-surface-dim/40">
          <div className="flex items-center gap-3">
            <img 
              className="w-11 h-11 rounded-full object-cover border border-outline" 
              referrerPolicy="no-referrer"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1WTzyA6gxvPo_9p0BN5con1G1mBptm_PvhH3SqsRjwEtTknaY_7Qtnrwvrp04Aw47_PIBe8K_iiWWGjkPpEyLRAPJ9pqAcwVCjJYsCfTdAVMfr6XGmpFkjOlK1Mmsgn_h3ZZalxiyCAJGLdZe6le7huAOfBasexMCbJlghkAyHpcb7b6NzzX_9mZwS4Hwx80qs_vPeMZxIdj4MZ_p1VFKh7EoJdCfFqdIVj-4Zg2nWklqzl8_AIrWydl3sRogONSvDXuy3X7aw3jS"
              alt="James smiling avatar"
            />
            <div>
              <p className="font-serif text-sm font-bold">James, 17</p>
              <p className="font-mono text-[9px] uppercase tracking-wider text-on-surface-variant">Verified Student</p>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 h-9 border border-outline rounded-none font-mono text-[10px] uppercase tracking-wider hover:bg-white cursor-pointer transition-all text-on-surface-variant"
          >
            <LogOut className="w-3.5 h-3.5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        
        {/* Top Header */}
        <header className="bg-white/80 backdrop-blur-md h-20 border-b border-outline px-6 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-3 lg:hidden">
            <div className="w-8 h-8 bg-primary flex items-center justify-center text-white">
              <Heart className="w-4 h-4 fill-white" />
            </div>
            <span className="font-serif text-lg font-medium">Teens Helpline</span>
          </div>

          <div className="relative max-w-sm w-full hidden md:block">
            <Search className="w-4 h-4 text-on-surface-variant absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search counseling tags or names..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-background pl-9 pr-4 py-2 rounded-none text-xs border border-outline focus:outline-none focus:border-primary font-mono"
            />
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={onQuickHelp}
              className="bg-error hover:bg-error/95 text-white px-4 py-2.5 font-mono text-[10px] uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all"
            >
              <Phone className="w-3.5 h-3.5 fill-white" />
              Emergency 988
            </button>
            
            <button 
              onClick={onToggleTheme}
              className="w-9 h-9 bg-surface-dim hover:bg-surface-container flex items-center justify-center text-primary transition-colors cursor-pointer border border-outline"
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {theme === 'light' ? <Moon className="w-4 h-4 text-secondary fill-secondary/20" /> : <Sun className="w-4 h-4 text-amber-500" />}
            </button>

            <button className="relative w-9 h-9 bg-surface-dim hover:bg-surface-container flex items-center justify-center text-primary transition-colors cursor-pointer border border-outline">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full"></span>
            </button>

            <button 
              onClick={onLogout}
              className="lg:hidden w-9 h-9 bg-surface-dim border border-outline flex items-center justify-center text-on-surface-variant"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Dashboard Main Scrollable Area */}
        <main className="p-6 md:p-8 space-y-8 max-w-7xl w-full mx-auto flex-1">
          
          {/* Welcome Banner */}
          {activeTab === 'portal' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-[#fcf8f2] border border-outline p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 justify-between">
                <div className="space-y-4 max-w-lg text-center md:text-left">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-secondary bg-white px-3 py-1 border border-outline">{welcome.roleBadge}</span>
                  <h2 className="font-serif text-3xl font-medium text-primary leading-tight">
                    {welcome.headline}
                  </h2>
                  <p className="text-on-surface-variant text-xs leading-relaxed font-sans">
                    {welcome.desc}
                  </p>
                  <button 
                    onClick={onBookCounselor}
                    className="bg-primary hover:bg-primary/95 text-white px-6 py-3 font-mono text-[10px] uppercase tracking-wider inline-flex items-center gap-2 transition-all"
                  >
                    Book Counselor
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="w-40 md:w-48 aspect-square shrink-0">
                  <img 
                    className="w-full h-full object-contain filter contrast-105"
                    alt="Teen student studying and reading a book happily"
                    referrerPolicy="no-referrer"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgzY6Jf9ZTJ56c3gxMBYtXnYFS7WlCvkpTzzH8TtBI9zj1m6lk8Q3VJBGocz_FEidhjRk7Mxh0Zy-ExX6bQ3IzmOZMbNs6tpeW7jqvzdardNZq2vI3YIehbMlVRO8-t9vafvxfzxPjJMeP29wX0qR81ujLNenS-bTF7sH1kkuAjlm_N_VMSiqdeiWvfNu9H4lYBXz3TxjR7Ser8_QLxRxjFqIAgbPzx5BYzaUUMvoLuypO1FqAZJ51iAdaxAvDo45OPwLiNolSVAZ1"
                  />
                </div>
              </div>

              {/* Interactive Target Stage Selector Widget */}
              <AudienceSelector 
                currentMode={audienceMode}
                onModeChange={onAudienceChange}
                variant="floating"
              />
            </div>
          )}

          {/* Tab Selector Navigation Bar (for responsive/mobile and quick access) */}
          <div className="flex border-b border-outline overflow-x-auto scrollbar-none gap-1 pb-px">
            <button
              onClick={() => setActiveTab('portal')}
              className={`px-5 py-3 font-mono text-[10px] uppercase tracking-wider border-t-2 border-x transition-all shrink-0 cursor-pointer ${
                activeTab === 'portal'
                ? 'border-t-secondary bg-white text-primary border-x-outline font-bold'
                : 'border-t-transparent bg-transparent text-on-surface-variant hover:bg-surface-dim border-x-transparent'
              }`}
            >
              🏠 My Portal
            </button>
            <button
              onClick={() => setActiveTab('mood')}
              className={`px-5 py-3 font-mono text-[10px] uppercase tracking-wider border-t-2 border-x transition-all shrink-0 cursor-pointer ${
                activeTab === 'mood'
                ? 'border-t-secondary bg-white text-primary border-x-outline font-bold'
                : 'border-t-transparent bg-transparent text-on-surface-variant hover:bg-surface-dim border-x-transparent'
              }`}
            >
              😊 Daily Headspace
            </button>
            <button
              onClick={() => setActiveTab('toolkit')}
              className={`px-5 py-3 font-mono text-[10px] uppercase tracking-wider border-t-2 border-x transition-all shrink-0 cursor-pointer ${
                activeTab === 'toolkit'
                ? 'border-t-secondary bg-white text-primary border-x-outline font-bold'
                : 'border-t-transparent bg-transparent text-on-surface-variant hover:bg-surface-dim border-x-transparent'
              }`}
            >
              🧘 Coping Toolkit
            </button>
            <button
              onClick={() => setActiveTab('calm')}
              className={`px-5 py-3 font-mono text-[10px] uppercase tracking-wider border-t-2 border-x transition-all shrink-0 cursor-pointer ${
                activeTab === 'calm'
                ? 'border-t-secondary bg-white text-primary border-x-outline font-bold'
                : 'border-t-transparent bg-transparent text-on-surface-variant hover:bg-surface-dim border-x-transparent'
              }`}
            >
              🎵 Calm Corner
            </button>
            <button
              onClick={() => setActiveTab('reflection')}
              className={`px-5 py-3 font-mono text-[10px] uppercase tracking-wider border-t-2 border-x transition-all shrink-0 cursor-pointer ${
                activeTab === 'reflection'
                ? 'border-t-secondary bg-white text-primary border-x-outline font-bold'
                : 'border-t-transparent bg-transparent text-on-surface-variant hover:bg-surface-dim border-x-transparent'
              }`}
            >
              📓 Reflection Journal
            </button>
            <button
              onClick={() => setActiveTab('journal')}
              className={`px-5 py-3 font-mono text-[10px] uppercase tracking-wider border-t-2 border-x transition-all shrink-0 cursor-pointer ${
                activeTab === 'journal'
                ? 'border-t-secondary bg-white text-primary border-x-outline font-bold'
                : 'border-t-transparent bg-transparent text-on-surface-variant hover:bg-surface-dim border-x-transparent'
              }`}
            >
              📝 Daily Journal
            </button>
            <button
              onClick={() => setActiveTab('learn')}
              className={`px-5 py-3 font-mono text-[10px] uppercase tracking-wider border-t-2 border-x transition-all shrink-0 cursor-pointer ${
                activeTab === 'learn'
                ? 'border-t-secondary bg-white text-primary border-x-outline font-bold'
                : 'border-t-transparent bg-transparent text-on-surface-variant hover:bg-surface-dim border-x-transparent'
              }`}
            >
              🧭 Learn Hub
            </button>
            <button
              onClick={() => setActiveTab('resources')}
              className={`px-5 py-3 font-mono text-[10px] uppercase tracking-wider border-t-2 border-x transition-all shrink-0 cursor-pointer ${
                activeTab === 'resources'
                ? 'border-t-secondary bg-white text-primary border-x-outline font-bold'
                : 'border-t-transparent bg-transparent text-on-surface-variant hover:bg-surface-dim border-x-transparent'
              }`}
            >
              📚 Resource Library
            </button>
            <button
              onClick={() => setActiveTab('forum')}
              className={`px-5 py-3 font-mono text-[10px] uppercase tracking-wider border-t-2 border-x transition-all shrink-0 cursor-pointer ${
                activeTab === 'forum'
                ? 'border-t-secondary bg-white text-primary border-x-outline font-bold'
                : 'border-t-transparent bg-transparent text-on-surface-variant hover:bg-surface-dim border-x-transparent'
              }`}
            >
              💬 Peer Advice Board
            </button>
            <button
              onClick={() => setActiveTab('mentorship')}
              className={`px-5 py-3 font-mono text-[10px] uppercase tracking-wider border-t-2 border-x transition-all shrink-0 cursor-pointer ${
                activeTab === 'mentorship'
                ? 'border-t-secondary bg-white text-primary border-x-outline font-bold'
                : 'border-t-transparent bg-transparent text-on-surface-variant hover:bg-surface-dim border-x-transparent'
              }`}
            >
              👥 Anonymous Mentorship
            </button>
            <button
              onClick={() => setActiveTab('safety')}
              className={`px-5 py-3 font-mono text-[10px] uppercase tracking-wider border-t-2 border-x transition-all shrink-0 cursor-pointer ${
                activeTab === 'safety'
                ? 'border-t-secondary bg-white text-primary border-x-outline font-bold'
                : 'border-t-transparent bg-transparent text-on-surface-variant hover:bg-surface-dim border-x-transparent'
              }`}
            >
              🔒 Privacy &amp; FAQ
            </button>
          </div>

          {/* Conditional rendering of selected tab views */}
          {activeTab === 'mood' && <div className="animate-in fade-in duration-300"><MoodLogger /></div>}
          {activeTab === 'toolkit' && <div className="animate-in fade-in duration-300"><CopingToolkit /></div>}
          {activeTab === 'calm' && <div className="animate-in fade-in duration-300"><CalmCorner /></div>}
          {activeTab === 'reflection' && <div className="animate-in fade-in duration-300"><ReflectionJournal /></div>}
          {activeTab === 'journal' && (
            <div className="animate-in fade-in duration-300">
              <DailyJournal 
                entries={journalEntries}
                onAddEntry={handleAddJournalEntry}
                onDeleteEntry={handleDeleteJournalEntry}
              />
            </div>
          )}
          {activeTab === 'learn' && <div className="animate-in fade-in duration-300"><LearnHub /></div>}
          {activeTab === 'resources' && <div className="animate-in fade-in duration-300"><ResourceLibrary /></div>}
          {activeTab === 'forum' && <div className="animate-in fade-in duration-300"><CommunityBoard onPostCreated={() => unlockBadge('first_post')} onReplyCreated={() => unlockBadge('first_reply')} /></div>}
          {activeTab === 'mentorship' && <div className="animate-in fade-in duration-300"><AnonymousMentorship /></div>}
          {activeTab === 'safety' && <div className="animate-in fade-in duration-300"><SafetyPrivacyGuide /></div>}

          {/* Grid for Tracker and Sessions */}
          {activeTab === 'portal' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in duration-300">
            
            {/* Left Hand Column Stack - 7 Columns */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              
              {/* Self-Care Habit Tracker */}
              <div className="bg-white p-6 md:p-8 border border-outline flex flex-col justify-between gap-6">
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-outline pb-4">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-secondary" />
                      <h3 className="font-serif text-lg font-medium text-primary">Daily Self-Care Tracker</h3>
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-secondary bg-[#fcf8f2] px-2.5 py-1 border border-outline">
                      Streak: 5 Days 🔥
                    </span>
                  </div>

                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Small, consistent micro-habits boost mood and alleviate pressure. Check off your tasks below to maintain your streak!
                  </p>

                  {/* Progress bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between font-mono text-[10px] uppercase tracking-wider text-on-surface-variant">
                      <span>Progress</span>
                      <span>{progressPercent}% ({completedCount}/{habits.length})</span>
                    </div>
                    <div className="w-full h-2 bg-surface-dim border border-outline rounded-none overflow-hidden">
                      <div 
                        className="h-full bg-secondary transition-all duration-500"
                        style={{ width: `${progressPercent}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Habits check-list */}
                  <div className="space-y-2">
                    {habits.map((h) => (
                      <div 
                        key={h.id} 
                        onClick={() => toggleHabit(h.id)}
                        className={`flex items-center justify-between p-3.5 border transition-all cursor-pointer ${
                          h.completed 
                          ? 'bg-[#fdfdfc] border-secondary/30 text-on-surface-variant' 
                          : 'bg-white border-outline text-primary hover:bg-surface-dim'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${
                            h.completed ? 'bg-secondary border-secondary text-white' : 'border-outline bg-white'
                          }`}>
                            {h.completed && <CheckCircle2 className="w-3 h-3 text-white" />}
                          </div>
                          <span className={`text-xs font-mono tracking-wide ${h.completed ? 'line-through opacity-55' : ''}`}>
                            {h.text}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Add Custom Habit Form */}
                <form onSubmit={handleAddHabit} className="flex gap-2 pt-4 border-t border-outline">
                  <input 
                    type="text" 
                    placeholder="Add custom coping habit..."
                    value={newHabitText}
                    onChange={(e) => setNewHabitText(e.target.value)}
                    className="flex-1 bg-white border border-outline px-3 py-2 text-xs focus:outline-none focus:border-secondary font-mono"
                  />
                  <button 
                    type="submit"
                    className="bg-primary hover:bg-primary/95 text-white px-4 py-2 font-mono text-[10px] uppercase tracking-wider cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </form>
              </div>

              {/* Daily Micro-Journal Snapshot Card */}
              <div className="bg-white p-6 md:p-8 border border-outline flex flex-col justify-between gap-5">
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-outline pb-4">
                    <div className="flex items-center gap-2">
                      <PenTool className="w-4 h-4 text-secondary" />
                      <h3 className="font-serif text-lg font-medium text-primary">Daily Reflection Stream</h3>
                    </div>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-secondary bg-[#fcf8f2] px-2.5 py-1 border border-outline font-bold">
                      🔒 {journalEntries.length} Saved Logs
                    </span>
                  </div>

                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Reflecting on daily events helps process stress. Here are your latest secure reflection notes:
                  </p>

                  {/* List recent reflections */}
                  <div className="space-y-3">
                    {journalEntries.slice(0, 2).map((entry) => (
                      <div key={entry.id} className="bg-surface-dim/40 border border-outline/70 p-3.5 space-y-2">
                        <div className="flex justify-between items-center text-[8px] font-mono uppercase tracking-wider text-on-surface-variant">
                          <span>{entry.date} • {entry.time}</span>
                          <span className="bg-white px-1.5 py-0.5 border border-outline font-bold">{entry.promptMode}</span>
                        </div>
                        <p className="text-xs text-primary leading-relaxed font-sans line-clamp-2">
                          "{entry.content}"
                        </p>
                        <div className="text-[9px] font-mono flex items-center gap-1 font-bold text-secondary">
                          <span>{entry.moodEmoji}</span> {entry.mood}
                        </div>
                      </div>
                    ))}

                    {journalEntries.length === 0 && (
                      <div className="border border-dashed border-outline p-6 text-center text-xs text-on-surface-variant italic">
                        Your journal is completely empty. Take 60 seconds to log your very first private reflection today!
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setActiveTab('journal')}
                    className="w-full bg-primary hover:bg-primary/95 text-white py-2.5 font-mono text-[10px] uppercase tracking-wider text-center cursor-pointer font-bold flex items-center justify-center gap-2"
                  >
                    Go to Full Journal &amp; Write Log <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>

            {/* Upcoming Sessions & Contacts - 5 Columns */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              
              {/* My Mindful Achievements / Digital Badges Cabinet */}
              <div className="bg-white p-6 border border-outline space-y-4">
                <div className="flex justify-between items-center border-b border-outline pb-3">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-secondary" />
                    <h3 className="font-serif text-base font-medium text-primary">My Badges Cabinet</h3>
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 border border-emerald-250 font-bold">
                    {achievements.filter(a => a.unlocked).length} / {achievements.length} Badges
                  </span>
                </div>

                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                  Earn digital badges as you take self-care actions, journal thoughts, and engage with our peer support board!
                </p>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  {achievements.map((achievement) => {
                    const IconComponent = () => {
                      switch (achievement.iconName) {
                        case 'Zap': return <Zap className="w-4 h-4" />;
                        case 'Flame': return <Flame className="w-4 h-4" />;
                        case 'PenTool': return <PenTool className="w-4 h-4" />;
                        case 'MessageSquare': return <MessageSquare className="w-4 h-4" />;
                        case 'Heart': return <Heart className="w-4 h-4" />;
                        case 'Trophy': return <Trophy className="w-4 h-4" />;
                        default: return <Award className="w-4 h-4" />;
                      }
                    };

                    return (
                      <div 
                        key={achievement.id}
                        className={`p-3 border flex flex-col justify-between space-y-2 transition-all relative ${
                          achievement.unlocked 
                          ? `${achievement.badgeBg} ${achievement.borderColor} opacity-100 shadow-sm` 
                          : 'bg-surface-dim/20 border-outline/50 opacity-55'
                        }`}
                        title={achievement.unlocked ? `${achievement.title}: ${achievement.description}` : `Locked: ${achievement.criteria}`}
                      >
                        <div className="flex items-start justify-between">
                          <div className={`p-1 border ${achievement.unlocked ? `${achievement.color} bg-white ${achievement.borderColor}` : 'text-gray-400 bg-gray-50 border-gray-200'}`}>
                            <IconComponent />
                          </div>
                          
                          {achievement.unlocked ? (
                            <span className="font-mono text-[7px] text-emerald-600 bg-emerald-50 border border-emerald-200 px-1 py-px uppercase tracking-tight font-bold">
                              ✓ Earned
                            </span>
                          ) : (
                            <span className="font-mono text-[7px] text-on-surface-variant bg-white border border-outline px-1 py-px uppercase tracking-tight font-bold">
                              🔒 Locked
                            </span>
                          )}
                        </div>

                        <div className="space-y-0.5">
                          <h4 className="font-serif text-[11px] font-bold text-primary tracking-tight leading-tight">
                            {achievement.title}
                          </h4>
                          <p className="text-[9px] text-on-surface-variant leading-tight font-sans">
                            {achievement.unlocked ? achievement.description : achievement.criteria}
                          </p>
                        </div>

                        {achievement.unlocked && achievement.unlockedAt && (
                          <div className="text-[7px] font-mono text-on-surface-variant/70 border-t border-outline/30 pt-1 flex justify-between items-center">
                            <span>Earned:</span>
                            <span className="font-bold">{achievement.unlockedAt}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Scheduled counseling session widget */}
              <div className="bg-white p-6 border border-outline flex flex-col justify-between flex-1 gap-4">
                <div>
                  <h3 className="font-serif text-base font-medium text-primary flex items-center gap-2 mb-3 pb-3 border-b border-outline">
                    <Clock className="w-4 h-4 text-secondary" />
                    Upcoming Sessions
                  </h3>

                  {upcomingSessions.length === 0 ? (
                    <div className="text-center py-8 space-y-4">
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        No upcoming sessions scheduled yet. Booking a peer or career advisor helps you map a safe direction!
                      </p>
                      <button 
                        onClick={onBookCounselor}
                        className="text-secondary hover:text-primary font-mono text-[10px] uppercase tracking-wider flex items-center gap-2 mx-auto font-bold"
                      >
                        Find counselor 
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-56 overflow-y-auto">
                      {upcomingSessions.map((session, index) => (
                        <div key={index} className="bg-surface-dim/40 p-4 border border-outline space-y-3">
                          <div className="flex items-center gap-3">
                            <img 
                              className="w-10 h-10 rounded-full object-cover border border-outline"
                              src={session.counselor.avatar}
                              referrerPolicy="no-referrer"
                              alt={session.counselor.name}
                            />
                            <div>
                              <p className="font-serif text-sm font-bold">{session.counselor.name}</p>
                              <p className="font-mono text-[9px] uppercase tracking-wider text-on-surface-variant">{session.counselor.specialty}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-primary bg-white p-2.5 border border-outline">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-secondary" /> {session.date}
                            </span>
                            <span>
                              {session.timeSlot}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-on-surface-variant">
                            <span className="px-2 py-0.5 bg-[#fcf8f2] border border-outline rounded-none">
                              {session.type}
                            </span>
                          </div>

                          <button 
                            onClick={() => onJoinSession(session)}
                            className="w-full bg-secondary hover:bg-secondary/90 text-white py-2 font-mono text-[10px] uppercase tracking-wider transition-colors cursor-pointer text-center font-bold"
                          >
                            Join Live Chat
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Contacts Block */}
              <div className="bg-[#fff1f1] p-6 border border-error/15 space-y-3">
                <h3 className="font-mono text-[10px] uppercase tracking-widest font-bold text-error flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-error animate-pulse" />
                  Quick Helpline Contacts
                </h3>
                <p className="text-[11px] text-on-surface-variant leading-relaxed font-sans">
                  These lines are 100% free, confidential, secure, and available any time of day.
                </p>
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <a 
                    href="tel:988"
                    className="bg-white hover:bg-surface-dim border border-outline p-3 flex flex-col items-center justify-center text-center cursor-pointer transition-transform"
                  >
                    <Phone className="w-3.5 h-3.5 text-error mb-1 fill-error" />
                    <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-primary">Call 988</span>
                    <span className="text-[9px] text-on-surface-variant font-sans">Crisis Counselor</span>
                  </a>
                  <a 
                    href="sms:741741?body=HOME"
                    className="bg-white hover:bg-surface-dim border border-outline p-3 flex flex-col items-center justify-center text-center cursor-pointer transition-transform"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-error mb-1 fill-error" />
                    <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-primary">Text HOME</span>
                    <span className="text-[9px] text-on-surface-variant font-sans">to 741741</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
          )}

          {/* Quick Exit floating instructions */}
          <div className="p-4 bg-white border border-outline flex items-center justify-between text-xs text-on-surface-variant font-mono text-[10px] uppercase tracking-wider">
            <span>
              🔒 <strong>Safety first:</strong> To exit instantly, press <kbd className="bg-primary text-white border border-secondary px-1.5 py-0.5 font-sans font-bold">Alt + Q</kbd> to redirect immediately to Google.
            </span>
            <button 
              onClick={handleQuickExit}
              className="text-error hover:underline font-bold"
            >
              Exit Now
            </button>
          </div>

        </main>
      </div>

      {/* Achievement Unlocked Celebration Pop-up Modal */}
      {celebrationBadge && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-primary/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white border-2 border-secondary max-w-sm w-full p-6 md:p-8 space-y-6 text-center relative shadow-2xl animate-in zoom-in-95 duration-300">
            {/* Elegant Sparkles background */}
            <div className="absolute top-4 right-4">
              <button 
                onClick={() => setCelebrationBadge(null)}
                className="text-on-surface-variant hover:text-primary font-mono text-xs uppercase p-1 cursor-pointer font-bold"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-4">
              <div className="inline-flex p-4 bg-amber-50 border border-amber-200 text-amber-500 rounded-none mb-1 animate-bounce">
                {celebrationBadge.iconName === 'Zap' && <Zap className="w-8 h-8 text-amber-500" />}
                {celebrationBadge.iconName === 'Flame' && <Flame className="w-8 h-8 text-rose-500" />}
                {celebrationBadge.iconName === 'PenTool' && <PenTool className="w-8 h-8 text-emerald-500" />}
                {celebrationBadge.iconName === 'MessageSquare' && <MessageSquare className="w-8 h-8 text-sky-500" />}
                {celebrationBadge.iconName === 'Heart' && <Heart className="w-8 h-8 text-purple-500 fill-purple-100" />}
                {celebrationBadge.iconName === 'Trophy' && <Trophy className="w-8 h-8 text-yellow-500 animate-pulse" />}
              </div>

              <div className="space-y-1.5">
                <span className="font-mono text-[9px] uppercase tracking-widest text-secondary font-bold block">
                  🏆 BADGE EARNED!
                </span>
                <h3 className="font-serif text-xl font-bold text-primary tracking-tight">
                  {celebrationBadge.title}
                </h3>
                <p className="text-xs text-on-surface-variant font-mono py-1 px-3 bg-surface-dim/40 inline-block border border-outline">
                  {celebrationBadge.criteria}
                </p>
              </div>

              <p className="text-xs text-primary leading-relaxed font-sans italic pt-2">
                "{celebrationBadge.description}"
              </p>
            </div>

            <button
              onClick={() => setCelebrationBadge(null)}
              className="w-full bg-primary hover:bg-primary/95 text-white py-2.5 font-mono text-[10px] uppercase tracking-wider text-center cursor-pointer font-bold border border-transparent hover:border-secondary transition-all"
            >
              Collect Badge &amp; Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
