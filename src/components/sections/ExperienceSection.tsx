import { motion } from 'framer-motion';
import { Briefcase, BookOpen, ExternalLink, MapPin, Calendar } from 'lucide-react';
import { fadeInUp, fadeInLeft, viewportConfig } from '../../lib/animations';
import { experience, researchPaper } from '../../data/portfolio';
import { TiltCard } from '../ui/TiltCard';

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative py-28"
      style={{ backgroundColor: 'var(--color-bg-secondary)' }}
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
            Experience
          </span>
          <h2
            className="text-4xl md:text-5xl font-black mb-4"
            style={{ color: 'var(--color-text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Work &{' '}
            <span className="text-gradient">Research</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">

          {/* ── Work Experience ── */}
          <div>
            <motion.h3
              className="flex items-center gap-2 text-base font-bold mb-6"
              style={{ color: 'var(--color-text-secondary)', fontFamily: 'Space Grotesk, sans-serif' }}
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
            >
              <Briefcase size={16} style={{ color: '#3b82f6' }} />
              Work Experience
            </motion.h3>

            {experience.map(exp => (
              <motion.div
                key={exp.id}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                className="mb-6 w-full"
              >
                <TiltCard
                  maxTilt={4}
                  className="glass-card p-7 relative overflow-hidden group"
                >
                {/* Glow */}
                <div
                  className="absolute top-0 right-0 w-40 h-40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)',
                  }}
                />

                {/* Header */}
                <div className="flex items-start gap-4 mb-5">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(139,92,246,0.2))',
                      border: '1px solid rgba(59,130,246,0.3)',
                    }}
                  >
                    🏭
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between flex-wrap gap-2">
                      <div>
                        <h4
                          className="font-bold text-base"
                          style={{ color: 'var(--color-text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}
                        >
                          {exp.role}
                        </h4>
                        <p className="font-semibold text-sm" style={{ color: '#3b82f6' }}>
                          {exp.company}
                        </p>
                      </div>
                      {exp.current && (
                        <span
                          className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                          style={{
                            backgroundColor: 'rgba(34,197,94,0.1)',
                            border: '1px solid rgba(34,197,94,0.3)',
                            color: '#4ade80',
                          }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                          Current
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-3 mt-2">
                      <span
                        className="flex items-center gap-1 text-xs"
                        style={{ color: 'var(--color-text-muted)' }}
                      >
                        <Calendar size={12} />
                        {exp.duration}
                      </span>
                      <span
                        className="flex items-center gap-1 text-xs"
                        style={{ color: 'var(--color-text-muted)' }}
                      >
                        <MapPin size={12} />
                        {exp.location}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--color-text-secondary)' }}>
                  {exp.description}
                </p>

                {/* Responsibilities */}
                <div className="space-y-2 mb-5">
                  {exp.responsibilities.map((r, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-blue-400 mt-0.5 flex-shrink-0">→</span>
                      <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{r}</span>
                    </div>
                  ))}
                </div>

                {/* Tech used */}
                <div className="flex flex-wrap gap-2">
                  {exp.tech.map(t => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md text-xs"
                      style={{
                        backgroundColor: 'rgba(59,130,246,0.08)',
                        border: '1px solid rgba(59,130,246,0.2)',
                        color: '#60a5fa',
                        fontFamily: 'JetBrains Mono, monospace',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </motion.div>
            ))}
          </div>

          {/* ── Research Paper ── */}
          <div>
            <motion.h3
              className="flex items-center gap-2 text-base font-bold mb-6"
              style={{ color: 'var(--color-text-secondary)', fontFamily: 'Space Grotesk, sans-serif' }}
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
            >
              <BookOpen size={16} style={{ color: '#8b5cf6' }} />
              Research Publication
            </motion.h3>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="w-full"
            >
              <TiltCard
                maxTilt={4}
                className="glass-card overflow-hidden"
                style={{ borderColor: 'rgba(139,92,246,0.3)' }}
              >
              {/* Header banner */}
              <div
                className="p-5"
                style={{
                  background: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(59,130,246,0.1))',
                  borderBottom: '1px solid rgba(139,92,246,0.2)',
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, rgba(139,92,246,0.3), rgba(59,130,246,0.3))',
                      border: '1px solid rgba(139,92,246,0.4)',
                    }}
                  >
                    📄
                  </div>
                  <span
                    className="text-xs font-bold tracking-widest uppercase"
                    style={{ color: '#a78bfa', fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    Published Research Paper · 2025
                  </span>
                </div>
                <h4
                  className="font-black text-lg leading-tight mb-1"
                  style={{ color: 'var(--color-text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {researchPaper.title}
                </h4>
              </div>

              <div className="p-5 space-y-4">
                {/* Journal info */}
                <div>
                  <p className="text-xs font-semibold mb-1" style={{ color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Journal
                  </p>
                  <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    {researchPaper.journal}
                  </p>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: 'ISSN', value: researchPaper.issn },
                    { label: 'SJIF', value: researchPaper.sjif },
                    { label: 'Year', value: researchPaper.year },
                  ].map(b => (
                    <div
                      key={b.label}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
                      style={{
                        backgroundColor: 'rgba(139,92,246,0.08)',
                        border: '1px solid rgba(139,92,246,0.2)',
                      }}
                    >
                      <span className="text-xs font-semibold" style={{ color: '#a78bfa' }}>{b.label}</span>
                      <span className="text-xs" style={{ color: 'var(--color-text-secondary)', fontFamily: 'JetBrains Mono, monospace' }}>
                        {b.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Authors */}
                <div>
                  <p className="text-xs font-semibold mb-1" style={{ color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Authors
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {researchPaper.authors.map((author, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 rounded text-xs"
                        style={{
                          backgroundColor: author.includes('Vinay') ? 'rgba(59,130,246,0.1)' : 'rgba(255,255,255,0.04)',
                          border: `1px solid ${author.includes('Vinay') ? 'rgba(59,130,246,0.3)' : 'var(--color-border)'}`,
                          color: author.includes('Vinay') ? '#60a5fa' : 'var(--color-text-secondary)',
                          fontWeight: author.includes('Vinay') ? 600 : 400,
                        }}
                      >
                        {author}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Abstract */}
                <div>
                  <p className="text-xs font-semibold mb-1" style={{ color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Abstract
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                    {researchPaper.abstract}
                  </p>
                </div>

                {/* CTA */}
                <a
                  href={researchPaper.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)', boxShadow: '0 0 20px rgba(139,92,246,0.3)' }}
                >
                  <ExternalLink size={14} />
                  Read Full Paper
                </a>
              </div>
              </TiltCard>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
