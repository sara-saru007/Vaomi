import React, { Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ManifestoScroll from './components/ManifestoScroll';
import Industries3D from './components/Industries3D';
import LogoMarquee from './components/LogoMarquee';
import Testimonials from './components/Testimonials';
import RecentWins from './components/RecentWins';
import StackedCards from './components/StackedCards';
import Footer from './components/Footer';

function App() {
  return (
    <main className="bg-background min-h-screen text-primary selection:bg-brand selection:text-black">
      <Navbar />
      
      <Suspense fallback={<div className="h-screen w-full bg-black flex items-center justify-center text-white/20">Loading Experience...</div>}>
        <Hero />
      </Suspense>

      <div className="relative z-10 bg-background">
        <LogoMarquee />
        <ManifestoScroll />
        <StackedCards />
        <Industries3D />
        <RecentWins />
        <Testimonials />
        <Footer />
      </div>
    </main>
  );
}

export default App;