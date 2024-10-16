// src/components/Hero.jsx

import React from 'react';
import { motion } from 'framer-motion';

const phrases = ["SMART", "BIG", "TECH", "BUZZ", "COOL", "THING"];

// Animation for each letter sliding vertically
const letterAnimation = {
  initial: { y: 100, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -100, opacity: 0 },
  transition: { duration: 0.5 },
};

const Hero = () => {
  return (
    <section className="relative bg-[#1E1E2F] text-white py-20 flex items-center justify-center">
      <div className="container mx-auto text-center">
        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-4xl font-bold mb-8"
        >
          Let’s build THE NEXT
        </motion.h1>

        {/* Container for vertical sliding text */}
        <div className="flex justify-center items-center space-x-6 text-6xl font-extrabold">
          {phrases.map((word, wordIndex) => (
            <div key={wordIndex} className="flex flex-col items-center">
              {word.split("").map((letter, index) => (
                <motion.div
                  key={index}
                  variants={letterAnimation}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ delay: index * 0.1 }}
                  className="text-white"
                >
                  {letter}
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
