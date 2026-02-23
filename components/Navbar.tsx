import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';

const CALENDLY_LINK = "https://calendly.com/founders-vaomi/30min";

const InfinityLogo = () => (
  <svg 
    width="40" 
    height="20" 
    viewBox="0 0 24 12" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className="text-white w-10 h-6"
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

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: 'https://vaomi.ai/about/index.html' },
    { label: 'The Engine', href: '#engine' },
    { label: 'Case Studies', href: '#case-studies' },
    { label: 'FAQs', href: 'https://vaomi.ai/faqs/index.html' },
  ];

  const handleNavClick = (href: string) => (e: React.MouseEvent) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setMobileMenuOpen(false);
      }
    } else {
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`
            relative flex items-center justify-between px-6 py-3 rounded-[1px] transition-all duration-500
            ${isScrolled || mobileMenuOpen 
              ? 'bg-black/70 backdrop-blur-xl border border-white/10 w-full max-w-4xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]' 
              : 'bg-transparent w-full max-w-6xl'}
          `}
        >
          {/* Logo */}
          <a href="https://vaomi.ai" className="flex items-center gap-3 z-50 group">
            <InfinityLogo />
            <span className="font-display font-bold text-xl tracking-tight text-white block">
              Vaomi AI
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <a 
                key={link.label} 
                href={link.href}
                onClick={handleNavClick(link.href)}
                className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center">
            <a 
              href={CALENDLY_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 bg-brand border border-brand text-black hover:bg-brand-light hover:border-brand-light px-5 py-2 rounded-[1px] text-sm font-bold transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
            >
              <span>Book a FREE call</span>
              <Phone className="w-4 h-4 transition-transform group-hover:rotate-12 group-hover:scale-110" />
            </a>
          </div>

          {/* Mobile Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden z-50 p-2 text-white hover:bg-white/10 rounded-[1px] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </motion.nav>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed inset-x-4 top-24 p-8 rounded-2xl bg-[#0a0a0a] border border-white/10 z-40 flex flex-col items-center gap-8 shadow-2xl"
          >
            <div className="flex flex-col gap-6 w-full text-center">
              {navLinks.map((link) => (
                <a 
                  key={link.label} 
                  href={link.href}
                  onClick={handleNavClick(link.href)}
                  className="text-lg font-display font-light text-white/70 hover:text-white transition-colors cursor-pointer"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;