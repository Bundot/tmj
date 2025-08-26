import React, { useEffect, useState } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { MusicSection } from './components/sections/MusicSection';
import { AboutSection } from './components/sections/AboutSection';
import { EventsSection } from './components/sections/EventsSection';
// import { CommunitySection } from './components/sections/CommunitySection';
import { MerchSection } from './components/sections/MerchSection';
import { MediaSection } from './components/sections/MediaSection';
import { ContactSection } from './components/sections/ContactSection';

// Import global Poster theme styles
import './themes/theme.css';

/**
 * App Component - Main application wrapper
 *
 * Serves as the container for the entire TMJ artist website.
 * Applies global Poster theme styles via CSS variables.
 */
export function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full bg-background text-foreground transition-colors duration-300">
      <Header />
      <main className="flex-grow">
        <Hero />
        <MusicSection />
        <AboutSection />
        <EventsSection />
        {/* <CommunitySection /> */}
        <MerchSection />
        <MediaSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
