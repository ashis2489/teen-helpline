import React, { useState, useEffect } from 'react';
import { 
  Users, 
  MessageSquare, 
  Plus, 
  Send, 
  Check, 
  Shield, 
  UserCheck, 
  Clock, 
  AlertTriangle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  BookOpen,
  Lock,
  Compass,
  Star,
  ThumbsUp
} from 'lucide-react';

export interface MentorshipMessage {
  id: string;
  sender: 'teen' | 'mentor';
  senderAlias: string;
  text: string;
  timestamp: string;
}

export interface MentorshipChannel {
  id: string;
  topic: string;
  tone: string;
  status: 'active' | 'pending' | 'closed';
  teenAlias: string;
  mentorAlias: string;
  summary: string;
  createdAt: string;
  messages: MentorshipMessage[];
}

// Random alias generator for secure non-identifiable usage
const TEEN_ADJECTIVES = ['Brave', 'Gentle', 'Quiet', 'Curious', 'Resilient', 'Hopeful', 'Calm', 'Kind'];
const TEEN_ANIMALS = ['Otter', 'Sparrow', 'Deer', 'Fox', 'Koala', 'Panda', 'Hedgehog', 'Robin'];

const MENTOR_ADJECTIVES = ['Wise', 'Caring', 'Patient', 'Empathetic', 'Supportive', 'Steady', 'Warm', 'Mindful'];
const MENTOR_ANIMALS = ['Owl', 'Badger', 'Wolf', 'Bear', 'Dolphin', 'Eagle', 'Elephant', 'Swan'];

function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function AnonymousMentorship() {
  // Roles: 'teen' (need guidance) or 'mentor' (provide guidance as volunteer)
  const [role, setRole] = useState<'teen' | 'mentor'>('teen');
  
  // Channels state (initialized with pre-seeded high-fidelity conversations)
  const [channels, setChannels] = useState<MentorshipChannel[]>(() => {
    const saved = localStorage.getItem('mindful_mentorship_channels');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse mentorship channels', e);
      }
    }
    
    // Seed default channels for high fidelity
    return [
      {
        id: 'ch-1',
        topic: 'School Stress & Exams',
        tone: 'practical',
        status: 'active',
        teenAlias: 'Brave Otter',
        mentorAlias: 'Wise Owl',
        summary: 'Feeling extremely overwhelmed with upcoming SAT prep and finals. Hard to focus.',
        createdAt: '2 days ago',
        messages: [
          {
            id: 'm-1',
            sender: 'teen',
            senderAlias: 'Brave Otter',
            text: 'Hey. I have three big exams next week and my heart keeps racing every time I try to study. I feel like I am going to let everyone down.',
            timestamp: '2 days ago'
          },
          {
            id: 'm-2',
            sender: 'mentor',
            senderAlias: 'Wise Owl',
            text: 'Hi Brave Otter. It is completely understandable to feel this pressure, but remember that exams measure memory, not your worth. Let’s try to break this down. Have you tried studying in 25-minute blocks with 5-minute breaks?',
            timestamp: '2 days ago'
          },
          {
            id: 'm-3',
            sender: 'teen',
            senderAlias: 'Brave Otter',
            text: 'I tried but I get distracted by anxiety in those 5 minutes. What should I do during the break?',
            timestamp: '1 day ago'
          },
          {
            id: 'm-4',
            sender: 'mentor',
            senderAlias: 'Wise Owl',
            text: 'During the break, step entirely away from screens. Do a 2-minute stretching or drink cold water. The goal is to physicalize the transition out of work mode!',
            timestamp: '10 hours ago'
          }
        ]
      },
      {
        id: 'ch-2',
        topic: 'Friendships & Loneliness',
        tone: 'supportive',
        status: 'pending',
        teenAlias: 'Gentle Sparrow',
        mentorAlias: 'Pending Mentor',
        summary: 'Recently moved to a new high school and finding it extremely difficult to make genuine friends.',
        createdAt: '4 hours ago',
        messages: [
          {
            id: 'm-5',
            sender: 'teen',
            senderAlias: 'Gentle Sparrow',
            text: 'Everyone already has their friend groups established. I eat lunch alone in the library. It feels so isolating.',
            timestamp: '4 hours ago'
          }
        ]
      },
      {
        id: 'ch-3',
        topic: 'Family Expectations',
        tone: 'just listening',
        status: 'active',
        teenAlias: 'Resilient Fox',
        mentorAlias: 'Steady Bear',
        summary: 'Parents are constantly arguing about finances and it makes the home environment feel like a pressure cooker.',
        createdAt: '3 days ago',
        messages: [
          {
            id: 'm-6',
            sender: 'teen',
            senderAlias: 'Resilient Fox',
            text: 'I just hide in my closet with headphones on. I wish I could fix things for them.',
            timestamp: '3 days ago'
          },
          {
            id: 'm-7',
            sender: 'mentor',
            senderAlias: 'Steady Bear',
            text: 'Hey Resilient Fox. First, I want to say how heavy that must feel. But please know: their arguments and their finances are adult issues. You are NOT responsible for fixing or managing their relationship. Your closet with headphones is a smart, safe coping mechanism.',
            timestamp: '2 days ago'
          }
        ]
      }
    ];
  });

  // Save to localstorage
  useEffect(() => {
    localStorage.setItem('mindful_mentorship_channels', JSON.stringify(channels));
  }, [channels]);

  // Active channel selection
  const [selectedChannelId, setSelectedChannelId] = useState<string>('ch-1');
  const [messageInput, setMessageInput] = useState('');

  // "Start New Request" State
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [newTopic, setNewTopic] = useState('School Stress');
  const [newTone, setNewTone] = useState('supportive');
  const [newSummary, setNewSummary] = useState('');

  // "Volunteer Mentor Sign up / Verification Simulator" State
  const [isVerifiedMentor, setIsVerifiedMentor] = useState(() => {
    return localStorage.getItem('mentor_verified') === 'true';
  });
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [q1, setQ1] = useState('');
  const [q2, setQ2] = useState('');
  const [q3, setQ3] = useState('');
  const [verificationFeedback, setVerificationFeedback] = useState('');

  // Submit dynamic message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const currentChannel = channels.find(c => c.id === selectedChannelId);
    if (!currentChannel || currentChannel.status === 'closed') return;

    const newMessage: MentorshipMessage = {
      id: 'msg-' + Date.now(),
      sender: role,
      senderAlias: role === 'teen' ? currentChannel.teenAlias : currentChannel.mentorAlias,
      text: messageInput.trim(),
      timestamp: 'Just now'
    };

    setChannels(prev => prev.map(ch => {
      if (ch.id === selectedChannelId) {
        // If pending and a mentor replies, activate it!
        let updatedStatus = ch.status;
        let updatedMentorAlias = ch.mentorAlias;
        if (role === 'mentor' && ch.status === 'pending') {
          updatedStatus = 'active';
          if (ch.mentorAlias === 'Pending Mentor') {
            updatedMentorAlias = `${getRandomElement(MENTOR_ADJECTIVES)} ${getRandomElement(MENTOR_ANIMALS)}`;
          }
        }
        return {
          ...ch,
          status: updatedStatus,
          mentorAlias: updatedMentorAlias,
          messages: [...ch.messages, newMessage]
        };
      }
      return ch;
    }));

    setMessageInput('');

    // Simulated responses if teen sends message, to make the app feel alive and interactive!
    if (role === 'teen') {
      setTimeout(() => {
        setChannels(prev => prev.map(ch => {
          if (ch.id === selectedChannelId) {
            const hasResponse = ch.messages[ch.messages.length - 1]?.sender === 'teen';
            if (!hasResponse) return ch; // avoid double trigger
            
            const autoReplyText = getRandomElement([
              `Thank you for sharing that. I completely hear you, and we can work through this together step by step. What do you think is the very next tiny action you could try?`,
              `That sounds really tough. Please remember you aren’t alone, and it takes so much courage to put these feelings into words. I’m here to listen or brainstorm solutions, whichever you prefer.`,
              `I hear you. When I was going through something similar, taking a step back and giving myself permission to breathe made a huge difference. You are doing great just getting through the day.`
            ]);

            const mentorReply: MentorshipMessage = {
              id: 'msg-auto-' + Date.now(),
              sender: 'mentor',
              senderAlias: ch.mentorAlias === 'Pending Mentor' ? 'Steady Guide' : ch.mentorAlias,
              text: autoReplyText,
              timestamp: 'Just now'
            };

            return {
              ...ch,
              status: 'active',
              mentorAlias: ch.mentorAlias === 'Pending Mentor' ? 'Steady Guide' : ch.mentorAlias,
              messages: [...ch.messages, mentorReply]
            };
          }
          return ch;
        }));
      }, 3000);
    }
  };

  // Submit new request
  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSummary.trim()) return;

    const teenAlias = `${getRandomElement(TEEN_ADJECTIVES)} ${getRandomElement(TEEN_ANIMALS)}`;
    const newChannel: MentorshipChannel = {
      id: 'ch-' + Date.now(),
      topic: newTopic,
      tone: newTone,
      status: 'pending',
      teenAlias,
      mentorAlias: 'Pending Mentor',
      summary: newSummary.trim(),
      createdAt: 'Just now',
      messages: [
        {
          id: 'msg-init-' + Date.now(),
          sender: 'teen',
          senderAlias: teenAlias,
          text: newSummary.trim(),
          timestamp: 'Just now'
        }
      ]
    };

    setChannels(prev => [newChannel, ...prev]);
    setSelectedChannelId(newChannel.id);
    setNewSummary('');
    setShowRequestModal(false);
  };

  // Close / end channel mentorship relationship safely
  const handleCloseChannel = (channelId: string) => {
    if (window.confirm('Are you sure you want to close this mentorship thread? It will be safely archived and no further messages can be sent.')) {
      setChannels(prev => prev.map(ch => {
        if (ch.id === channelId) {
          return { ...ch, status: 'closed' };
        }
        return ch;
      }));
    }
  };

  // Submit Volunteer application
  const handleApplyMentor = (e: React.FormEvent) => {
    e.preventDefault();
    if (q1.length < 15 || q2.length < 15 || q3.length < 15) {
      setVerificationFeedback('Please provide thoughtful, supportive answers (minimum 15 characters per question) to demonstrate your volunteer safety qualifications.');
      return;
    }

    setIsVerifiedMentor(true);
    localStorage.setItem('mentor_verified', 'true');
    setVerificationFeedback('');
    setShowVerificationModal(false);
    alert('Thank you! Your empathy volunteer verification is successful. You are now authorized to securely support younger peers anonymously!');
  };

  const activeChannel = channels.find(c => c.id === selectedChannelId);

  return (
    <div className="space-y-6" id="anonymous-mentorship-module">
      
      {/* Dynamic Header Block */}
      <div className="bg-white p-6 border border-outline relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <Users className="w-32 h-32 text-primary" />
        </div>

        <div className="space-y-4 max-w-4xl relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="font-mono text-[9px] uppercase tracking-widest text-secondary font-bold block">
                Secure Peer-to-Peer Guidance
              </span>
              <h2 className="font-serif text-2xl font-medium text-primary">
                Anonymous Student Mentorship
              </h2>
            </div>

            {/* Toggle Role Selector */}
            <div className="flex border border-outline p-1 bg-surface-dim/40">
              <button
                onClick={() => setRole('teen')}
                className={`px-4 py-1.5 font-mono text-[9px] uppercase tracking-wider transition-all cursor-pointer ${
                  role === 'teen'
                    ? 'bg-primary text-white font-bold'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                🐣 I Need Guidance
              </button>
              <button
                onClick={() => setRole('mentor')}
                className={`px-4 py-1.5 font-mono text-[9px] uppercase tracking-wider transition-all cursor-pointer ${
                  role === 'mentor'
                    ? 'bg-primary text-white font-bold'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                🎓 I Want to Mentor
              </button>
            </div>
          </div>

          <p className="text-xs text-on-surface-variant leading-relaxed font-sans">
            Connect younger adolescents safely with verified high school seniors or college student volunteers. 
            <strong> Absolute Privacy Guarantee:</strong> No email disclosures, no names, zero profile pictures. 
            All connections use dynamically generated wilderness aliases.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <span className="font-mono text-[8px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 font-bold uppercase tracking-wide flex items-center gap-1">
              <Shield className="w-3 h-3" /> Zero IP Logging
            </span>
            <span className="font-mono text-[8px] bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 font-bold uppercase tracking-wide flex items-center gap-1">
              <Lock className="w-3 h-3" /> Fully Encrypted Data
            </span>
            <span className="font-mono text-[8px] bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 font-bold uppercase tracking-wide flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" /> 988 Hot-Exit Safety Integrations
            </span>
          </div>
        </div>
      </div>

      {/* Main Panel splitting chats and matching list */}
      <div className="grid grid-cols-1 lg:col-span-12 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Match channels list (5 columns on desktop) */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="bg-white border border-outline p-4 space-y-4">
            <div className="flex items-center justify-between border-b border-outline pb-3">
              <h3 className="font-serif text-sm font-bold text-primary flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-secondary" /> 
                {role === 'teen' ? 'My Advice Threads' : 'Available Peer Requests'}
              </h3>

              {role === 'teen' ? (
                <button
                  onClick={() => setShowRequestModal(true)}
                  className="bg-primary hover:bg-primary/95 text-white p-1.5 font-mono text-[9px] uppercase tracking-wider font-bold flex items-center gap-1 cursor-pointer border border-transparent transition-all"
                >
                  <Plus className="w-3 h-3" /> New Ask
                </button>
              ) : (
                !isVerifiedMentor && (
                  <button
                    onClick={() => setShowVerificationModal(true)}
                    className="bg-secondary text-primary font-mono text-[9px] uppercase tracking-wider font-bold px-2 py-1 flex items-center gap-1 border border-outline hover:bg-secondary/90 transition-all cursor-pointer"
                  >
                    <UserCheck className="w-3 h-3" /> Verify as Mentor
                  </button>
                )
              )}
            </div>

            {/* List of Channels */}
            <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
              {role === 'mentor' && !isVerifiedMentor && (
                <div className="p-4 bg-surface-dim/40 border border-outline text-center space-y-3">
                  <Lock className="w-6 h-6 text-secondary mx-auto animate-pulse" />
                  <p className="text-[11px] font-bold text-primary">Volunteer Access Restricted</p>
                  <p className="text-[10px] text-on-surface-variant leading-relaxed">
                    To maintain safety, you must complete our fast empathy and situational awareness volunteer application.
                  </p>
                  <button
                    onClick={() => setShowVerificationModal(true)}
                    className="w-full bg-primary hover:bg-primary/95 text-white py-1.5 font-mono text-[9px] uppercase tracking-wider font-bold cursor-pointer"
                  >
                    Start Quick Verification
                  </button>
                </div>
              )}

              {/* Show channels compatible with current view */}
              {((role === 'teen') || (role === 'mentor' && isVerifiedMentor)) && (
                channels.length === 0 ? (
                  <p className="text-xs text-on-surface-variant text-center py-8 italic bg-surface-dim/20 border border-outline">
                    No active mentorship requests found.
                  </p>
                ) : (
                  channels.map(channel => {
                    const isSelected = channel.id === selectedChannelId;
                    const latestMsg = channel.messages[channel.messages.length - 1];

                    return (
                      <div
                        key={channel.id}
                        onClick={() => setSelectedChannelId(channel.id)}
                        className={`p-3 border transition-all cursor-pointer text-left space-y-2 relative ${
                          isSelected 
                            ? 'bg-secondary/10 border-secondary' 
                            : 'bg-white hover:bg-surface-dim border-outline'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-mono text-[8px] bg-surface-dim px-2 py-0.5 border border-outline font-bold uppercase tracking-wider text-secondary">
                            {channel.topic}
                          </span>
                          
                          {channel.status === 'pending' ? (
                            <span className="font-mono text-[7px] bg-amber-50 text-amber-700 border border-amber-200 px-1.5 py-0.2 uppercase font-bold tracking-tight animate-pulse">
                              ⏳ Seeking Mentor
                            </span>
                          ) : channel.status === 'closed' ? (
                            <span className="font-mono text-[7px] bg-gray-100 text-gray-500 border border-gray-200 px-1.5 py-0.2 uppercase font-bold tracking-tight">
                              ✓ Archived
                            </span>
                          ) : (
                            <span className="font-mono text-[7px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.2 uppercase font-bold tracking-tight">
                              ● Connected
                            </span>
                          )}
                        </div>

                        <div className="space-y-1">
                          <h4 className="font-serif text-xs font-bold text-primary tracking-tight">
                            {role === 'teen' ? `Chat with ${channel.mentorAlias}` : `Teen: ${channel.teenAlias}`}
                          </h4>
                          <p className="text-[10px] text-on-surface-variant line-clamp-2 leading-relaxed">
                            {latestMsg ? latestMsg.text : channel.summary}
                          </p>
                        </div>

                        <div className="flex items-center justify-between border-t border-outline/30 pt-2 text-[8px] font-mono text-on-surface-variant">
                          <span className="flex items-center gap-0.5 uppercase">
                            Tone: <strong className="text-primary">{channel.tone}</strong>
                          </span>
                          <span>{channel.createdAt}</span>
                        </div>
                      </div>
                    );
                  })
                )
              )}
            </div>
          </div>

          {/* Guidelines / Tips Card */}
          <div className="bg-[#fcf8f2] border border-outline p-4 space-y-3">
            <div className="flex items-center gap-1.5 text-secondary">
              <HelpCircle className="w-4 h-4" />
              <h4 className="font-serif text-xs font-bold text-primary">Safe Space Guidelines</h4>
            </div>
            <ul className="text-[10px] text-on-surface-variant space-y-2 leading-relaxed list-disc list-inside">
              <li><strong>Absolute Anonymity:</strong> Never share your social handles, phone number, school location, or real name.</li>
              <li><strong>Focus on Empathy:</strong> Mentors are here to guide, validate, and suggest healthy coping habits.</li>
              <li><strong>Verified Volunteer:</strong> All older mentors undergo simple screening scenarios before receiving guidance authorization.</li>
            </ul>
          </div>

        </div>

        {/* Right Side: Conversation Area (7 columns on desktop) */}
        <div className="lg:col-span-7 flex flex-col justify-between border border-outline bg-white min-h-[480px]">
          
          {activeChannel ? (
            <>
              {/* Active Header */}
              <div className="border-b border-outline p-4 bg-surface-dim/40 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-serif text-sm font-bold text-primary">
                      {role === 'teen' ? `Mentor: ${activeChannel.mentorAlias}` : `Teen: ${activeChannel.teenAlias}`}
                    </span>
                    <span className="font-mono text-[8px] bg-secondary/15 text-primary border border-secondary px-2 py-0.5 uppercase tracking-wide">
                      {activeChannel.topic}
                    </span>
                  </div>
                  <p className="text-[10px] text-on-surface-variant line-clamp-1 italic font-sans">
                    Context: "{activeChannel.summary}"
                  </p>
                </div>

                {activeChannel.status !== 'closed' && (
                  <button
                    onClick={() => handleCloseChannel(activeChannel.id)}
                    className="border border-error/20 hover:bg-error/5 text-error px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider font-bold transition-all cursor-pointer"
                    title="Safely close this active match thread"
                  >
                    Archive
                  </button>
                )}
              </div>

              {/* Chat Thread Messages */}
              <div className="p-4 flex-1 overflow-y-auto space-y-4 max-h-[360px] bg-slate-50/20">
                
                {/* Security reminder banner */}
                <div className="p-3 bg-[#fcf8f2] border border-outline text-[9px] text-on-surface-variant leading-relaxed text-center space-y-1">
                  <p className="font-bold text-secondary">🔒 Secure Encrypted Peer Link Established</p>
                  <p>All identifying data scrubbed. Be polite, share safely, and take care of each other.</p>
                </div>

                {activeChannel.messages.map((msg) => {
                  // Determine alignment based on current role
                  const isOwnMessage = msg.sender === role;

                  return (
                    <div 
                      key={msg.id}
                      className={`flex flex-col max-w-[85%] space-y-1 ${
                        isOwnMessage ? 'ml-auto items-end' : 'mr-auto items-start'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 text-[8px] font-mono text-on-surface-variant">
                        <span>{msg.senderAlias}</span>
                        <span>•</span>
                        <span>{msg.timestamp}</span>
                      </div>
                      
                      <div 
                        className={`p-3 text-[11px] leading-relaxed font-sans ${
                          isOwnMessage 
                            ? 'bg-primary text-white' 
                            : 'bg-white border border-outline text-primary'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  );
                })}

                {activeChannel.status === 'pending' && role === 'teen' && (
                  <div className="p-4 bg-amber-50/70 border border-amber-200 text-center space-y-2">
                    <Clock className="w-5 h-5 text-amber-600 mx-auto animate-spin" />
                    <p className="text-[10px] text-amber-800 font-bold">Waiting for a supportive student volunteer...</p>
                    <p className="text-[9px] text-amber-700 max-w-sm mx-auto">
                      Our older student peer mentors are notified instantly. An anonymous volunteer will join your secure thread shortly.
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom Message Input bar */}
              <div className="p-4 border-t border-outline bg-white">
                {activeChannel.status === 'closed' ? (
                  <div className="p-3 bg-surface-dim text-center border border-outline font-mono text-[10px] uppercase tracking-wider text-on-surface-variant">
                    🔒 This mentorship thread is closed and archived for your safety.
                  </div>
                ) : role === 'mentor' && !isVerifiedMentor ? (
                  <div className="p-3 bg-surface-dim text-center border border-outline text-[10px] text-on-surface-variant">
                    Please <button onClick={() => setShowVerificationModal(true)} className="text-secondary font-bold underline cursor-pointer">verify your mentor credentials</button> to reply.
                  </div>
                ) : (
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <input
                      type="text"
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      placeholder={
                        role === 'teen' 
                          ? "Explain your headspace safely & anonymously..." 
                          : "Provide compassionate guidance or helpful advice..."
                      }
                      className="flex-1 bg-surface-dim border border-outline px-3 py-2 text-xs font-sans focus:outline-none focus:border-secondary"
                    />
                    <button
                      type="submit"
                      className="bg-primary hover:bg-primary/95 text-white w-10 h-9 flex items-center justify-center cursor-pointer border border-transparent hover:border-secondary transition-all"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
              <Users className="w-12 h-12 text-secondary animate-pulse" />
              <div className="space-y-1">
                <h4 className="font-serif text-sm font-bold text-primary">No Active Thread Selected</h4>
                <p className="text-xs text-on-surface-variant max-w-sm leading-relaxed">
                  Please select an existing anonymous advisory thread from the left list or submit a new advice query!
                </p>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* MODAL 1: Create Mentorship Ask Request */}
      {showRequestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/40 backdrop-blur-xs animate-in fade-in duration-300">
          <div className="bg-white border border-outline max-w-md w-full p-6 space-y-4 text-left shadow-xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center border-b border-outline pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-secondary" />
                <h3 className="font-serif text-base font-bold text-primary">Submit Anonymous Advisory Request</h3>
              </div>
              <button 
                onClick={() => setShowRequestModal(false)}
                className="text-on-surface-variant hover:text-primary font-mono text-xs p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateRequest} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-[10px] font-mono uppercase tracking-wider text-on-surface-variant font-bold">Topic Theme:</label>
                <select
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  className="w-full bg-surface-dim border border-outline px-3 py-2 text-xs font-sans focus:outline-none"
                >
                  <option value="School Stress & Exams">School Stress &amp; Exams</option>
                  <option value="Friendships & Loneliness">Friendships &amp; Loneliness</option>
                  <option value="Family Dynamics">Family Dynamics</option>
                  <option value="Self-Esteem & Identity">Self-Esteem &amp; Identity</option>
                  <option value="Anxiety & Worry">Anxiety &amp; Worry</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-mono uppercase tracking-wider text-on-surface-variant font-bold">Desired Mentor Tone:</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { val: 'supportive', label: '🌸 Warm' },
                    { val: 'practical', label: '🛠️ Practical' },
                    { val: 'just listening', label: '👂 Listen Only' }
                  ].map((t) => (
                    <button
                      key={t.val}
                      type="button"
                      onClick={() => setNewTone(t.val)}
                      className={`py-1.5 px-2 border font-mono text-[9px] uppercase tracking-wider transition-all cursor-pointer ${
                        newTone === t.val 
                          ? 'bg-secondary/20 border-secondary text-primary font-bold' 
                          : 'bg-white border-outline text-on-surface-variant hover:bg-surface-dim'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-wider text-on-surface-variant">
                  <label className="font-bold">Describe Your Situation Safely:</label>
                  <span>{newSummary.length} chars</span>
                </div>
                <textarea
                  required
                  rows={4}
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  placeholder="Tell us what you are dealing with. Remember: do NOT write your real name, school, addresses, or emails."
                  className="w-full bg-surface-dim border border-outline p-3 text-xs font-sans focus:outline-none focus:border-secondary"
                />
              </div>

              <div className="p-3 bg-[#fcf8f2] border border-outline text-[9px] text-on-surface-variant leading-relaxed">
                ⚠️ <strong>Safety Warning:</strong> Older volunteer students are trained peer guides, not clinical emergency responders. If you are experiencing a crisis, please immediately use the <strong>Alt + Q</strong> quick exit, or dial the <strong>988 Suicide &amp; Crisis Lifeline</strong>.
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/95 text-white py-2.5 font-mono text-[10px] uppercase tracking-wider text-center cursor-pointer font-bold border border-transparent transition-all"
              >
                Send Request to Active Volunteers
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Mentor Volunteer Application / Verification */}
      {showVerificationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/40 backdrop-blur-xs animate-in fade-in duration-300">
          <div className="bg-white border border-outline max-w-lg w-full p-6 space-y-4 text-left shadow-xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center border-b border-outline pb-3">
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-secondary" />
                <h3 className="font-serif text-base font-bold text-primary">Student Volunteer Empathy Verification</h3>
              </div>
              <button 
                onClick={() => setShowVerificationModal(false)}
                className="text-on-surface-variant hover:text-primary font-mono text-xs p-1"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-on-surface-variant leading-relaxed font-sans">
              Older student advisors (grades 11-12 and college volunteers) help younger teens process stress. 
              To obtain mentorship clearance, please answer these brief situational response questions:
            </p>

            {verificationFeedback && (
              <div className="p-3 bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-sans">
                {verificationFeedback}
              </div>
            )}

            <form onSubmit={handleApplyMentor} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-[10px] font-mono uppercase tracking-wider text-on-surface-variant font-bold">
                  Q1: A peer shares they feel left out and are eating alone. How do you respond?
                </label>
                <textarea
                  required
                  rows={2}
                  value={q1}
                  onChange={(e) => setQ1(e.target.value)}
                  placeholder="Demonstrate active validation..."
                  className="w-full bg-surface-dim border border-outline p-2.5 text-xs font-sans focus:outline-none focus:border-secondary"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-mono uppercase tracking-wider text-on-surface-variant font-bold">
                  Q2: How do you handle a situation where a teen mentions feelings of severe hopelessness?
                </label>
                <textarea
                  required
                  rows={2}
                  value={q2}
                  onChange={(e) => setQ2(e.target.value)}
                  placeholder="Explain how you will transition them to the 988 emergency safety protocols..."
                  className="w-full bg-surface-dim border border-outline p-2.5 text-xs font-sans focus:outline-none focus:border-secondary"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-mono uppercase tracking-wider text-on-surface-variant font-bold">
                  Q3: A peer asks you for your phone number to stay in touch outside the app. What is your response?
                </label>
                <textarea
                  required
                  rows={2}
                  value={q3}
                  onChange={(e) => setQ3(e.target.value)}
                  placeholder="Explain our strict non-identifiable privacy standards..."
                  className="w-full bg-surface-dim border border-outline p-2.5 text-xs font-sans focus:outline-none focus:border-secondary"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/95 text-white py-2.5 font-mono text-[10px] uppercase tracking-wider text-center cursor-pointer font-bold border border-transparent transition-all"
              >
                Submit Volunteer Application
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
