import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Heart, 
  Search, 
  Send, 
  ShieldCheck, 
  PlusCircle, 
  Filter, 
  Smile, 
  Sparkles, 
  AlertTriangle,
  User,
  Check,
  X,
  Flag,
  CornerDownRight,
  Info
} from 'lucide-react';

export interface BoardReply {
  id: string;
  author: string;
  content: string;
  time: string;
}

export interface BoardPost {
  id: string;
  category: 'general' | 'stress' | 'wins' | 'academics' | 'relationships';
  content: string;
  time: string;
  author: string;
  reactions: {
    hug: number;     // 🫂 Supportive Hug
    solidarity: number; // ✊ Me Too / Solidarity
    perspective: number; // 💡 Great Perspective
  };
  userReactions?: {
    hug?: boolean;
    solidarity?: boolean;
    perspective?: boolean;
  };
  replies: BoardReply[];
  status: 'approved' | 'pending' | 'flagged';
  flagReason?: string;
}

const DEFAULT_POSTS: BoardPost[] = [
  {
    id: 'cb-1',
    category: 'stress',
    content: "How do you guys deal with burnout when you have both coding projects and school final exams in the same week? I feel like my brain is turning into absolute mush, and I can't seem to focus for more than 10 minutes.",
    time: "4 hours ago",
    author: "BlueSky_09",
    reactions: { hug: 14, solidarity: 11, perspective: 4 },
    replies: [
      {
        id: 'cbr-1',
        author: "CalmCoder",
        content: "Honestly, the Pomodoro technique is a lifesaver. Study or code for 25 minutes, then force yourself to step away completely for 5 minutes. No phone, just stretch or grab water. It keeps the cognitive load manageable!",
        time: "3 hours ago"
      },
      {
        id: 'cbr-2',
        author: "DevTeens",
        content: "I'm in the exact same boat right now. What helps me is picking just one major task per day. Everything else is secondary. Don't worry about being perfect, just finish!",
        time: "2 hours ago"
      }
    ],
    status: 'approved'
  },
  {
    id: 'cb-2',
    category: 'wins',
    content: "Finally completed my first full React application with proper state management and custom routing! It's just a simple productivity dashboard, but seeing everything connect smoothly is so rewarding. We've got this, everyone!",
    time: "1 day ago",
    author: "TealLeaf",
    reactions: { hug: 5, solidarity: 19, perspective: 12 },
    replies: [
      {
        id: 'cbr-3',
        author: "WebExplorer",
        content: "That is awesome! Getting state management right is one of the hardest milestones when starting out. Keep building!",
        time: "18 hours ago"
      }
    ],
    status: 'approved'
  },
  {
    id: 'cb-3',
    category: 'academics',
    content: "Is anyone else struggling with high mathematics prep? It feels like the exams test us on things we barely spent five minutes on in class. Any good online practice resources?",
    time: "2 days ago",
    author: "Limitless_88",
    reactions: { hug: 8, solidarity: 15, perspective: 7 },
    replies: [],
    status: 'approved'
  }
];

const TOPICS = [
  { id: 'all', label: 'All Discussion', emoji: '🌟' },
  { id: 'general', label: 'General Thoughts', emoji: '💭' },
  { id: 'stress', label: 'Stress & Anxiety', emoji: '☁️' },
  { id: 'wins', label: 'Gratitude & Wins', emoji: '🌱' },
  { id: 'academics', label: 'Academics & Coding', emoji: '⚡' },
  { id: 'relationships', label: 'Peer Relationships', emoji: '🤝' }
];

interface CommunityBoardProps {
  onPostCreated?: () => void;
  onReplyCreated?: () => void;
}

export default function CommunityBoard({ onPostCreated, onReplyCreated }: CommunityBoardProps) {
  // Load posts from localStorage if available, else use default posts
  const [posts, setPosts] = useState<BoardPost[]>(() => {
    const saved = localStorage.getItem('mindful_community_posts');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse community posts", e);
      }
    }
    return DEFAULT_POSTS;
  });

  const [activeTopic, setActiveTopic] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPostForm, setShowPostForm] = useState(false);
  
  // New Post Form State
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<'general' | 'stress' | 'wins' | 'academics' | 'relationships'>('general');
  const [customAlias, setCustomAlias] = useState('');
  
  // Reply input state keyed by post ID
  const [replyInputs, setReplyInputs] = useState<{ [postId: string]: string }>({});
  const [replyAliases, setReplyAliases] = useState<{ [postId: string]: string }>({});
  const [expandedReplies, setExpandedReplies] = useState<{ [postId: string]: boolean }>({
    'cb-1': true
  });

  // Moderator View State (to make moderation fully interactive and explorable!)
  const [moderatorMode, setModeratorMode] = useState(false);
  const [moderationNotification, setModerationNotification] = useState<string | null>(null);

  // Save to localStorage whenever posts change
  useEffect(() => {
    localStorage.setItem('mindful_community_posts', JSON.stringify(posts));
  }, [posts]);

  // Handle post submission with real-time simulated moderation
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) return;

    const textToAnalyze = newContent.toLowerCase();
    
    // Simple blocklist of terms for simulation of automated moderation
    const sensitiveWords = ['hate', 'ugly', 'stupid', 'dumb', 'loser', '@', 'phone', 'call me', '555-'];
    const foundSensitive = sensitiveWords.filter(word => textToAnalyze.includes(word));
    
    let postStatus: 'approved' | 'pending' | 'flagged' = 'approved';
    let flagReason = '';

    if (foundSensitive.length > 0) {
      postStatus = 'pending';
      flagReason = `Auto-flagged: contains sensitive, personal, or non-inclusive keywords (${foundSensitive.join(', ')}).`;
    }

    const newPost: BoardPost = {
      id: `cb-post-${Date.now()}`,
      category: newCategory,
      content: newContent.trim(),
      time: 'Just now',
      author: customAlias.trim() ? customAlias.trim() : 'Anonymous Peer',
      reactions: { hug: 0, solidarity: 0, perspective: 0 },
      replies: [],
      status: postStatus,
      flagReason: flagReason || undefined
    };

    setPosts([newPost, ...posts]);
    setNewContent('');
    setCustomAlias('');
    setShowPostForm(false);

    if (onPostCreated) {
      onPostCreated();
    }

    if (postStatus === 'pending') {
      setModerationNotification("⚠️ Your post contains language that triggered our safety filters. It has been held in the 'Pending Moderation' queue for safety.");
    } else {
      setModerationNotification("🎉 Your thought has been successfully posted to the community board anonymously!");
    }

    // Clear notification after 6 seconds
    setTimeout(() => {
      setModerationNotification(null);
    }, 6000);
  };

  // Handle peer reply submission
  const handleAddReply = (postId: string) => {
    const text = replyInputs[postId];
    if (!text || !text.trim()) return;

    const authorText = replyAliases[postId]?.trim() ? replyAliases[postId].trim() : 'Anonymous Peer';

    const newReply: BoardReply = {
      id: `cbr-reply-${Date.now()}`,
      author: authorText,
      content: text.trim(),
      time: 'Just now'
    };

    setPosts(posts.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          replies: [...p.replies, newReply]
        };
      }
      return p;
    }));

    // Clear inputs
    setReplyInputs({ ...replyInputs, [postId]: '' });
    setReplyAliases({ ...replyAliases, [postId]: '' });
    // Expand replies
    setExpandedReplies({ ...expandedReplies, [postId]: true });

    if (onReplyCreated) {
      onReplyCreated();
    }
  };

  // Toggle reactions
  const handleReact = (postId: string, type: 'hug' | 'solidarity' | 'perspective') => {
    setPosts(posts.map(p => {
      if (p.id === postId) {
        const userReactions = p.userReactions || {};
        const hasReacted = !!userReactions[type];
        
        return {
          ...p,
          reactions: {
            ...p.reactions,
            [type]: hasReacted ? p.reactions[type] - 1 : p.reactions[type] + 1
          },
          userReactions: {
            ...userReactions,
            [type]: !hasReacted
          }
        };
      }
      return p;
    }));
  };

  // Moderator actions
  const handleApprovePost = (postId: string) => {
    setPosts(posts.map(p => {
      if (p.id === postId) {
        return { ...p, status: 'approved', flagReason: undefined };
      }
      return p;
    }));
  };

  const handleRejectPost = (postId: string) => {
    setPosts(posts.filter(p => p.id !== postId));
  };

  const handleFlagPost = (postId: string, reason: string) => {
    setPosts(posts.map(p => {
      if (p.id === postId) {
        return { ...p, status: 'flagged', flagReason: reason };
      }
      return p;
    }));
  };

  const toggleReplies = (postId: string) => {
    setExpandedReplies({
      ...expandedReplies,
      [postId]: !expandedReplies[postId]
    });
  };

  // Filtering calculations
  const filteredPosts = posts.filter(p => {
    // Standard users only see approved posts. Moderators see all posts.
    const isVisibleByStatus = moderatorMode || p.status === 'approved';
    
    const matchesTopic = activeTopic === 'all' || p.category === activeTopic;
    const matchesSearch = p.content.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    return isVisibleByStatus && matchesTopic && matchesSearch;
  });

  const pendingCount = posts.filter(p => p.status === 'pending').length;

  return (
    <div className="space-y-8 max-w-5xl mx-auto bg-white border border-outline p-6 md:p-8">
      
      {/* Title bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline pb-5">
        <div>
          <span className="font-mono text-[9px] text-secondary font-bold uppercase tracking-widest block">Interactive peer-to-peer discussions</span>
          <h2 className="font-serif text-2xl font-medium text-primary tracking-tight">Student Community Board</h2>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          {/* Moderator Mode Toggle */}
          <button
            onClick={() => setModeratorMode(!moderatorMode)}
            className={`font-mono text-[9px] uppercase tracking-wider px-3 py-1 border flex items-center gap-1.5 transition-all cursor-pointer font-bold ${
              moderatorMode 
              ? 'bg-amber-500 text-white border-amber-500' 
              : 'bg-white text-on-surface-variant hover:text-amber-600 border-outline'
            }`}
            title="Toggle simulated Moderator Controls"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Mod Mode {moderatorMode ? 'ON' : 'OFF'}</span>
            {pendingCount > 0 && (
              <span className="bg-white text-amber-600 rounded-full w-4 h-4 flex items-center justify-center text-[8px] font-bold">
                {pendingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setShowPostForm(!showPostForm)}
            className="bg-primary hover:bg-primary/95 text-white px-4 py-1.5 font-mono text-[10px] uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer transition-all font-bold"
          >
            <PlusCircle className="w-3.5 h-3.5 text-secondary" />
            <span>Share a Thought</span>
          </button>
        </div>
      </div>

      {/* Moderation Notice banner */}
      {moderationNotification && (
        <div className="bg-[#fcf8f2] border-l-2 border-l-secondary border border-outline p-4 animate-in slide-in-from-top duration-300">
          <div className="flex items-start gap-2.5">
            <Info className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
            <p className="text-xs text-primary leading-relaxed">{moderationNotification}</p>
          </div>
        </div>
      )}

      {/* Intro Guidelines */}
      <div className="bg-surface-dim/30 border border-outline p-4 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div className="space-y-1">
          <h4 className="font-serif text-xs font-bold text-primary flex items-center gap-1.5">
            💬 Peer Support &amp; Safe Sharing Rules
          </h4>
          <p className="text-[11px] text-on-surface-variant leading-relaxed max-w-3xl">
            This is a secure, respectful space to share personal stories, study hurdles, or positive wins. All posts are filtered automatically to ensure no bullying, peer-harassment, or contact details are leaked. Be kind and lift each other up.
          </p>
        </div>
        <div className="font-mono text-[9px] uppercase tracking-wider bg-white text-emerald-600 border border-outline px-2.5 py-1 font-bold flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" /> Moderated Forum
        </div>
      </div>

      {/* Share a Thought Form Drawer */}
      {showPostForm && (
        <form onSubmit={handleCreatePost} className="bg-[#fcf8f2] border border-outline p-6 space-y-4 animate-in slide-in-from-top duration-300">
          <div className="flex justify-between items-center pb-2 border-b border-outline/30">
            <h3 className="font-serif text-sm font-bold text-primary">Anonymous Safe Posting</h3>
            <button 
              type="button" 
              onClick={() => setShowPostForm(false)}
              className="font-mono text-[10px] text-on-surface-variant hover:text-primary uppercase cursor-pointer"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-on-surface-variant font-bold">Category Topic:</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as any)}
                className="w-full bg-white border border-outline p-2.5 text-xs font-mono focus:outline-none focus:border-secondary cursor-pointer"
              >
                <option value="general">💭 General Thoughts</option>
                <option value="stress">☁️ Stress &amp; Anxiety</option>
                <option value="wins">🌱 Gratitude &amp; Wins</option>
                <option value="academics">⚡ Academics &amp; Coding</option>
                <option value="relationships">🤝 Peer Relationships</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-on-surface-variant font-bold">Optional Peer Alias:</label>
              <input
                type="text"
                placeholder="e.g., CodeSpark, Student (or leave blank to post fully anonymously)"
                value={customAlias}
                onChange={(e) => setCustomAlias(e.target.value)}
                className="w-full bg-white border border-outline p-2.5 text-xs font-mono focus:outline-none focus:border-secondary"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-on-surface-variant font-bold">Your Thought or Question:</label>
              <span className="font-mono text-[9px] text-on-surface-variant">{newContent.length} characters</span>
            </div>
            <textarea
              rows={4}
              required
              placeholder="What is top-of-mind? Share your story, struggle, or tip anonymously..."
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="w-full bg-white border border-outline p-3 text-xs focus:outline-none focus:border-secondary font-sans leading-relaxed text-primary"
            />
          </div>

          <div className="flex flex-wrap justify-between items-center gap-3 pt-1">
            <span className="font-mono text-[9px] text-on-surface-variant flex items-center gap-1.5 bg-white border border-outline px-2.5 py-1">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> Language safety filter is active
            </span>
            <button
              type="submit"
              className="bg-primary hover:bg-primary/95 text-white h-10 px-5 font-mono text-[10px] uppercase tracking-wider cursor-pointer font-bold flex items-center gap-1.5"
            >
              Post Safely <Send className="w-3.5 h-3.5 text-secondary" />
            </button>
          </div>
        </form>
      )}

      {/* Filter and Search Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        {/* Search */}
        <div className="lg:col-span-4 relative">
          <Search className="w-4 h-4 text-on-surface-variant absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search community posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white pl-9 pr-4 py-2 text-xs border border-outline focus:outline-none focus:border-secondary font-mono"
          />
        </div>

        {/* Filters */}
        <div className="lg:col-span-8 flex flex-wrap gap-1.5">
          {TOPICS.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setActiveTopic(topic.id)}
              className={`px-3 py-1.5 font-mono text-[9px] uppercase tracking-wider border transition-all cursor-pointer flex items-center gap-1 ${
                activeTopic === topic.id
                ? 'bg-primary text-white border-primary font-bold'
                : 'bg-white border-outline text-on-surface-variant hover:bg-surface-dim'
              }`}
            >
              <span>{topic.emoji}</span>
              <span>{topic.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Moderator Dashboard Helper Tab (Visible when Mod Mode is Active) */}
      {moderatorMode && (
        <div className="bg-amber-50 border border-amber-200 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-serif text-xs font-bold text-amber-800 flex items-center gap-1.5">
              🛡️ Simulated Moderator Dashboard
            </h4>
            <span className="font-mono text-[8px] bg-amber-100 text-amber-800 px-2 py-0.5 font-bold uppercase border border-amber-200">
              Admin View Mode
            </span>
          </div>
          <p className="text-[10px] text-amber-700 leading-relaxed">
            As a moderator, you can review flagged thoughts. Try typing terms like "hate" or "stupid" in the creation box to trigger automated holds, then approve or reject them here. Approved posts will show up in standard view.
          </p>
        </div>
      )}

      {/* Feed list */}
      <div className="space-y-6">
        {filteredPosts.length === 0 ? (
          <div className="bg-surface-dim/20 border border-outline border-dashed p-12 text-center text-on-surface-variant text-xs space-y-2">
            <p className="italic">No community discussions found here.</p>
            <button
              onClick={() => { setActiveTopic('all'); setSearchQuery(''); }}
              className="text-secondary font-mono text-[10px] underline hover:text-primary"
            >
              Clear filters and view all
            </button>
          </div>
        ) : (
          filteredPosts.map((post) => {
            const isPending = post.status === 'pending';
            const isFlagged = post.status === 'flagged';
            const repliesExpanded = expandedReplies[post.id];

            return (
              <div 
                key={post.id}
                className={`bg-white border hover:border-secondary/40 transition-all p-5 md:p-6 space-y-4 ${
                  isPending ? 'border-amber-400 bg-amber-50/10' : isFlagged ? 'border-rose-300 opacity-70' : 'border-outline'
                }`}
              >
                {/* Header info */}
                <div className="flex flex-wrap justify-between items-center gap-2 pb-1 border-b border-outline/30">
                  <div className="flex items-center gap-2 text-on-surface-variant font-mono text-[9px] uppercase tracking-wider">
                    <span className="bg-[#fcf8f2] border border-outline text-secondary px-2 py-0.5 font-bold">
                      {TOPICS.find(t => t.id === post.category)?.emoji} {post.category.toUpperCase()}
                    </span>
                    <span className="flex items-center gap-1 font-bold">
                      <User className="w-3 h-3 text-secondary" /> {post.author}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[9px] text-on-surface-variant font-mono">{post.time}</span>
                    {isPending && (
                      <span className="font-mono text-[8px] bg-amber-100 text-amber-800 border border-amber-200 px-1.5 py-0.2 font-bold uppercase">
                        Pending Approval
                      </span>
                    )}
                    {isFlagged && (
                      <span className="font-mono text-[8px] bg-rose-100 text-rose-800 border border-rose-200 px-1.5 py-0.2 font-bold uppercase">
                        Flagged
                      </span>
                    )}
                  </div>
                </div>

                {/* Main thought content */}
                <p className="text-xs text-primary leading-relaxed font-sans whitespace-pre-wrap select-text italic">
                  "{post.content}"
                </p>

                {/* Auto-moderation explanation panel (if pending or flagged) */}
                {post.flagReason && (
                  <div className="bg-amber-50 border border-amber-200 p-3 text-[10px] text-amber-800 font-mono space-y-1">
                    <p className="font-bold flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" /> Moderation Alert:
                    </p>
                    <p>{post.flagReason}</p>
                  </div>
                )}

                {/* Moderator Controls Box */}
                {moderatorMode && (
                  <div className="bg-[#fafafa] border border-dashed border-outline p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <span className="font-mono text-[9px] text-on-surface-variant font-bold uppercase tracking-wider flex items-center gap-1">
                      🛡️ Action required:
                    </span>
                    <div className="flex gap-2">
                      {post.status !== 'approved' && (
                        <button
                          onClick={() => handleApprovePost(post.id)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-1 text-[9px] font-mono uppercase tracking-wider flex items-center gap-1 font-bold cursor-pointer"
                        >
                          <Check className="w-3 h-3" /> Approve Post
                        </button>
                      )}
                      {post.status !== 'flagged' && (
                        <button
                          onClick={() => handleFlagPost(post.id, "Moderator manual flag: inappropriate or off-topic content.")}
                          className="bg-rose-600 hover:bg-rose-700 text-white px-2.5 py-1 text-[9px] font-mono uppercase tracking-wider flex items-center gap-1 font-bold cursor-pointer"
                        >
                          <Flag className="w-3 h-3" /> Flag Post
                        </button>
                      )}
                      <button
                        onClick={() => handleRejectPost(post.id)}
                        className="bg-primary hover:bg-primary/95 text-white px-2.5 py-1 text-[9px] font-mono uppercase tracking-wider flex items-center gap-1 font-bold cursor-pointer"
                      >
                        <X className="w-3 h-3" /> Delete Post
                      </button>
                    </div>
                  </div>
                )}

                {/* Peer Reactions (Therapeutic Style) */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-b border-outline/30 py-3">
                  <div className="flex flex-wrap gap-2">
                    {/* Hug reaction */}
                    <button
                      onClick={() => handleReact(post.id, 'hug')}
                      className={`px-3 py-1.5 border font-mono text-[9px] uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                        post.userReactions?.hug 
                        ? 'bg-secondary/15 text-secondary border-secondary font-bold' 
                        : 'bg-white border-outline text-on-surface-variant hover:bg-surface-dim'
                      }`}
                    >
                      <span>🫂</span>
                      <span>Supportive Hug ({post.reactions.hug})</span>
                    </button>

                    {/* Solidarity reaction */}
                    <button
                      onClick={() => handleReact(post.id, 'solidarity')}
                      className={`px-3 py-1.5 border font-mono text-[9px] uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                        post.userReactions?.solidarity 
                        ? 'bg-secondary/15 text-secondary border-secondary font-bold' 
                        : 'bg-white border-outline text-on-surface-variant hover:bg-surface-dim'
                      }`}
                    >
                      <span>✊</span>
                      <span>Me Too ({post.reactions.solidarity})</span>
                    </button>

                    {/* Perspective reaction */}
                    <button
                      onClick={() => handleReact(post.id, 'perspective')}
                      className={`px-3 py-1.5 border font-mono text-[9px] uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                        post.userReactions?.perspective 
                        ? 'bg-secondary/15 text-secondary border-secondary font-bold' 
                        : 'bg-white border-outline text-on-surface-variant hover:bg-surface-dim'
                      }`}
                    >
                      <span>💡</span>
                      <span>Great Perspective ({post.reactions.perspective})</span>
                    </button>
                  </div>

                  {/* Toggle replies view button */}
                  <button
                    onClick={() => toggleReplies(post.id)}
                    className="font-mono text-[9px] uppercase tracking-wider text-secondary hover:text-primary flex items-center gap-1"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{post.replies.length} peer replies</span>
                    <span>{repliesExpanded ? '▲' : '▼'}</span>
                  </button>
                </div>

                {/* Expanded Replies Thread */}
                {repliesExpanded && (
                  <div className="space-y-4 pl-3 sm:pl-6 border-l border-outline/50 mt-2 animate-in fade-in duration-200">
                    
                    {/* List existing replies */}
                    <div className="space-y-3">
                      {post.replies.map((reply) => (
                        <div key={reply.id} className="bg-surface-dim/20 p-3.5 border border-outline relative">
                          <div className="flex justify-between items-center text-[8px] font-mono uppercase tracking-wider text-on-surface-variant mb-1.5">
                            <span className="flex items-center gap-1 font-bold text-secondary">
                              <CornerDownRight className="w-3 h-3 text-secondary" /> {reply.author}
                            </span>
                            <span>{reply.time}</span>
                          </div>
                          <p className="text-xs text-on-surface-variant leading-relaxed font-sans">
                            {reply.content}
                          </p>
                        </div>
                      ))}

                      {post.replies.length === 0 && (
                        <p className="text-[10px] text-on-surface-variant italic py-2 pl-2">
                          No replies yet. Be the first to write an encouraging word!
                        </p>
                      )}
                    </div>

                    {/* Write Peer Reply Form */}
                    <div className="bg-[#fdfcfb] border border-outline p-4 space-y-3">
                      <div className="text-[9px] font-mono uppercase tracking-wider font-bold text-on-surface-variant">
                        Write an encouraging reply to this peer:
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-1">
                          <input
                            type="text"
                            placeholder="Alias (e.g. Hopeful)"
                            value={replyAliases[post.id] || ''}
                            onChange={(e) => setReplyAliases({ ...replyAliases, [post.id]: e.target.value })}
                            className="w-full bg-white border border-outline p-2 text-[10px] font-mono focus:outline-none focus:border-secondary"
                          />
                        </div>
                        <div className="sm:col-span-2 flex gap-2">
                          <input
                            type="text"
                            placeholder="Type encouraging advice or support..."
                            value={replyInputs[post.id] || ''}
                            onChange={(e) => setReplyInputs({ ...replyInputs, [post.id]: e.target.value })}
                            className="flex-1 bg-white border border-outline px-3 py-2 text-xs focus:outline-none focus:border-secondary font-sans"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleAddReply(post.id);
                              }
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => handleAddReply(post.id)}
                            className="bg-primary hover:bg-primary/95 text-white px-3 py-1 font-mono text-[9px] uppercase tracking-wider cursor-pointer font-bold flex items-center justify-center"
                          >
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>
                )}

              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
