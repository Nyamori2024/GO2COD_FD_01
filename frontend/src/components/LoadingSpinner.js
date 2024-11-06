import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = () => {
  return (
    <motion.div
      initial={{ rotate: 0 }} // Start with 0 rotation
      animate={{ rotate: 360 }} // Rotate to 360 degrees
      transition={{ duration: 1, repeat: Infinity }} // Repeat indefinitely
      style={{
        width: '40px',
        height: '40px',
        border: '5px solid rgba(0, 0, 0, 0.1)',
        borderTop: '5px solid #007bff',
        borderRadius: '50%',
        margin: '0 auto',
      }}
    />
  );
};

export default LoadingSpinner;