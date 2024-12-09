import { useEffect } from 'react';

export function useParallaxScroll() {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.parallax-scroll');
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const scrollOffset = window.innerHeight - rect.top;
        if (scrollOffset > 0) {
          const parallaxValue = Math.min(scrollOffset * 0.2, 100);
          element.style.setProperty('--scroll-offset', `${parallaxValue}px`);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
} 