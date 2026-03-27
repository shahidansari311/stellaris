import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, TrendingUp, DollarSign, Cpu } from 'lucide-react';

const Counter = ({ value, prefix = "", suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value);
      const duration = 2000;
      let startTime = null;

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, value]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
};

const ImpactCard = ({ icon: Icon, title, stat, color, desc }) => (
  <motion.div 
    className="glass reveal"
    whileHover={{ scale: 1.05 }}
    style={{
      padding: '2.5rem',
      borderRadius: '20px',
      background: 'rgba(255, 255, 255, 0.05)',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      position: 'relative',
      overflow: 'hidden'
    }}
  >
    <div style={{ position: 'absolute', top: -10, right: -10, opacity: 0.1, color: color }}>
       <Icon size={120} />
    </div>
    <div style={{ color: color, marginBottom: '1rem' }}>
       <Icon size={32} />
    </div>
    <h3 style={{ fontSize: '1.2rem', color: 'rgba(255, 255, 255, 0.8)' }}>{title}</h3>
    <h4 style={{ fontSize: '2.5rem', color: color, fontFamily: 'Orbitron' }}>
      <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
    </h4>
    <p style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.85rem', fontFamily: 'Space Mono', lineHeight: '1.6' }}>{desc}</p>
  </motion.div>
);

const Impact = () => {
  const data = [
    { title: "Target Users", stat: { value: 1.5, suffix: "M", prefix: "" }, icon: Users, color: "var(--plasma)", desc: "Professionals in high-conflict sectors ready for deployment." },
    { title: "Escalation Control", stat: { value: 3, suffix: "x", prefix: "" }, icon: TrendingUp, color: "var(--neural)", desc: "Faster neutralization compared to manual de-escalation." },
    { title: "Cost Reduction", stat: { value: 40, suffix: "%", prefix: "" }, icon: DollarSign, color: "var(--pulse)", desc: "Lowering overhead for crisis intervention services." },
    { title: "Tech Impact", stat: { value: 100, suffix: "+", prefix: "" }, icon: Cpu, color: "var(--calm)", desc: "Algorithms optimized for emotional intelligence benchmarking." }
  ];

  return (
    <section id="impact">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 style={{ fontSize: '3rem', color: 'var(--star)', marginBottom: '2rem' }}>GLOBAL IMPACT</h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '3rem' }}>
            Beyond immediate conflict resolution, CalmStream provides data-driven insights into emotional landscapes, enabling proactive cultural shifts within organizations.
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
             {[...Array(3)].map((_, i) => (
                <div key={i} style={{ width: '40px', height: '2px', background: i === 0 ? 'var(--plasma)' : 'rgba(255,255,255,0.1)' }} />
             ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
           {data.map((d, i) => <ImpactCard key={i} {...d} />)}
        </div>
      </div>
    </section>
  );
};

export default Impact;
