import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  
  // Track raw mouse and ring coordinates via refs to prevent React state changes and re-renders
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const isMouseDown = useRef(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = 'none';

    const isMobile = window.matchMedia('(pointer: coarse)').matches;
    if (isMobile) return;

    // Track mouse coordinates directly on mousemove
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Smooth animation loop using requestAnimationFrame
    const animate = () => {
      // 0.25 interpolation factor makes it follow the cursor much more tightly and feel responsive
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.25;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.25;

      if (ringRef.current) {
        const scale = isMouseDown.current ? 0.8 : 1;
        ringRef.current.style.transform = `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px) scale(${scale})`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mousePos.current.x - 4}px, ${mousePos.current.y - 4}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    const handleMouseDown = () => {
      isMouseDown.current = true;
    };
    const handleMouseUp = () => {
      isMouseDown.current = false;
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Interactive element hover via global delegation
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.closest('a, button, [role="button"], input, select, textarea, label')) {
        if (ringRef.current) {
          ringRef.current.style.width = '48px';
          ringRef.current.style.height = '48px';
          ringRef.current.style.borderColor = 'rgba(59,130,246,0.8)';
          ringRef.current.style.backgroundColor = 'rgba(59,130,246,0.12)';
        }
        if (dotRef.current) {
          dotRef.current.style.opacity = '0.3';
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.closest('a, button, [role="button"], input, select, textarea, label')) {
        if (ringRef.current) {
          ringRef.current.style.width = '40px';
          ringRef.current.style.height = '40px';
          ringRef.current.style.borderColor = 'rgba(255,255,255,0.3)';
          ringRef.current.style.backgroundColor = 'transparent';
        }
        if (dotRef.current) {
          dotRef.current.style.opacity = '1';
        }
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.body.style.cursor = '';
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <>
      {/* Trailing ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        style={{
          width: '40px',
          height: '40px',
          border: '1px solid rgba(255,255,255,0.3)',
          transition: 'width 0.2s, height 0.2s, border-color 0.2s, background-color 0.2s',
          willChange: 'transform',
        }}
      />
      {/* Center dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        style={{
          width: '8px',
          height: '8px',
          backgroundColor: '#3b82f6',
          transition: 'opacity 0.2s',
          willChange: 'transform',
        }}
      />
    </>
  );
}
