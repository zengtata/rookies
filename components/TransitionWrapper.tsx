"use client";

import React, {JSX, ReactNode, useEffect, useState} from "react";
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


// had to modify this casue it was causing an error
const PixelTransition = () => {
  const [blocks, setBlocks] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const generateBlocks = () => {
      const { innerWidth, innerHeight } = window;
      const blockSize = innerWidth * 0.05;
      const nbOfBlocks = Math.ceil(innerHeight / blockSize);
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
    setBlocks(generateBlocks());
  }, []);

  return (
      <div className="pixelBackground">
        {Array.from({ length: 20 }).map((_, index) => (
            <div key={index} className="column">
              {blocks}
            </div>
        ))}
      </div>
  );
};

interface TransitionWrapperProps {
  children: ReactNode;
}

const TransitionWrapper = ({ children }: TransitionWrapperProps) => {
  const [showTransition, setShowTransition] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowTransition(false);
    }, 800);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div style={{ position: "relative" }}>
      {children}
      <AnimatePresence>
        {showTransition && (
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
