import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const CALENDLY_LINK = "https://calendly.com/founders-vaomi/30min";

const InfinityLogo = ({className}: {className?: string}) => (
    <svg 
      width="40" 
      height="20" 
      viewBox="0 0 24 12" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className || "text-white w-6 h-4"}
    >
      <path 
        d="M12 6C10 3.33 8 2 6 2C3.79086 2 2 3.79086 2 6C2 8.20914 3.79086 10 6 10C8 10 10 8.67 12 6ZM12 6C14 8.67 16 10 18 10C20.2091 10 22 8.20914 22 6C22 3.79086 20.2091 2 18 2C16 2 14 3.33 12 6Z" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );

const Footer: React.FC = () => {
  return (
    <footer className="bg-black pt-8 md:pt-32 pb-4 md:pb-12 border-t border-white/10 relative overflow-hidden">
        
      <div className="container mx-auto px-6 flex flex-col items-center text-center relative z-10">
        
        <div className="mb-6 md:mb-12">
            {/* CTA with Door Animation Background */}
            <div className="relative mt-4 md:mt-8 group">
                {/* The "Door" Light Effect - Subtle perspective rectangle */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-64 bg-gradient-to-t from-white/10 to-transparent blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-1000 transform perspective-500 rotate-x-12 pointer-events-none"></div>
                
                <p className="text-lg md:text-3xl font-light relative z-10 transition-colors duration-500 max-w-3xl mx-auto leading-relaxed text-white">
                   If you are building something the world should believe in, <br className="hidden md:block"/>
                   let me open the right doors for you.
                </p>
            </div>
        </div>

        {/* Increased mobile margins (my-12) for equidistance */}
        <h2 className="text-[14vw] md:text-[12vw] leading-none font-display font-bold text-[#111] select-none hover:text-white transition-colors duration-1000 my-12 md:my-0">
          VAOMI.AI
        </h2>
        
        {/* Increased margin-bottom for mobile (mb-16) */}
        <div className="mb-16 md:mb-16 md:mt-12 relative z-10">
            <a 
            href={CALENDLY_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-6 py-2.5 md:px-10 md:py-4 bg-white text-black text-sm md:text-lg font-bold hover:bg-brand hover:scale-105 transition-all duration-300 rounded-[1px]"
            >
            Get in Touch
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-1" />
            </a>
        </div>

        <div className="w-full flex flex-col items-center md:flex-row md:justify-between md:items-end border-t border-white/10 pt-2 md:pt-10 gap-2 md:gap-6">
          <div className="text-center md:text-left">
            <a href="https://vaomi.ai" className="flex items-center gap-2 mb-0 justify-center md:justify-start group">
                <InfinityLogo className="text-white w-5 h-3 md:w-6 md:h-4" />
                <h3 className="text-lg md:text-xl font-display font-bold text-white group-hover:text-green-400 transition-colors">Vaomi<span className="text-brand">.</span>ai</h3>
            </a>
          </div>
          <div className="flex gap-6 text-[10px] md:text-xs text-gray-500 font-mono uppercase tracking-widest">
            <span>© 2026 Vaomi. All rights reserved</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;