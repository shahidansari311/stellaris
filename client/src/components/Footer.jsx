import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer style={{
      padding: '4rem 10%',
      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      background: 'rgba(1, 4, 9, 1)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '2rem'
    }}>
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        style={{
          fontFamily: 'Orbitron',
          fontSize: '1rem',
          letterSpacing: '10px',
          color: 'var(--plasma)',
          border: '1px solid var(--plasma)',
          padding: '1.5rem',
          borderRadius: '50%',
          width: '180px',
          height: '180px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          fontWeight: 'bold',
          lineHeight: '1.5',
          background: 'rgba(0, 245, 255, 0.05)',
          boxShadow: '0 0 30px rgba(0, 245, 255, 0.1)'
        }}
      >
        CALM<br/>STREAM_
      </motion.div>

      <div style={{ textAlign: 'center', fontFamily: 'Space Mono', fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.4)', letterSpacing: '4px' }}>
         STELLARIS 2026 · TEAM XNORDS · ABES ENGINEERING COLLEGE
      </div>

      <div style={{ opacity: 0.2, fontSize: '0.6rem', color: 'var(--star)', letterSpacing: '2px' }}>
         © 2026 ALL RIGHTS RESERVED | NEURAL INTERFACE ENCRYPTED
      </div>
    </footer>
  );
};

export default Footer;
