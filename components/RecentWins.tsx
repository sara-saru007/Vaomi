
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  ChevronRight, 
  ChevronLeft,
  TrendingUp, 
  Users, 
  Target, 
  Globe, 
  Zap, 
  Cpu, 
  Map, 
  SlidersHorizontal,
  ShieldCheck,
  Database,
  BarChart3,
  Network
} from 'lucide-react';

interface CaseStudy {
  id: string;
  badge: string;
  title: string;
  subTitle: string;
  description: string;
  image: string;
  link: string;
  stats: {
    icon: any;
    label: string;
    text: string;
  }[];
}

const studies: CaseStudy[] = [
  {
    id: "01",
    badge: "$8M ARR → Global",
    title: "Unlocking Gulf Expansion",
    subTitle: "Indian QSR Powerhouse",
    description: "A seasoned founder had conquered the Indian market but hit the 'Founder's Wall' when targeting the GCC—no local map, no trusted network, and no firsthand landscape knowledge.",
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=1000&auto=format&fit=crop",
    link: "https://vaomi.ai/case_studies_1/index.html",
    stats: [
      { icon: Target, label: "Precision Cohorts", text: "Identified Royals, Sovereign Wealth players, and F&B Titans." },
      { icon: Users, label: "Titan Access", text: "Unlocked doors to Investcorp ($60B AUM) & Aramco Ventures." },
      { icon: TrendingUp, label: "Pilot Locked", text: "Secured UAE pilot partnerships & mall debuts in record time." },
      { icon: Globe, label: "$20M Horizon", text: "The opportunity now circulating across top GCC VCs." }
    ]
  },
  {
    id: "02",
    badge: "India → Global",
    title: "Fueling Global EV Scale",
    subTitle: "Breaking the Hardware Ceiling",
    description: "A visionary founder conquered India with a modular EV platform but faced the 'Hardware Ceiling' when scaling globally—needing operational DNA for manufacturing & regulatory landscapes.",
    image: "https://img.freepik.com/premium-vector/green-scooter-semi-flat-rgb-color-vector-illustration-classic-electric-bike-italian-road-trip-urban-moped-riding-delivery-transport-isolated-cartoon-object-white-background_106317-6746.jpg?q=80&w=1000&auto=format&fit=crop",
    link: "https://vaomi.ai/case_studies_2/index.html",
    stats: [
      { icon: Globe, label: "Africa Unlocked", text: "Pilot partnerships secured across Kenya and Nigeria." },
      { icon: Zap, label: "LATAM Alliances", text: "Strategic alliance with VEMO to deploy 25,000 EVs in Mexico." },
      { icon: Users, label: "VC Connectivity", text: "Access to climate funds managing $50M-$550M+ AUM." },
      { icon: SlidersHorizontal, label: "Model Refinement", text: "Refined subscription model leveraging gig-worker adoption." }
    ]
  },
  {
    id: "03",
    badge: "$500M Monthly Volume",
    title: "Scaling Compliance-First Futures",
    subTitle: "Scaling Crypto Infrastructure",
    description: "From a local leader to a global B2B powerhouse. Scaling India's first fully compliant, tax-efficient futures engine via Vaomi's Capital Intelligence Network.",
    image: "https://www.shutterstock.com/shutterstock/videos/1060927900/thumb/8.jpg?ip=x480?q=80&w=1000&auto=format&fit=crop",
    link: "https://vaomi.ai/case_studies_3/index.html",
    stats: [
      { icon: Database, label: "Discovery", text: "Identifying 'Sleeping Giant' exchanges in emerging markets." },
      { icon: Map, label: "Corridor Mapping", text: "Targeting under-served corridors with high spot volume." },
      { icon: Network, label: "Execution", text: "Activating a precision network of VCs and Market Makers." },
      { icon: ShieldCheck, label: "Regulatory Moats", text: "Deep regulatory & banking moats across the India Stack." }
    ]
  },
  {
    id: "04",
    badge: "$200B Bovine Economy",
    title: "Backing Animal Genetic Intelligence",
    subTitle: "Climate-Smart Livestock Pioneer",
    description: "Bridging the gap between dusty rural markets and the polished boardrooms of global climate finance to build a digital twin for the bovine economy.",
    image: "https://www.shutterstock.com/image-photo/beautiful-herd-nelore-cattle-narrow-600nw-2285382345.jpg?q=80&w=1000&auto=format&fit=crop",
    link: "https://vaomi.ai/case_studies_4/index.html",
    stats: [
      { icon: BarChart3, label: "Signal Discovery", text: "The Animal Ancestry layer became the unlock for carbon credit." },
      { icon: Globe, label: "Capital Mapping", text: "Prioritizing capital for the 80M families dependent on livestock." },
      { icon: Users, label: "Cohort Velocity", text: "Reframed the story from 'selling cattle' to 'Genetic Commerce'." },
      { icon: Zap, label: "Ripple Effect", text: "Unlocked global capital access for Dairy Net Zero scaling." }
    ]
  },
  {
    id: "05",
    badge: "Capital & Credibility",
    title: "Fueling Enterprise AI Adoption",
    subTitle: "Closing the Trust Gap",
    description: "The platform worked. CIOs leaned in. But inside banks, autonomy raised questions of safety. Vaomi enabled enterprise-grade credibility for a next-gen AI platform.",
    image: "https://av-eks-lekhak.s3.amazonaws.com/media/__sized__/article_images/Screenshot_2023-06-29_144713-thumbnail_webp-600x300.webp?q=80&w=1000&auto=format&fit=crop",
    link: "https://vaomi.ai/case_studies_5/index.html",
    stats: [
      { icon: ShieldCheck, label: "Security-First", text: "Brought in investors whose credibility speaks in regulated rooms." },
      { icon: Cpu, label: "Autonomy Trust", text: "Turned hesitation into confidence and pilots into deployment." },
      { icon: Target, label: "Precision Playbook", text: "Removing specific points of friction in security approval." },
      { icon: Users, label: "Titan Signal", text: "Connected with infrastructure giants to validate scale." }
    ]
  },
  {
    id: "06",
    badge: "Modular Water Tech",
    title: "Backing Water Infrastructure",
    subTitle: "Scaling Clean Water Tech",
    description: "A deep-tech founder stood at the crossroads of water scarcity and industrial waste. Vaomi built the ecosystem—connecting them to infrastructure investors and industrial operators to unlock scale.",
    image: "https://media.licdn.com/dms/image/v2/C5612AQFhCiF2yKH65A/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1645358577390?e=2147483647&v=beta&t=P4B_2nMvJcAMC-ZDMYZpGZ35Yisn4MVQTipK2hBQ-dQ",
    link: "https://vaomi.ai/case_studies_6/index.html",
    stats: [
      { icon: Target, label: "Insight", text: "Reframed story from 'clean water' to risk removal & cost advantage." },
      { icon: Database, label: "Intelligence", text: "Identified investors built for CapEx-heavy hardware deployment." },
      { icon: Zap, label: "Acceleration", text: "Assembled ecosystem of operators and regional market architects." },
      { icon: TrendingUp, label: "Impact", text: "80% energy recycled in modular wastewater solutions." }
    ]
  }
];

const RecentWins: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isPaused, setIsPaused] = useState(false);

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setIndex((prev) => {
      let next = prev + newDirection;
      if (next >= studies.length) return 0;
      if (next < 0) return studies.length - 1;
      return next;
    });
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      paginate(1);
    }, 6000);
    return () => clearInterval(timer);
  }, [paginate, isPaused]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      filter: "blur(10px)"
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      filter: "blur(0px)"
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      filter: "blur(10px)"
    })
  };

  const currentStudy = studies[index];

  return (
    <section 
      id="case-studies" 
      className="py-24 md:py-32 bg-black border-t border-white/5 relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container mx-auto px-6">
        <div className="mb-12 md:mb-20 text-center">
           <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white mt-4 leading-relaxed">
             Here are some of our recent wins.
           </h2>
        </div>

        <div className="relative max-w-6xl mx-auto h-auto min-h-[400px] md:min-h-[500px]">
          {/* Desktop Only Navigation Arrows (Static) */}
          <button 
            onClick={() => paginate(-1)}
            className="absolute -left-4 md:-left-24 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-brand hover:text-black hover:border-brand transition-all duration-300 hidden md:flex items-center justify-center shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={() => paginate(1)}
            className="absolute -right-4 md:-right-24 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-brand hover:text-black hover:border-brand transition-all duration-300 hidden md:flex items-center justify-center shadow-lg"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Carousel Body */}
          <div className="relative overflow-visible">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={index}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.4 }
                }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-stretch"
              >
                {/* Visual Side: Image and study-specific CTA button */}
                <div className="flex flex-col gap-6 md:block">
                  <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group h-[350px] md:h-[500px]">
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10"/>
                    <img 
                      src={currentStudy.image} 
                      alt={currentStudy.title} 
                      className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110 opacity-80"
                    />
                    <div className="absolute bottom-0 left-0 p-6 md:p-10 z-20">
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block px-3 py-1 bg-brand text-black text-[10px] md:text-xs font-bold rounded mb-4"
                      >
                        {currentStudy.badge}
                      </motion.div>
                      <h3 className="text-2xl md:text-4xl font-bold text-white mb-2 leading-tight">{currentStudy.subTitle}</h3>
                      <p className="text-gray-300 text-sm md:text-base font-light">{currentStudy.title}</p>
                    </div>
                  </div>

                  {/* Read Full Case Study Button (Slides with content on mobile) */}
                  <div className="md:hidden flex justify-center">
                    <a 
                      href={currentStudy.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group px-8 py-3.5 bg-white text-black font-bold rounded-[1px] flex items-center gap-2 hover:bg-brand transition-all shadow-[0_0_20px_rgba(255,255,255,0.05)] w-full justify-center"
                    >
                      Read Full Case Study
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>

                {/* Content Side - Desktop only info (Narrative + Stats) */}
                <div className="hidden md:flex flex-col gap-6 md:gap-8 justify-between">
                  <div>
                    <span className="text-brand font-mono text-sm uppercase tracking-widest mb-2 block">Case Study {currentStudy.id}</span>
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">{currentStudy.title}</h3>
                    <p className="text-gray-400 leading-relaxed text-base md:text-lg">
                      {currentStudy.description}
                    </p>
                  </div>

                  {/* Stats Grid - Desktop Only */}
                  <div className="grid grid-cols-2 gap-4 md:gap-6">
                    {currentStudy.stats.map((stat, i) => (
                      <div key={i} className="bg-[#0A0A0A] p-4 md:p-6 rounded-xl border border-white/10 hover:border-brand/30 transition-colors group/stat">
                        <stat.icon className="w-6 h-6 text-brand mb-3 group-hover/stat:scale-110 transition-transform" />
                        <h4 className="font-bold text-white text-xs md:text-sm mb-1">{stat.label}</h4>
                        <p className="text-[10px] md:text-xs text-gray-400 leading-tight">{stat.text}</p>
                      </div>
                    ))}
                  </div>

                  {/* Desktop Button */}
                  <div className="flex justify-start">
                    <a 
                      href={currentStudy.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group px-8 py-3.5 bg-white text-black font-bold rounded-[1px] flex items-center gap-2 hover:bg-brand transition-all shadow-[0_0_20px_rgba(255,255,255,0.05)] w-fit justify-center"
                    >
                      Read Full Case Study
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Mobile-Only Static Arrow Controls (Outside animation) */}
            <div className="md:hidden flex items-center justify-between mt-10 px-4 relative z-40">
              <button 
                onClick={() => paginate(-1)}
                className="p-4 rounded-full bg-white/5 border border-white/10 text-white active:bg-brand active:text-black transition-all shadow-xl flex items-center justify-center"
                aria-label="Previous Study"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <div className="flex flex-col items-center">
                 <span className="text-white font-bold text-lg tabular-nums">{index + 1} / {studies.length}</span>
              </div>

              <button 
                onClick={() => paginate(1)}
                className="p-4 rounded-full bg-white/5 border border-white/10 text-white active:bg-brand active:text-black transition-all shadow-xl flex items-center justify-center"
                aria-label="Next Study"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Only Navigation Bars */}
        <div className="hidden md:flex justify-center gap-3 mt-20">
          {studies.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              className={`
                transition-all duration-300 h-1.5 rounded-full border-0 p-0 text-[0]
                ${i === index ? 'w-12 bg-brand' : 'w-2 bg-white/20 hover:bg-white/40'}
              `}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RecentWins;
