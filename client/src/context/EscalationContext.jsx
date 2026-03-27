import React, { createContext, useContext, useState, useEffect } from 'react';

const EscalationContext = createContext();

export const EscalationProvider = ({ children }) => {
  const [score, setScore] = useState(1);
  const [response, setResponse] = useState("CalmStream engine initialized. Monitoring state...");
  const [tags, setTags] = useState(["initialized", "calm"]);
  const [active, setActive] = useState(false);

  return (
    <EscalationContext.Provider value={{ 
      score, 
      setScore, 
      response, 
      setResponse, 
      tags, 
      setTags,
      active,
      setActive
    }}>
      {children}
    </EscalationContext.Provider>
  );
};

export const useEscalationContext = () => useContext(EscalationContext);
