import React, { useState } from 'react';
import { 
  ShieldCheck, 
  HelpCircle, 
  Plus, 
  Minus, 
  Lock, 
  Sparkles, 
  ArrowRight,
  LogOut
} from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function SafetyPrivacyGuide() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: "Is this service really 100% free?",
      answer: "Yes, entirely! Teens Helpline is supported by philanthropic mental health grants and student advocacy programs. There are absolutely no fees, credit card requirements, or premium subscriptions."
    },
    {
      question: "Will my parents, teachers, or school find out I used this?",
      answer: "No. Your privacy is our highest priority. All chats, bookings, and mood logs are strictly anonymous and stored on your local browser's session storage. We do not transmit chat transcripts or personal summaries to any external school databases or parent accounts."
    },
    {
      question: "Do I need to sign up with my real name?",
      answer: "Not at all! You are welcome to use any fake alias, initials, or nickname (like 'HopefulCoder', 'Alex', or 'Anonymous'). We do not require email verification or school IDs to talk with peer advisors."
    },
    {
      question: "What is the 'Alt + Q' Quick Exit button?",
      answer: "If you need to instantly leave our website (for example, if someone walks into your room and you don't want them seeing your mental health screen), pressing 'Alt + Q' or clicking 'Quick Exit' will immediately close the page and redirect you to Google.com."
    },
    {
      question: "What qualifications do the counselors have?",
      answer: "Our counselors are certified career coaches, senior peer mentors, and mental resilience specialists who have undergone intensive training in adolescent safety and empathetic support."
    }
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleQuickExit = () => {
    window.location.href = 'https://www.google.com';
  };

  return (
    <div className="bg-white border border-outline p-6 md:p-8 space-y-8 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline pb-5">
        <div>
          <span className="font-mono text-[9px] text-secondary font-bold uppercase tracking-widest block">Safe space encryption</span>
          <h2 className="font-serif text-2xl font-medium text-primary tracking-tight">Privacy &amp; Safety Portal</h2>
        </div>
        <span className="font-mono text-[9px] uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5 bg-[#fcf8f2] border border-outline px-3 py-1 text-secondary font-bold">
          <Lock className="w-3.5 h-3.5" /> End-to-End Anonymous
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Side Accordions */}
        <div className="md:col-span-7 space-y-4">
          <h3 className="font-serif text-lg font-medium text-primary flex items-center gap-2 pb-2 border-b border-outline">
            <HelpCircle className="w-4.5 h-4.5 text-secondary" />
            Frequently Asked Questions
          </h3>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div 
                  key={index}
                  className="border border-outline bg-white transition-all overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(index)}
                    className="w-full text-left px-5 py-4 flex justify-between items-center hover:bg-surface-dim/40 cursor-pointer"
                  >
                    <span className="font-serif text-sm font-bold text-primary pr-4">{faq.question}</span>
                    {isOpen ? <Minus className="w-4 h-4 text-secondary shrink-0" /> : <Plus className="w-4 h-4 text-on-surface-variant shrink-0" />}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-on-surface-variant leading-relaxed border-t border-outline/30 bg-surface-dim/20 animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side Safety Checklist */}
        <div className="md:col-span-5 space-y-6">
          
          {/* Quick Exit Demonstration Card */}
          <div className="bg-[#fff1f1] border border-error/15 p-6 space-y-4">
            <h4 className="font-mono text-[10px] font-bold text-error uppercase tracking-widest flex items-center gap-1.5">
              <LogOut className="w-4 h-4 animate-pulse" />
              Safety exit demonstration
            </h4>
            <p className="text-[11px] text-on-surface-variant leading-relaxed">
              We understand you may need to shield your screen quickly. Press the keys below simultaneously or click the red exit button to instant-redirect.
            </p>

            <div className="flex justify-between items-center bg-white p-3 border border-outline">
              <span className="font-mono text-[9px] uppercase font-bold text-on-surface-variant">Hot-Key Sequence</span>
              <kbd className="bg-primary text-white border border-secondary px-2 py-0.5 text-xs font-bold font-sans">
                Alt + Q
              </kbd>
            </div>

            <button
              onClick={handleQuickExit}
              className="w-full bg-error hover:bg-error/95 text-white h-10 font-mono text-[10px] uppercase tracking-wider font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              Test Quick Exit Now
            </button>
          </div>

          {/* Privacy Badges checklist */}
          <div className="bg-white border border-outline p-6 space-y-4">
            <h4 className="font-serif text-base font-medium text-primary flex items-center gap-1.5 pb-2 border-b border-outline">
              <Sparkles className="w-4 h-4 text-secondary" />
              Our Safety Standards
            </h4>
            
            <ul className="space-y-3">
              <li className="flex gap-2.5 items-start text-xs text-on-surface-variant leading-relaxed">
                <ShieldCheck className="w-4.5 h-4.5 text-secondary shrink-0 mt-0.5" />
                <span><strong>No browser fingerprint tracking:</strong> We do not deploy ad-tracking pixels or marketing cookies.</span>
              </li>
              <li className="flex gap-2.5 items-start text-xs text-on-surface-variant leading-relaxed">
                <ShieldCheck className="w-4.5 h-4.5 text-secondary shrink-0 mt-0.5" />
                <span><strong>Manual secure end:</strong> TRANSCRIPTS are deleted off public memory caches the second you click 'End Session'.</span>
              </li>
              <li className="flex gap-2.5 items-start text-xs text-on-surface-variant leading-relaxed">
                <ShieldCheck className="w-4.5 h-4.5 text-secondary shrink-0 mt-0.5" />
                <span><strong>Crisis escalation protocols:</strong> If you specify self-harm or critical risk, we guide you safely to professional 988 emergency networks.</span>
              </li>
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
}
