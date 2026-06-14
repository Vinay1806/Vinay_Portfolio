import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, staggerItem, viewportConfig } from '../../lib/animations';
import { currentFocus } from '../../data/portfolio';

const statusColors: Record<string, { bg: string; border: string; text: string; dot: string }> = {
  Active: { bg: 'rgba(59,130,246,0.1)', border: 'rgba(59,130,246,0.3)', text: '#60a5fa', dot: '#3b82f6' },
  Learning: { bg: 'rgba(139,92,246,0.1)', border: 'rgba(139,92,246,0.3)', text: '#a78bfa', dot: '#8b5cf6' },
  Exploring: { bg: 'rgba(6,182,212,0.1)', border: 'rgba(6,182,212,0.3)', text: '#22d3ee', dot: '#06b6d4' },
};

export default function CurrentlyBuildingSection() {
  return (
    <section
      id="current"
      className="relative py-24"
      style={{ backgroundColor: 'var(--color-bg-secondary)' }}
    >
      <div className="section-container">

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <span
            className="text-xs font-semibold tracking-widest uppercase mb-3 inline-block"
            style={{ color: '#3b82f6', fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Right Now
          </span>
          <h2
            className="text-4xl md:text-5xl font-black mb-4"
            style={{ color: 'var(--color-text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Currently{' '}
            <span className="text-gradient">Building</span>
          </h2>
          <p className="max-w-lg mx-auto text-base" style={{ color: 'var(--color-text-secondary)' }}>
            What I'm actively working on and exploring right now in June 2026.
          </p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {currentFocus.map((item) => {
            const colors = statusColors[item.status];
            return (
              <motion.div
                key={item.id}
                variants={staggerItem}
                className="glass-card p-6 group"
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                style={{ borderColor: colors.border }}
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: colors.bg, border: `1px solid ${colors.border}` }}
                >
                  {item.icon}
                </div>

                {/* Title */}
                <h3
                  className="font-bold text-sm mb-2"
                  style={{ color: 'var(--color-text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {item.title}
                </h3>
                <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                  {item.description}
                </p>

                {/* Status */}
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                  style={{ backgroundColor: colors.bg, border: `1px solid ${colors.border}`, color: colors.text }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ backgroundColor: colors.dot }}
                  />
                  {item.status}
                </span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom note */}
        <motion.p
          className="text-center mt-10 text-sm"
          style={{ color: 'var(--color-text-muted)', fontFamily: 'JetBrains Mono, monospace' }}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          // Always building, always learning.
        </motion.p>

      </div>
    </section>
  );
}
