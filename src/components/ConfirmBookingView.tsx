import React, { useState } from 'react';
import { 
  Heart, 
  ArrowLeft, 
  Video, 
  Mic, 
  MessageSquare, 
  ShieldCheck, 
  Calendar, 
  Clock 
} from 'lucide-react';
import { Counselor } from '../types';

interface ConfirmBookingViewProps {
  counselor: Counselor;
  date: string;
  timeSlot: string;
  notes: string;
  onBack: () => void;
  onComplete: (sessionType: string) => void;
}

export default function ConfirmBookingView({ 
  counselor, 
  date, 
  timeSlot, 
  notes, 
  onBack, 
  onComplete 
}: ConfirmBookingViewProps) {
  const [selectedFormat, setSelectedFormat] = useState<'chat' | 'video' | 'audio'>('chat');
  const [acceptedPolicy, setAcceptedPolicy] = useState(false);

  const formats = [
    { 
      id: 'chat', 
      title: 'Secure Live Chat', 
      desc: 'Text-based instant message. Safe, highly private, with typing feedback.', 
      icon: MessageSquare 
    },
    { 
      id: 'video', 
      title: 'Video Call', 
      desc: 'Face-to-face video session. Best for screen-sharing and interactive mock interviews.', 
      icon: Video 
    },
    { 
      id: 'audio', 
      title: 'Voice Session', 
      desc: 'Audio call only. Keep your camera off for extra security and relaxed comfort.', 
      icon: Mic 
    },
  ];

  const handleConfirm = () => {
    if (!acceptedPolicy) return;
    const formatTitle = formats.find(f => f.id === selectedFormat)?.title || 'Secure Live Chat';
    onComplete(formatTitle);
  };

  return (
    <div className="min-h-screen bg-background text-primary font-sans">
      
      {/* Top Navigation */}
      <header className="bg-white/80 backdrop-blur-md h-20 border-b border-outline px-6 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="w-9 h-9 bg-surface-dim border border-outline flex items-center justify-center text-on-surface-variant transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <span className="font-mono text-[9px] uppercase tracking-wider text-on-surface-variant">Step 3 of 3</span>
            <h1 className="font-serif text-lg font-medium text-primary">Confirm Appointment</h1>
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
      <main className="max-w-5xl mx-auto px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Session Format & Confidentiality Info */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Formats Title */}
            <div className="space-y-2 pb-2 border-b border-outline">
              <h2 className="font-serif text-xl font-medium text-primary">Choose Session Format</h2>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                We accommodate whatever communication method makes you feel safest and most comfortable.
              </p>
            </div>

            {/* Formats Selection Buttons */}
            <div className="space-y-3">
              {formats.map((f) => {
                const Icon = f.icon;
                const isSelected = selectedFormat === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => setSelectedFormat(f.id as any)}
                    className={`w-full p-4 border text-left flex gap-4 items-center transition-all cursor-pointer ${
                      isSelected 
                      ? 'bg-[#fcf8f2] border-secondary' 
                      : 'bg-white border-outline hover:bg-surface-dim'
                    }`}
                  >
                    <div className={`w-11 h-11 border flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-primary text-white border-primary' : 'bg-surface-dim border-outline text-primary'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-serif text-sm font-bold text-primary">{f.title}</p>
                      <p className="text-xs text-on-surface-variant leading-relaxed">{f.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Confidentiality Box */}
            <div className="bg-[#fcf8f2]/60 p-5 border border-outline flex gap-4 items-start">
              <ShieldCheck className="w-5 h-5 text-secondary shrink-0 mt-0.5 animate-pulse" />
              <div className="space-y-1">
                <h4 className="font-serif text-sm font-bold text-primary">Confidential &amp; Secure Conversations</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Your privacy is our core concern. Under local policies, counselor sessions are strictly confidential and will never be logged or shared with parents, teachers, or secondary servers without your explicit permission.
                </p>
              </div>
            </div>

          </div>

          {/* Right Side: Booking Summary Card */}
          <div className="lg:col-span-5 bg-white border border-outline shadow-sm overflow-hidden">
            
            <div className="bg-[#fcf8f2] px-6 py-5 border-b border-outline flex justify-between items-center">
              <h3 className="font-serif text-base font-bold text-primary">Booking Summary</h3>
              <span className="font-mono text-[9px] uppercase tracking-wider bg-primary text-white px-2 py-0.5">
                Free P2P
              </span>
            </div>

            <div className="p-6 space-y-6">
              
              {/* Advisor Info */}
              <div className="flex gap-3 items-center pb-4 border-b border-outline">
                <img 
                  className="w-12 h-12 rounded-full object-cover border border-outline filter contrast-105"
                  src={counselor.avatar}
                  referrerPolicy="no-referrer"
                  alt={counselor.name}
                />
                <div>
                  <h4 className="font-serif text-sm font-bold text-primary">{counselor.name}</h4>
                  <p className="font-mono text-[9px] uppercase tracking-wider text-on-surface-variant">{counselor.specialty}</p>
                </div>
              </div>

              {/* Details table */}
              <div className="space-y-3 text-xs font-mono">
                <div className="flex justify-between items-center text-on-surface-variant">
                  <span>Selected Date:</span>
                  <span className="font-bold text-primary flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-secondary" />
                    {date}
                  </span>
                </div>
                <div className="flex justify-between items-center text-on-surface-variant">
                  <span>Selected Time:</span>
                  <span className="font-bold text-primary flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-secondary" />
                    {timeSlot}
                  </span>
                </div>
                <div className="flex justify-between items-center text-on-surface-variant">
                  <span>Session Format:</span>
                  <span className="font-bold text-secondary uppercase">
                    {formats.find(f => f.id === selectedFormat)?.title}
                  </span>
                </div>
                {notes && (
                  <div className="pt-2">
                    <p className="text-on-surface-variant font-bold">Your Notes:</p>
                    <p className="p-3 bg-surface-dim border border-outline text-[10px] mt-1 italic text-on-surface-variant leading-relaxed">
                      "{notes}"
                    </p>
                  </div>
                )}
                
                <div className="flex justify-between items-center text-xs font-bold pt-4 border-t border-outline">
                  <span className="text-primary uppercase tracking-wider">Total Session Cost:</span>
                  <span className="text-secondary font-serif text-base font-bold">$0.00 (Free)</span>
                </div>
              </div>

              {/* Conduct agreement checkbox */}
              <label className="flex gap-3 items-start p-3 bg-surface-dim/40 border border-outline cursor-pointer hover:bg-surface-dim transition-colors">
                <input 
                  type="checkbox" 
                  checked={acceptedPolicy}
                  onChange={(e) => setAcceptedPolicy(e.target.checked)}
                  className="mt-0.5 w-4 h-4 text-primary border-outline focus:ring-secondary focus:ring-1"
                />
                <span className="text-[10px] text-on-surface-variant leading-normal font-sans">
                  I agree to the <strong>Teens Helpline Safety Guidelines</strong> and understand that counseling is a supportive peer-oriented environment.
                </span>
              </label>

              {/* Action */}
              <button
                disabled={!acceptedPolicy}
                onClick={handleConfirm}
                className={`w-full h-11 font-mono text-[10px] uppercase tracking-wider transition-all text-center inline-flex items-center justify-center gap-1.5 ${
                  acceptedPolicy 
                  ? 'bg-primary hover:bg-primary/95 text-white cursor-pointer' 
                  : 'bg-surface-dim text-slate-400 border border-transparent cursor-not-allowed'
                }`}
              >
                Confirm Counselor Session
              </button>

            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
