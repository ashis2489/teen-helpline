import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowLeft, 
  Send, 
  Video, 
  Mic, 
  PhoneOff, 
  FileText, 
  Paperclip, 
  CheckCheck,
  Brain,
  Zap
} from 'lucide-react';
import { Counselor, Message } from '../types';

interface LiveSessionViewProps {
  counselor: Counselor;
  sessionType: string;
  onLeave: () => void;
}

export default function LiveSessionView({ counselor, sessionType, onLeave }: LiveSessionViewProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      sender: 'counselor',
      senderName: counselor.name,
      text: `Hi James! I'm so glad we connected today. I saw your notes. How are you feeling right now, and where should we start?`,
      timestamp: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  
  // Breathing exercise states
  const [breathStage, setBreathStage] = useState<'inhale' | 'hold' | 'exhale' | 'idle'>('idle');
  const [breathCounter, setBreathCounter] = useState(4);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Breathing loop timer
  useEffect(() => {
    if (breathStage === 'idle') return;

    const timer = setInterval(() => {
      setBreathCounter((prev) => {
        if (prev <= 1) {
          if (breathStage === 'inhale') {
            setBreathStage('hold');
            return 4; // Hold for 4 seconds
          } else if (breathStage === 'hold') {
            setBreathStage('exhale');
            return 4; // Exhale for 4 seconds
          } else if (breathStage === 'exhale') {
            setBreathStage('inhale');
            return 4; // Inhale for 4 seconds
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [breathStage]);

  const startBreathing = () => {
    setBreathStage('inhale');
    setBreathCounter(4);
  };

  const stopBreathing = () => {
    setBreathStage('idle');
  };

  // Simulate Counselor empathetic reply
  const handleSendMessage = (textToSend: string, fileAttached?: string) => {
    if (!textToSend.trim() && !fileAttached) return;

    const studentMessage: Message = {
      id: `std-${Date.now()}`,
      sender: 'student',
      senderName: 'James',
      text: textToSend,
      timestamp: 'Just now',
      fileAttached
    };

    setMessages((prev) => [...prev, studentMessage]);
    setInputText('');

    // Trigger typing simulation
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      
      let counselorResponse = '';
      const textLower = textToSend.toLowerCase();

      if (textLower.includes('anxious') || textLower.includes('stress') || textLower.includes('anxiety') || textLower.includes('scared') || textLower.includes('panic') || textLower.includes('overwhelmed') || textLower.includes('fear')) {
        counselorResponse = `I completely hear you, James. Anxiety can make your chest feel tight and scatter your thoughts. Why don't we try the interactive Breathing Tool on the right side of our workspace for a minute? It's a quick way to steady ourselves. Also, remember you can access our 5-4-3-2-1 Sensory Grounding tool on the Dashboard anytime!`;
      } else if (textLower.includes('career') || textLower.includes('stem') || textLower.includes('coding') || textLower.includes('job') || textLower.includes('bootcamp') || textLower.includes('web dev') || textLower.includes('programming')) {
        counselorResponse = `Plotting a career in technology or STEM is a super exciting adventure, but don't feel pressured to have it all figured out right now. We can look at traditional degrees or direct skill bootcamps, and start by drafting a humble single-page developer portfolio. What programming languages or tech hobbies spark your interest?`;
      } else if (textLower.includes('study') || textLower.includes('exam') || textLower.includes('grades') || textLower.includes('homework') || textLower.includes('math') || textLower.includes('chemistry') || textLower.includes('class')) {
        counselorResponse = `Academic overload is so real, and school grades do not define your human worth or future options. Let's practice simple task chunking: pick just ONE assignment, work on it for 15 minutes, and then reward yourself with a walk. What is the main subject or test worrying you right now?`;
      } else if (textLower.includes('college') || textLower.includes('university') || textLower.includes('apply') || textLower.includes('scholarship') || textLower.includes('applications')) {
        counselorResponse = `Applying to university can feel like a second job, and peer comparison makes it tougher. Remember that community college transfers, state schools, and trade certifications lead to incredibly rewarding, high-paying careers. Let's map out 2 colleges you like, or explore scholarship options calmly without any rush.`;
      } else if (textLower.includes('lonely') || textLower.includes('friend') || textLower.includes('relationship') || textLower.includes('isolated') || textLower.includes('fight') || textLower.includes('parent') || textLower.includes('parents')) {
        counselorResponse = `Navigating high school friendships, relationship conflicts, or explaining your goals to parents is incredibly tough. You are not alone in feeling isolated or misunderstood. Writing down your feelings in our local Coping Journal on the Dashboard can give your mind some quiet space. I'm here to listen to anything you want to vent about.`;
      } else if (textLower.includes('sleep') || textLower.includes('tired') || textLower.includes('exhausted') || textLower.includes('burnout') || textLower.includes('overworked')) {
        counselorResponse = `Exhaustion drains our emotional resilience so fast. Remember, rest is not a reward you have to earn—it's a basic survival requirement. Try to put away your phone 30 minutes before sleep, and remember that it's perfectly okay to let non-urgent tasks sit until tomorrow. Your health comes first!`;
      } else if (textLower.includes('help') || textLower.includes('crisis') || textLower.includes('emergency') || textLower.includes('hurt') || textLower.includes('danger') || textLower.includes('sad')) {
        counselorResponse = `James, please know that your life, feelings, and safety are incredibly precious to us. If you are in immediate danger of hurting yourself or feeling extremely unsafe, please click 'Emergency 988' at the top of the screen or text HOME to 741741. These connections are 100% free, secure, private, and have professional networks available 24/7.`;
      } else {
        counselorResponse = `Thank you for sharing that with me, James. It's totally natural to feel that way during high school transitions. I'm right here with you in this safe workspace. What do you think would bring you the most comfort or clarity right now?`;
      }

      const counselorReply: Message = {
        id: `cns-${Date.now()}`,
        sender: 'counselor',
        senderName: counselor.name,
        text: counselorResponse,
        timestamp: 'Just now'
      };

      setMessages((prev) => [...prev, counselorReply]);
    }, 2500);
  };

  // Handle manual file selection via click
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleSendMessage(`Sent file attachment: ${file.name}`, file.name);
    }
  };

  // Drag and Drop implementation
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleSendMessage(`Uploaded document: ${file.name}`, file.name);
    }
  };

  return (
    <div className="min-h-screen bg-background text-primary font-sans flex flex-col">
      
      {/* Top Header info and emergency leave */}
      <header className="bg-white/80 backdrop-blur-md h-20 border-b border-outline px-6 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <button 
            onClick={onLeave}
            className="w-9 h-9 bg-surface-dim border border-outline flex items-center justify-center text-on-surface-variant hover:bg-white transition-colors cursor-pointer"
            title="Leave workspace"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-3">
            <img 
              className="w-10 h-10 rounded-full object-cover border border-outline"
              src={counselor.avatar}
              referrerPolicy="no-referrer"
              alt={counselor.name}
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-serif text-sm font-bold text-primary">{counselor.name}</h1>
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              </div>
              <p className="font-mono text-[8px] uppercase tracking-wider text-secondary font-bold">{sessionType} - Active</p>
            </div>
          </div>
        </div>

        {/* Emergency leave trigger */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-[9px] uppercase tracking-wider text-on-surface-variant hidden md:inline">Private &amp; Anonymous</span>
          <button 
            onClick={onLeave}
            className="bg-error hover:bg-error/95 text-white px-5 py-2 rounded-none font-mono text-[10px] uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-all"
          >
            <PhoneOff className="w-3.5 h-3.5" />
            End Session
          </button>
        </div>
      </header>

      {/* Main live chat / workspace grid */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch overflow-hidden">
        
        {/* Left Columns: Live formats (Video/Voice placeholder or Chat list) */}
        <div className="lg:col-span-8 flex flex-col bg-white border border-outline shadow-sm overflow-hidden min-h-[450px]">
          
          {/* Audio/Video visualizers if format is set */}
          {(sessionType.includes('Video') || sessionType.includes('Voice')) && (
            <div className="bg-primary aspect-video w-full flex items-center justify-center relative border-b border-outline">
              <div className="absolute top-4 left-4 z-10 bg-black/50 text-white px-3 py-1 font-mono text-[8px] uppercase tracking-wider flex items-center gap-1.5 border border-white/10">
                {sessionType.includes('Video') ? <Video className="w-3.5 h-3.5 text-secondary" /> : <Mic className="w-3.5 h-3.5 text-secondary" />}
                <span>Live Feed</span>
              </div>

              {/* Simulated Camera feed / Animated avatar */}
              <div className="text-center space-y-4">
                <div className="relative inline-block">
                  <img 
                    className="w-20 h-20 rounded-full object-cover border-2 border-secondary animate-pulse mx-auto filter contrast-105"
                    src={counselor.avatar}
                    referrerPolicy="no-referrer"
                    alt={counselor.name}
                  />
                  <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-primary"></span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-white font-serif font-bold text-base">{counselor.name}</h3>
                  <p className="text-slate-400 font-mono text-[9px] uppercase tracking-wider">Audio Stream Active • Speaks {counselor.languages.join(', ')}</p>
                </div>
              </div>
            </div>
          )}

          {/* Messages list with custom drag-and-drop overlay */}
          <div 
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`flex-1 p-6 overflow-y-auto space-y-4 relative ${isDragOver ? 'bg-[#fcf8f2]/35' : ''}`}
          >
            {isDragOver && (
              <div className="absolute inset-0 bg-[#fcf8f2] backdrop-blur-xs z-30 flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-secondary">
                <Paperclip className="w-10 h-10 text-secondary animate-bounce mb-2" />
                <h3 className="font-serif text-lg font-bold text-primary">Drop files here to share</h3>
                <p className="font-mono text-[10px] uppercase tracking-wider text-on-surface-variant max-w-xs mt-1">
                  Share homework, resume drafts, internship specs, or coping logs directly and securely.
                </p>
              </div>
            )}

            {messages.map((m) => {
              const isMe = m.sender === 'student';
              return (
                <div 
                  key={m.id}
                  className={`flex gap-3 max-w-xl ${isMe ? 'ml-auto flex-row-reverse' : ''}`}
                >
                  {/* Sender Avatar */}
                  {!isMe && (
                    <img 
                      className="w-8 h-8 rounded-full object-cover border border-outline mt-1 shrink-0 filter contrast-105"
                      src={counselor.avatar}
                      referrerPolicy="no-referrer"
                      alt={m.senderName}
                    />
                  )}

                  {/* Message bubble */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 px-1 font-mono text-[9px] uppercase tracking-wider text-on-surface-variant">
                      <span className="font-bold text-primary">{m.senderName}</span>
                      <span className="opacity-80">{m.timestamp}</span>
                    </div>

                    <div className={`p-4 text-xs leading-relaxed border ${
                      isMe 
                      ? 'bg-secondary text-white border-secondary' 
                      : 'bg-surface-dim text-primary border-outline'
                    }`}>
                      <p>{m.text}</p>
                      
                      {m.fileAttached && (
                        <div className={`mt-3 p-2.5 flex items-center gap-2 text-[10px] font-mono border ${
                          isMe ? 'bg-black/10 border-white/15 text-white' : 'bg-white border-outline text-[#3f4850]'
                        }`}>
                          <FileText className="w-3.5 h-3.5 shrink-0 text-secondary" />
                          <span className="truncate">{m.fileAttached}</span>
                          <span className="ml-auto text-[8px] bg-primary text-white px-1.5 py-0.5 uppercase font-bold tracking-widest">Shared</span>
                        </div>
                      )}
                    </div>

                    {isMe && (
                      <div className="flex justify-end pr-1 pt-0.5 text-secondary">
                        <CheckCheck className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Simulated typing bubble */}
            {isTyping && (
              <div className="flex gap-3 max-w-md">
                <img 
                  className="w-8 h-8 rounded-full object-cover border border-outline mt-1"
                  src={counselor.avatar}
                  referrerPolicy="no-referrer"
                  alt={counselor.name}
                />
                <div className="space-y-1">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-on-surface-variant font-bold">{counselor.name}</span>
                  <div className="bg-surface-dim border border-outline px-4 py-3 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-bounce delay-100"></span>
                    <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-bounce delay-200"></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={chatEndRef}></div>
          </div>

          {/* Form message sender with attachment clip */}
          <div className="p-4 bg-surface-dim/40 border-t border-outline">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputText);
              }}
              className="flex gap-3 items-center"
            >
              <input 
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.txt"
              />
              <button 
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-11 h-11 bg-white hover:bg-surface-dim border border-outline flex items-center justify-center text-primary transition-colors cursor-pointer"
                title="Select file attachment"
              >
                <Paperclip className="w-4 h-4" />
              </button>

              <input 
                type="text" 
                placeholder="Type your secure message... (Try keywords like 'anxious', 'coding', or 'exam')"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 bg-white border border-outline px-4 py-3 text-xs focus:outline-none focus:border-secondary font-mono"
              />

              <button 
                type="submit"
                disabled={!inputText.trim()}
                className={`w-11 h-11 flex items-center justify-center text-white transition-all ${
                  inputText.trim() 
                  ? 'bg-secondary hover:bg-secondary/95 cursor-pointer' 
                  : 'bg-surface-dim text-slate-400 border border-outline cursor-not-allowed'
                }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

        {/* Right Column: Custom Coping Kit / Breathing Exercise */}
        <div className="lg:col-span-4 space-y-6 flex flex-col justify-between">
          
          {/* Diaphragmatic Breathing Tool */}
          <div className="bg-white p-6 border border-outline flex flex-col items-center justify-between text-center gap-6">
            <div className="space-y-1.5 w-full pb-3 border-b border-outline">
              <div className="flex items-center gap-2 justify-center">
                <Brain className="w-4 h-4 text-secondary" />
                <h3 className="font-serif text-sm font-bold text-primary">Interactive Breathing Tool</h3>
              </div>
              <p className="text-[11px] text-on-surface-variant leading-relaxed">
                Take a secure, low-pressure minute to align your focus. Follow the visual prompts to calm your body.
              </p>
            </div>

            {/* Interactive Breathing circle visualization */}
            <div className="w-40 h-40 rounded-full bg-[#fcf8f2] flex items-center justify-center relative overflow-hidden border border-outline">
              
              {/* Expanding circle background based on stage */}
              <div 
                className={`absolute rounded-full transition-all duration-[4000ms] ease-in-out bg-secondary/15 ${
                  breathStage === 'inhale' 
                  ? 'w-36 h-36 scale-100' 
                  : breathStage === 'hold' 
                  ? 'w-36 h-36 scale-100 opacity-40 bg-secondary/25'
                  : breathStage === 'exhale' 
                  ? 'w-8 h-8 scale-50 opacity-45' 
                  : 'w-16 h-16 opacity-0'
                }`}
              />

              <div className="z-10 space-y-0.5">
                <span className="font-mono text-[9px] uppercase tracking-widest text-secondary font-bold">
                  {breathStage === 'idle' && 'Ready'}
                  {breathStage === 'inhale' && 'Inhale'}
                  {breathStage === 'hold' && 'Hold'}
                  {breathStage === 'exhale' && 'Exhale'}
                </span>
                <p className="font-serif text-3xl font-bold text-primary">
                  {breathStage === 'idle' ? '🧘' : breathCounter}
                </p>
              </div>
            </div>

            {/* Control buttons */}
            <div className="w-full">
              {breathStage === 'idle' ? (
                <button
                  onClick={startBreathing}
                  className="w-full bg-secondary hover:bg-secondary/95 text-white py-2.5 font-mono text-[10px] uppercase tracking-wider transition-colors cursor-pointer font-bold"
                >
                  Start Box Breathing
                </button>
              ) : (
                <button
                  onClick={stopBreathing}
                  className="w-full border border-outline hover:bg-surface-dim text-on-surface-variant py-2.5 font-mono text-[10px] uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Stop Exercise
                </button>
              )}
            </div>
          </div>

          {/* Quick Guidance Box */}
          <div className="bg-[#fcf8f2] p-6 border border-outline space-y-3">
            <h4 className="font-mono text-[10px] font-bold text-secondary uppercase tracking-widest flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-secondary animate-pulse" />
              Low-Pressure Topics
            </h4>
            <ul className="text-[11px] text-on-surface-variant space-y-2 list-disc pl-4 leading-relaxed font-sans">
              <li>Feel free to ask about resume tips or technical prep.</li>
              <li>You don't need to know all the answers — starting is enough.</li>
              <li>Toggle video/audio on or off at any time.</li>
              <li>Close this tab if you need an instant exit.</li>
            </ul>
          </div>

          {/* Safe exit reminder */}
          <div className="p-4 bg-white border border-outline text-[10px] text-on-surface-variant leading-relaxed font-mono">
            🔒 <strong>Safety Note:</strong> Your chat transcripts are never cached on public servers. When you click "End Session", the session is securely erased.
          </div>

        </div>

      </main>
    </div>
  );
}
