import React from 'react';
import { motion, Variants } from 'framer-motion';
import ThreeScene from './ThreeScene';
import { Phone } from 'lucide-react';

const Hero: React.FC = () => {
  // Main Headline (Removed full stop)
  const line1 = "Hi, I'm Vaomi";

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.12, // Slightly slower for distinct typewriter feel
        delayChildren: 0.5 
      }
    }
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      display: "inline-block",
      transition: {
        duration: 0.01 // Instant appearance like typing
      },
    },
    hidden: {
      opacity: 0,
      display: "none", // Hide completely until typed
    },
  };

  const cursorVariants: Variants = {
    blinking: {
      opacity: [0, 0, 1, 1],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        repeatDelay: 0,
        ease: "linear",
        times: [0, 0.5, 0.5, 1]
      }
    }
  };

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
      {/* Subtle Gradient Spotlights (Green hint) */}
      <div className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-brand/5 rounded-full blur-[150px] pointer-events-none" />
      
      <ThreeScene />
      
      <div className="container mx-auto px-6 z-10 flex flex-col items-center text-center relative mt-0">
        
        {/* Main Title with Typewriter Effect */}
        <div className="mb-8 md:mb-10 flex flex-col items-center gap-0 md:gap-2 h-20 md:h-32 justify-center">
            <motion.h1 
              // Reduced mobile text size to text-5xl
              className="text-5xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-tight tracking-wide text-white overflow-visible whitespace-nowrap flex items-center"
              variants={container}
              initial="hidden"
              animate="visible"
            >
              {Array.from(line1).map((char, index) => (
                <motion.span variants={child} key={index} className="relative inline-block">
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
              <motion.span 
                variants={cursorVariants}
                animate="blinking"
                className="inline-block w-1 h-10 md:w-2 md:h-16 bg-brand ml-2 align-middle"
              />
            </motion.h1>
        </div>

        {/* Subtitle - The Quiet Force */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.5 }} // Delayed after typing
          className="max-w-3xl mx-auto flex flex-col gap-6"
        >
           <h2 
             // Updated to match Manifesto subtext styles: text-lg md:text-2xl, font-light, leading-relaxed, text-gray-400
             className="text-lg md:text-2xl text-gray-400 font-light leading-relaxed tracking-normal max-w-2xl mx-auto"
           >
             The Quiet Force That Turns <br className="hidden md:block" />
             <span className="text-white font-medium">Vision Into Conviction.</span>
           </h2>
        </motion.div>

        {/* CTA Button */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 3.0 }}
           className="flex flex-col sm:flex-row gap-4 items-center mt-12 md:mt-16"
        >
          <a 
            href="https://calendly.com/founders-vaomi/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="group px-6 py-2.5 md:px-10 md:py-4 bg-white text-black rounded-[1px] font-bold text-sm md:text-lg tracking-wide transition-all hover:bg-brand hover:scale-105 flex items-center gap-2"
          >
            Book a FREE Call
            <Phone className="w-4 h-4 group-hover:rotate-12 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;