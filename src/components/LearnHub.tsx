import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  ArrowRight, 
  GraduationCap, 
  HelpCircle, 
  CheckCircle2, 
  RotateCcw, 
  Briefcase, 
  Compass, 
  User, 
  Smile, 
  Frown, 
  AlertCircle
} from 'lucide-react';

interface Article {
  id: string;
  category: 'mental-health' | 'career' | 'relationships';
  title: string;
  summary: string;
  readTime: string;
  content: string[];
}

export default function LearnHub() {
  const [activeTab, setActiveTab] = useState<'articles' | 'quiz'>('articles');

  const articles: Article[] = [
    {
      id: 'a-1',
      category: 'relationships',
      title: "How to explain your career goals to traditional parents",
      summary: "Telling your family you want to do a direct skill bootcamp or take a gap year instead of a traditional major can be stressful. Here is how to speak their language safely.",
      readTime: "3 min read",
      content: [
        "1. Focus on security, not just hobbies: Parents worry about your future shelter and financial peace. When pitching a coding bootcamp or self-care track, show them starting salaries, employment rates, and structured progression curriculums.",
        "2. Put it in writing: Prepare a professional 1-page roadmap outline. Include the skills you will learn, the timeline, and the cost. A visual, organized paper shows maturity and serious research.",
        "3. Ask for their support, not just approval: Frame it as a partnership: 'I really value your experience. Can you help me review this program curriculum to make sure it is rigorous enough?' This transforms a confrontation into collaborative advice."
      ]
    },
    {
      id: 'a-1',
      category: 'mental-health',
      title: "Beating 'Academic Burnout': The 15-minute micro-habit rule",
      summary: "When you feel buried under biology formulas and calculus sets, your brain goes into avoidance paralysis. Break the cycle using this simple science-backed technique.",
      readTime: "4 min read",
      content: [
        "1. Lower the bar to zero: Tell yourself: 'I will only open my textbook for exactly five minutes, and then I am free to close it and play games.' Just starting breaks the initial dread friction.",
        "2. Work in 15-minute sprints: Set a visual timer on your phone for 15 minutes. Put your device on Do Not Disturb and focus on ONE topic. Your brain has plenty of energy for 15 minutes, whereas 3 hours feels like an avalanche.",
        "3. Reward the attempt, not the grade: When the 15-minute timer ring sounds, immediately reward your nervous system: eat a small piece of chocolate, stand up and stretch, or step outside to look at the sky. This reinforces focus loops happily."
      ]
    },
    {
      id: 'a-3',
      category: 'career',
      title: "Bootcamp, Community College, or University? Let's break it down",
      summary: "Most students are taught that a 4-year private university is the only path. The tech industry has evolved. Here is the objective truth about career paths.",
      readTime: "5 min read",
      content: [
        "1. Traditional Universities: Best for deep research, networking, theory-heavy fields (like artificial intelligence and hardware engineering), and people who want the full campus lifestyle. High cost, but deep alumni access.",
        "2. Community Colleges: High-value stepping stone. You can complete general education credits for a fraction of the cost, then transfer smoothly to state colleges or universities. Extremely smart financial defense.",
        "3. Skill Bootcamps: Best for hands-on, direct skills like full-stack web development, user experience design, and digital marketing. They focus purely on portfolios and job-ready techniques. Ideal if you want to start earning quickly."
      ]
    }
  ];

  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // --- Quiz States ---
  const [currentQuizStep, setCurrentQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
  const [quizResult, setQuizResult] = useState<string | null>(null);

  const quizQuestions = [
    {
      question: "When you have a massive pile of homework due, how does your body react first?",
      options: [
        { label: "A. I immediately start listing, sorting, and tackling them.", style: "action" },
        { label: "B. I want to message a close friend to complain or vent.", style: "vent" },
        { label: "C. I go very quiet, over-analyze, and plan in my head.", style: "reflective" },
        { label: "D. I feel completely paralyzed, open social media, or take a nap.", style: "frozen" }
      ]
    },
    {
      question: "How do you feel about discussing your mental health with your family?",
      options: [
        { label: "A. I prefer addressing it on my own with direct actions first.", style: "action" },
        { label: "B. I wish I could talk about it with them, but fear a massive lecture.", style: "vent" },
        { label: "C. I prefer logging my headspace in anonymous diaries or journals.", style: "reflective" },
        { label: "D. I shut down entirely and hope the feeling passes away.", style: "frozen" }
      ]
    },
    {
      question: "Which coping strategy makes you feel the most centered?",
      options: [
        { label: "A. Making a strict, balanced study calendar and sticking to it.", style: "action" },
        { label: "B. Talking things out over voice call with an empathetic mentor.", style: "vent" },
        { label: "C. Doing quiet sensory grounding exercises or box breathing.", style: "reflective" },
        { label: "D. Distracting my brain with movies, cozy games, or sleeping.", style: "frozen" }
      ]
    }
  ];

  const handleSelectOption = (style: string) => {
    const updated = [...quizAnswers, style];
    setQuizAnswers(updated);

    if (currentQuizStep < quizQuestions.length - 1) {
      setCurrentQuizStep(prev => prev + 1);
    } else {
      // Calculate final dominant score
      const counts = updated.reduce((acc, val) => {
        acc[val] = (acc[val] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      let dominantStyle = 'frozen';
      let maxVal = 0;
      (Object.entries(counts) as Array<[string, number]>).forEach(([style, count]) => {
        if (count > maxVal) {
          maxVal = count;
          dominantStyle = style;
        }
      });

      setQuizResult(dominantStyle);
    }
  };

  const resetQuiz = () => {
    setCurrentQuizStep(0);
    setQuizAnswers([]);
    setQuizResult(null);
  };

  return (
    <div className="bg-white border border-outline p-6 md:p-8 space-y-8 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline pb-5">
        <div>
          <span className="font-mono text-[9px] text-secondary font-bold uppercase tracking-widest block">Educational Resilience Library</span>
          <h2 className="font-serif text-2xl font-medium text-primary tracking-tight">The Learn Hub &amp; Self-Quizzes</h2>
        </div>
        
        {/* Hub Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => { setActiveTab('articles'); setSelectedArticle(null); }}
            className={`px-4 py-2 font-mono text-[10px] uppercase tracking-wider border transition-all cursor-pointer ${
              activeTab === 'articles' 
              ? 'bg-primary text-white border-primary' 
              : 'bg-white border-outline text-on-surface-variant hover:bg-surface-dim'
            }`}
          >
            📚 Read Guides
          </button>
          <button
            onClick={() => { setActiveTab('quiz'); resetQuiz(); }}
            className={`px-4 py-2 font-mono text-[10px] uppercase tracking-wider border transition-all cursor-pointer ${
              activeTab === 'quiz' 
              ? 'bg-primary text-white border-primary' 
              : 'bg-white border-outline text-on-surface-variant hover:bg-surface-dim'
            }`}
          >
            🧠 Stress Style Quiz
          </button>
        </div>
      </div>

      {/* --- Tab 1: Articles List & Reader --- */}
      {activeTab === 'articles' && (
        <div className="space-y-6">
          {!selectedArticle ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {articles.map((art) => (
                <div 
                  key={art.id}
                  className="bg-white border border-outline p-5 flex flex-col justify-between gap-4 hover:border-secondary transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-[8px] font-mono uppercase tracking-wider">
                      <span className="bg-[#fcf8f2] border border-outline text-secondary px-2 py-0.5 rounded-none font-bold">
                        {art.category === 'mental-health' ? 'Mental Health' : art.category === 'relationships' ? 'Family Guidance' : 'Careers'}
                      </span>
                      <span className="text-on-surface-variant">{art.readTime}</span>
                    </div>

                    <h3 className="font-serif text-base font-bold text-primary leading-snug">
                      {art.title}
                    </h3>
                    <p className="text-xs text-on-surface-variant leading-relaxed font-sans line-clamp-3">
                      {art.summary}
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedArticle(art)}
                    className="text-secondary hover:text-primary transition-colors font-mono text-[9px] uppercase tracking-wider flex items-center gap-1.5 cursor-pointer pt-2 self-start"
                  >
                    <span>Read Full Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-[#fcf8f2] border border-outline p-6 md:p-8 space-y-6 animate-in fade-in duration-300">
              <button 
                onClick={() => setSelectedArticle(null)}
                className="font-mono text-[9px] uppercase tracking-wider text-secondary hover:text-primary cursor-pointer flex items-center gap-1"
              >
                ← Back to Guides
              </button>

              <div className="space-y-3 border-b border-outline/30 pb-4">
                <span className="font-mono text-[9px] uppercase tracking-widest text-secondary font-bold">
                  Curated Advisory Resource
                </span>
                <h3 className="font-serif text-2xl font-medium text-primary">
                  {selectedArticle.title}
                </h3>
                <p className="text-xs text-on-surface-variant font-sans leading-relaxed">
                  {selectedArticle.summary}
                </p>
              </div>

              <div className="space-y-5">
                {selectedArticle.content.map((paragraph, index) => (
                  <div key={index} className="bg-white border border-outline p-5 space-y-2">
                    <p className="text-xs text-primary leading-relaxed font-sans">
                      {paragraph}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-[10px] text-on-surface-variant font-mono">
                  Moderated by Teens Helpline Advisors
                </span>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="bg-primary hover:bg-primary/95 text-white h-10 px-5 font-mono text-[9px] uppercase tracking-wider cursor-pointer font-bold"
                >
                  Finished Reading
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* --- Tab 2: Interactive Quiz --- */}
      {activeTab === 'quiz' && (
        <div className="max-w-xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h3 className="font-serif text-xl font-medium text-primary">What is your Resilient Coping Style?</h3>
            <p className="text-xs text-on-surface-variant max-w-sm mx-auto leading-relaxed">
              When academics, university decisions, or personal goals build high pressure, everyone copes differently. Let's find your dominant style.
            </p>
          </div>

          {!quizResult ? (
            <div className="bg-surface-dim/30 border border-outline p-6 md:p-8 space-y-6">
              
              {/* Progress */}
              <div className="space-y-1">
                <div className="flex justify-between font-mono text-[8px] uppercase tracking-widest text-on-surface-variant font-bold">
                  <span>Question {currentQuizStep + 1} of {quizQuestions.length}</span>
                  <span>{quizQuestions.length - currentQuizStep - 1} remaining</span>
                </div>
                <div className="w-full h-1 bg-white border border-outline">
                  <div 
                    className="h-full bg-secondary transition-all"
                    style={{ width: `${((currentQuizStep + 1) / quizQuestions.length) * 100}%` }}
                  />
                </div>
              </div>

              <h4 className="font-serif text-base font-bold text-primary leading-relaxed">
                "{quizQuestions[currentQuizStep].question}"
              </h4>

              <div className="flex flex-col gap-2.5">
                {quizQuestions[currentQuizStep].options.map((option) => (
                  <button
                    key={option.label}
                    onClick={() => handleSelectOption(option.style)}
                    className="w-full text-left bg-white border border-outline hover:border-primary p-4 text-xs font-sans text-primary transition-all cursor-pointer rounded-none hover:bg-[#fcf8f2]/30"
                  >
                    {option.label}
                  </button>
                ))}
              </div>

            </div>
          ) : (
            <div className="bg-[#fcf8f2] border border-outline p-6 md:p-8 text-center space-y-6 animate-in zoom-in-95 duration-300">
              <div className="w-14 h-14 bg-white border border-outline text-secondary flex items-center justify-center mx-auto text-xl">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <p className="font-mono text-[9px] uppercase tracking-widest text-on-surface-variant font-bold">Your dominant style is:</p>
                
                {quizResult === 'action' && (
                  <div className="space-y-2">
                    <h4 className="font-serif text-xl font-bold text-emerald-800">The Action-Oriented Campaigner 🏃</h4>
                    <p className="text-xs text-on-surface-variant leading-relaxed max-w-sm mx-auto">
                      You tackle stress head-on with task calendars and checklists. You get motivated by getting things done. Keep it up, but remember to take breaks to avoid physical burnout!
                    </p>
                  </div>
                )}

                {quizResult === 'vent' && (
                  <div className="space-y-2">
                    <h4 className="font-serif text-xl font-bold text-secondary">The Social Vent-Seeker 🗣️</h4>
                    <p className="text-xs text-on-surface-variant leading-relaxed max-w-sm mx-auto">
                      You process emotions by talking them through with mentors, peers, or close friends. Connecting with our free counselors on the helpline will feel incredibly restorative!
                    </p>
                  </div>
                )}

                {quizResult === 'reflective' && (
                  <div className="space-y-2">
                    <h4 className="font-serif text-xl font-bold text-primary">The Quiet Reflective Observer 🧘</h4>
                    <p className="text-xs text-on-surface-variant leading-relaxed max-w-sm mx-auto">
                      You prefer quiet introspection, sensory grounding, or box breathing. Writing down prompts in our Reflection Journal is your absolute superpower.
                    </p>
                  </div>
                )}

                {quizResult === 'frozen' && (
                  <div className="space-y-2">
                    <h4 className="font-serif text-xl font-bold text-error">The Frozen Overwhelmed Adapter ❄️</h4>
                    <p className="text-xs text-on-surface-variant leading-relaxed max-w-sm mx-auto">
                      When stress piles up high, you feel temporary paralysis and avoid tasks. Don't worry—this is a normal biology response! Try our 'Coping Toolkit' page or start a 5-minute study block.
                    </p>
                  </div>
                )}
              </div>

              <button
                onClick={resetQuiz}
                className="bg-transparent hover:bg-primary/5 text-primary border border-primary h-11 px-6 font-mono text-[10px] uppercase tracking-wider transition-colors cursor-pointer inline-flex items-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Retake Quiz
              </button>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
