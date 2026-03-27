import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useEscalationContext } from '../context/EscalationContext';
import { Power } from 'lucide-react';

const Hero = () => {
  const { score, active, setActive } = useEscalationContext();
  const controls = useAnimation();
  const title = "CALMSTREAM";

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const [hovered, setHovered] = useState(false);

  return (
    <section id="hero" style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {title.split("").map((letter, index) => (
          <motion.h1
            key={index}
            variants={child}
            data-text={letter}
            className="text-glitch"
            style={{
              fontSize: 'clamp(3rem, 10vw, 8rem)',
              margin: '0 0.1rem',
              color: 'var(--star)',
              textShadow: hovered ? '0 0 20px var(--plasma)' : 'none'
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {letter}
          </motion.h1>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 1 }}
        style={{
          fontFamily: 'Space Mono',
          fontSize: '1rem',
          color: 'var(--plasma)',
          letterSpacing: '5px',
          marginTop: '1rem',
          textAlign: 'center'
        }}
      >
        AUTONOMOUS_AFFECTIVE_ENGINE v1.0
      </motion.p>

      <div style={{ marginTop: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '100px' }}>
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                height: i < score ? `${(i + 1) * 10}px` : '2px',
                backgroundColor: i < score 
                  ? (score > 7 ? 'var(--pulse)' : score > 4 ? 'var(--neural)' : 'var(--plasma)')
                  : 'rgba(255, 255, 255, 0.1)'
              }}
              style={{
                width: '15px',
                borderRadius: '2px',
                boxShadow: i < score ? '0 0 10px rgba(0, 245, 255, 0.3)' : 'none'
              }}
            />
          ))}
        </div>
        <div style={{ fontFamily: 'Orbitron', fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.4)' }}>
           ESCALATION INDEX_TRACKER [0-10]
        </div>

        <button 
          className="btn-ripple"
          onClick={(e) => {
            // Ripple effect
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            e.currentTarget.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
            
            setActive(true);
          }}
          style={{ 
            marginTop: '1rem', 
            background: active ? 'var(--plasma)' : 'transparent',
            color: active ? 'var(--void)' : 'var(--plasma)'
          }}
        >
          <Power size={20} style={{ marginRight: '10px' }} />
          {active ? "ENGINE ONLINE" : "INITIALIZE ENGINE"}
        </button>
      </div>
    </section>
  );
};

export default Hero;
