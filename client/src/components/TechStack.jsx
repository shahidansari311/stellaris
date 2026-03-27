import React from 'react';
import { motion } from 'framer-motion';
import { Mic, Waves, Database, Zap, Volume2, Bot } from 'lucide-react';

const TechStack = () => {
  const pipeline = [
    { icon: Mic, name: "Voice Stream" },
    { icon: Waves, name: "STT Engine" },
    { icon: Database, name: "Emotion Detection" },
    { icon: Bot, name: "CalmStream AI" },
    { icon: Zap, name: "ElevenLabs" },
    { icon: Volume2, name: "Calm Response" }
  ];

  const categories = [
    {
      title: "FRONTEND",
      items: ["React.js", "Web Audio API", "Real-time Audio Streaming"],
      color: "var(--plasma)"
    },
    {
      title: "BACKEND",
      items: ["FastAPI / Node.js", "WebSocket (ws)", "Emotion Analysis Pipeline"],
      color: "var(--neural)"
    },
    {
      title: "AI & VOICE",
      items: ["Emotion Detection Model", "LLM Response", "ElevenLabs TTS"],
      color: "var(--pulse)"
    }
  ];

  return (
    <section id="tech">
      <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
        <h2 style={{ fontSize: '3rem', color: 'var(--star)', marginBottom: '4rem' }}>NEURAL STACK</h2>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', background: 'rgba(255, 255, 255, 0.02)' }}>
          {pipeline.map((p, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <div style={{ color: 'var(--plasma)', background: 'rgba(0, 245, 255, 0.1)', padding: '5px', borderRadius: '5px' }}>
                <p.icon size={16} />
              </div>
              <span className="data-font" style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.6)' }}>{p.name}</span>
              {i < pipeline.length - 1 && <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>→</span>}
            </motion.div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '2rem' }}>
        {categories.map((cat, i) => (
          <motion.div 
            key={i}
            className="glass"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            style={{ 
              flex: 1, 
              padding: '2rem', 
              borderRadius: '15px',
              borderTop: `4px solid ${cat.color}`
            }}
          >
            <h4 style={{ marginBottom: '1.5rem', color: cat.color }}>{cat.title}</h4>
            <ul style={{ listStyle: 'none' }}>
              {cat.items.map((item, j) => (
                <li key={j} style={{ fontFamily: 'Space Mono', fontSize: '0.9rem', marginBottom: '15px', color: 'rgba(255, 255, 255, 0.8)' }}>
                  <span style={{ color: cat.color, marginRight: '10px' }}>▪</span>{item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TechStack;
