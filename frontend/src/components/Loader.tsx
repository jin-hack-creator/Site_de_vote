import React from 'react';
import { motion, Variants } from 'framer-motion';
import './Loader.css';

const Loader = () => {
  const loaderVariants: Variants = {
    pulse: {
      scale: [1, 1.2, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="loader-container">
      <motion.div
        className="loader-logo"
        variants={loaderVariants}
        animate="pulse"
      >
        YP
      </motion.div>
    </div>
  );
};

export default Loader;
