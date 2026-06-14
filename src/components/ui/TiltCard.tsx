import React, { useRef, useState } from 'react';

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  maxTilt?: number;
  className?: string;
  innerClassName?: string;
}

export function TiltCard({
  children,
  maxTilt = 6,
  className = '',
  innerClassName = '',
  style,
  ...props
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rX: 0, rY: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const rX = ((yc - y) / yc) * maxTilt;
    const rY = ((x - xc) / xc) * maxTilt;

    // Spotlight custom properties
    el.style.setProperty('--mouse-x', `${x}px`);
    el.style.setProperty('--mouse-y', `${y}px`);

    setTilt({ rX, rY });
  };

  const handleMouseLeave = () => {
    setTilt({ rX: 0, rY: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`spotlight-card ${className}`}
      style={{
        ...style,
        transform: `perspective(1000px) rotateX(${tilt.rX}deg) rotateY(${tilt.rY}deg) scale3d(1.01, 1.01, 1.01)`,
        transition: 'transform 0.15s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.3s, background-color 0.3s',
        transformStyle: 'preserve-3d',
      }}
      {...props}
    >
      <div className={innerClassName} style={{ transform: 'translateZ(10px)', transformStyle: 'preserve-3d' }}>
        {children}
      </div>
    </div>
  );
}

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function SpotlightCard({
  children,
  className = '',
  style,
  ...props
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty('--mouse-x', `${x}px`);
    el.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`spotlight-card ${className}`}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
}
