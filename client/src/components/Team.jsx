import React from 'react';
import { motion } from 'framer-motion';

const Member = ({ name, role, delay }) => (
  <motion.div 
    className="glass reveal"
    initial={{ y: 0 }}
    animate={{ y: [-15, 15, -15] }}
    transition={{ repeat: Infinity, duration: 6, delay: delay, ease: "easeInOut" }}
    style={{
      padding: '2rem',
      borderRadius: '20px',
      background: 'rgba(255, 255, 255, 0.03)',
      border: '1px solid rgba(0, 245, 255, 0.15)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minWidth: '250px'
    }}
  >
     <div style={{
       width: '100px',
       height: '100px',
       borderRadius: '50%',
       background: 'linear-gradient(135deg, var(--plasma), var(--neural))',
       marginBottom: '1.5rem',
       display: 'flex',
       alignItems: 'center',
       justifyContent: 'center',
       fontSize: '2rem',
       fontWeight: 'bold',
       color: 'var(--void)'
     }}>
       {name.charAt(0)}
     </div>
     <h3 style={{ fontSize: '1.1rem', color: 'var(--star)', marginBottom: '0.5rem' }}>{name}</h3>
     <p style={{ fontSize: '0.8rem', color: 'var(--plasma)', fontFamily: 'Space Mono', textTransform: 'uppercase' }}>{role}</p>
  </motion.div>
);

const Team = () => {
  const members = [
    { name: "Shashank Tomar", role: "Leader" },
    { name: "Shahid Ansari", role: "Architect" },
    { name: "Shreem Srivastava", role: "Engineer" },
    { name: "Shagun Chaudhary", role: "Researcher" }
  ];

  return (
    <section id="team">
      <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
        <h2 style={{ fontSize: '3rem', color: 'var(--star)', marginBottom: '1rem' }}>SQUAD XNORDS</h2>
        <p style={{ color: 'var(--plasma)', letterSpacing: '5px', fontFamily: 'Space Mono' }}>[ENGINE_CONSTRUCTORS]</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
        {members.map((m, i) => <Member key={i} {...m} delay={i * 0.5} />)}
      </div>

      <div style={{ marginTop: '6rem', textAlign: 'center' }}>
         <p style={{ fontFamily: 'Orbitron', fontSize: '1rem', color: 'rgba(255, 255, 255, 0.4)', letterSpacing: '2px' }}>
            ABES ENGINEERING COLLEGE · STELLARIS 2026
         </p>
      </div>
    </section>
  );
};

export default Team;
