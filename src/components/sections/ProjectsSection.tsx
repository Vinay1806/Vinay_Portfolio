import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronDown, ChevronUp, BookOpen, Zap, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { GithubIcon } from '../ui/SocialIcons';
import { fadeInUp, staggerContainer, staggerItem, viewportConfig } from '../../lib/animations';
import { featuredProjects, otherProjects } from '../../data/portfolio';
import { TiltCard } from '../ui/TiltCard';

function TechBadge({ tech }: { tech: string }) {
  return (
    <span
      className="px-2.5 py-1 rounded-md text-xs font-medium"
      style={{
        backgroundColor: 'rgba(59,130,246,0.08)',
        border: '1px solid rgba(59,130,246,0.2)',
        color: '#60a5fa',
        fontFamily: 'JetBrains Mono, monospace',
      }}
    >
      {tech}
    </span>
  );
}

/* ─── Image Gallery with browser-mockup frame ─────────────────────────────── */
function ProjectImageGallery({ images, color, name }: { images: string[]; color: string; name: string }) {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const next = useCallback(() => setCurrent(p => (p + 1) % images.length), [images.length]);
  const prev = useCallback(() => setCurrent(p => (p - 1 + images.length) % images.length), [images.length]);

  // Auto-advance
  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [images.length, next]);

  return (
    <>
      <div
        className="relative rounded-xl overflow-hidden group"
        style={{
          border: `1px solid ${color}30`,
          boxShadow: `0 8px 32px ${color}15, 0 0 0 1px rgba(255,255,255,0.04)`,
        }}
      >
        {/* Browser chrome bar */}
        <div
          className="flex items-center gap-2 px-4 py-2.5"
          style={{
            background: 'linear-gradient(to bottom, rgba(30,30,40,0.95), rgba(22,22,30,0.95))',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#ff5f57' }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#febc2e' }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#28c840' }} />
          </div>
          <div
            className="flex-1 mx-3 px-3 py-1 rounded-md text-xs truncate text-center"
            style={{
              backgroundColor: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.06)',
              color: 'var(--color-text-muted)',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '10px',
            }}
          >
            {name.toLowerCase().replace(/\s+/g, '')}.app
          </div>
          <button
            onClick={() => setLightbox(true)}
            className="p-1 rounded-md transition-all hover:bg-white/10"
            style={{ color: 'var(--color-text-muted)' }}
            title="View full size"
          >
            <Maximize2 size={12} />
          </button>
        </div>

        {/* Image viewport */}
        <div className="relative" style={{ aspectRatio: '16/10', backgroundColor: '#0a0a12' }}>
          {images.map((img, idx) => (
            <motion.img
              key={img}
              src={img}
              alt={`${name} screenshot ${idx + 1}`}
              className="absolute inset-0 w-full h-full object-contain cursor-pointer p-1"
              initial={false}
              animate={{ opacity: idx === current ? 1 : 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              onClick={() => setLightbox(true)}
              draggable={false}
            />
          ))}

          {/* Gradient vignette at bottom */}
          <div
            className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
            style={{
              background: `linear-gradient(to top, rgba(10,10,18,0.7), transparent)`,
            }}
          />

          {/* Nav arrows (only if multiple) */}
          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                style={{
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: '#fff',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                style={{
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: '#fff',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <ChevronRight size={16} />
              </button>
            </>
          )}

          {/* Dot indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className="transition-all duration-300"
                  style={{
                    width: idx === current ? '20px' : '6px',
                    height: '6px',
                    borderRadius: '3px',
                    backgroundColor: idx === current ? color : 'rgba(255,255,255,0.3)',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox / fullscreen overlay */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            style={{ backgroundColor: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(16px)' }}
            onClick={() => setLightbox(false)}
          >
            <motion.img
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              src={images[current]}
              alt={`${name} full view`}
              className="max-w-[90vw] max-h-[90vh] rounded-xl object-contain"
              style={{ boxShadow: `0 24px 80px ${color}25` }}
              onClick={e => e.stopPropagation()}
            />

            {/* Lightbox nav */}
            {images.length > 1 && (
              <>
                <button
                  onClick={e => { e.stopPropagation(); prev(); }}
                  className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: '#fff',
                  }}
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={e => { e.stopPropagation(); next(); }}
                  className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: '#fff',
                  }}
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            {/* Close hint */}
            <span
              className="absolute top-6 right-6 text-xs font-medium px-3 py-1.5 rounded-full"
              style={{
                backgroundColor: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'rgba(255,255,255,0.5)',
              }}
            >
              ESC to close
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function FeaturedProjectCard({ project, index }: { project: typeof featuredProjects[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  void index; // suppress unused warning

  const images = 'images' in project && project.images ? project.images : ('image' in project && project.image ? [project.image] : null);

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      className="w-full"
    >
      <TiltCard
        maxTilt={3}
        className="glass-card overflow-hidden"
        style={{ borderColor: project.borderColor }}
      >
      {/* Header */}
      <div
        className={`relative p-8 bg-gradient-to-br ${project.gradient} overflow-hidden`}
        style={{ borderBottom: `1px solid ${project.borderColor}` }}
      >
        {/* Glow */}
        <div
          className="absolute top-0 right-0 w-48 h-48 opacity-30 z-0"
          style={{
            background: `radial-gradient(circle, ${project.color}50 0%, transparent 70%)`,
          }}
        />

        <div className="relative z-10 flex flex-col lg:flex-row gap-8">
          {/* Left: project info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                {/* Featured badge */}
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4"
                  style={{
                    backgroundColor: `${project.color}20`,
                    border: `1px solid ${project.color}40`,
                    color: project.color,
                  }}
                >
                  <Zap size={11} />
                  Featured Project
                </span>

                <h3
                  className="text-2xl md:text-3xl font-black mb-2"
                  style={{ color: 'var(--color-text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {project.name}
                </h3>
                <p className="text-sm font-medium mb-3" style={{ color: project.color }}>
                  {project.tagline}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  {project.description}
                </p>
              </div>

              {/* Metrics */}
              <div className="flex gap-4 md:flex-col shrink-0">
                {project.metrics.map((m, i) => (
                  <div key={i} className="text-center">
                    <div
                      className="text-lg font-black"
                      style={{ color: project.color, fontFamily: 'Space Grotesk, sans-serif' }}
                    >
                      {m.value}
                    </div>
                    <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech badges */}
            <div className="flex flex-wrap gap-2 mt-5">
              {project.tech.map(t => <TechBadge key={t} tech={t} />)}
            </div>
          </div>

          {/* Right: Image Gallery */}
          {images && images.length > 0 && (
            <div className="lg:w-[480px] xl:w-[540px] shrink-0">
              <ProjectImageGallery images={images} color={project.color} name={project.name} />
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Problem */}
          <div>
            <h4
              className="text-sm font-bold mb-3 uppercase tracking-wider"
              style={{ color: 'var(--color-text-muted)', fontFamily: 'Space Grotesk, sans-serif' }}
            >
              The Problem
            </h4>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              {project.problem}
            </p>
          </div>
          {/* Solution */}
          <div>
            <h4
              className="text-sm font-bold mb-3 uppercase tracking-wider"
              style={{ color: 'var(--color-text-muted)', fontFamily: 'Space Grotesk, sans-serif' }}
            >
              The Solution
            </h4>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              {project.solution}
            </p>
          </div>
        </div>

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-6 flex items-center gap-2 text-sm font-medium transition-colors hover:text-blue-400"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          {expanded ? 'Show less' : 'Show features & details'}
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-6">
                <h4
                  className="text-sm font-bold mb-3 uppercase tracking-wider"
                  style={{ color: 'var(--color-text-muted)', fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  Key Features
                </h4>
                <div className="grid sm:grid-cols-2 gap-2">
                  {project.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span style={{ color: project.color }}>→</span>
                      <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{f}</span>
                    </div>
                  ))}
                </div>

                {/* Research paper for PASEO */}
                {'researchPaper' in project && project.researchPaper && (
                  <div
                    className="mt-6 p-5 rounded-xl"
                    style={{
                      backgroundColor: 'rgba(139,92,246,0.06)',
                      border: '1px solid rgba(139,92,246,0.2)',
                    }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <BookOpen size={16} style={{ color: '#8b5cf6' }} />
                      <span
                        className="font-semibold text-sm"
                        style={{ color: '#a78bfa', fontFamily: 'Space Grotesk, sans-serif' }}
                      >
                        Research Paper Published
                      </span>
                    </div>
                    <p className="font-semibold text-sm mb-1" style={{ color: 'var(--color-text-primary)' }}>
                      {project.researchPaper.title}
                    </p>
                    <p className="text-xs mb-1" style={{ color: 'var(--color-text-secondary)' }}>
                      {project.researchPaper.journal}
                    </p>
                    <p className="text-xs mb-3" style={{ color: 'var(--color-text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
                      ISSN: {project.researchPaper.issn} · SJIF: {project.researchPaper.sjif} · {project.researchPaper.year}
                    </p>
                    <a
                      href={project.researchPaper.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white transition-all hover:scale-105"
                      style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)' }}
                    >
                      <ExternalLink size={12} />
                      Read Paper
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Links */}
        <div className="flex gap-3 mt-6">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:scale-105"
              style={{
                backgroundColor: 'rgba(255,255,255,0.06)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text-secondary)',
              }}
            >
              <GithubIcon size={14} />
              GitHub
            </a>
          )}
          {!project.github && (
            <span
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium"
              style={{
                backgroundColor: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text-muted)',
              }}
            >
              🔒 Private Repo
            </span>
          )}
          <span
            className="flex items-center px-4 py-2 rounded-xl text-sm font-medium"
            style={{
              backgroundColor: project.status === 'In Development' ? 'rgba(59,130,246,0.1)' : 'rgba(34,197,94,0.1)',
              border: `1px solid ${project.status === 'In Development' ? 'rgba(59,130,246,0.3)' : 'rgba(34,197,94,0.3)'}`,
              color: project.status === 'In Development' ? '#60a5fa' : '#4ade80',
            }}
          >
            {project.status === 'In Development' ? '⚡ In Development' : '✓ Completed'}
          </span>
        </div>
      </div>
    </TiltCard>
  </motion.div>
);
}

function ProjectCard({ project }: { project: typeof otherProjects[0] }) {
  return (
    <motion.div
      variants={staggerItem}
      className="h-full w-full"
    >
      <TiltCard
        maxTilt={6}
        className="glass-card p-6 group h-full flex flex-col"
      >
        {/* Top row */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${project.color}15`, border: `1px solid ${project.color}30` }}
          >
            <span style={{ color: project.color, fontSize: '18px' }}>
              {project.category.includes('IoT') ? '🔌' :
               project.category.includes('ERP') ? '📊' :
               project.category.includes('Desktop') ? '🖥️' : '💻'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-lg transition-all hover:scale-110 opacity-0 group-hover:opacity-100"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                <GithubIcon size={14} />
              </a>
            )}
          </div>
        </div>

        {/* Content */}
        <h3
          className="font-bold text-base mb-1.5 group-hover:text-blue-400 transition-colors"
          style={{ color: 'var(--color-text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}
        >
          {project.name}
        </h3>
        <p className="text-xs mb-1" style={{ color: project.color }}>{project.tagline}</p>
        <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: 'var(--color-text-secondary)' }}>
          {project.description}
        </p>

        {/* Tech */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.slice(0, 4).map(t => (
            <span
              key={t}
              className="px-2 py-0.5 rounded text-xs"
              style={{
                backgroundColor: 'rgba(255,255,255,0.04)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text-muted)',
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
              +{project.tech.length - 4} more
            </span>
          )}
        </div>

        {/* Status */}
        <span
          className="text-xs font-medium"
          style={{
            color: project.status === 'In Development' ? '#60a5fa' : '#4ade80',
            fontFamily: 'Space Grotesk, sans-serif',
          }}
        >
          {project.status === 'In Development' ? '⚡ In Development' : '✓ ' + project.status}
        </span>
      </TiltCard>
    </motion.div>
  );
}

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative py-28"
      style={{ backgroundColor: 'var(--color-bg-primary)' }}
    >
      <div className="section-container">

        {/* Header */}
        <motion.div
          className="text-center mb-14"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <span
            className="text-xs font-semibold tracking-widest uppercase mb-3 inline-block"
            style={{ color: '#3b82f6', fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Projects
          </span>
          <h2
            className="text-4xl md:text-5xl font-black mb-4"
            style={{ color: 'var(--color-text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}
          >
            What I've{' '}
            <span className="text-gradient">Built</span>
          </h2>
          <p className="max-w-xl mx-auto text-base" style={{ color: 'var(--color-text-secondary)' }}>
            From enterprise ERP platforms to AI-powered robotics — a cross-domain builder who ships real things.
          </p>
        </motion.div>

        {/* Featured Projects */}
        <div className="space-y-8 mb-14">
          {featuredProjects.map((project, i) => (
            <FeaturedProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Other Projects */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <h3
            className="text-xl font-bold mb-6"
            style={{ color: 'var(--color-text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}
          >
            More Projects
          </h3>
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            {otherProjects.map(p => <ProjectCard key={p.id} project={p} />)}
          </motion.div>
        </motion.div>

        {/* GitHub CTA */}
        <motion.div
          className="mt-12 text-center"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <a
            href="https://github.com/Vinay1806"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-105"
            style={{
              backgroundColor: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'var(--color-text-primary)',
              fontFamily: 'Space Grotesk, sans-serif',
            }}
          >
            <GithubIcon size={16} />
            View all projects on GitHub
            <ExternalLink size={13} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
