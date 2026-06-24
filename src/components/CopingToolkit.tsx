import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  Sparkles, 
  Eye, 
  Hand, 
  Volume2, 
  Wind, 
  Flame, 
  HelpCircle,
  RotateCcw,
  CheckCircle2,
  ChevronRight,
  RefreshCw,
  Heart
} from 'lucide-react';

export default function CopingToolkit() {
  const [activeSubTab, setActiveSubTab] = useState<'grounding' | 'breathing' | 'reframer'>('grounding');

  // --- Grounding Exercise States ---
  const [groundingStep, setGroundingStep] = useState(0); // 0 to 5
  const [groundingInputs, setGroundingInputs] = useState<string[]>(['', '', '', '', '']);
  const groundingSteps = [
    {
      title: '5 Things You Can See',
      icon: Eye,
      instruction: 'Look around you. Name five things you can see right now. Type or imagine them.',
      placeholder: 'e.g., A blue notebook, a green plant, a coffee mug...',
      count: 5
    },
    {
      title: '4 Things You Can Feel',
      icon: Hand,
      instruction: 'Focus on your body. What are four things you can feel physically?',
      placeholder: 'e.g., Cool air on my face, the texture of my shirt, the floor underneath my feet...',
      count: 4
    },
    {
      title: '3 Things You Can Hear',
      icon: Volume2,
      instruction: 'Listen carefully. What are three sounds in your environment?',
      placeholder: 'e.g., Traffic hum, bird chirping, fan whirring...',
      count: 3
    },
    {
      title: '2 Things You Can Smell',
      icon: Wind,
      instruction: 'Take a sniff. What are two scents you can detect?',
      placeholder: 'e.g., Coffee brewing, old books, rain, soap...',
      count: 2
    },
    {
      title: '1 Thing You Can Taste',
      icon: Flame,
      instruction: 'Focus on your tongue. What is one thing you can taste, or what is a favorite flavor?',
      placeholder: 'e.g., Mint toothpaste, warm tea, sweet honey...',
      count: 1
    }
  ];

  const handleNextGrounding = (inputVal: string) => {
    const updated = [...groundingInputs];
    updated[groundingStep] = inputVal;
    setGroundingInputs(updated);
    setGroundingStep(prev => prev + 1);
  };

  const resetGrounding = () => {
    setGroundingStep(0);
    setGroundingInputs(['', '', '', '', '']);
  };

  // --- Box Breathing States ---
  const [breathStage, setBreathStage] = useState<'inhale' | 'hold-in' | 'exhale' | 'hold-out' | 'idle'>('idle');
  const [breathCounter, setBreathCounter] = useState(4);

  useEffect(() => {
    if (breathStage === 'idle') return;

    const timer = setInterval(() => {
      setBreathCounter((prev) => {
        if (prev <= 1) {
          if (breathStage === 'inhale') {
            setBreathStage('hold-in');
            return 4;
          } else if (breathStage === 'hold-in') {
            setBreathStage('exhale');
            return 4;
          } else if (breathStage === 'exhale') {
            setBreathStage('hold-out');
            return 4;
          } else if (breathStage === 'hold-out') {
            setBreathStage('inhale');
            return 4;
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

  // --- Reframer States ---
  const reframings = [
    {
      id: 1,
      negative: "I am going to fail this exam, and my life will be ruined.",
      reframe: "This is just one test. It does not measure my worth, my creativity, or my long-term future. I will do my best and adapt.",
      category: "Academic Stress"
    },
    {
      id: 2,
      negative: "Everyone else has their entire career figured out except for me.",
      reframe: "Most people are figuring it out as they go, even if they look confident. I am 17—it is perfectly normal and healthy to explore multiple paths.",
      category: "Career Stress"
    },
    {
      id: 3,
      negative: "If I don't get into an Ivy League/top university, I have failed.",
      reframe: "Success comes from my dedication and curiosity, not a school's name. State colleges, community colleges, and bootcamps lead to incredibly successful careers.",
      category: "University Prep"
    },
    {
      id: 4,
      negative: "I am too anxious to talk to anyone. I must be broken.",
      reframe: "Anxiety is a normal human response to stress. It means my body is trying to protect me. I am strong, and I can seek help in my own time.",
      category: "Mental Health"
    },
    {
      id: 5,
      negative: "I'm not good enough at coding/math to do a STEM job.",
      reframe: "STEM skills are learned through practice and mistakes, not magic talent. Every senior engineer was once a beginner who felt confused.",
      category: "Self-Doubt"
    }
  ];

  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  const toggleFlip = (id: number) => {
    if (flippedCards.includes(id)) {
      setFlippedCards(flippedCards.filter(cid => cid !== id));
    } else {
      setFlippedCards([...flippedCards, id]);
    }
  };

  return (
    <div className="bg-white border border-outline p-6 md:p-8 space-y-8">
      
      {/* Tab Selectors */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-outline pb-5">
        <div>
          <span className="font-mono text-[9px] text-secondary font-bold uppercase tracking-widest block">Stress relief &amp; clarity</span>
          <h2 className="font-serif text-2xl font-medium text-primary tracking-tight">Interactive Coping Toolkit</h2>
        </div>
        
        {/* Sub-Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveSubTab('grounding')}
            className={`px-4 py-2 font-mono text-[10px] uppercase tracking-wider border transition-all cursor-pointer ${
              activeSubTab === 'grounding' 
              ? 'bg-primary text-white border-primary' 
              : 'bg-white border-outline text-on-surface-variant hover:bg-surface-dim'
            }`}
          >
            🧠 5-4-3-2-1 Grounding
          </button>
          <button
            onClick={() => setActiveSubTab('breathing')}
            className={`px-4 py-2 font-mono text-[10px] uppercase tracking-wider border transition-all cursor-pointer ${
              activeSubTab === 'breathing' 
              ? 'bg-primary text-white border-primary' 
              : 'bg-white border-outline text-on-surface-variant hover:bg-surface-dim'
            }`}
          >
            🌬️ Box Breathing
          </button>
          <button
            onClick={() => setActiveSubTab('reframer')}
            className={`px-4 py-2 font-mono text-[10px] uppercase tracking-wider border transition-all cursor-pointer ${
              activeSubTab === 'reframer' 
              ? 'bg-primary text-white border-primary' 
              : 'bg-white border-outline text-on-surface-variant hover:bg-surface-dim'
            }`}
          >
            🔄 Thought Reframer
          </button>
        </div>
      </div>

      {/* --- Tab 1: 5-4-3-2-1 Grounding --- */}
      {activeSubTab === 'grounding' && (
        <div className="space-y-6 max-w-3xl mx-auto">
          <div className="text-center space-y-2">
            <h3 className="font-serif text-xl font-medium text-primary">5-4-3-2-1 Sensory Grounding</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed max-w-xl mx-auto">
              Grounding techniques pull you out of racing panic attacks or heavy career anxieties, centering your focus on the physical world right here.
            </p>
          </div>

          {groundingStep < 5 ? (
            <div className="bg-surface-dim/40 border border-outline p-6 md:p-8 space-y-6 text-center animate-in fade-in duration-300">
              {/* Icon */}
              <div className="w-14 h-14 bg-white border border-outline flex items-center justify-center mx-auto text-secondary text-xl">
                {React.createElement(groundingSteps[groundingStep].icon, { className: "w-7 h-7" })}
              </div>

              {/* Progress bar */}
              <div className="space-y-1 max-w-xs mx-auto">
                <div className="flex justify-between font-mono text-[8px] uppercase tracking-wider text-on-surface-variant">
                  <span>Step {groundingStep + 1} of 5</span>
                  <span>{5 - groundingStep} categories left</span>
                </div>
                <div className="w-full h-1.5 bg-white border border-outline">
                  <div 
                    className="h-full bg-secondary transition-all"
                    style={{ width: `${(groundingStep + 1) * 20}%` }}
                  />
                </div>
              </div>

              {/* Steps prompt */}
              <div className="space-y-2">
                <h4 className="font-serif text-lg font-bold text-primary">
                  {groundingSteps[groundingStep].title}
                </h4>
                <p className="text-xs text-on-surface-variant max-w-md mx-auto leading-relaxed">
                  {groundingSteps[groundingStep].instruction}
                </p>
              </div>

              {/* Interactive typing */}
              <div className="max-w-md mx-auto space-y-3 pt-2">
                <input
                  type="text"
                  placeholder={groundingSteps[groundingStep].placeholder}
                  id={`grounding-input-${groundingStep}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleNextGrounding((e.target as HTMLInputElement).value);
                      (e.target as HTMLInputElement).value = '';
                    }
                  }}
                  className="w-full bg-white border border-outline px-4 py-3 text-xs focus:outline-none focus:border-secondary font-mono text-center"
                />
                <button
                  onClick={() => {
                    const el = document.getElementById(`grounding-input-${groundingStep}`) as HTMLInputElement;
                    handleNextGrounding(el?.value || 'Acknowledged');
                    if (el) el.value = '';
                  }}
                  className="bg-primary hover:bg-primary/95 text-white h-10 px-6 font-mono text-[10px] uppercase tracking-wider cursor-pointer transition-all inline-flex items-center gap-1.5"
                >
                  Continue <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-[#fcf8f2] border border-outline p-6 md:p-8 text-center space-y-6 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 bg-white border border-outline flex items-center justify-center text-emerald-600 mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              
              <div className="space-y-2">
                <h4 className="font-serif text-xl font-bold text-primary">Sensory Grounding Completed</h4>
                <p className="text-xs text-on-surface-variant max-w-md mx-auto leading-relaxed">
                  Brilliant. Take a deep sigh. You have pulled your attention back to your immediate environment. You are safe, secure, and in command.
                </p>
              </div>

              {/* Summary of what they entered */}
              <div className="text-left max-w-md mx-auto bg-white border border-outline p-4 space-y-2.5 font-mono text-[10px]">
                <p className="font-bold text-secondary uppercase border-b border-outline pb-1.5">My Grounding Log:</p>
                {groundingSteps.map((step, idx) => (
                  <div key={idx} className="flex gap-2">
                    <span className="font-bold text-primary shrink-0">{idx + 1}.</span>
                    <span className="text-on-surface-variant italic">"{groundingInputs[idx] || 'Breathed deeply'}"</span>
                  </div>
                ))}
              </div>

              <button
                onClick={resetGrounding}
                className="bg-transparent text-primary border border-primary hover:bg-primary/5 h-11 px-6 font-mono text-[10px] uppercase tracking-wider transition-colors cursor-pointer inline-flex items-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Try Again
              </button>
            </div>
          )}
        </div>
      )}

      {/* --- Tab 2: Box Breathing --- */}
      {activeSubTab === 'breathing' && (
        <div className="space-y-6 max-w-md mx-auto text-center">
          <div className="space-y-2">
            <h3 className="font-serif text-xl font-medium text-primary">Pranayama Box Breathing</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Box breathing is used by deep-sea divers and surgeons to reset the nervous system in high-stress situations. It synchronizes heart rhythms.
            </p>
          </div>

          <div className="bg-surface-dim/30 border border-outline p-8 flex flex-col items-center justify-center gap-6">
            
            {/* Visual breathing circle */}
            <div className="w-48 h-48 rounded-full bg-[#fcf8f2] flex items-center justify-center relative overflow-hidden border border-outline">
              {/* Animated outer scaling circle */}
              <div 
                className={`absolute rounded-full transition-all duration-[4000ms] ease-in-out bg-secondary/20 ${
                  breathStage === 'inhale' 
                  ? 'w-44 h-44 scale-100' 
                  : breathStage === 'hold-in' 
                  ? 'w-44 h-44 scale-100 bg-secondary/35 opacity-40'
                  : breathStage === 'exhale' 
                  ? 'w-10 h-10 scale-50 opacity-50' 
                  : 'w-10 h-10 scale-50 opacity-10'
                }`}
              />

              <div className="z-10 space-y-1">
                <span className="font-mono text-[10px] uppercase tracking-widest text-secondary font-bold block">
                  {breathStage === 'idle' && 'Calm State'}
                  {breathStage === 'inhale' && 'Breathe In'}
                  {breathStage === 'hold-in' && 'Hold Breath'}
                  {breathStage === 'exhale' && 'Breathe Out'}
                  {breathStage === 'hold-out' && 'Rest Empty'}
                </span>
                <p className="font-serif text-4xl font-bold text-primary">
                  {breathStage === 'idle' ? '🧘' : breathCounter}
                </p>
                {breathStage !== 'idle' && (
                  <span className="font-mono text-[8px] text-on-surface-variant uppercase tracking-wider block">Seconds</span>
                )}
              </div>
            </div>

            {/* Instruction banner based on stage */}
            <div className="h-10 text-xs text-on-surface-variant font-medium max-w-xs leading-relaxed font-sans">
              {breathStage === 'idle' && "Click below to begin a paced 4-second cycle."}
              {breathStage === 'inhale' && "Feel the cool air filling your lungs completely."}
              {breathStage === 'hold-in' && "Maintain a gentle, quiet suspension. Rest in the fullness."}
              {breathStage === 'exhale' && "Let the warm air escape slowly, releasing body tension."}
              {breathStage === 'hold-out' && "Hold your lungs empty. Rest in the peaceful silence."}
            </div>

            {/* Control */}
            <div className="w-full">
              {breathStage === 'idle' ? (
                <button
                  onClick={startBreathing}
                  className="w-full bg-secondary hover:bg-secondary/95 text-white h-11 font-mono text-[10px] uppercase tracking-wider transition-colors cursor-pointer font-bold"
                >
                  Start Box Breathing
                </button>
              ) : (
                <button
                  onClick={stopBreathing}
                  className="w-full bg-transparent text-primary border border-primary hover:bg-primary/5 h-11 font-mono text-[10px] uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Pause Exercise
                </button>
              )}
            </div>

          </div>
        </div>
      )}

      {/* --- Tab 3: Thought Reframer --- */}
      {activeSubTab === 'reframer' && (
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h3 className="font-serif text-xl font-medium text-primary">Negative-to-Positive Thought Reframer</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed max-w-xl mx-auto">
              Our minds often jump to extreme, anxious scenarios. Click on these cards to reframe toxic thoughts into healthy, resilient viewpoints.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {reframings.map((card) => {
              const isFlipped = flippedCards.includes(card.id);
              return (
                <div 
                  key={card.id}
                  onClick={() => toggleFlip(card.id)}
                  className={`border p-6 flex flex-col justify-between gap-5 transition-all duration-300 cursor-pointer min-h-[200px] relative overflow-hidden ${
                    isFlipped 
                    ? 'bg-[#fcf8f2] border-secondary' 
                    : 'bg-white border-outline hover:border-primary'
                  }`}
                >
                  <div className="space-y-3 relative z-10">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-[8px] uppercase tracking-wider bg-surface-dim text-on-surface-variant px-2.5 py-1 border border-outline">
                        {card.category}
                      </span>
                      <span className="font-mono text-[8px] uppercase tracking-wider text-secondary font-bold">
                        {isFlipped ? 'Reframed ✨' : 'Click to Reframe 🔄'}
                      </span>
                    </div>

                    {!isFlipped ? (
                      <div className="space-y-1.5">
                        <p className="font-mono text-[9px] uppercase tracking-wider text-error font-bold">Anxious Thought:</p>
                        <p className="font-serif text-base italic text-primary leading-relaxed">
                          "{card.negative}"
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-1.5 animate-in fade-in duration-300">
                        <p className="font-mono text-[9px] uppercase tracking-wider text-emerald-700 font-bold">Resilient Reframe:</p>
                        <p className="font-serif text-base font-bold text-primary leading-relaxed">
                          "{card.reframe}"
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-outline/40 pt-3 flex justify-between items-center text-[9px] font-mono uppercase tracking-wider text-on-surface-variant">
                    <span>Confidential Advice</span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-3 h-3 text-secondary" /> Teens Helpline
                    </span>
                  </div>

                  {/* Aesthetic card corner accent */}
                  <div className={`absolute top-0 right-0 w-8 h-8 border-t border-r -mt-4 -mr-4 rotate-45 ${isFlipped ? 'border-secondary' : 'border-outline'}`} />
                </div>
              );
            })}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => setFlippedCards([])}
              className="bg-white border border-outline hover:bg-surface-dim text-on-surface-variant h-10 px-5 font-mono text-[9px] uppercase tracking-wider transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reset Card Deck
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
