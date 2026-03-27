import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useEscalationContext } from '../context/EscalationContext';
import useWebSocket from '../hooks/useWebSocket';

const EscalationDemo = () => {
  const { score, response, tags, active } = useEscalationContext();
  const { sendEvent } = useWebSocket('ws://localhost:4000');
  const [loading, setLoading] = useState(false);
  const [displayText, setDisplayText] = useState("");

  const emotions = [
    { label: "ANGRY", value: "angry", color: "#ff2d78" },
    { label: "SARCASTIC", value: "sarcastic", color: "#7c3aed" },
    { label: "FRUSTRATED", value: "frustrated", color: "#ffa500" },
    { label: "NEUTRAL", value: "neutral", color: "#00f5ff" }
  ];

  const handleEmotionClick = async (emotion) => {
    if (!active) {
       alert("Please INITIALIZE ENGINE via the Hero section first!");
       return;
    }
    setLoading(true);
    try {
      // Both REST and WebSocket to demonstrate real-time & request/response
      await axios.post('http://localhost:4000/api/analyze-emotion', { emotion });
      sendEvent('set_emotion', { emotion });
    } catch (err) {
      console.error("Failed to analyze emotion", err);
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  // Typewriter effect for response
  useEffect(() => {
    let current = "";
    let i = 0;
    const timer = setInterval(() => {
      if (i < response.length) {
        current += response[i];
        setDisplayText(current);
        i++;
      } else {
        clearInterval(timer);
      }
    }, 30);
    return () => clearInterval(timer);
  }, [response]);

  return (
    <section id="demo" className="reveal">
      <div style={{ padding: '4rem', borderRadius: '30px', background: 'rgba(0, 0, 0, 0.4)', border: '1px solid rgba(255, 255, 255, 0.05)', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem' }}>
        <div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--star)' }}>SIMULATION ENGINE</h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.6)', marginBottom: '3rem', fontSize: '1.1rem' }}>Test CalmStream's real-time de-escalation by triggering various emotional inputs.</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {emotions.map((e) => (
              <motion.button 
                key={e.value}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05, background: e.color, color: 'white' }}
                onClick={() => handleEmotionClick(e.value)}
                style={{
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: `1px solid ${e.color}`,
                  background: 'transparent',
                  color: e.color,
                  fontFamily: 'Orbitron',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  boxShadow: `0 0 10px ${e.color}11`
                }}
              >
                {e.label}
              </motion.button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
           <div className="glass" style={{ flex: 1, padding: '2rem', borderRadius: '20px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                 <span className="data-font" style={{ color: 'var(--plasma)', fontSize: '0.8rem' }}>[ANALYSIS_STREAM]</span>
                 <motion.div 
                   animate={{ opacity: [1, 0, 1] }} 
                   transition={{ repeat: Infinity, duration: 1 }}
                   style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--pulse)' }}
                 />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.4)' }}>ESCALATION SCORE</span>
                    <span className="data-font" style={{ color: score > 7 ? 'var(--pulse)' : score > 4 ? 'var(--neural)' : 'var(--plasma)' }}>{score.toFixed(1)}/10</span>
                 </div>
                 <div className="escalation-bar">
                    <motion.div 
                      className="escalation-fill"
                      initial={{ width: 0 }}
                      animate={{ 
                        width: `${score * 10}%`,
                        backgroundColor: score > 7 ? 'var(--pulse)' : score > 4 ? 'var(--neural)' : 'var(--plasma)'
                      }}
                    />
                 </div>
              </div>

              <div style={{ flex: 1, background: 'rgba(0, 0, 0, 0.2)', padding: '1.5rem', borderRadius: '10px', marginTop: '1rem', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                 <span style={{ fontSize: '0.8rem', color: 'rgba(0, 245, 255, 0.5)', fontFamily: 'Space Mono' }}>[ENGINE_RESPONSE_OUT]:</span>
                 <p style={{ marginTop: '1rem', lineHeight: '1.6', fontSize: '1rem', color: 'var(--star)' }}>
                    {displayText}
                 </p>
                 <div style={{ marginTop: '2rem', display: 'flex', gap: '10px' }}>
                    {tags.map((tag, i) => (
                       <span key={i} style={{ fontSize: '0.6rem', padding: '4px 8px', border: '1px solid rgba(255, 255, 255, 0.05)', color: 'rgba(255,255,255,0.4)', background: 'rgba(255, 255, 255, 0.03)', textTransform: 'uppercase', borderRadius: '4px' }}>
                          #{tag}
                       </span>
                    ))}
                 </div>
              </div>
           </div>

           <div style={{ height: '40px', display: 'flex', alignItems: 'center', gap: '5px' }}>
              {[...Array(20)].map((_, i) => (
                 <motion.div 
                    key={i}
                    animate={{ 
                      height: active ? [Math.random() * 20 + 5, Math.random() * 30 + 5, Math.random() * 20 + 5] : 5
                    }}
                    transition={{ repeat: Infinity, duration: 0.5 + Math.random() * 0.5 }}
                    style={{ width: '4px', background: 'var(--plasma)', borderRadius: '2px', opacity: 0.3 }}
                 />
              ))}
           </div>
        </div>
      </div>
    </section>
  );
};

export default EscalationDemo;
