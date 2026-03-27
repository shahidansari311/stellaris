import React from 'react';
import { useEscalationContext } from '../context/EscalationContext';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { score } = useEscalationContext();

  // Color interpolation based on score (1-10)
  const getScoreColor = (s) => {
    const ratio = (s - 1) / 9;
    // Interp between cyan (#00f5ff) and magenta (#ff2d78)
    const r = Math.floor(0 + ratio * 255);
    const g = Math.floor(245 - ratio * 45); // Adjust for magenta
    const b = Math.floor(255 + ratio * 120); // Clamp is handled by CSS
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      height: '80px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 5%',
      zIndex: 1000,
      backdropFilter: 'blur(10px)',
      background: 'rgba(1, 4, 9, 0.8)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
    }}>
      <div style={{
        fontFamily: 'Orbitron',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        letterSpacing: '5px',
        color: 'var(--plasma)'
      }}>
        CALMSTREAM
      </div>

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <a href="#demo" style={{ color: 'var(--star)', textDecoration: 'none', fontFamily: 'Orbitron', fontSize: '0.8rem' }}>ENGINE DEMO</a>
        <a href="#how" style={{ color: 'var(--star)', textDecoration: 'none', fontFamily: 'Orbitron', fontSize: '0.8rem' }}>PIPELINE</a>
        
        <motion.div 
          animate={{ scale: [1, 1.1, 1], boxShadow: `0 0 ${score * 2}px ${getScoreColor(score)}` }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          style={{
            padding: '5px 15px',
            borderRadius: '20px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: `1px solid ${getScoreColor(score)}`,
            fontSize: '0.9rem',
            color: getScoreColor(score),
            fontFamily: 'Space Mono'
          }}
        >
          LIVE_INDEX: {score.toFixed(1)}
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;
