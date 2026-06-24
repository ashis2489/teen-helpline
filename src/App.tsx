import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  MessageSquare, 
  ShieldAlert, 
  X, 
  Check, 
  HeartHandshake 
} from 'lucide-react';
import { ScreenState, Counselor, BookingSession, AudienceMode } from './types';
import LandingPage from './components/LandingPage';
import DashboardView from './components/DashboardView';
import CounselorList from './components/CounselorList';
import DateTimeView from './components/DateTimeView';
import ConfirmBookingView from './components/ConfirmBookingView';
import SuccessView from './components/SuccessView';
import LiveSessionView from './components/LiveSessionView';

export default function App() {
  const [screen, setScreen] = useState<ScreenState>('landing');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') {
      return saved;
    }
    return 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const [audienceMode, setAudienceMode] = useState<AudienceMode>('all');
  const [selectedCounselor, setSelectedCounselor] = useState<Counselor | null>(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [bookingNotes, setBookingNotes] = useState('');
  const [bookedFormat, setBookedFormat] = useState('Secure Live Chat');

  // List of upcoming active sessions
  const [upcomingSessions, setUpcomingSessions] = useState<BookingSession[]>([
    {
      counselor: {
        id: 'jordan-rivera',
        name: 'Jordan Rivera',
        specialty: 'Senior Education & Career Specialist',
        description: 'Helping students find their voice and plan their paths with structured, supportive and confidential counseling.',
        experience: '15 Years Experience',
        languages: ['English', 'Spanish', 'French'],
        quote: 'Your session is a safe space to explore your future. No pressure, just conversation.',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOWR_VXPqSGl42cN9F9vrPo-AWOMzL2IMjT7C_Igmxb3yKWul3XJ9wi7XGHwqkjcv6_QZ50jF5SJnCgtuPlyQt77flmxOF10e5ZwuurLBtG7wvzww2G8J-btTbjBzeoJxUfqblJ7SugAJxJCiPUiRUPBBpcw0C-GWluYAcO8SFOK_e9eYbn3eh8vEZMMQx2J1GXlBTr7WfvLWRNectoWosCLMgkfLkCrdcd258023AiGf7l848bN23B67HohBkdDBuER2bNqBuoMcY',
        tags: ['University Prep', 'Study Abroad']
      },
      date: 'Fri, Nov 6, 2026',
      timeSlot: '10:30 AM',
      notes: 'I need advice about university scholarships.',
      type: 'Secure Live Chat'
    }
  ]);

  // Current session being attended
  const [currentActiveSession, setCurrentActiveSession] = useState<BookingSession | null>(null);

  // Quick Helpline Modal State
  const [showQuickHelp, setShowQuickHelp] = useState(false);

  // Quick exit callback
  const triggerQuickExit = () => {
    window.location.href = 'https://www.google.com';
  };

  const handleStartBooking = (counselor: Counselor) => {
    setSelectedCounselor(counselor);
    setScreen('date-time');
  };

  const handleConfirmDateTime = (date: string, timeSlot: string, notes: string) => {
    setBookingDate(date);
    setBookingTime(timeSlot);
    setBookingNotes(notes);
    setScreen('confirm-booking');
  };

  const handleCompleteBooking = (sessionType: string) => {
    if (!selectedCounselor) return;
    
    const newSession: BookingSession = {
      counselor: selectedCounselor,
      date: bookingDate,
      timeSlot: bookingTime,
      notes: bookingNotes,
      type: sessionType
    };

    setBookedFormat(sessionType);
    setUpcomingSessions([newSession, ...upcomingSessions]);
    setScreen('success');
  };

  const handleLaunchLiveSession = (session: BookingSession) => {
    setCurrentActiveSession(session);
    setScreen('live-session');
  };

  return (
    <div className="relative min-h-screen bg-background text-primary transition-colors duration-200">
      
      {/* Dynamic Screen router */}
      {screen === 'landing' && (
        <LandingPage 
          audienceMode={audienceMode}
          onAudienceChange={setAudienceMode}
          onGetStarted={() => setScreen('dashboard')}
          onLogin={() => setScreen('dashboard')}
          onQuickHelp={() => setShowQuickHelp(true)}
          theme={theme}
          onToggleTheme={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        />
      )}

      {screen === 'dashboard' && (
        <DashboardView 
          audienceMode={audienceMode}
          onAudienceChange={setAudienceMode}
          upcomingSessions={upcomingSessions}
          onBookCounselor={() => setScreen('book-counselor')}
          onJoinSession={handleLaunchLiveSession}
          onLogout={() => setScreen('landing')}
          onQuickHelp={() => setShowQuickHelp(true)}
          theme={theme}
          onToggleTheme={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        />
      )}

      {screen === 'book-counselor' && (
        <CounselorList 
          audienceMode={audienceMode}
          onSelectCounselor={handleStartBooking}
          onBackToDashboard={() => setScreen('dashboard')}
        />
      )}

      {screen === 'date-time' && selectedCounselor && (
        <DateTimeView 
          counselor={selectedCounselor}
          onBack={() => setScreen('book-counselor')}
          onConfirm={handleConfirmDateTime}
        />
      )}

      {screen === 'confirm-booking' && selectedCounselor && (
        <ConfirmBookingView 
          counselor={selectedCounselor}
          date={bookingDate}
          timeSlot={bookingTime}
          notes={bookingNotes}
          onBack={() => setScreen('date-time')}
          onComplete={handleCompleteBooking}
        />
      )}

      {screen === 'success' && selectedCounselor && (
        <SuccessView 
          counselor={selectedCounselor}
          date={bookingDate}
          timeSlot={bookingTime}
          sessionType={bookedFormat}
          onGoToDashboard={() => setScreen('dashboard')}
          onLaunchSession={() => {
            const active = upcomingSessions[0];
            if (active) {
              handleLaunchLiveSession(active);
            } else {
              setScreen('dashboard');
            }
          }}
        />
      )}

      {screen === 'live-session' && currentActiveSession && (
        <LiveSessionView 
          counselor={currentActiveSession.counselor}
          sessionType={currentActiveSession.type}
          onLeave={() => {
            setCurrentActiveSession(null);
            setScreen('dashboard');
          }}
        />
      )}

      {/* Quick Crisis Helpline Modal Dialogue Overlay */}
      {showQuickHelp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-[32px] max-w-md w-full border border-error/10 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="bg-error-container/50 px-6 py-5 flex justify-between items-center border-b border-error/15">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-error" />
                <h3 className="font-lexend text-base font-extrabold text-on-error-container">Quick Emergency Support</h3>
              </div>
              <button 
                onClick={() => setShowQuickHelp(false)}
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-on-surface-variant hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              <p className="text-xs text-on-surface-variant leading-relaxed">
                If you are in immediate danger, feeling unsafe, or going through a severe emotional crisis, please contact these 100% free, confidential, and secure numbers.
              </p>

              <div className="space-y-3">
                {/* 988 call option */}
                <a 
                  href="tel:988"
                  className="flex items-center justify-between p-4 bg-error-container/20 hover:bg-error-container/40 border border-error/10 rounded-2xl transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-error rounded-xl flex items-center justify-center text-white">
                      <Phone className="w-5 h-5 fill-white" />
                    </div>
                    <div>
                      <p className="font-lexend text-sm font-bold text-on-surface">Call 988 Helpline</p>
                      <p className="text-[10px] text-on-surface-variant">Instant crisis counseling</p>
                    </div>
                  </div>
                  <span className="font-lexend text-sm font-bold text-error">Call Now</span>
                </a>

                {/* 741741 text option */}
                <a 
                  href="sms:741741?body=HOME"
                  className="flex items-center justify-between p-4 bg-[#cae6ff]/20 hover:bg-[#cae6ff]/40 border border-primary/10 rounded-2xl transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white">
                      <MessageSquare className="w-5 h-5 fill-white" />
                    </div>
                    <div>
                      <p className="font-lexend text-sm font-bold text-on-surface">Text HOME to 741741</p>
                      <p className="text-[10px] text-on-surface-variant">Confidential secure text chat</p>
                    </div>
                  </div>
                  <span className="font-lexend text-sm font-bold text-primary">Text Now</span>
                </a>
              </div>

              {/* Safety notice info */}
              <div className="p-4 bg-slate-50 rounded-2xl border flex gap-3 items-start text-left text-xs leading-normal">
                <HeartHandshake className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-[10px] text-on-surface-variant font-medium">
                  We care about you. Safe exit is always available by pressing <kbd className="bg-white border px-1 rounded shadow-xs text-on-surface font-bold">Alt + Q</kbd> at any time.
                </span>
              </div>

              <button
                onClick={() => setShowQuickHelp(false)}
                className="w-full bg-primary hover:bg-primary-container text-white py-2.5 rounded-xl text-xs font-bold font-lexend cursor-pointer active:scale-95 transition-all"
              >
                Close Helpline Panel
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
