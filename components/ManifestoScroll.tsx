import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Database, Zap, Clock, Radio, Globe, BarChart3 } from 'lucide-react';
import NetworkBrain from './NetworkBrain';

const ManifestoScroll: React.FC = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"]
    });

    // 4 Sections Timing (Desktop Only)
    const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.20], [1, 1, 0]);
    const opacity2 = useTransform(scrollYProgress, [0.20, 0.25, 0.40, 0.45], [0, 1, 1, 0]);
    const opacity3 = useTransform(scrollYProgress, [0.45, 0.50, 0.65, 0.70], [0, 1, 1, 0]);
    const opacity4 = useTransform(scrollYProgress, [0.70, 0.75, 0.95, 1], [0, 1, 1, 1]);
    
    // Helper to switch animation props based on device
    const getSectionProps = (desktopOpacity: any) => {
        if (isMobile) {
            return {
                initial: { opacity: 1, y: 30 },
                whileInView: { opacity: 1, y: 0 },
                transition: { duration: 0.8 },
                viewport: { once: true, margin: "-10%" },
                className: "relative w-full flex items-center justify-center p-4 min-h-[50vh]"
            };
        }
        return {
            style: { opacity: desktopOpacity },
            className: "absolute inset-0 flex items-center justify-center p-6"
        };
    };

    return (
        <section 
            ref={targetRef} 
            className={`relative bg-black ${isMobile ? 'h-auto py-20' : 'h-[500vh]'}`}
        >
            
            {/* Sticky Container Wrapper */}
            <div className={isMobile ? 'flex flex-col gap-32 container mx-auto px-4 overflow-hidden' : 'sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden'}>
                
                {/* SECTION 1: THE BROKEN SYSTEM */}
                <motion.div {...getSectionProps(opacity1)}>
                    {/* Consistent equidistant spacing */}
                    <div className="max-w-4xl w-full text-center flex flex-col justify-center gap-12 md:gap-16 h-full">
                        
                        <motion.h2 
                            initial={isMobile ? {} : { opacity: 1, y: 20 }}
                            whileInView={isMobile ? {} : { opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-relaxed"
                        >
                            Founders aren’t failing.<br/>The fundraising system is.
                        </motion.h2>
                        
                        <motion.p 
                            initial={isMobile ? {} : { opacity: 1 }}
                            whileInView={isMobile ? {} : { opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-lg md:text-2xl text-gray-400 font-light leading-relaxed max-w-2xl mx-auto"
                        >
                            Every founder knows this feeling. You've built something that changes lives, but when it's time to raise, <span className="text-white">the world stops listening.</span>
                        </motion.p>

                        {/* Mobile: Grid cols 3 (side by side), small padding/text. Desktop: Larger */}
                        <div className="grid grid-cols-3 md:grid-cols-3 gap-2 md:gap-8 opacity-90 max-w-5xl mx-auto w-full px-0 md:px-4">
                            <div className="text-center bg-white/5 border border-white/10 p-2 md:p-8 rounded-lg md:rounded-xl backdrop-blur-md hover:bg-white/10 transition-all duration-300 group shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                                <span className="text-brand font-mono text-[8px] md:text-xs tracking-widest block mb-1 md:mb-4 uppercase group-hover:text-white transition-colors">Phrase #1</span>
                                <h3 className="text-white text-[10px] md:text-2xl font-bold">"Too Early."</h3>
                            </div>
                            <div className="text-center bg-white/5 border border-white/10 p-2 md:p-8 rounded-lg md:rounded-xl backdrop-blur-md hover:bg-white/10 transition-all duration-300 group shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                                <span className="text-brand font-mono text-[8px] md:text-xs tracking-widest block mb-1 md:mb-4 uppercase group-hover:text-white transition-colors">Phrase #2</span>
                                <h3 className="text-white text-[10px] md:text-2xl font-bold">"Too Crowded."</h3>
                            </div>
                            <div className="text-center bg-white/5 border border-white/10 p-2 md:p-8 rounded-lg md:rounded-xl backdrop-blur-md hover:bg-white/10 transition-all duration-300 group shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                                <span className="text-brand font-mono text-[8px] md:text-xs tracking-widest block mb-1 md:mb-4 uppercase group-hover:text-white transition-colors">Phrase #3</span>
                                <h3 className="text-white text-[10px] md:text-2xl font-bold">"We'll Circle Back."</h3>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* SECTION 2: THE FOUNDER'S TRUTH */}
                <motion.div 
                    {...getSectionProps(opacity2)}
                    className={`${isMobile ? 'relative w-full flex items-center justify-center p-4 min-h-[50vh]' : 'absolute inset-0 flex items-center justify-center p-6 pointer-events-none'}`}
                >
                    <div className="max-w-5xl w-full text-center">
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-12 md:mb-24 leading-relaxed">
                            This is because conviction takes precedence.
                        </h2>
                        
                        {/* Mobile: Flex Row (side by side), smaller scale. Desktop: Normal */}
                        <div className="flex flex-row md:flex-row items-center justify-center gap-4 md:gap-16 my-8 md:my-16">
                            <div className="text-center">
                                <span className="block text-2xl md:text-6xl mb-2 md:mb-6">📉</span>
                                <h3 className="text-gray-400 text-[10px] md:text-xl font-light">Raising capital isn't a<br/>financial process.</h3>
                            </div>
                            
                            {/* Horizontal Line "Connector" (Width based, 1px height) */}
                            <div className="h-[1px] w-12 md:w-32 bg-gradient-to-r from-gray-800 to-white"></div>
                            
                            <div className="text-center transform md:scale-110">
                                <span className="block text-2xl md:text-6xl mb-2 md:mb-6">❤️‍🔥</span>
                                <h3 className="text-white text-[10px] md:text-2xl font-bold">It is an<br/>emotional one.</h3>
                            </div>
                        </div>

                        <p className="text-lg md:text-3xl text-gray-300 font-light leading-relaxed max-w-4xl mx-auto px-4 mt-8">
                             Capital doesn’t move for logic alone. It moves for belief.
                        </p>
                    </div>
                </motion.div>


                {/* SECTION 3: THE DREAM ROUND FORMULA */}
                <motion.div {...getSectionProps(opacity3)}>
                    <div className="max-w-6xl w-full text-center">
                        <motion.div 
                            className="flex flex-col h-full justify-center"
                        >
                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-8 md:mb-16 leading-relaxed">
                                To solve this, we came up with the<br className="md:hidden" /> Dream Round Formula
                            </h2>
                            
                            <p className="text-lg md:text-2xl text-gray-400 font-light leading-relaxed mb-8 md:mb-24">
                                Every round that changes a company's destiny has <span className="text-white">three ingredients</span>:
                            </p>

                            {/* 3-Column Layout: Mobile is Grid 3 (side by side), Desktop Grid 3 */}
                            <div className="grid grid-cols-3 md:grid-cols-3 max-w-5xl mx-auto w-full">
                                
                                <div className="flex flex-col items-center text-center group border-r border-white/10 px-1 md:px-8 pb-0">
                                    <div className="mb-4 md:mb-8 p-0 md:p-4 rounded-full bg-transparent md:bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors">
                                        <Zap className="w-8 h-8 md:w-12 md:h-12 text-blue-400" />
                                    </div>
                                    <h3 className="text-white text-[8px] md:text-base font-bold uppercase tracking-wider mb-1 md:mb-3">The Story</h3>
                                    <p className="text-gray-400 text-[8px] md:text-lg font-light leading-relaxed">That makes people believe.</p>
                                </div>

                                <div className="flex flex-col items-center text-center group border-r border-white/10 px-1 md:px-8 pb-0">
                                    <div className="mb-4 md:mb-8 p-0 md:p-4 rounded-full bg-transparent md:bg-purple-500/5 group-hover:bg-purple-500/10 transition-colors">
                                        <Database className="w-8 h-8 md:w-12 md:h-12 text-purple-400" />
                                    </div>
                                    <h3 className="text-white text-[8px] md:text-base font-bold uppercase tracking-wider mb-1 md:mb-3">The Investors</h3>
                                    <p className="text-gray-400 text-[8px] md:text-lg font-light leading-relaxed">Who already understand that story.</p>
                                </div>

                                <div className="flex flex-col items-center text-center group px-1 md:px-8 pt-0">
                                    <div className="mb-4 md:mb-8 p-0 md:p-4 rounded-full bg-transparent md:bg-brand/5 group-hover:bg-brand/10 transition-colors">
                                        <Clock className="w-8 h-8 md:w-12 md:h-12 text-brand" />
                                    </div>
                                    <h3 className="text-white text-[8px] md:text-base font-bold uppercase tracking-wider mb-1 md:mb-3">The Timing</h3>
                                    <p className="text-gray-400 text-[8px] md:text-lg font-light leading-relaxed">Connecting when the signal is strongest.</p>
                                </div>

                            </div>
                        </motion.div>
                    </div>
                </motion.div>


                {/* SECTION 4: CAPITAL INTELLIGENCE NETWORK */}
                <motion.div 
                    {...getSectionProps(opacity4)}
                    className={isMobile ? "relative w-full flex items-center justify-center p-4 h-[60vh] overflow-hidden" : "absolute inset-0 flex items-center justify-center overflow-hidden"}
                >
                    {/* Background Brain Visual */}
                    <div className="absolute inset-0 z-0">
                        <NetworkBrain />
                    </div>

                    <div className="relative z-10 max-w-6xl w-full p-6 text-center mt-12 md:mt-0 pointer-events-none">
                        <div className="mb-6 md:mb-8">
                            <h2 className="text-base md:text-2xl font-display font-light text-gray-300 mb-4 md:mb-6 tracking-wide">
                                Which is powered by
                            </h2>
                            {/* Increased mobile size to text-3xl */}
                            <h3 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-0 leading-relaxed">
                                The Capital Intelligence Network
                            </h3>
                        </div>

                        <p className="text-gray-300 text-base md:text-2xl font-light max-w-4xl mx-auto leading-loose tracking-wide mb-8 md:mb-16">
                            A super intelligent system that has mapped over <span className="text-white font-bold">750,000</span> venture transactions over the last 15 years and tracks <span className="text-white font-bold">60,000</span> allocators globally.
                        </p>

                        {/* Floating Stats - Compact Graphics */}
                        {/* Mobile: Flex Row (side by side), tight gap. Desktop: Flex Row, normal gap */}
                        <div className="flex flex-row justify-center gap-2 md:gap-8 w-full max-w-4xl mx-auto">
                            
                            {/* Card 1: Signals */}
                            <div className="flex-1 bg-black/60 backdrop-blur-xl border border-white/10 p-2 md:p-5 rounded-lg md:rounded-2xl relative group overflow-hidden hover:border-brand/30 transition-colors">
                                <div className="absolute top-0 right-0 w-20 h-20 bg-brand/10 blur-xl rounded-full group-hover:bg-brand/20 transition-all duration-500"></div>
                                <div className="flex items-center gap-1 md:gap-2 mb-1 md:mb-3">
                                    <div className="w-3 h-3 md:w-6 md:h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                                        <BarChart3 className="w-2 h-2 md:w-3 md:h-3 text-brand" />
                                    </div>
                                    <div className="text-[6px] md:text-[10px] text-gray-400 font-mono uppercase tracking-widest">Tracking</div>
                                </div>
                                <div className="text-[10px] md:text-xl font-bold text-white mb-0 text-left">Smart Money</div>
                                <div className="text-[8px] md:text-xs text-gray-500 font-light text-left">Signals</div>
                                <div className="flex items-end gap-0.5 md:gap-1 h-6 md:h-10 mt-2 md:mt-4 w-full opacity-60">
                                    {[0.4, 0.7, 0.3, 0.9, 0.5, 0.8].map((h, i) => (
                                        <motion.div 
                                            key={i}
                                            className="flex-1 bg-brand/50 rounded-t-sm"
                                            animate={{ height: [h * 10, h * 20, h * 10] }} // Adjusted for mobile height
                                            transition={{ duration: 1.5, delay: i * 0.1, repeat: Infinity, ease: "easeInOut" }}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Card 2: Intent */}
                            <div className="flex-1 bg-black/60 backdrop-blur-xl border border-white/10 p-2 md:p-5 rounded-lg md:rounded-2xl relative group overflow-hidden hover:border-blue-500/30 transition-colors">
                                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 blur-xl rounded-full group-hover:bg-blue-500/20 transition-all duration-500"></div>
                                <div className="flex items-center gap-1 md:gap-2 mb-1 md:mb-3">
                                    <div className="w-3 h-3 md:w-6 md:h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                                        <Radio className="w-2 h-2 md:w-3 md:h-3 text-blue-400 animate-pulse" />
                                    </div>
                                    <div className="text-[6px] md:text-[10px] text-gray-400 font-mono uppercase tracking-widest">Live Feed</div>
                                </div>
                                <div className="text-[10px] md:text-xl font-bold text-white mb-0 text-left">Daily Intent</div>
                                <div className="text-[8px] md:text-xs text-gray-500 font-light text-left">Decoding</div>
                                <div className="flex gap-1 md:gap-2 mt-3 md:mt-5 items-center justify-center">
                                    <div className="relative w-2 h-2 md:w-4 md:h-4">
                                        <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-75"></div>
                                        <div className="relative w-2 h-2 md:w-4 md:h-4 bg-blue-500 rounded-full"></div>
                                    </div>
                                    <div className="h-px bg-white/10 flex-1"></div>
                                    <div className="text-[6px] md:text-[10px] text-blue-400 font-mono">ACTIVE</div>
                                </div>
                            </div>

                            {/* Card 3: Coverage */}
                            <div className="flex-1 bg-black/60 backdrop-blur-xl border border-white/10 p-2 md:p-5 rounded-lg md:rounded-2xl relative group overflow-hidden hover:border-purple-500/30 transition-colors">
                                <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 blur-xl rounded-full group-hover:bg-purple-500/20 transition-all duration-500"></div>
                                <div className="flex items-center gap-1 md:gap-2 mb-1 md:mb-3">
                                    <div className="w-3 h-3 md:w-6 md:h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                                        <Globe className="w-2 h-2 md:w-3 md:h-3 text-purple-400" />
                                    </div>
                                    <div className="text-[6px] md:text-[10px] text-gray-400 font-mono uppercase tracking-widest">Reach</div>
                                </div>
                                <div className="text-[10px] md:text-xl font-bold text-white mb-0 text-left">Global</div>
                                <div className="text-[8px] md:text-xs text-gray-500 font-light text-left">Coverage</div>
                                
                                <div className="mt-2 md:mt-4 relative w-8 h-8 md:w-16 md:h-16 mx-auto opacity-60">
                                    {/* Radar Animation */}
                                    <div className="absolute inset-0 rounded-full border border-white/10"></div>
                                    <div className="absolute inset-2 md:inset-4 rounded-full border border-white/5"></div>
                                    <motion.div 
                                        className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-transparent to-purple-500/30"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default ManifestoScroll;