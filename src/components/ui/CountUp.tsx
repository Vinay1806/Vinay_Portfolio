import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

interface CountUpProps {
  target: number;
  duration?: number;
}

export default function CountUp({ target, duration = 1500 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const start = Date.now();
    const el = ref.current;

    const update = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target).toString();
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }, [inView, target, duration]);

  return <span ref={ref}>0</span>;
}
