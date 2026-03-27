import React, { useEffect, useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useEscalationContext } from '../context/EscalationContext';
import { Power, Activity, Cpu } from 'lucide-react';

const Hero = () => {
  const { score, active, setActive } = useEscalationContext();
  const title = "CALMSTREAM";

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
  };

  const [hovered, setHovered] = useState(false);

  return (
    <section id="hero" style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        {/* Decorative Grid */}
        <div style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.1, background: 'radial-gradient(circle, transparent 20%, var(--void) 100%), linear-gradient(var(--plasma) 1px, transparent 1px), linear-gradient(90deg, var(--plasma) 1px, transparent 1px)', backgroundSize: '100% 100%, 50px 50px, 50px 50px' }} />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", zIndex: 2 }}
      >
        {title.split("").map((letter, index) => (
          <motion.h1
            key={index}
            variants={item}
            data-text={letter}
            className="text-glitch"
            style={{
              fontSize: 'clamp(3rem, 12vw, 10rem)',
              fontWeight: 700,
              margin: '0 0.2rem',
              color: 'var(--star)',
              letterSpacing: '-5px'
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {letter}
          </motion.h1>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontFamily: 'Space Mono',
          fontSize: '1rem',
          color: 'var(--plasma)',
          letterSpacing: '8px',
          marginTop: '-1rem',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          gap: '15px'
        }}
      >
        <span style={{ width: '40px', height: '1px', background: 'var(--plasma)' }} />
        AUTONOMOUS_AFFECTIVE_ENGINE v1.0
        <span style={{ width: '40px', height: '1px', background: 'var(--plasma)' }} />
      </motion.div>

      <div style={{ marginTop: '5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3rem', zIndex: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
             <Activity color="var(--neural)" size={20} className="float-animation" />
             <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '40px' }}>
                {[...Array(20)].map((_, i) => (
                    <motion.div
                    key={i}
                    animate={{
                        height: i < score * 2 ? `${Math.random() * 30 + 10}px` : '4px',
                        backgroundColor: i < score * 2 
                        ? (score > 7 ? 'var(--pulse)' : score > 4 ? 'var(--neural)' : 'var(--plasma)')
                        : 'rgba(255, 255, 255, 0.05)'
                    }}
                    transition={{ repeat: Infinity, repeatType: 'reverse', duration: 0.5 + Math.random() }}
                    style={{
                        width: '4px',
                        borderRadius: '1px',
                    }}
                    />
                ))}
            </div>
            <Cpu color="var(--plasma)" size={20} className="float-animation" style={{ animationDelay: '1s' }} />
        </div>

        <button 
          className="btn-ripple"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            e.currentTarget.appendChild(ripple);
            setTimeout(() => ripple.remove(), 800);
            
            setActive(!active);
          }}
          style={{ 
            background: active ? 'var(--plasma)' : 'transparent',
            color: active ? 'var(--void)' : 'var(--plasma)',
            border: active ? 'none' : '1px solid var(--plasma)'
          }}
        >
          <Power size={22} style={{ marginRight: '15px' }} />
          {active ? "ENGINE_ONLINE" : "INITIALIZE_SYSTEM"}
        </button>
      </div>

      {/* Floating UI Bits */}
      <div style={{ position: 'absolute', bottom: '10%', right: '5%', opacity: 0.3, pointerEvents: 'none' }}>
        <div className="data-font" style={{ fontSize: '0.6rem', lineHeight: '2' }}>
            STATUS: NOMINAL<br/>
            NEURAL_LOAD: {score * 10}%<br/>
            LATENCY: 0.04ms<br/>
            UPTIME: 14:22:01
        </div>
      </div>
    </section>
  );
};

export default Hero;

