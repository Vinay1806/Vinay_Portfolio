import { motion } from 'framer-motion';
import { MapPin, Zap, Target, Layers } from 'lucide-react';
import { fadeInUp, fadeInLeft, staggerContainer, staggerItem, viewportConfig } from '../../lib/animations';
import { personalInfo, aboutStats } from '../../data/portfolio';
import CountUp from '../ui/CountUp';

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-28 overflow-hidden"
      style={{ backgroundColor: 'var(--color-bg-primary)' }}
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: '800px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(139,92,246,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="section-container relative z-10">

        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <span
            className="text-xs font-semibold tracking-widest uppercase mb-3 inline-block"
            style={{ color: '#3b82f6', fontFamily: 'Space Grotesk, sans-serif' }}
          >
            About Me
          </span>
          <h2
            className="text-4xl md:text-5xl font-black mb-4"
            style={{ color: 'var(--color-text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}
          >
            The Story Behind
            <br />
            <span className="text-gradient">the Builder</span>
          </h2>
        </motion.div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">

          {/* Left — Story */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <div className="space-y-5">
              <p className="text-lg leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                Technology has fascinated me since childhood. I was always curious about how software, websites,
                and digital systems worked behind the scenes. That curiosity became an obsession — and that
                obsession became a career.
              </p>
              <p className="text-lg leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                Today, I don't just write code. I{' '}
                <span style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>design complete solutions</span>{' '}
                — from understanding user needs and system architecture to building the final experience. Whether
                it's a cloud ERP, an AI vision system, or a SaaS platform, I build things that{' '}
                <span style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>actually matter</span>.
              </p>
              <p className="text-lg leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                Currently interning as a Full-Stack Developer on{' '}
                <span style={{ color: '#3b82f6', fontWeight: 600 }}>PaintOS</span> — a real enterprise ERP — while
                simultaneously exploring SaaS architecture, AI integration, and modern web experiences.
              </p>

              {/* Location + availability */}
              <div className="flex flex-wrap gap-3 pt-2">
                <span
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                  style={{
                    backgroundColor: 'rgba(59,130,246,0.08)',
                    border: '1px solid rgba(59,130,246,0.2)',
                    color: '#60a5fa',
                  }}
                >
                  <MapPin size={13} />
                  {personalInfo.location}
                </span>
                <span
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                  style={{
                    backgroundColor: 'rgba(34,197,94,0.08)',
                    border: '1px solid rgba(34,197,94,0.2)',
                    color: '#4ade80',
                  }}
                >
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  Open to Opportunities
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right — Superpowers */}
          <motion.div
            className="space-y-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            {[
              {
                icon: <Zap size={20} />,
                iconColor: '#fbbf24',
                bgColor: 'rgba(251,191,36,0.1)',
                borderColor: 'rgba(251,191,36,0.2)',
                title: 'Rapid Technology Learner',
                desc: 'I pick up unfamiliar technologies quickly and turn ideas into working systems — often within days of encountering something new.',
              },
              {
                icon: <Layers size={20} />,
                iconColor: '#3b82f6',
                bgColor: 'rgba(59,130,246,0.08)',
                borderColor: 'rgba(59,130,246,0.2)',
                title: 'End-to-End Product Thinker',
                desc: 'I see the full product — user needs, system architecture, implementation, and experience — not just the code.',
              },
              {
                icon: <Target size={20} />,
                iconColor: '#8b5cf6',
                bgColor: 'rgba(139,92,246,0.08)',
                borderColor: 'rgba(139,92,246,0.2)',
                title: 'Persistent Problem Solver',
                desc: 'I commit to what I start. Complex challenges are puzzles — I iterate methodically until I find a robust, scalable solution.',
              },
            ].map((sp, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="glass-card p-5 flex gap-4 items-start group hover:translate-x-1 transition-transform duration-300"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: sp.bgColor, border: `1px solid ${sp.borderColor}`, color: sp.iconColor }}
                >
                  {sp.icon}
                </div>
                <div>
                  <h3
                    className="font-semibold text-sm mb-1"
                    style={{ color: 'var(--color-text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    {sp.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                    {sp.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats Row */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {aboutStats.map((stat, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className="glass-card p-6 text-center group hover:border-blue-500/30 transition-all duration-300"
            >
              <div
                className="text-4xl font-black mb-1 text-gradient"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                <CountUp target={parseInt(stat.value)} />
                {stat.value.includes('+') ? '+' : ''}
              </div>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Interests */}
        <motion.div
          className="mt-12 glass-card p-6"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ color: 'var(--color-text-muted)', fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Outside of Code
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              '🏋️ Fitness & Strength Training',
              '📈 Business & Startups',
              '🚀 Emerging Technology',
              '💡 Product Innovation',
              '📚 Continuous Learning',
              '🌐 Digital Transformation',
            ].map((interest, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-full text-sm transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.04)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                {interest}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
