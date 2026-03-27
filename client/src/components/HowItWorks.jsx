import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Brain, Shield } from 'lucide-react';

const Card = ({ icon: Icon, title, items, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div 
      className="glass reveal"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -10 }}
      style={{
        flex: 1,
        padding: '2.5rem',
        borderRadius: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        overflow: 'hidden',
        minHeight: '400px',
        justifyContent: 'center'
      }}
    >
      <motion.div 
        animate={{ scale: hovered ? 1.2 : 1 }}
        style={{ marginBottom: '1.5rem', color: index === 0 ? 'var(--pulse)' : index === 1 ? 'var(--plasma)' : 'var(--calm)' }}
      >
        <Icon size={48} />
      </motion.div>
      <h3 style={{ marginBottom: '1.5rem', fontSize: '1.2rem' }}>{title}</h3>
      
      <AnimatePresence>
        {hovered && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ width: '100%' }}
          >
            <ul style={{ listStyle: 'none', textAlign: 'left', padding: '1rem', background: 'rgba(0, 0, 0, 0.3)', borderRadius: '10px' }}>
              {items.map((item, i) => (
                <li key={i} style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', marginBottom: '8px', fontFamily: 'Space Mono' }}>
                  • {item}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      {!hovered && (
         <p style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.8rem', fontFamily: 'Space Mono' }}>[HOVER TO RETRIEVE META]</p>
      )}
    </motion.div>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      title: "HUMAN DISTRESS",
      icon: Activity,
      items: ["Acoustic Fingerprinting", "Semantic Sentiment", "Distress Scoring"]
    },
    {
      title: "CALMSTREAM ENGINE",
      icon: Brain,
      items: ["Neural Tag Injection", "Vocal Mirroring", "Contextual Buffering"]
    },
    {
      title: "CALM AI",
      icon: Shield,
      items: ["Performance-to-Performance", "Zero-Shot Modulation", "Conflict Resolution"]
    }
  ];

  return (
    <section id="how">
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '3rem', color: 'var(--star)' }}>ENGINE PIPELINE</h2>
        <p style={{ color: 'var(--plasma)', letterSpacing: '2px', fontFamily: 'Space Mono' }}>[SYSTEM_FLOW_RESCUE_ARCH]</p>
      </div>

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        {steps.map((step, i) => (
          <React.Fragment key={i}>
            <Card {...step} index={i} />
            {i < steps.length - 1 && (
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="var(--plasma)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{
                  animation: 'flow-anim 1.5s infinite linear'
                }} />
                <style>{`
                  @keyframes flow-anim {
                    0% { transform: translateX(-10px); opacity: 0; }
                    50% { transform: translateX(0); opacity: 1; }
                    100% { transform: translateX(10px); opacity: 0; }
                  }
                `}</style>
              </svg>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
