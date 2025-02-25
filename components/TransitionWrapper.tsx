"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const anim = {
  initial: {
    opacity: 0,
  },
  animate: (i: number) => ({
    opacity: 1,
    transition: { duration: 0.5, delay: 0.03 * i },
  }),
  exit: (i: number) => ({
    opacity: 0,
    transition: { duration: 0.5, delay: 0.03 * i },
  }),
};

const PixelTransition = () => {
  // Function to generate blocks based on the window size
  const getBlocks = () => {
    const { innerWidth, innerHeight } = window;
    const blockSize = innerWidth * 0.05;
    const nbOfBlocks = Math.ceil(innerHeight / blockSize);
    // Generate and shuffle an array of indexes
    const indexes = Array.from({ length: nbOfBlocks }, (_, i) => i);
    for (let i = indexes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
    }
    return indexes.map((randomIndex, index) => (
      <motion.div
        key={index}
        className="block"
        variants={anim}
        initial="initial"
        animate="animate"
        exit="exit"
        custom={randomIndex}
      />
    ));
  };

  return (
    <div className="pixelBackground">
      {Array.from({ length: 20 }).map((_, index) => (
        <div key={index} className="column">
          {getBlocks()}
        </div>
      ))}
    </div>
  );
};

interface TransitionWrapperProps {
  children: ReactNode;
}

const TransitionWrapper = ({ children }: TransitionWrapperProps) => {
  const pathname = usePathname();
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    // Trigger transition when the route changes
    setTransitioning(true);
    const timeout = setTimeout(() => {
      setTransitioning(false);
    }, 800); // Adjust timeout as needed for your animation duration
    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <div style={{ position: "relative" }}>
      {children}
      <AnimatePresence>
        {transitioning && (
          <motion.div
            key="pixelTransition"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 1000,
              pointerEvents: "none",
            }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
          >
            <PixelTransition />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TransitionWrapper;
