import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { scrollTo } from '../../hooks/useLenis';
import { useScrollProgress, useActiveSection } from '../../hooks/useScroll';

const navLinks = [
  { label: 'About', href: 'about' },
  { label: 'Skills', href: 'skills' },
  { label: 'Projects', href: 'projects' },
  { label: 'Experience', href: 'experience' },
  { label: 'Education', href: 'education' },
  { label: 'Contact', href: 'contact' },
];

const sectionIds = navLinks.map(l => l.href);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const progress = useScrollProgress();
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (href: string) => {
    scrollTo(`#${href}`);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-[100]" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
        <motion.div
          className="h-full"
          style={{
            width: `${progress * 100}%`,
            background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
          }}
        />
      </div>

      {/* Navbar */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center pt-5 px-4"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="w-full max-w-5xl flex items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500"
          style={{
            background: scrolled ? 'rgba(10, 15, 28, 0.85)' : 'transparent',
            backdropFilter: scrolled ? 'blur(20px)' : 'none',
            border: scrolled ? '1px solid rgba(59, 130, 246, 0.25)' : '1px solid transparent',
            boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.4), 0 0 20px rgba(59, 130, 246, 0.1)' : 'none',
          }}
        >
          {/* Logo */}
          <button
            onClick={() => scrollTo(0)}
            className="flex items-center gap-2 group"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-sm transition-all duration-500 group-hover:scale-110 group-hover:rotate-[360deg]"
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                boxShadow: '0 0 10px rgba(59, 130, 246, 0.4)',
                fontFamily: 'Space Grotesk, sans-serif',
              }}
            >
              V
            </div>
            <span
              className="font-bold text-sm hidden sm:block transition-colors"
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                color: 'var(--color-text-primary)',
              }}
            >
              Vinay
            </span>
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200"
                style={{
                  color: active === link.href ? '#3b82f6' : 'var(--color-text-secondary)',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {active === link.href && (
                  <>
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0 rounded-lg"
                      style={{
                        backgroundColor: 'rgba(59, 130, 246, 0.08)',
                        border: '1px solid rgba(59, 130, 246, 0.15)',
                        boxShadow: '0 0 10px rgba(59, 130, 246, 0.1)',
                      }}
                      transition={{ type: 'spring', stiffness: 380, damping: 35 }}
                    />
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-1 left-3 right-3 h-[2px] rounded-full"
                      style={{
                        background: 'linear-gradient(90deg, #3b82f6, #06b6d4)',
                        boxShadow: '0 0 8px rgba(59, 130, 246, 0.8)',
                      }}
                      transition={{ type: 'spring', stiffness: 380, damping: 35 }}
                    />
                  </>
                )}
                <span className="relative z-10">{link.label}</span>
              </button>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">

            {/* Hire me button */}
            <button
              onClick={() => handleNav('contact')}
              className="hidden sm:inline-flex btn-conic-glow hover:scale-105 transition-transform"
            >
              <span
                className="btn-conic-glow-inner px-4 py-1.5 text-xs font-semibold text-white uppercase tracking-wider"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                Let's Talk
              </span>
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center"
              style={{
                backgroundColor: 'rgba(255,255,255,0.06)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text-primary)',
              }}
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0"
              style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="absolute right-4 top-20 w-64 rounded-2xl p-5 flex flex-col gap-2"
              style={{
                background: 'rgba(10, 15, 28, 0.98)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors"
                  style={{
                    color: active === link.href ? '#3b82f6' : 'var(--color-text-secondary)',
                    backgroundColor: active === link.href ? 'rgba(59,130,246,0.1)' : 'transparent',
                  }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {link.label}
                </motion.button>
              ))}
              <div className="h-px my-1" style={{ backgroundColor: 'var(--color-border)' }} />
              <button
                onClick={() => handleNav('contact')}
                className="px-4 py-3 rounded-xl text-sm font-semibold text-white text-left"
                style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)' }}
              >
                Let's Talk →
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
