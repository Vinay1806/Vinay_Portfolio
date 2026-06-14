import { ArrowUp, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/SocialIcons';
import { scrollTo } from '../../hooks/useLenis';
import { personalInfo } from '../../data/portfolio';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative border-t"
      style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-primary)' }}
    >
      <div className="section-container py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-sm"
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                fontFamily: 'Space Grotesk, sans-serif',
              }}
            >
              V
            </div>
            <div>
              <p
                className="font-bold text-sm"
                style={{ color: 'var(--color-text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}
              >
                Vinay
              </p>
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                Software Engineer & Product Builder
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
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
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 hover:border-blue-500/50"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.04)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                <Icon size={15} />
              </a>
            ))}
          </div>

          {/* Copyright + back to top */}
          <div className="flex items-center gap-4">
            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
              © {year} Vinay Jangam. All rights reserved.
            </p>
            <button
              onClick={() => scrollTo(0)}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{
                background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                color: 'white',
              }}
              aria-label="Back to top"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>

        {/* Bottom note */}
        <div className="mt-8 pt-6 border-t flex justify-center" style={{ borderColor: 'var(--color-border)' }}>
          <p className="text-xs" style={{ color: 'var(--color-text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
            Built with React · TypeScript · Vite · Tailwind CSS · Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
