import React, { useState } from 'react';
import { 
  Heart, 
  ArrowLeft, 
  Calendar, 
  Clock, 
  ChevronRight, 
  FileText,
  Sun,
  Sunset,
  Moon
} from 'lucide-react';
import { Counselor } from '../types';
import { TIME_SLOTS } from '../data';

interface DateTimeViewProps {
  counselor: Counselor;
  onBack: () => void;
  onConfirm: (date: string, timeSlot: string, notes: string) => void;
}

export default function DateTimeView({ counselor, onBack, onConfirm }: DateTimeViewProps) {
  const [selectedDateIndex, setSelectedDateIndex] = useState(4); // Nov 6th as default
  const [selectedTimeId, setSelectedTimeId] = useState<string | null>(null);
  const [notes, setNotes] = useState('');

  // Sample calendar days to choose from
  const dates = [
    { dayName: 'Mon', dayNum: '2', month: 'Nov', full: 'Mon, Nov 2, 2026' },
    { dayName: 'Tue', dayNum: '3', month: 'Nov', full: 'Tue, Nov 3, 2026' },
    { dayName: 'Wed', dayNum: '4', month: 'Nov', full: 'Wed, Nov 4, 2026' },
    { dayName: 'Thu', dayNum: '5', month: 'Nov', full: 'Thu, Nov 5, 2026' },
    { dayName: 'Fri', dayNum: '6', month: 'Nov', full: 'Fri, Nov 6, 2026' },
    { dayName: 'Sat', dayNum: '7', month: 'Nov', full: 'Sat, Nov 7, 2026' },
    { dayName: 'Sun', dayNum: '8', month: 'Nov', full: 'Sun, Nov 8, 2026' },
  ];

  const handleContinue = () => {
    if (!selectedTimeId) return;
    const dateStr = dates[selectedDateIndex].full;
    const slotLabel = TIME_SLOTS.find(ts => ts.id === selectedTimeId)?.label || '';
    onConfirm(dateStr, slotLabel, notes);
  };

  const currentSelectedDate = dates[selectedDateIndex];

  return (
    <div className="min-h-screen bg-background text-primary font-sans">
      
      {/* Top Header */}
      <header className="bg-white/80 backdrop-blur-md h-20 border-b border-outline px-6 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="w-9 h-9 bg-surface-dim border border-outline flex items-center justify-center text-on-surface-variant transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <span className="font-mono text-[9px] uppercase tracking-wider text-on-surface-variant">Step 2 of 3</span>
            <h1 className="font-serif text-lg font-medium text-primary">Select Date & Time</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary flex items-center justify-center text-white">
            <Heart className="w-4 h-4 fill-white" />
          </div>
          <span className="font-serif text-lg font-medium text-primary hidden sm:inline">Teens Helpline</span>
        </div>
      </header>

      {/* Main Grid */}
      <main className="max-w-5xl mx-auto px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Summary and Calendar Date Grid */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Counselor Detail Card summary */}
            <div className="bg-white p-5 border border-outline flex gap-4 items-center">
              <img 
                className="w-14 h-14 rounded-full object-cover border border-outline shrink-0 filter contrast-105"
                src={counselor.avatar}
                referrerPolicy="no-referrer"
                alt={counselor.name}
              />
              <div className="space-y-0.5">
                <p className="font-mono text-[9px] uppercase tracking-wider text-secondary font-bold">Booking Session With</p>
                <h3 className="font-serif text-base font-bold text-primary">{counselor.name}</h3>
                <p className="font-mono text-[10px] uppercase tracking-wider text-on-surface-variant">{counselor.specialty}</p>
              </div>
            </div>

            {/* Custom Interactive Calendar Widget */}
            <div className="bg-white p-6 border border-outline space-y-4">
              <div className="flex items-center gap-2.5 pb-2 border-b border-outline">
                <Calendar className="w-4 h-4 text-secondary" />
                <h3 className="font-serif text-base font-medium text-primary">Choose Date</h3>
              </div>

              {/* Month selector line */}
              <div className="flex justify-between items-center px-1 font-mono text-[10px] uppercase tracking-wider text-on-surface-variant font-bold">
                <span>November 2026</span>
                <span className="text-secondary hover:underline cursor-pointer">View Month</span>
              </div>

              {/* Horizontal grid week dates */}
              <div className="grid grid-cols-7 gap-2">
                {dates.map((date, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedDateIndex(index)}
                    className={`p-3 border flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                      selectedDateIndex === index 
                      ? 'bg-primary text-white border-primary' 
                      : 'bg-white border-outline text-primary hover:bg-surface-dim'
                    }`}
                  >
                    <span className="font-mono text-[9px] uppercase tracking-wider opacity-80">{date.dayName}</span>
                    <span className="font-serif text-base font-bold">{date.dayNum}</span>
                    <span className="font-mono text-[8px] uppercase opacity-70">{date.month}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Private Notes Field */}
            <div className="bg-white p-6 border border-outline space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-outline">
                <FileText className="w-4 h-4 text-secondary" />
                <h3 className="font-serif text-base font-medium text-primary">Private intake notes (Optional)</h3>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                What are you hoping to chat about? Let us know any specific topics so our counselor can prepare beforehand.
              </p>
              <textarea 
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Example: I'm feeling overwhelmed by college application deadlines and need help structuring my goals..."
                className="w-full bg-white border border-outline p-4 text-xs font-sans focus:outline-none focus:border-secondary"
              />
            </div>

          </div>

          {/* Right Side: Time Slot Selection */}
          <div className="lg:col-span-6 bg-white p-6 md:p-8 border border-outline space-y-6">
            
            <div className="flex items-center gap-2.5 pb-3 border-b border-outline">
              <Clock className="w-4 h-4 text-secondary" />
              <h3 className="font-serif text-base font-medium text-primary">Select Available Time</h3>
            </div>

            {/* Display chosen summary */}
            <div className="bg-[#fcf8f2] p-4 border border-outline">
              <p className="font-mono text-[9px] uppercase tracking-wider text-on-surface-variant font-bold">
                Selected Appointment Date:
              </p>
              <p className="font-serif text-sm font-bold text-secondary mt-1">
                {currentSelectedDate.full}
              </p>
            </div>

            {/* Time slot lists by categories */}
            <div className="space-y-6">
              
              {/* Morning Slots */}
              <div className="space-y-3">
                <h4 className="font-mono text-[10px] font-bold uppercase text-on-surface-variant tracking-wider flex items-center gap-1.5">
                  <Sun className="w-4 h-4 text-amber-500" />
                  Morning Sessions
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {TIME_SLOTS.filter(ts => ts.category === 'morning').map(ts => (
                    <button
                      key={ts.id}
                      disabled={ts.disabled}
                      onClick={() => setSelectedTimeId(ts.id)}
                      className={`py-3 px-4 font-mono text-[10px] uppercase tracking-wider transition-all text-center relative border ${
                        ts.disabled 
                        ? 'bg-surface-dim text-slate-400 border-transparent cursor-not-allowed line-through' 
                        : selectedTimeId === ts.id
                        ? 'bg-secondary text-white border-secondary'
                        : 'bg-white border-outline hover:bg-surface-dim text-primary cursor-pointer'
                      }`}
                    >
                      {ts.label}
                      {ts.disabled && <span className="absolute top-1 right-2 text-[7px] font-bold text-slate-400 font-mono uppercase tracking-wider">Booked</span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Afternoon Slots */}
              <div className="space-y-3">
                <h4 className="font-mono text-[10px] font-bold uppercase text-on-surface-variant tracking-wider flex items-center gap-1.5">
                  <Sunset className="w-4 h-4 text-orange-400" />
                  Afternoon Sessions
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {TIME_SLOTS.filter(ts => ts.category === 'afternoon').map(ts => (
                    <button
                      key={ts.id}
                      disabled={ts.disabled}
                      onClick={() => setSelectedTimeId(ts.id)}
                      className={`py-3 px-4 font-mono text-[10px] uppercase tracking-wider transition-all text-center relative border ${
                        ts.disabled 
                        ? 'bg-surface-dim text-slate-400 border-transparent cursor-not-allowed line-through' 
                        : selectedTimeId === ts.id
                        ? 'bg-secondary text-white border-secondary'
                        : 'bg-white border-outline hover:bg-surface-dim text-primary cursor-pointer'
                      }`}
                    >
                      {ts.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Evening Slots */}
              <div className="space-y-3">
                <h4 className="font-mono text-[10px] font-bold uppercase text-on-surface-variant tracking-wider flex items-center gap-1.5">
                  <Moon className="w-4 h-4 text-indigo-400" />
                  Evening Sessions
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {TIME_SLOTS.filter(ts => ts.category === 'evening').map(ts => (
                    <button
                      key={ts.id}
                      disabled={ts.disabled}
                      onClick={() => setSelectedTimeId(ts.id)}
                      className={`py-3 px-4 font-mono text-[10px] uppercase tracking-wider transition-all text-center relative border ${
                        ts.disabled 
                        ? 'bg-surface-dim text-slate-400 border-transparent cursor-not-allowed line-through' 
                        : selectedTimeId === ts.id
                        ? 'bg-secondary text-white border-secondary'
                        : 'bg-white border-outline hover:bg-surface-dim text-primary cursor-pointer'
                      }`}
                    >
                      {ts.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-outline flex gap-4">
              <button
                onClick={onBack}
                className="flex-1 border border-outline hover:bg-surface-dim text-on-surface-variant h-11 font-mono text-[10px] uppercase tracking-wider transition-all cursor-pointer text-center"
              >
                Back to Advisors
              </button>
              <button
                disabled={!selectedTimeId}
                onClick={handleContinue}
                className={`flex-1 h-11 font-mono text-[10px] uppercase tracking-wider transition-all text-center inline-flex items-center justify-center gap-1.5 ${
                  selectedTimeId 
                  ? 'bg-primary hover:bg-primary/95 text-white cursor-pointer' 
                  : 'bg-surface-dim text-slate-400 border border-transparent cursor-not-allowed'
                }`}
              >
                Continue 
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
