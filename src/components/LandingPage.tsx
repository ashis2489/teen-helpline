import React from 'react';
import { 
  Heart, 
  ArrowRight, 
  Phone, 
  Quote, 
  LogOut, 
  Brain, 
  Compass, 
  Users, 
  ShieldCheck, 
  HeartHandshake, 
  Activity, 
  Headphones,
  Sun,
  Moon,
  MessageSquare
} from 'lucide-react';
import { motion } from 'motion/react';
import { AudienceMode } from '../types';
import AudienceSelector from './AudienceSelector';

interface LandingPageProps {
  audienceMode: AudienceMode;
  onAudienceChange: (mode: AudienceMode) => void;
  onGetStarted: () => void;
  onLogin: () => void;
  onQuickHelp: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export default function LandingPage({ 
  audienceMode, 
  onAudienceChange, 
  onGetStarted, 
  onLogin, 
  onQuickHelp,
  theme,
  onToggleTheme
}: LandingPageProps) {
  // Quick exit redirect to safe page
  const handleQuickExit = () => {
    window.location.href = 'https://www.google.com';
  };

  const getHeroContent = () => {
    switch (audienceMode) {
      case 'early':
        return {
          badge: '🐣 Early Teens (13-14) Custom Hub',
          title: (
            <>
              Find your voice. <br />
              <span className="italic text-secondary font-serif">Discover confidence.</span>
            </>
          ),
          desc: 'High school adjustments, identity discovery, and starting early hobbies are easier with guided, supportive peer stories and trusted counselor connections. Try guided calming breathing loops and build safe friendship circles.',
          btnText: 'Explore Early Teen Space'
        };
      case 'mid':
        return {
          badge: '🎒 Mid Teens (15-16) Custom Hub',
          title: (
            <>
              Thrive under pressure. <br />
              <span className="italic text-secondary font-serif">Beat exam stress.</span>
            </>
          ),
          desc: 'Exam schedules, study methods, and relationship questions can drain your mental battery. Log your daily headspaces, try focus-inducing study soundtracks with real-time timers, and message certified high school guidance mentors.',
          btnText: 'Enter Mid Teen Space'
        };
      case 'late':
        return {
          badge: '🎓 College & Career (17-19) Custom Hub',
          title: (
            <>
              Your college & coding roadmap. <br />
              <span className="italic text-secondary font-serif">Plan with confidence.</span>
            </>
          ),
          desc: 'Ready for coding bootcamps, university portals, or building your first resume? Connect with experienced STEM specialists, outline your academic direction, access scholarship tracking sheets, and practice secure video counseling.',
          btnText: 'Unlock Career Space'
        };
      case 'parent':
        return {
          badge: '👥 Parents & Supporters Hub',
          title: (
            <>
              Support your teen. <br />
              <span className="italic text-secondary font-serif">With clear boundaries.</span>
            </>
          ),
          desc: 'Access specialist resources and direct guidance guides on how to practice non-confrontational listening, support your children through stressful school exam phases, and access certified family counseling pathways securely.',
          btnText: 'Access Parent Resources'
        };
      default:
        return {
          badge: '🌐 24/7 Anonymous Support',
          title: (
            <>
              You're Not Alone. <br />
              <span className="italic text-secondary font-serif">We're Here to Help.</span>
            </>
          ),
          desc: 'Navigating your teen years can be tough. Whether it\'s mental health, career stress, or just needing a peer to talk to, we\'ve got your back with supportive counselors and interactive tracking tools.',
          btnText: 'Get Started'
        };
    }
  };

  const hero = getHeroContent();

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key.toLowerCase() === 'q') {
        handleQuickExit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative bg-background text-primary min-h-screen flex flex-col font-sans select-none overflow-x-hidden">
      
      {/* Editorial Top Border Line */}
      <div className="h-1 bg-secondary w-full" />

      {/* Top Navigation Bar */}
      <nav className="sticky top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b border-outline">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary flex items-center justify-center text-white">
              <Heart className="w-5 h-5 fill-white" />
            </div>
            <span className="font-serif text-xl font-medium tracking-tight">Teens Helpline</span>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            <button className="font-mono text-[11px] uppercase tracking-wider text-primary border-b border-primary px-2 py-1 transition-all duration-200" onClick={onGetStarted}>
              Mental Health
            </button>
            <button className="font-mono text-[11px] uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors px-2 py-1" onClick={onGetStarted}>
              Career Guidance
            </button>
            <button className="font-mono text-[11px] uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors px-2 py-1" onClick={onGetStarted}>
              Peer Advice
            </button>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={onToggleTheme}
              className="w-9 h-9 bg-surface-dim hover:bg-surface-container flex items-center justify-center text-primary transition-colors cursor-pointer border border-outline"
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {theme === 'light' ? <Moon className="w-4 h-4 text-secondary fill-secondary/20" /> : <Sun className="w-4 h-4 text-amber-500" />}
            </button>
            <button 
              onClick={onLogin}
              className="font-mono text-[11px] uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            >
              Login
            </button>
            <button 
              onClick={onQuickHelp}
              className="bg-secondary hover:bg-secondary/90 text-white px-5 py-2.5 font-mono text-[10px] uppercase tracking-wider transition-all cursor-pointer"
            >
              Quick Help
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="py-16 md:py-24 border-b border-outline relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 items-center gap-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-dim border border-outline text-on-surface-variant font-mono text-[10px] uppercase tracking-wider">
              <HeartHandshake className="w-3.5 h-3.5 text-secondary animate-pulse" />
              <span>{hero.badge}</span>
            </div>
            
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium text-primary leading-[1.1] tracking-tight">
              {hero.title}
            </h1>
            
            <p className="text-base text-on-surface-variant max-w-xl leading-relaxed">
              {hero.desc}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={onGetStarted}
                className="bg-primary hover:bg-primary/95 text-white h-12 px-8 font-mono text-[11px] uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {hero.btnText}
                <ArrowRight className="w-4 h-4" />
              </button>
              <button 
                onClick={onGetStarted}
                className="bg-transparent text-primary border border-primary hover:bg-primary/5 h-12 px-8 font-mono text-[11px] uppercase tracking-wider transition-all cursor-pointer"
              >
                How it Works
              </button>
            </div>
          </motion.div>

          {/* Hero Image / Illustration Frame */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 relative"
          >
            <div className="w-full aspect-square overflow-hidden relative z-10 border border-primary p-2 bg-white">
              <img 
                className="w-full h-full object-cover filter contrast-105 saturate-95" 
                alt="Teenagers sitting together on a bench"
                referrerPolicy="no-referrer"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuArNqGOYVYOZOBZcs_HWSEjFsnUTIO9B5HsJ3G7x7TgK7AVb5DDWoKWRlZ9TWAUIFLXpNg1eNuG5vPx5Stx16Tuy-yxFeIiEJ1e5rgbZTwEDjxLhzzYDfvE2XLLFjyt1XXY6oAvmcHyRXUhuEHxIqw6UWT1XCRx9oHcPSx6GnL12DytAtgw4o9UzU4OQuYNcroqKOLEjGMB0u_3XtLQbY4kXFdQ16ylhuxt7FuHSJUI8-mRgitXj72XbxBYLtfPFRbENd82r69LKeV8"
              />
            </div>
            
            {/* Elegant Background Accent Box */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-dashed border-secondary -z-10" />
          </motion.div>
        </div>
      </main>

      {/* Dynamic Audience Stage Customizer */}
      <section className="bg-[#fcf8f2]/30 border-b border-outline py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <AudienceSelector 
            currentMode={audienceMode}
            onModeChange={onAudienceChange}
            variant="embedded"
          />
        </div>
      </section>

      {/* Floating Quick Exit Trigger */}
      <button 
        onClick={handleQuickExit}
        className="fixed bottom-6 right-6 z-50 bg-primary text-white border border-secondary shadow-xl px-4 py-2.5 flex items-center gap-3 hover:bg-error hover:text-white transition-all group cursor-pointer"
      >
        <span className="bg-secondary text-primary group-hover:bg-white group-hover:text-error px-1.5 py-0.5 font-mono text-[9px] font-bold tracking-widest transition-colors uppercase">
          Alt + Q
        </span>
        <span className="font-mono text-[10px] uppercase tracking-wider font-bold">Quick Exit</span>
        <LogOut className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </button>

      {/* Services Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto w-full border-b border-outline">
        <div className="text-center mb-16 space-y-4">
          <span className="font-mono text-[10px] uppercase tracking-widest text-secondary font-bold block">Support pillars</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-primary font-medium tracking-tight">Our Supportive Pillars</h2>
          <div className="w-12 h-px bg-secondary mx-auto" />
          <p className="text-on-surface-variant text-sm max-w-xl mx-auto leading-relaxed">
            Discover safe, specialized resources and book dedicated counseling sessions tailored for exactly what you're going through right now.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Mental Health Column */}
          <div className="md:col-span-2 bg-white p-8 border border-outline flex flex-col md:flex-row gap-8 items-center hover:border-primary transition-all duration-300">
            <div className="flex-1 space-y-4 text-center md:text-left">
              <div className="w-12 h-12 bg-surface-dim border border-outline text-primary flex items-center justify-center mx-auto md:mx-0">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-medium text-primary">Mental Health Support</h3>
              <p className="text-on-surface-variant text-xs leading-relaxed">
                Stress, anxiety, and depression shouldn't be handled alone. Access anonymous text-based counseling or browse our custom coping toolkits.
              </p>
              <button 
                onClick={onGetStarted}
                className="inline-flex items-center gap-2 text-secondary font-mono text-[10px] uppercase tracking-wider hover:text-primary transition-colors group cursor-pointer font-bold"
              >
                Talk to Someone
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            <div className="w-full md:w-1/2 aspect-video overflow-hidden border border-outline bg-surface-dim p-1.5">
              <img 
                className="w-full h-full object-cover filter brightness-95" 
                alt="Supportive chat illustration"
                referrerPolicy="no-referrer"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVpS6rJM-xsH3Og_aR50GhdsULNImxPo36yulcpJEC_ZZbSEARLAxdqb33YmfGzqt55Y3d6jt4kQq13mj9WuGRtDktfklCG8Ac8tBNTG_nT2eUQB-Z8cEtCyLCaJv_CVIPHILiTC2isSygGMBwvKwgF-cdBfn-Vt2uBJztN7oOiKVteX3Zv59WTKHIMl49cPLg5gY8tVF_ZEdp4t5WMgcLClUAy18P-ve8eImKEzq8G8fNSASWjf7T74Ue9IneGDRcnrIxpnZwnwav"
              />
            </div>
          </div>

          {/* Anonymous Mentorship Column */}
          <div className="bg-white p-8 border border-outline flex flex-col justify-between hover:border-primary transition-all duration-300">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-surface-dim border border-outline text-primary flex items-center justify-center">
                <Users className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-serif text-2xl font-medium text-primary">Anonymous Mentorship</h3>
              <p className="text-on-surface-variant text-xs leading-relaxed">
                Connect safely and securely with older student volunteers who can provide guidance. Protected with dynamic wilderness aliases.
              </p>
            </div>
            <div className="pt-6">
              <button 
                onClick={onGetStarted}
                className="w-full bg-primary hover:bg-primary/95 text-white h-11 font-mono text-[10px] uppercase tracking-wider transition-colors cursor-pointer"
              >
                Find a Peer Mentor
              </button>
            </div>
          </div>

          {/* Peer Advice Column */}
          <div className="bg-white p-8 border border-outline flex flex-col justify-between hover:border-primary transition-all duration-300">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-surface-dim border border-outline text-primary flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-serif text-2xl font-medium text-primary">Peer Advice Forums</h3>
              <p className="text-on-surface-variant text-xs leading-relaxed">
                A moderated, safe space where you can share stories, ask questions, and connect with people who actually get what you're saying.
              </p>
            </div>
            <div className="pt-6">
              <button 
                onClick={onGetStarted}
                className="w-full bg-transparent text-primary hover:bg-primary/5 h-11 border border-primary font-mono text-[10px] uppercase tracking-wider transition-colors cursor-pointer"
              >
                Join the Community
              </button>
            </div>
          </div>

          {/* 988 Banner */}
          <div className="md:col-span-2 bg-[#fcf8f2] p-8 border border-outline flex flex-col sm:flex-row items-center justify-between gap-6 hover:border-primary transition-all duration-300 overflow-hidden relative">
            <div className="z-10 text-center sm:text-left">
              <h4 className="font-serif text-2xl font-medium text-primary">Need help right now?</h4>
              <p className="text-on-surface-variant text-xs mt-1">Our certified crisis responders are available 24/7/365.</p>
            </div>
            <div className="flex items-center gap-4 z-10">
              <span className="font-mono text-3xl font-extrabold text-primary">988</span>
              <a 
                href="tel:988"
                className="w-12 h-12 bg-primary text-white flex items-center justify-center hover:scale-105 transition-transform"
              >
                <Phone className="w-5 h-5 fill-white" />
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Voices from Our Community Section */}
      <section className="py-20 bg-white border-b border-outline">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <span className="font-mono text-[10px] uppercase tracking-widest text-secondary font-bold block">Testimonials</span>
            <h2 className="font-serif text-3xl font-medium text-center text-primary">Voices from Our Community</h2>
            <div className="w-12 h-px bg-secondary mx-auto" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Testimonial 1 */}
            <div className="bg-background p-8 border border-outline relative">
              <Quote className="text-secondary/15 absolute top-4 right-8 w-12 h-12" />
              <p className="text-primary relative z-10 mb-6 italic text-sm leading-relaxed">
                "I was struggling with finals and my anxiety was through the roof. Talking to someone here who didn't judge me made all the difference."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-primary font-serif font-bold">A</div>
                <div>
                  <p className="font-serif text-sm font-bold text-primary">Alex, 17</p>
                  <p className="font-mono text-[9px] uppercase tracking-wider text-on-surface-variant">Member since 2023</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-background p-8 border border-outline relative md:translate-y-4">
              <Quote className="text-secondary/15 absolute top-4 right-8 w-12 h-12" />
              <p className="text-primary relative z-10 mb-6 italic text-sm leading-relaxed">
                "The career guidance section helped me find a graphic design internship when I had no idea where to start. Forever grateful!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-primary font-serif font-bold">M</div>
                <div>
                  <p className="font-serif text-sm font-bold text-primary">Maya, 19</p>
                  <p className="font-mono text-[9px] uppercase tracking-wider text-on-surface-variant">Aspiring Designer</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-background p-8 border border-outline relative">
              <Quote className="text-secondary/15 absolute top-4 right-8 w-12 h-12" />
              <p className="text-primary relative z-10 mb-6 italic text-sm leading-relaxed">
                "It's hard to find places online that actually feel safe. The Peer Advice forums are moderated so well. I finally feel heard."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-primary font-serif font-bold">J</div>
                <div>
                  <p className="font-serif text-sm font-bold text-primary">Jordan, 15</p>
                  <p className="font-mono text-[9px] uppercase tracking-wider text-on-surface-variant">Community Regular</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-outline mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 bg-primary flex items-center justify-center text-white">
                <Heart className="w-4 h-4 fill-white" />
              </div>
              <span className="font-serif text-lg font-medium text-primary">Teens Helpline</span>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-on-surface-variant">© 2026 Teens Helpline. You are not alone.</p>
          </div>
          
          <div className="flex flex-wrap gap-4 items-center">
            <div className="bg-[#fff1f1] text-error px-4 py-2 border border-error/15 font-mono text-[10px] uppercase tracking-wider font-bold">
              Crisis Line: 988
            </div>
            <div className="flex gap-4 items-center font-mono text-[10px] uppercase tracking-wider">
              <a href="#" className="text-on-surface-variant hover:text-primary transition-colors underline">Privacy Policy</a>
              <a href="#" className="text-on-surface-variant hover:text-primary transition-colors underline">Terms of Service</a>
            </div>
          </div>
        </div>

        {/* Trust Badge icons */}
        <div className="max-w-7xl mx-auto px-6 pb-8 flex justify-center gap-8 opacity-40">
          <ShieldCheck className="w-6 h-6 text-primary" />
          <Activity className="w-6 h-6 text-primary" />
          <Headphones className="w-6 h-6 text-primary" />
        </div>
      </footer>
    </div>
  );
}
