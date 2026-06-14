import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { ArrowDown, Mail, Download, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/SocialIcons';
import { scrollTo } from '../../hooks/useLenis';
import { useMousePosition } from '../../hooks/useMousePosition';
import { personalInfo, roles } from '../../data/portfolio';

// ── Particle System ──────────────────────────────────────────────────────────
interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  size: number; opacity: number;
  color: string;
}

const COLORS = ['#3b82f6', '#8b5cf6', '#06b6d4', '#a78bfa'];

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useMousePosition();
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    mouseRef.current = mouse;
  }, [mouse]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Init particles
    const count = Math.min(80, Math.floor((window.innerWidth * window.innerHeight) / 18000));
    particles.current = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.current.forEach(p => {
        // Mouse repulsion
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          p.vx -= (dx / dist) * force * 0.5;
          p.vy -= (dy / dist) * force * 0.5;
        }

        // Damping
        p.vx *= 0.99;
        p.vy *= 0.99;
        p.vx += (Math.random() - 0.5) * 0.02;
        p.vy += (Math.random() - 0.5) * 0.02;

        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(p.opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.current.length; i++) {
        for (let j = i + 1; j < particles.current.length; j++) {
          const a = particles.current[i];
          const b = particles.current[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(59,130,246,${0.08 * (1 - d / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

// ── Magnetic Button ──────────────────────────────────────────────────────────
function MagneticButton({
  children,
  onClick,
  primary = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  primary?: boolean;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const btn = ref.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  };

  const handleMouseLeave = () => {
    const btn = ref.current;
    if (!btn) return;
    btn.style.transform = 'translate(0, 0)';
    btn.style.transition = 'transform 0.5s cubic-bezier(0.22,1,0.36,1)';
    setTimeout(() => { if (btn) btn.style.transition = ''; }, 500);
  };

  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105"
      style={
        primary
          ? {
              background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
              color: 'white',
              boxShadow: '0 0 30px rgba(59,130,246,0.4)',
              fontFamily: 'Space Grotesk, sans-serif',
            }
          : {
              backgroundColor: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: 'var(--color-text-primary)',
              fontFamily: 'Space Grotesk, sans-serif',
            }
      }
    >
      {children}
    </button>
  );
}

// ── Hero Section ─────────────────────────────────────────────────────────────
const roleSequence = roles.flatMap(r => [r, 2500]);

export default function HeroSection() {
  const [showScroll, setShowScroll] = useState(true);
  const mouse = useMousePosition();

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY < 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parallax offset
  const parallaxX = (mouse.x / window.innerWidth - 0.5) * 20;
  const parallaxY = (mouse.y / window.innerHeight - 0.5) * 20;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: 'var(--color-bg-primary)' }}
    >
      {/* Aurora Blend Background */}
      <div className="aurora-bg">
        <div className="aurora-blob aurora-blob-1" />
        <div className="aurora-blob aurora-blob-2" />
        <div className="aurora-blob aurora-blob-3" />
      </div>

      {/* Particle Background */}
      <ParticleCanvas />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(59,130,246,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59,130,246,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating gradient orbs */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)',
          top: '-100px',
          right: '-100px',
        }}
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)',
          bottom: '-80px',
          left: '-80px',
        }}
        animate={{
          x: [0, -20, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* Mouse-parallax floating elements */}
      <motion.div
        className="absolute pointer-events-none hidden lg:block"
        style={{
          top: '20%',
          right: '10%',
          opacity: 0.3,
        }}
        animate={{ x: parallaxX * 1.5, y: parallaxY * 1.5 }}
        transition={{ type: 'spring', stiffness: 50, damping: 20 }}
      >
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl"
          style={{
            background: 'rgba(59,130,246,0.1)',
            border: '1px solid rgba(59,130,246,0.2)',
          }}
        >
          ⚡
        </div>
      </motion.div>
      <motion.div
        className="absolute pointer-events-none hidden lg:block"
        style={{ bottom: '25%', left: '8%', opacity: 0.25 }}
        animate={{ x: parallaxX * -1, y: parallaxY * -1 }}
        transition={{ type: 'spring', stiffness: 40, damping: 20 }}
      >
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl"
          style={{
            background: 'rgba(139,92,246,0.1)',
            border: '1px solid rgba(139,92,246,0.2)',
          }}
        >
          🤖
        </div>
      </motion.div>
      <motion.div
        className="absolute pointer-events-none hidden lg:block"
        style={{ top: '60%', right: '7%', opacity: 0.2 }}
        animate={{ x: parallaxX * 2, y: parallaxY }}
        transition={{ type: 'spring', stiffness: 30, damping: 20 }}
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-lg"
          style={{
            background: 'rgba(6,182,212,0.1)',
            border: '1px solid rgba(6,182,212,0.2)',
          }}
        >
          🔌
        </div>
      </motion.div>

      {/* ─── Main Content ─── */}
      <div className="section-container relative z-10 text-center">

        {/* Status Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
          style={{
            backgroundColor: 'rgba(34,197,94,0.08)',
            border: '1px solid rgba(34,197,94,0.2)',
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <div className="pulse-dot" />
          <span className="text-xs font-medium" style={{ color: '#4ade80', fontFamily: 'Space Grotesk, sans-serif' }}>
            Open to opportunities · Based in Pune, India
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          className="font-black mb-4 leading-none tracking-tight"
          style={{
            fontSize: 'clamp(52px, 9vw, 100px)',
            fontFamily: 'Space Grotesk, sans-serif',
            color: 'var(--color-text-primary)',
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Hi, I'm{' '}
          <span className="text-gradient glitch-text" data-text="Vinay">Vinay</span>
        </motion.h1>

        {/* Typewriter Role */}
        <motion.div
          className="mb-6 h-10 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <span
            className="text-xl md:text-2xl font-semibold"
            style={{ color: '#60a5fa', fontFamily: 'Space Grotesk, sans-serif' }}
          >
            <TypeAnimation
              sequence={roleSequence as (string | number)[]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              cursor={true}
            />
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="max-w-2xl mx-auto text-lg md:text-xl mb-10 leading-relaxed"
          style={{ color: 'var(--color-text-secondary)', fontFamily: 'Inter, sans-serif' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Building intelligent software, data-driven solutions, and digital experiences
          that{' '}
          <span style={{ color: 'var(--color-text-primary)' }}>solve real-world problems</span>.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {/* Conic Border Button */}
          <button
            onClick={() => scrollTo('#projects')}
            className="btn-conic-glow hover:scale-105 transition-transform"
          >
            <span className="btn-conic-glow-inner text-white font-semibold text-sm">
              <Sparkles size={15} className="text-cyan-400" />
              View My Work
            </span>
          </button>
          
          <MagneticButton onClick={() => scrollTo('#contact')}>
            <Mail size={15} />
            Let's Connect
          </MagneticButton>
          
          {/* Shimmering Resume Button */}
          <a
            href="/resume.pdf"
            download
            className="shimmer flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105"
            style={{
              backgroundColor: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'var(--color-text-secondary)',
              fontFamily: 'Space Grotesk, sans-serif',
            }}
          >
            <Download size={15} />
            Resume
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          {[
            { icon: GithubIcon, href: personalInfo.github, label: 'GitHub' },
            { icon: LinkedinIcon, href: personalInfo.linkedin, label: 'LinkedIn' },
            { icon: Mail, href: `mailto:${personalInfo.email}`, label: 'Email' },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              aria-label={label}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 hover:-translate-y-1"
              style={{
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'var(--color-text-secondary)',
              }}
            >
              <Icon size={18} />
            </a>
          ))}
          <div className="w-px h-6 mx-2" style={{ backgroundColor: 'var(--color-border)' }} />
          <span className="text-xs" style={{ color: 'var(--color-text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
            github.com/Vinay1806
          </span>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      {showScroll && (
        <motion.button
          onClick={() => scrollTo('#about')}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 group"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <span className="text-xs tracking-widest uppercase" style={{ color: 'var(--color-text-muted)' }}>
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown size={16} style={{ color: 'var(--color-text-muted)' }} />
          </motion.div>
        </motion.button>
      )}
    </section>
  );
}
