import { useEffect } from 'react';

export function useMouseFollow() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const mouseFollow = document.querySelector('.mouse-follow') as HTMLElement;
      if (mouseFollow) {
        const x = e.clientX - mouseFollow.clientWidth / 2;
        const y = e.clientY - mouseFollow.clientHeight / 2;
        mouseFollow.style.transform = `translate(${x}px, ${y}px)`;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);
} 