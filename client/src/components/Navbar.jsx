import React from 'react';
import { useEscalationContext } from '../context/EscalationContext';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { score } = useEscalationContext();

  const getScoreColor = (s) => {
    const ratio = (s - 1) / 9;
    const r = Math.floor(0 + ratio * 255);
    const g = Math.floor(245 - ratio * 45);
    const b = Math.floor(255 + ratio * 120);
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      height: '90px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 8%',
      zIndex: 1000,
      background: 'rgba(1, 4, 9, 0.4)',
      backdropFilter: 'blur(30px) saturate(180%)',
      borderBottom: '1px solid rgba(0, 245, 255, 0.1)'
    }}>
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        style={{
            fontFamily: 'Orbitron',
            fontSize: '1.4rem',
            fontWeight: 'bold',
            letterSpacing: '8px',
            color: 'var(--star)',
            display: 'flex',
            alignItems: 'center',
            gap: '15px'
        }}
      >
        <div style={{ width: '30px', height: '30px', border: '2px solid var(--plasma)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '10px', height: '10px', background: 'var(--plasma)', borderRadius: '50%' }} />
        </div>
        CALMSTREAM
      </motion.div>

      <div style={{ display: 'flex', gap: '3rem', alignItems: 'center' }}>
        {['DEMO', 'STACK', 'IMPACT'].map((link) => (
            <motion.a 
                key={link}
                href={`#${link.toLowerCase()}`}
                whileHover={{ y: -2, color: 'var(--plasma)' }}
                style={{ 
                    color: 'rgba(255, 255, 255, 0.6)', 
                    textDecoration: 'none', 
                    fontFamily: 'Orbitron', 
                    fontSize: '0.7rem', 
                    letterSpacing: '3px',
                    transition: 'color 0.3s ease'
                }}
            >
                {link}
            </motion.a>
        ))}
        
        <motion.div 
          animate={{ 
            boxShadow: `0 0 ${score * 5}px ${getScoreColor(score)}33`,
            borderColor: getScoreColor(score)
          }}
          transition={{ duration: 0.5 }}
          style={{
            padding: '8px 20px',
            borderRadius: '100px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: `1px solid rgba(255, 255, 255, 0.1)`,
            fontSize: '0.8rem',
            color: getScoreColor(score),
            fontFamily: 'Space Mono',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: getScoreColor(score) }} />
          INDEX: [{score.toFixed(1)}]
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;

