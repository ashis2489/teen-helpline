import React from 'react';
import { 
  CheckCircle2, 
  Calendar, 
  Clock, 
  Sparkles, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { Counselor } from '../types';

interface SuccessViewProps {
  counselor: Counselor;
  date: string;
  timeSlot: string;
  sessionType: string;
  onGoToDashboard: () => void;
  onLaunchSession: () => void;
}

export default function SuccessView({ 
  counselor, 
  date, 
  timeSlot, 
  sessionType, 
  onGoToDashboard, 
  onLaunchSession 
}: SuccessViewProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center px-6 py-12 text-primary font-sans">
      
      {/* Container */}
      <div className="max-w-md w-full bg-white border border-outline p-8 space-y-6 text-center relative">
        
        {/* Animated Checkmark and Sparkles */}
        <div className="relative inline-flex items-center justify-center">
          <div className="w-16 h-16 bg-[#fcf8f2] border border-outline flex items-center justify-center text-secondary animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <Sparkles className="w-5 h-5 text-secondary absolute -top-1 -right-1 animate-pulse" />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h1 className="font-serif text-3xl font-medium text-primary">Session Confirmed!</h1>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Your anonymous peer/career counseling session is booked and active.
          </p>
        </div>

        {/* Counselor summary widget */}
        <div className="bg-surface-dim/50 p-4 border border-outline flex items-center gap-3 text-left">
          <img 
            className="w-11 h-11 rounded-full object-cover border border-outline filter contrast-105"
            src={counselor.avatar}
            referrerPolicy="no-referrer"
            alt={counselor.name}
          />
          <div>
            <p className="font-serif text-sm font-bold text-primary">{counselor.name}</p>
            <p className="font-mono text-[9px] uppercase tracking-wider text-on-surface-variant">{counselor.specialty}</p>
          </div>
        </div>

        {/* Scheduled Info Blocks */}
        <div className="grid grid-cols-2 gap-3 text-xs font-mono uppercase tracking-wider">
          <div className="bg-white p-3 border border-outline flex flex-col items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-secondary" />
            <span>{date.split(',')[1]?.trim() || date}</span>
          </div>
          <div className="bg-white p-3 border border-outline flex flex-col items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-secondary" />
            <span>{timeSlot}</span>
          </div>
        </div>

        {/* Info label */}
        <div className="p-4 bg-surface-dim border border-outline flex gap-2.5 items-start text-left text-xs text-on-surface-variant leading-relaxed">
          <ShieldCheck className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
          <span className="font-sans">
            We've integrated this session directly into your dashboard. You can launch the safe live chat at any time.
          </span>
        </div>

        {/* Actions */}
        <div className="space-y-2 pt-2">
          <button 
            onClick={onLaunchSession}
            className="w-full bg-primary hover:bg-primary/95 text-white h-11 font-mono text-[10px] uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            Launch Live Chat Now
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          
          <button 
            onClick={onGoToDashboard}
            className="w-full bg-transparent text-on-surface-variant hover:bg-surface-dim h-11 border border-outline font-mono text-[10px] uppercase tracking-wider transition-all cursor-pointer"
          >
            Back to Student Portal
          </button>
        </div>

        {/* Elegant border accent line */}
        <div className="absolute -bottom-2 -right-2 w-full h-full border border-dashed border-secondary -z-10" />

      </div>
    </div>
  );
}
