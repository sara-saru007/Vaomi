import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { Network, FileText, Filter, Layers, Mic2, Search, Database } from 'lucide-react';

interface CardData {
    title: string;
    subTitle: string;
    items: string[];
    icon: any;
    imageUrl: string;
}

const cards: CardData[] = [
    {
        title: "The Narrative Calibration",
        subTitle: "Decoding your vision before decoding the market.",
        items: [
            "Deep dive into the founder's core truth",
            "Refining the pitch mechanics and flow",
            "Transforming complexity into inevitability"
        ],
        icon: Mic2,
        imageUrl: "https://vaomiaiv4.s3.us-east-1.amazonaws.com/1.gif"
    },
    {
        title: "The Intelligence Filter",
        subTitle: "Using the network to find the needle in the haystack.",
        items: [
            "Mapping investor thesis to your specific reality",
            "Filtering out tourists vs. true believers",
            "Identifying who is deploying capital right now"
        ],
        icon: Database,
        imageUrl: "https://vaomiaiv4.s3.us-east-1.amazonaws.com/2.gif"
    },
    {
        title: "Qualification Logic",
        subTitle: "Protecting your most precious asset: Energy.",
        items: [
            "Do they have a thesis in your space?",
            "Are they at the right fund lifecycle stage?",
            "Ensuring you only meet believers, not skeptics."
        ],
        icon: Filter,
        imageUrl: "https://vaomiaiv4.s3.us-east-1.amazonaws.com/3.gif"
    },
    {
        title: "Choreographed Introductions",
        subTitle: "Where you're not pitching up, you're meeting eye-to-eye.",
        items: [
            "Sequenced for momentum",
            "Investors arrive pre-briefed and pre-aligned",
            "Context that flips the dynamic from chasing to commanding"
        ],
        icon: Layers,
        imageUrl: "https://vaomiaiv4.s3.us-east-1.amazonaws.com/4.gif"
    }
];

const Card: React.FC<{ i: number; data: CardData; progress: MotionValue<number>; range: number[]; targetScale: number }> = ({ i, data, progress, range, targetScale }) => {
    const container = useRef(null);
    const scale = useTransform(progress, range, [1, targetScale]);
    
    return (
        <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
            <motion.div 
                style={{ scale, top: `calc(-5vh + ${i * 25}px)` }} 
                className="flex flex-col relative min-h-[500px] md:h-[600px] h-auto w-[90vw] md:w-[1000px] rounded-3xl bg-[#080808] border border-white/10 p-6 md:p-12 transform-gpu shadow-2xl origin-top"
            >
                <div className="flex flex-col h-full justify-between relative z-10">
                    <div className="flex items-center justify-between border-b border-white/5 pb-6 md:pb-8">
                        <div className="flex items-center gap-4">
                            <span className="font-mono text-xs md:text-sm text-gray-500">0{i + 1}</span>
                            <h2 className="text-xl md:text-4xl font-display font-bold text-white">{data.title}</h2>
                        </div>
                        <div className="w-8 h-8 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/5 shrink-0">
                            <data.icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 pt-6 md:pt-8 h-full">
                        <div className="flex flex-col justify-start order-2 md:order-1">
                             <p className="text-lg md:text-xl text-white font-serif italic mb-4 md:mb-8">
                                "{data.subTitle}"
                            </p>
                            <ul className="space-y-3 md:space-y-4">
                                {data.items.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-gray-400 font-light text-sm md:text-lg">
                                        <div className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 md:mt-2 shrink-0"></div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="relative rounded-2xl overflow-hidden bg-white/5 border border-white/5 order-1 md:order-2 h-32 md:h-auto group">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 pointer-events-none"></div>
                            <img 
                                src={data.imageUrl} 
                                alt={data.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
                            />
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

const StackedCards: React.FC = () => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    });

    return (
        <section ref={container} id="engine" className="bg-black relative">
            {/* Header is NOT sticky to avoid overlap, it scrolls away naturally */}
             <div className="pt-16 md:pt-32 pb-4 px-6 container mx-auto text-center relative z-10">
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-0 leading-relaxed">
                    Here’s how it all comes together
                </h2>
            </div>
            
            <div className="mt-2 md:mt-4">
                {cards.map((card, i) => {
                    const targetScale = 1 - ((cards.length - i) * 0.05);
                    return (
                        <Card 
                            key={i} 
                            i={i} 
                            data={card} 
                            progress={scrollYProgress}
                            range={[i * .25, 1]}
                            targetScale={targetScale}
                        />
                    );
                })}
            </div>
        </section>
    );
};

export default StackedCards;