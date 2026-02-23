import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Database, TrendingUp, Globe, Clock, Check } from 'lucide-react';

const CountUp = ({ value, label }: { value: string, label: string }) => {
    // Basic parser to get number and suffix
    const num = parseFloat(value.replace(/[^0-9.]/g, ''));
    const suffix = value.replace(/[0-9.]/g, '');
    const [count, setCount] = useState(0);
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true });
    
    useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = num;
            const duration = 2000;
            const increment = end / (duration / 16); // 60fps
            
            const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                    setCount(end);
                    clearInterval(timer);
                } else {
                    setCount(start);
                }
            }, 16);
            
            return () => clearInterval(timer);
        }
    }, [isInView, num]);
    
    // Formatting handles pure numbers, K, Y, %
    const formatted = Math.floor(count) + suffix;

    return (
        <span ref={ref}>{formatted}</span>
    )
}

const FeatureItem = ({ text }: { text: string }) => (
    <li className="flex items-start gap-4 text-gray-400 py-3 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors px-4 rounded-lg group">
        <div className="mt-1 w-5 h-5 rounded-full border border-brand/30 flex items-center justify-center shrink-0 bg-black group-hover:border-brand/60 transition-colors">
             <Check className="w-3 h-3 text-brand" />
        </div>
        <span className="font-light text-lg">{text}</span>
    </li>
)

const StatsSection: React.FC = () => {
  return (
    <section id="stats" className="py-16 md:py-32 bg-black relative z-10">
      <div className="container mx-auto px-6">
        
        {/* Intro Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
            <motion.div
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 className="flex flex-col justify-center"
            >
                 <h2 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold leading-tight mb-8 text-white">
                    Why no one else <br/>
                    <span className="text-gray-600">comes close?</span>
                </h2>
                <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed max-w-xl mb-8">
                    I’ve been trained on <strong className="text-white">720,000+</strong> Venture Capital & Family Office transactions spanning over <strong className="text-white">15+ years</strong>.
                </p>
                <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed max-w-xl">
                    I know who invests, when, and why — so you can focus on building your company or your fund.
                </p>
            </motion.div>
            
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-[#050505] p-6 md:p-10 border border-white/10 relative rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.05)]"
            >
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand/10 blur-3xl pointer-events-none"></div>
                
                <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">Unmatched Discovery.</h3>
                <p className="text-gray-500 mb-8 font-mono text-sm uppercase tracking-wide">Exhaustive Global Coverage</p>
                
                <ul className="flex flex-col gap-2">
                    <FeatureItem text="Actively tracking 50,000+ allocators daily" />
                    <FeatureItem text="Global Family Office & Sovereign Wealth Coverage" />
                    <FeatureItem text="Deep CVC Intelligence & Strategic Corporate Mapping" />
                    <FeatureItem text="Senior CXOs of public listed companies for deep domain expertise" />
                </ul>
            </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;