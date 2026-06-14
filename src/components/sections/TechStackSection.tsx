import { useState } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem, fadeInUp, viewportConfig } from '../../lib/animations';
import { skillCategories } from '../../data/portfolio';
import { SpotlightCard } from '../ui/TiltCard';

export default function TechStackSection() {
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].id);

  const active = skillCategories.find(c => c.id === activeCategory)!;

  return (
    <section
      id="skills"
      className="relative py-28"
      style={{ backgroundColor: 'var(--color-bg-secondary)' }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(59,130,246,0.04) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="section-container relative z-10">

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
            Tech Stack
          </span>
          <h2
            className="text-4xl md:text-5xl font-black mb-4"
            style={{ color: 'var(--color-text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Skills &{' '}
            <span className="text-gradient">Technologies</span>
          </h2>
          <p className="max-w-lg mx-auto text-base" style={{ color: 'var(--color-text-secondary)' }}>
            From enterprise web apps to embedded AI systems — here's the tech I use to build things.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {skillCategories.map(cat => (
            <motion.button
              key={cat.id}
              variants={staggerItem}
              onClick={() => setActiveCategory(cat.id)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300"
              style={{
                backgroundColor: activeCategory === cat.id ? 'rgba(59,130,246,0.15)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${activeCategory === cat.id ? 'rgba(59,130,246,0.4)' : 'var(--color-border)'}`,
                color: activeCategory === cat.id ? '#60a5fa' : 'var(--color-text-secondary)',
                fontFamily: 'Space Grotesk, sans-serif',
                transform: activeCategory === cat.id ? 'translateY(-1px)' : 'none',
              }}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Skill Cards Grid */}
        <motion.div
          key={activeCategory}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {active.skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              variants={staggerItem}
              className="w-full h-full"
              whileHover={{ y: -4, scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              <SpotlightCard className="glass-card p-4 flex flex-col items-center justify-between gap-3 group cursor-default h-full">
                {/* Skill name */}
                <span
                  className="text-sm font-semibold text-center"
                  style={{ color: 'var(--color-text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {skill.name}
                </span>

                {/* Proficiency bar */}
                <div className="w-full">
                  <div
                    className="w-full h-1 rounded-full overflow-hidden"
                    style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
                  >
                    <motion.div
                      className="h-full rounded-full glow-bar-fill"
                      style={{ background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)' }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                  <p
                    className="text-right text-xs mt-1"
                    style={{ color: 'var(--color-text-muted)', fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    {skill.level}%
                  </p>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>

        {/* All tech tags */}
        <motion.div
          className="mt-14 w-full"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <SpotlightCard className="glass-card p-6">
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-4"
              style={{ color: 'var(--color-text-muted)', fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Also familiar with
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                'Git', 'GitHub', 'VS Code', 'IntelliJ IDEA', 'MySQL Workbench', 'Firebase Console',
                'Chrome DevTools', 'Postman', 'npm', 'pnpm', 'Vercel', 'Coolify',
                'CI/CD Basics', 'REST APIs', 'WebSockets', 'Servo Motors', 'Serial Communication',
                'Face Recognition', 'Data Visualization', 'Agile Workflows',
              ].map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 hover:scale-105 cursor-default"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.04)',
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-text-secondary)',
                    fontFamily: 'JetBrains Mono, monospace',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </SpotlightCard>
        </motion.div>

      </div>
    </section>
  );
}
