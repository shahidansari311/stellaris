import React, { useEffect } from 'react';
import { EscalationProvider } from './context/EscalationContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import TechStack from './components/TechStack';
import EscalationDemo from './components/EscalationDemo';
import Feasibility from './components/Feasibility';
import Impact from './components/Impact';
import Team from './components/Team';
import Footer from './components/Footer';
import ThreeScene from './components/ThreeScene';
import Cursor from './components/Cursor';
import useScrollReveal from './hooks/useScrollReveal';

const AppContent = () => {
    useScrollReveal();

    return (
        <div style={{ position: 'relative', width: '100vw', overflowX: 'hidden' }}>
            <Cursor />
            <ThreeScene />
            <Navbar />
            <main>
                <Hero />
                <EscalationDemo />
                <HowItWorks />
                <TechStack />
                <Feasibility />
                <Impact />
                <Team />
            </main>
            <Footer />
        </div>
    );
};

const App = () => {
  return (
    <EscalationProvider>
        <AppContent />
    </EscalationProvider>
  );
};

export default App;
