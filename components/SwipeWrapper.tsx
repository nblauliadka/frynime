'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useSwipeable } from 'react-swipeable';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const routes = ['/', '/genres', '/schedule', '/favorites'];

export function SwipeWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [direction, setDirection] = useState(0); // 1 = forward (right-to-left), -1 = backward (left-to-right)
  const prevPathRef = useRef(pathname);

  useEffect(() => {
    const prevPath = prevPathRef.current;
    if (prevPath !== pathname) {
      const prevIndex = routes.indexOf(prevPath);
      const currentIndex = routes.indexOf(pathname);
      if (prevIndex !== -1 && currentIndex !== -1) {
        setDirection(currentIndex > prevIndex ? 1 : -1);
      } else {
        setDirection(0);
      }
      prevPathRef.current = pathname;
    }
  }, [pathname]);

  const currentIndex = routes.indexOf(pathname);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (currentIndex !== -1 && currentIndex < routes.length - 1) {
        setDirection(1);
        router.push(routes[currentIndex + 1]);
      }
    },
    onSwipedRight: () => {
      if (currentIndex !== -1 && currentIndex > 0) {
        setDirection(-1);
        router.push(routes[currentIndex - 1]);
      }
    },
    preventScrollOnSwipe: false, // Ensure vertical scroll works normally
    delta: 60, // Minimum swipe distance in pixels
    trackTouch: true,
    trackMouse: false, // Touch-only to prevent issues with text selection on desktop
  });

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : dir < 0 ? '-100%' : 0,
      opacity: 0.4,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? '-100%' : dir < 0 ? '100%' : 0,
      opacity: 0.4,
    }),
  };

  return (
    <div {...handlers} className="w-full flex-grow flex flex-col relative overflow-hidden">
      <AnimatePresence mode="popLayout" custom={direction} initial={false}>
        <motion.div
          key={pathname}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 320, damping: 32 },
            opacity: { duration: 0.18 },
          }}
          className="w-full flex-grow flex flex-col"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
