
import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, ArrowRight } from 'lucide-react';

const rawTestimonialsData = [
  {
    name: "Hamed Tehrane",
    role: "Investment Manager @ Investcorp",
    initials: "HT",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200&h=200",
    linkedin: "https://ir.linkedin.com/in/hamed-tehrane-0b0340190",
    badge: "TOP TIER",
    badgeColor: "bg-brand",
    highlights: "~$60B AUM • Forbes #2 ME Asset Mgr",
    notableLabel: "NOTABLE BACKING",
    notable: "Gucci, Tiffany & Co., Corneliani, Riva",
    description: "Access to a global PE platform with immense consumer exposure."
  },
  {
    name: "Abdulnasser Alsharafi",
    role: "Investor Relations @ ADIO",
    initials: "AA",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200",
    linkedin: "https://ae.linkedin.com/in/abdulnasser-alsharafi",
    badge: "GATEKEEPER",
    badgeColor: "bg-brand",
    highlights: "~$10B+ Impact • Govt Ecosystem",
    notableLabel: "ECOSYSTEM WINS",
    notable: "Pure Harvest, Anghami, Starzplay",
    description: "Abu Dhabi Investment Office. Fast-tracks licensing and incentives."
  },
  {
    name: "Rabea Ragheb",
    role: "Venture Lead @ Aramco Ventures",
    initials: "Ra",
    image: "https://media.licdn.com/dms/image/v2/D4D03AQGo2cGuArMZTw/profile-displayphoto-scale_200_200/B4DZn383rSJMAY-/0/1760801554450?e=2147483647&v=beta&t=94Wq7Y131TPJvEnVBNqomUSgVxri2zLZymDtv1xQPgE",
    linkedin: "https://sa.linkedin.com/in/ragheb",
    badge: "SOVEREIGN TIE",
    badgeColor: "bg-brand",
    highlights: "~$7.5B Capital • Sovereign Venture",
    notableLabel: "NOTABLE BACKING",
    notable: "Carbon Clean, Energy Vault, Pragmatic",
    description: "Guided market-entry timing within the Saudi Vision 2030 ecosystem."
  },
  {
    name: "Cultural Dev. Fund",
    role: "Investments Team (Saudi)",
    initials: "CDF",
    image: "https://media.licdn.com/dms/image/v2/C4E0BAQF3BGhLWGllnQ/company-logo_200_200/company-logo_200_200/0/1679321472775/cdf_sa_logo?e=2147483647&v=beta&t=8VhQ4scFUS3CdSnXjwtkY8Yl8OPpjC57IeXRWkXYPAc",
    linkedin: "https://www.linkedin.com/company/cdf-sa/",
    badge: "GOV FUND",
    badgeColor: "bg-white",
    highlights: "~$1B+ Fund • Vision 2030 Pillar",
    notableLabel: "ECOSYSTEM IMPACT",
    notable: "Provided institutional legitimacy and policy access for regional ambitions.",
    description: "Strategic capital deployment for cultural infrastructure."
  },
  {
    name: "Ihsan Jawad",
    role: "Partner @ STV",
    initials: "IJ",
    image: "https://images.crunchbase.com/image/upload/c_thumb,h_170,w_170,f_auto,g_face,z_0.7,b_white,q_auto:eco,dpr_2/v1441968203/tr0dpb0ecemd4b4qx7dy.png?ik-sanitizeSvg=true",
    linkedin: "https://ae.linkedin.com/in/ihsan-jawad-92b1361",
    badge: "GROWTH GIANT",
    badgeColor: "bg-brand",
    highlights: "~$500M AUM • Growth Stage Leader",
    notableLabel: "UNICORN HUNTER",
    notable: "Careem, Tabby, Nana, Salla",
    description: "Backing national champions with significant growth capital."
  },
  {
    name: "Tamer Azer",
    role: "Partner @ Shorooq Partners",
    initials: "TA",
    image: "https://media.licdn.com/dms/image/v2/D4D03AQF6zYdzRLfCGg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1730897099136?e=2147483647&v=beta&t=4eF4WP9zH5mTZzO1aIKvmwQZxAC_LNLJjPprKjh94N4",
    linkedin: "https://eg.linkedin.com/in/tamerazer",
    badge: "VC LEADER",
    badgeColor: "bg-white",
    highlights: "~$150M+ AUM • Seed Stage Leader",
    notableLabel: "PORTFOLIO WINS",
    notable: "Pure Harvest, TruKKer, Sarwa, NymCard",
    description: "Deep operational value add for early stage founders across MENA."
  }
];

// Duplicate data to create a denser, wider ring for desktop
const testimonialsData = [...rawTestimonialsData, ...rawTestimonialsData];

const MobileTestimonialMarquee = ({ items, direction = 'left' }: { items: any[], direction?: 'left' | 'right' }) => {
    return (
        <div className="flex overflow-hidden relative w-full py-2">
            <motion.div 
                className="flex gap-3 px-4"
                animate={{ x: direction === 'left' ? "-50%" : "0%" }}
                initial={{ x: direction === 'left' ? "0%" : "-50%" }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                style={{ width: "max-content" }}
            >
                {/* Duplicate items for seamless loop */}
                {[...items, ...items, ...items].map((data, i) => (
                    <div key={i} className="w-[240px] bg-[#0A0A0A] border border-white/10 rounded-lg p-3 flex flex-col gap-2 shrink-0 shadow-lg">
                         <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20 shrink-0">
                                <img src={data.image} alt={data.name} className="w-full h-full object-cover"/>
                            </div>
                            <div className="min-w-0 flex-1">
                                <h4 className="text-white font-bold text-sm truncate leading-tight">{data.name}</h4>
                                <p className="text-brand text-[9px] uppercase tracking-wide truncate mt-0.5">{data.role}</p>
                            </div>
                         </div>
                         <div className="bg-white/5 rounded border border-white/5 p-2">
                            <p className="text-[8px] text-gray-500 uppercase tracking-widest mb-0.5">HIGHLIGHTS</p>
                            <p className="text-gray-200 text-[11px] font-medium truncate">{data.highlights}</p>
                         </div>
                    </div>
                ))}
            </motion.div>
        </div>
    )
}

const TestimonialCard: React.FC<{ data: any; index?: number; count?: number }> = ({ data, index = 0, count = 1 }) => {
    // 3D version for Desktop
    const angle = (360 / count) * index;
    const radius = 950; 
    
    return (
        <div 
            className="absolute top-1/2 left-1/2 w-[350px] md:w-[400px] -ml-[175px] md:-ml-[200px] -mt-[140px]"
            style={{
                transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                backfaceVisibility: 'hidden', 
                WebkitBackfaceVisibility: 'hidden'
            }}
        >
             <div className="bg-[#0A0A0A] border border-white/10 hover:border-brand/40 transition-all duration-300 group h-[280px] flex flex-col shadow-2xl rounded-xl relative overflow-hidden">
                {/* Badge */}
                <div className={`absolute top-0 right-0 ${data.badgeColor === 'bg-white' ? 'bg-white text-black' : 'bg-brand text-black'} px-3 py-1 rounded-bl-lg text-[10px] font-bold uppercase tracking-wider`}>
                    {data.badge}
                </div>

                <div className="p-6 flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden border border-white/20 shrink-0">
                            <img 
                                src={data.image} 
                                alt={data.name} 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-1 min-w-0 pr-8">
                            <h3 className="text-white font-display font-bold text-lg truncate">{data.name}</h3>
                            <p className="text-brand text-xs uppercase tracking-wide truncate">{data.role}</p>
                        </div>
                        {data.linkedin && (
                            <a href={data.linkedin} target="_blank" rel="noopener noreferrer">
                                <Linkedin className="w-5 h-5 text-gray-600 hover:text-white transition-colors cursor-pointer" />
                            </a>
                        )}
                    </div>

                    {/* Highlights Box */}
                    <div className="bg-black/50 border border-white/10 rounded-lg p-3 mb-3">
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">HIGHLIGHTS</p>
                        <p className="text-white text-sm font-bold">{data.highlights}</p>
                    </div>

                    {/* Notable Backing */}
                    <div className="mb-3">
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">{data.notableLabel}</p>
                        <p className="text-gray-300 text-xs leading-relaxed line-clamp-2">{data.notable}</p>
                    </div>

                    {/* Description (Footer) */}
                    <div className="mt-auto pt-3 border-t border-white/5">
                        <p className="text-gray-400 text-xs italic line-clamp-2">
                            "{data.description}"
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-16 md:py-32 bg-black relative overflow-hidden border-t border-white/5 md:h-[950px] flex flex-col md:justify-center md:perspective-[2500px]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        
        {/* Vignette */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-black pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-6 relative z-10 w-full h-full flex flex-col"
      >
        <div className="mb-8 md:mb-12 flex flex-col items-center text-center relative z-20">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-relaxed">
                And recent introductions
            </h2>
            <p className="mt-4 text-gray-400 max-w-2xl text-lg">
                Real connections we made for our partners.
            </p>
        </div>

        {/* Mobile View: Dual Marquee */}
        <div className="md:hidden flex flex-col gap-4 mt-4">
            <MobileTestimonialMarquee items={rawTestimonialsData} direction="left" />
            <MobileTestimonialMarquee items={[...rawTestimonialsData].reverse()} direction="right" />
        </div>

        {/* Desktop 3D Carousel Stage */}
        <div className="hidden md:flex flex-1 relative items-center justify-center mt-12 h-[500px]">
            <motion.div 
                className="relative w-full h-full preserve-3d"
                animate={{ rotateY: -360 }}
                transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                style={{ transformStyle: "preserve-3d" }}
            >
                {testimonialsData.map((t, i) => (
                    <TestimonialCard 
                        key={i} 
                        data={t} 
                        index={i} 
                        count={testimonialsData.length}
                    />
                ))}
            </motion.div>
        </div>

        {/* Browse more Connections Button */}
        <div className="mt-12 md:mt-16 flex justify-center relative z-30">
            <a 
                href="https://vaomi.ai/connections/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-8 py-3.5 md:px-10 md:py-4 bg-white text-black text-sm md:text-lg font-bold rounded-[1px] flex items-center gap-3 hover:bg-brand hover:scale-105 transition-all duration-300 shadow-2xl"
            >
                Browse more Connections
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
        </div>
      </motion.div>
    </section>
  );
};

export default Testimonials;
