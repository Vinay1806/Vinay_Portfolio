import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, MapPin, ArrowRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/SocialIcons';
import { fadeInUp, fadeInLeft, fadeInRight, viewportConfig } from '../../lib/animations';
import { personalInfo } from '../../data/portfolio';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Mailto fallback
    const body = encodeURIComponent(`Name: ${form.name}\n\n${form.message}`);
    const subject = encodeURIComponent(form.subject || 'Portfolio Contact');
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
    setTimeout(() => setSending(false), 2000);
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '12px',
    border: '1px solid var(--color-border)',
    backgroundColor: 'rgba(255,255,255,0.04)',
    color: 'var(--color-text-primary)',
    fontSize: '14px',
    outline: 'none',
    fontFamily: 'Inter, sans-serif',
    transition: 'border-color 0.2s',
  } as React.CSSProperties;

  return (
    <section
      id="contact"
      className="relative py-28"
      style={{ backgroundColor: 'var(--color-bg-primary)' }}
    >
      {/* Background */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: '800px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(59,130,246,0.06) 0%, transparent 70%)',
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
            Get In Touch
          </span>
          <h2
            className="text-4xl md:text-5xl font-black mb-4"
            style={{ color: 'var(--color-text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Let's Build Something{' '}
            <span className="text-gradient">Impactful</span>
          </h2>
          <p className="max-w-xl mx-auto text-base" style={{ color: 'var(--color-text-secondary)' }}>
            Open to internships, collaborations, freelance opportunities, and conversations
            about technology and product development.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 max-w-5xl mx-auto">

          {/* ── Left: Contact Info ── */}
          <motion.div
            className="space-y-6"
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <div className="glass-card p-7">
              <h3
                className="font-bold text-lg mb-5"
                style={{ color: 'var(--color-text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}
              >
                Let's connect
              </h3>

              <div className="space-y-4">
                {[
                  {
                    icon: Mail,
                    label: 'Email',
                    value: personalInfo.email,
                    href: `mailto:${personalInfo.email}`,
                    color: '#3b82f6',
                  },
                  {
                    icon: GithubIcon,
                    label: 'GitHub',
                    value: 'github.com/Vinay1806',
                    href: personalInfo.github,
                    color: '#94a3b8',
                  },
                  {
                    icon: LinkedinIcon,
                    label: 'LinkedIn',
                    value: 'Vinay Jangam',
                    href: personalInfo.linkedin,
                    color: '#0ea5e9',
                  },
                  {
                    icon: MapPin,
                    label: 'Location',
                    value: personalInfo.location,
                    href: null,
                    color: '#8b5cf6',
                  },
                ].map(({ icon: Icon, label, value, href, color }) => (
                  <div key={label} className="flex items-center gap-4 group">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: `${color}15`, border: `1px solid ${color}30` }}
                    >
                      <Icon size={16} style={{ color }} />
                    </div>
                    <div>
                      <p className="text-xs mb-0.5" style={{ color: 'var(--color-text-muted)' }}>{label}</p>
                      {href ? (
                        <a
                          href={href}
                          target={href.startsWith('mailto') ? undefined : '_blank'}
                          rel="noopener noreferrer"
                          className="text-sm font-medium hover:text-blue-400 transition-colors"
                          style={{ color: 'var(--color-text-primary)' }}
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Open to */}
            <div className="glass-card p-6">
              <p
                className="text-xs font-semibold tracking-widest uppercase mb-4"
                style={{ color: 'var(--color-text-muted)', fontFamily: 'Space Grotesk, sans-serif' }}
              >
                Open to
              </p>
              <div className="space-y-2">
                {personalInfo.availableFor.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <ArrowRight size={13} style={{ color: '#3b82f6' }} />
                    <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Right: Form ── */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <form onSubmit={handleSubmit} className="glass-card p-7 space-y-5">
              <h3
                className="font-bold text-lg mb-2"
                style={{ color: 'var(--color-text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}
              >
                Send a Message
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium mb-2" style={{ color: 'var(--color-text-muted)' }}>
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    style={inputStyle}
                    className="cyber-input"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-2" style={{ color: 'var(--color-text-muted)' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="your@email.com"
                    style={inputStyle}
                    className="cyber-input"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium mb-2" style={{ color: 'var(--color-text-muted)' }}>
                  Subject
                </label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={e => setForm({ ...form, subject: e.target.value })}
                  placeholder="What's this about?"
                  style={inputStyle}
                  className="cyber-input"
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-2" style={{ color: 'var(--color-text-muted)' }}>
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me about your project, idea, or opportunity..."
                  style={{ ...inputStyle, resize: 'none' }}
                  className="cyber-input"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full btn-conic-glow hover:scale-[1.01] transition-transform disabled:opacity-70"
              >
                <span
                  className="btn-conic-glow-inner w-full py-3 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  <Send size={15} />
                  {sending ? 'Opening mail...' : "Let's build something impactful"}
                </span>
              </button>

              <p className="text-xs text-center" style={{ color: 'var(--color-text-muted)' }}>
                Or email directly: {personalInfo.email}
              </p>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
