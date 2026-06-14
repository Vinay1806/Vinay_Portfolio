import { motion } from 'framer-motion';
import { GraduationCap, Calendar, CheckCircle, Clock } from 'lucide-react';
import { fadeInUp, staggerContainer, staggerItem, viewportConfig } from '../../lib/animations';
import { education } from '../../data/portfolio';
import { TiltCard } from '../ui/TiltCard';

export default function EducationSection() {
  return (
    <section
      id="education"
      className="relative py-24"
      style={{ backgroundColor: 'var(--color-bg-primary)' }}
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
            Education
          </span>
          <h2
            className="text-4xl md:text-5xl font-black"
            style={{ color: 'var(--color-text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Academic{' '}
            <span className="text-gradient">Foundation</span>
          </h2>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {education.map((edu) => (
            <motion.div
              key={edu.id}
              variants={staggerItem}
              className="h-full w-full"
            >
              <TiltCard
                maxTilt={4}
                className="glass-card p-7 group relative overflow-hidden h-full flex flex-col justify-between"
                style={{ borderColor: edu.current ? 'rgba(59,130,246,0.3)' : undefined }}
              >
                <div>
                  {/* Gradient corner */}
                  <div
                    className="absolute top-0 right-0 w-32 h-32 opacity-20 pointer-events-none"
                    style={{
                      background: edu.current
                        ? 'radial-gradient(circle, rgba(59,130,246,0.5) 0%, transparent 70%)'
                        : 'radial-gradient(circle, rgba(139,92,246,0.5) 0%, transparent 70%)',
                    }}
                  />

                  {/* Icon + Status */}
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{
                        background: edu.current
                          ? 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(6,182,212,0.2))'
                          : 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(59,130,246,0.2))',
                        border: edu.current ? '1px solid rgba(59,130,246,0.3)' : '1px solid rgba(139,92,246,0.3)',
                      }}
                    >
                      <GraduationCap size={22} style={{ color: edu.current ? '#60a5fa' : '#a78bfa' }} />
                    </div>
                    <span
                      className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                      style={{
                        backgroundColor: edu.current ? 'rgba(59,130,246,0.1)' : 'rgba(34,197,94,0.1)',
                        border: `1px solid ${edu.current ? 'rgba(59,130,246,0.3)' : 'rgba(34,197,94,0.3)'}`,
                        color: edu.current ? '#60a5fa' : '#4ade80',
                      }}
                    >
                      {edu.current ? <Clock size={11} /> : <CheckCircle size={11} />}
                      {edu.status}
                    </span>
                  </div>

                  {/* Degree & Institution */}
                  <h3
                    className="font-black text-lg mb-1"
                    style={{ color: 'var(--color-text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    {edu.degree}
                  </h3>
                  <p className="font-semibold text-sm mb-2" style={{ color: edu.current ? '#60a5fa' : '#a78bfa' }}>
                    {edu.institution}
                  </p>
                  <div
                    className="flex items-center gap-1.5 text-xs mb-4"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    <Calendar size={12} />
                    {edu.duration}
                  </div>

                  <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                    {edu.description}
                  </p>
                </div>

                {/* Highlights */}
                <div className="space-y-2">
                  {edu.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span style={{ color: edu.current ? '#3b82f6' : '#8b5cf6', flexShrink: 0 }}>▸</span>
                      <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{h}</span>
                    </div>
                  ))}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
