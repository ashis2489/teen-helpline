import React, { useState } from 'react';
import { 
  MessageSquare, 
  Heart, 
  Search, 
  Send, 
  ShieldCheck, 
  PlusCircle, 
  ChevronRight,
  Filter,
  UserCheck
} from 'lucide-react';

interface ForumPost {
  id: string;
  category: 'mental-health' | 'career' | 'relationships';
  question: string;
  questionTime: string;
  author: string;
  answer: string;
  answerTime: string;
  advisorName: string;
  advisorRole: string;
  likes: number;
  hasLiked?: boolean;
}

export default function PeerForum() {
  const [posts, setPosts] = useState<ForumPost[]>([
    {
      id: 'f-1',
      category: 'mental-health',
      question: "I find myself getting paralyzed with fear right before presenting slides in front of my class. I shake and forget what to say. How do I cope?",
      questionTime: "2 hours ago",
      author: "ScaredPresenter, 16",
      answer: "Public speaking anxiety is incredibly common—your adrenaline spikes! Try the '3-3-3 rule' right before: name 3 physical objects, touch 3 textures, and move 3 joints. It tricks your brain out of fight-or-flight mode. Also, holding an physical index card or pen gives your hands a safe place to ground their nervous energy.",
      answerTime: "1 hour ago",
      advisorName: "Sarah Jenkins",
      advisorRole: "Certified Career Advisor",
      likes: 14,
      hasLiked: false
    },
    {
      id: 'f-2',
      category: 'career',
      question: "All my friends are applying to private universities, but my family can only afford community college first. I feel like I'm falling behind and failing.",
      questionTime: "Yesterday",
      author: "WorryStudent, 18",
      answer: "Let's reframe this immediately: starting at community college is one of the smartest, highest-value career moves possible! You save thousands of dollars, get smaller class sizes, and can transfer credits directly to top 4-year institutions later. Tech employers only care about your skills, portfolio, and work ethic—never where you spent your freshman year.",
      answerTime: "Yesterday",
      advisorName: "Marcus Thorne",
      advisorRole: "Tech Bootcamp Specialist",
      likes: 28,
      hasLiked: true
    },
    {
      id: 'f-3',
      category: 'relationships',
      question: "I want to take a coding bootcamp this winter, but my parents want me to do traditional summer tutoring. How can I explain my choice without starting a massive argument?",
      questionTime: "3 days ago",
      author: "HobbyCoder, 15",
      answer: "Parents usually worry because they want you to have a secure future. Instead of arguing, prepare a simple 1-page proposal: outline what the bootcamp teaches, the hands-on projects you'll build, and how these skills translate directly into internships or portfolio items. Show them it's structured, safe, and rigorous. Speaking their language of 'career readiness' works wonders!",
      answerTime: "2 days ago",
      advisorName: "David Chen",
      advisorRole: "Humanities & Design Advisor",
      likes: 19,
      hasLiked: false
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newQuestionCategory, setNewQuestionCategory] = useState<'mental-health' | 'career' | 'relationships'>('mental-health');
  const [showAskForm, setShowAskForm] = useState(false);
  const [customAuthor, setCustomAuthor] = useState('');

  const categories = [
    { id: 'all', label: 'All Discussions' },
    { id: 'mental-health', label: 'Mental Health Support' },
    { id: 'career', label: 'Career & University' },
    { id: 'relationships', label: 'Friendships & Family' }
  ];

  const handleLike = (id: string) => {
    setPosts(posts.map(p => {
      if (p.id === id) {
        return {
          ...p,
          likes: p.hasLiked ? p.likes - 1 : p.likes + 1,
          hasLiked: !p.hasLiked
        };
      }
      return p;
    }));
  };

  const handlePostQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;

    const newPost: ForumPost = {
      id: `custom-f-${Date.now()}`,
      category: newQuestionCategory,
      question: newQuestionText.trim(),
      questionTime: 'Just now',
      author: customAuthor.trim() ? `${customAuthor.trim()}, Student` : 'Anonymous Teen',
      answer: "Our certified counselor team is currently reviewing your question to provide a helpful, tailored guide. We will post it publicly within 2 hours!",
      answerTime: 'Awaiting Counselor Review',
      advisorName: 'Teens Helpline Team',
      advisorRole: 'Advisors & Moderators',
      likes: 0,
      hasLiked: false
    };

    setPosts([newPost, ...posts]);
    setNewQuestionText('');
    setCustomAuthor('');
    setShowAskForm(false);
  };

  const filteredPosts = posts.filter(p => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = p.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-white border border-outline p-6 md:p-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline pb-5">
        <div>
          <span className="font-mono text-[9px] text-secondary font-bold uppercase tracking-widest block">Safe moderated board</span>
          <h2 className="font-serif text-2xl font-medium text-primary tracking-tight">Peer-to-Peer Advice Forums</h2>
        </div>
        
        <button
          onClick={() => setShowAskForm(!showAskForm)}
          className="bg-primary hover:bg-primary/95 text-white h-11 px-5 font-mono text-[10px] uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all shrink-0 font-bold"
        >
          <PlusCircle className="w-4 h-4 text-secondary" />
          <span>Post Anonymous Question</span>
        </button>
      </div>

      <p className="text-xs text-on-surface-variant leading-relaxed">
        Browse peer-submitted questions with advice written by certified counselors and career mentors. All forum content is highly moderated to guarantee a safe, bullying-free space.
      </p>

      {/* Ask Question Form Modal/Drawer */}
      {showAskForm && (
        <form onSubmit={handlePostQuestion} className="bg-[#fcf8f2] border border-outline p-6 space-y-4 animate-in slide-in-from-top duration-300">
          <div className="flex justify-between items-center pb-2 border-b border-outline/30">
            <h3 className="font-serif text-sm font-bold text-primary">Ask an Anonymous Question</h3>
            <button 
              type="button" 
              onClick={() => setShowAskForm(false)}
              className="font-mono text-[10px] text-on-surface-variant hover:text-primary uppercase"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-on-surface-variant font-bold">Category:</label>
              <select
                value={newQuestionCategory}
                onChange={(e) => setNewQuestionCategory(e.target.value as any)}
                className="w-full bg-white border border-outline p-2.5 text-xs font-mono focus:outline-none"
              >
                <option value="mental-health">Mental Health Support</option>
                <option value="career">Career &amp; University</option>
                <option value="relationships">Friendships &amp; Family</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-on-surface-variant font-bold">Anonymous Alias:</label>
              <input
                type="text"
                placeholder="e.g., HopefulCoder, 16"
                value={customAuthor}
                onChange={(e) => setCustomAuthor(e.target.value)}
                className="w-full bg-white border border-outline p-2.5 text-xs font-mono focus:outline-none focus:border-secondary"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-[10px] font-mono uppercase tracking-wider text-on-surface-variant font-bold">Your Question:</label>
            <textarea
              rows={3}
              required
              placeholder="Type your question safely. e.g., How do I handle homework overload?"
              value={newQuestionText}
              onChange={(e) => setNewQuestionText(e.target.value)}
              className="w-full bg-white border border-outline p-3 text-xs focus:outline-none focus:border-secondary font-sans leading-relaxed"
            />
          </div>

          <div className="flex justify-between items-center">
            <span className="font-mono text-[9px] text-on-surface-variant flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Auto-moderation check active
            </span>
            <button
              type="submit"
              className="bg-primary hover:bg-primary/95 text-white h-10 px-5 font-mono text-[10px] uppercase tracking-wider cursor-pointer font-bold flex items-center gap-2"
            >
              Submit Question <Send className="w-3.5 h-3.5 text-secondary" />
            </button>
          </div>
        </form>
      )}

      {/* Filter and Search controls */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Search */}
        <div className="md:col-span-4 relative">
          <Search className="w-4 h-4 text-on-surface-variant absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search forum topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-background pl-9 pr-4 py-2 text-xs border border-outline focus:outline-none focus:border-primary font-mono"
          />
        </div>

        {/* Filter chips */}
        <div className="md:col-span-8 flex flex-wrap gap-1.5">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3.5 py-1.5 font-mono text-[9px] uppercase tracking-wider border transition-all cursor-pointer ${
                selectedCategory === c.id
                ? 'bg-primary text-white border-primary'
                : 'bg-white border-outline text-on-surface-variant hover:bg-surface-dim'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Forum list */}
      <div className="space-y-6 pt-2">
        {filteredPosts.length === 0 ? (
          <div className="bg-surface-dim/40 border border-outline p-12 text-center text-on-surface-variant text-xs">
            No matching forum questions found. Try posting your question or searching other categories!
          </div>
        ) : (
          filteredPosts.map((post) => (
            <div 
              key={post.id}
              className="bg-white border border-outline hover:border-outline-variant transition-colors p-6 space-y-5"
            >
              {/* Question area */}
              <div className="space-y-2">
                <div className="flex flex-wrap justify-between items-center gap-2">
                  <div className="flex items-center gap-2 text-on-surface-variant font-mono text-[9px] uppercase tracking-wider">
                    <span className="bg-[#fcf8f2] border border-outline text-secondary px-2 py-0.5 rounded-none font-bold">
                      {post.category === 'mental-health' ? 'Mental Health' : post.category === 'career' ? 'Career' : 'Relationships'}
                    </span>
                    <span>Asked by {post.author}</span>
                  </div>
                  <span className="text-[9px] text-on-surface-variant font-mono">{post.questionTime}</span>
                </div>
                
                <h4 className="font-serif text-base font-bold text-primary leading-relaxed">
                  "{post.question}"
                </h4>
              </div>

              {/* Expert Answer area */}
              <div className="bg-surface-dim/30 p-4 border border-outline border-l-2 border-l-secondary space-y-3">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary font-serif text-xs font-bold uppercase">
                      {post.advisorName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-serif text-xs font-bold text-primary flex items-center gap-1">
                        {post.advisorName} 
                        <UserCheck className="w-3.5 h-3.5 text-secondary" />
                      </p>
                      <p className="font-mono text-[8px] uppercase tracking-wider text-on-surface-variant">{post.advisorRole}</p>
                    </div>
                  </div>
                  <span className="text-[9px] text-on-surface-variant font-mono uppercase">{post.answerTime}</span>
                </div>

                <p className="text-xs text-on-surface-variant leading-relaxed font-sans">
                  {post.answer}
                </p>
              </div>

              {/* Like / Heart Action button */}
              <div className="flex justify-between items-center border-t border-outline/30 pt-3">
                <span className="text-[10px] text-on-surface-variant font-mono flex items-center gap-1.5">
                  🛡️ Moderated advice
                </span>
                
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 border font-mono text-[10px] uppercase tracking-wider transition-all cursor-pointer ${
                    post.hasLiked 
                    ? 'bg-secondary/15 text-secondary border-secondary' 
                    : 'bg-white border-outline text-on-surface-variant hover:bg-surface-dim'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${post.hasLiked ? 'fill-secondary text-secondary' : 'text-on-surface-variant'}`} />
                  <span>Helpful ({post.likes})</span>
                </button>
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
}
