import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Terminal, BarChart2, CheckCircle2 } from 'lucide-react';

const NetworkVisual = () => (
    <div className="relative w-full h-full flex items-center justify-center p-8">
        <div className="relative w-full h-full border border-white/10 rounded-lg p-4 grid grid-cols-3 gap-4">
            {[1,2,3,4,5,6].map(i => (
                <motion.div 
                    key={i}
                    className="bg-white/5 rounded-md relative overflow-hidden"
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                />
            ))}
            {/* Connection Lines (Simulated) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                 <motion.path 
                    d="M 20% 20% L 80% 80%" 
                    stroke="#10b981" 
                    strokeWidth="1" 
                    strokeOpacity="0.3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: [0, 1, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                 />
                 <motion.path 
                    d="M 80% 20% L 20% 80%" 
                    stroke="#10b981" 
                    strokeWidth="1" 
                    strokeOpacity="0.3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: [0, 1, 0] }}
                    transition={{ duration: 3, delay: 1.5, repeat: Infinity }}
                 />
            </svg>
        </div>
        <div className="absolute bottom-4 right-4 bg-brand text-black text-[10px] font-bold px-2 py-1 rounded">DEAL FLOW ACTIVE</div>
    </div>
)

const NarrativeVisual = () => (
     <div className="relative w-full h-full flex items-center justify-center p-8">
         <motion.div 
            className="w-32 h-40 bg-white/5 border border-white/20 rounded-sm relative"
            animate={{ rotateY: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
         >
             {/* Lines of text */}
             <div className="space-y-2 p-4">
                 <div className="h-1 w-full bg-white/20 rounded"></div>
                 <div className="h-1 w-3/4 bg-white/20 rounded"></div>
                 <div className="h-1 w-full bg-white/20 rounded"></div>
                 <div className="h-1 w-1/2 bg-white/20 rounded"></div>
             </div>
             {/* Glowing 'Story' Element */}
             <motion.div 
                className="absolute -right-4 top-10 w-8 h-8 bg-brand rounded-full blur-md opacity-20"
                animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 2, repeat: Infinity }}
             />
         </motion.div>
     </div>
)

const TiltCard = ({ title, items, icon: Icon, index, Visual }: { title: string; items: string[]; icon: any; index: number; Visual: any }) => {
    const ref = useRef<HTMLDivElement>(null);
    
    // Mouse position state
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth physics springs
    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [5, -5]); 
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-5, 5]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        
        const rect = ref.current.getBoundingClientRect();
        
        const width = rect.width;
        const height = rect.height;
        
        const mouseXRel = e.clientX - rect.left;
        const mouseYRel = e.clientY - rect.top;
        
        const xPct = (mouseXRel / width) - 0.5;
        const yPct = (mouseYRel / height) - 0.5;
        
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="relative h-full perspective-1000"
        >
             {/* Card Container */}
            <div 
                className="flex flex-col h-full bg-[#050505] border border-white/10 group overflow-hidden transition-all duration-200 shadow-2xl rounded-xl hover:border-brand/30"
                style={{ transform: "translateZ(20px)" }} 
            >
                {/* Glossy Sheen Overlay */}
                <motion.div 
                    className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-tr from-transparent via-brand/5 to-transparent"
                    style={{
                        opacity: useTransform(mouseX, [-0.5, 0.5], [0, 0.3])
                    }}
                />

                {/* Content */}
                <div className="flex-1 flex flex-col relative z-10 bg-[#050505]">
                    
                    {/* Visual Header */}
                    <div className="h-48 border-b border-white/10 bg-white/5 relative overflow-hidden group-hover:bg-brand/5 transition-colors duration-500">
                        <Visual />
                    </div>

                    <div className="p-8 md:p-10">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 border border-white/10 bg-white/5 flex items-center justify-center text-white rounded-lg group-hover:bg-brand group-hover:text-black group-hover:border-brand transition-all duration-300">
                                <Icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl md:text-3xl font-display font-bold text-white">{title}</h3>
                        </div>
                        
                        <ul className="space-y-4 mb-8">
                            {items.map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-gray-400 font-light group/item">
                                    <CheckCircle2 className="w-5 h-5 text-gray-600 shrink-0 mt-0.5 group-hover/item:text-brand transition-colors" />
                                    <span className="group-hover/item:text-gray-200 transition-colors">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-auto p-6 border-t border-white/5 flex justify-end items-center bg-black/20 group-hover:bg-brand/5 transition-colors">
                        <button className="w-10 h-10 rounded-[1px] border border-white/10 flex items-center justify-center text-white hover:bg-brand hover:text-black hover:border-brand transition-all duration-300">
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

const VectorsSection: React.FC = () => {
  return (
    <section id="vectors" className="py-16 md:py-32 bg-black relative z-10 border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="mb-12 md:mb-24 text-center max-w-4xl mx-auto">
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-5xl lg:text-7xl font-display font-bold mb-6 md:mb-8 text-white"
            >
                Two Vectors. <span className="text-gray-600">One Vision.</span>
            </motion.h2>
            <p className="text-gray-400 text-lg md:text-xl font-light">Whether you are allocating capital or seeking it, Vaomi provides the intelligence layer.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto perspective-2000">
          <TiltCard 
            index={0}
            title="Vaomi Capital" 
            items={[
                "LP discovery",
                "Fundraise orchestration",
                "Portfolio support",
                "Global deal flow"
            ]}
            icon={BarChart2}
            Visual={NetworkVisual}
          />
          <TiltCard 
            index={1}
            title="Vaomi Ventures" 
            items={[
                "Narrative architecture",
                "Belief deck support",
                "Investor qualification",
                "Direct capital where possible"
            ]}
            icon={Terminal}
            Visual={NarrativeVisual}
          />
        </div>
      </div>
    </section>
  );
};

export default VectorsSection;