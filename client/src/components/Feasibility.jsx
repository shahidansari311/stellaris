import React from 'react';
import { motion } from 'framer-motion';
import { Target, AlertTriangle, ShieldCheck } from 'lucide-react';

const Card = ({ icon: Icon, title, items, color }) => (
  <motion.div 
    className="glass reveal"
    whileHover={{ y: -15 }}
    style={{
      flex: 1,
      padding: '3rem',
      clipPath: 'polygon(10% 0%, 100% 0%, 100% 85%, 90% 100%, 0% 100%, 0% 15%)',
      background: 'rgba(255, 255, 255, 0.05)',
      border: `2px solid ${color}33`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center'
    }}
  >
    <div style={{ color: color, marginBottom: '2rem' }}>
       <Icon size={56} />
    </div>
    <h3 style={{ marginBottom: '1.5rem', fontSize: '1.3rem' }}>{title}</h3>
    <ul style={{ listStyle: 'none', textAlign: 'left', width: '100%', padding: '1rem', background: 'rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
      {items.map((item, i) => (
        <li key={i} style={{ fontFamily: 'Space Mono', fontSize: '0.8rem', marginBottom: '10px', color: 'rgba(255, 255, 255, 0.7)' }}>
          <span style={{ color: color, marginRight: '10px' }}>▪</span>{item}
        </li>
      ))}
    </ul>
  </motion.div>
);

const Feasibility = () => {
  const sections = [
    {
      title: "TECHNICAL FEASIBILITY",
      icon: Target,
      color: "var(--plasma)",
      items: ["Microservices Architecture", "Real-time WebSockets", "Vocal Mirroring Models"]
    },
    {
      title: "POTENTIAL CHALLENGES",
      icon: AlertTriangle,
      color: "var(--pulse)",
      items: ["Low-Latency Processing", "Noise Interference", "Ethical AI Scaling"]
    },
    {
      title: "SOLUTION STRATEGIES",
      icon: ShieldCheck,
      color: "var(--calm)",
      items: ["Edge Optimization", "Noise Filter Pipelines", "Human-in-the-Loop Safeguards"]
    }
  ];

  return (
    <section id="feasibility">
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '3rem', color: 'var(--star)' }}>REAL-WORLD LOGISTICS</h2>
        <p style={{ color: 'var(--plasma)', letterSpacing: '2px', fontFamily: 'Space Mono' }}>[PROJECT_FEASIBILITY_ANALYSIS]</p>
      </div>

      <div style={{ display: 'flex', gap: '3rem' }}>
         {sections.map((s, i) => <Card key={i} {...s} />)}
      </div>
    </section>
  );
};

export default Feasibility;
