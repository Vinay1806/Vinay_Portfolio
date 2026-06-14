import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { useTheme } from './hooks/useTheme';
import { useLenis } from './hooks/useLenis';

import LoadingScreen from './components/layout/LoadingScreen';
import CustomCursor from './components/layout/CustomCursor';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import TechStackSection from './components/sections/TechStackSection';
import ProjectsSection from './components/sections/ProjectsSection';
import ExperienceSection from './components/sections/ExperienceSection';
import EducationSection from './components/sections/EducationSection';
import CurrentlyBuildingSection from './components/sections/CurrentlyBuildingSection';
import ContactSection from './components/sections/ContactSection';

export default function App() {
  const [loading, setLoading] = useState(true);
  useTheme();

  // Init Lenis smooth scroll after loading
  useLenis();

  return (
    <>
      {/* Custom cursor — desktop only */}
      <CustomCursor />

      {/* Loading Screen */}
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {/* Main App */}
      <AnimatePresence>
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Navigation */}
            <Navbar />

            {/* Page Sections */}
            <main>
              <HeroSection />
              <AboutSection />
              <TechStackSection />
              <ProjectsSection />
              <ExperienceSection />
              <EducationSection />
              <CurrentlyBuildingSection />
              <ContactSection />
            </main>

            {/* Footer */}
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
