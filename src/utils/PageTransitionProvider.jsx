import React, { createContext, useContext, useState, useCallback } from "react";

const PageTransitionContext = createContext();
export const usePageTransition = () => useContext(PageTransitionContext);

export const PageTransitionProvider = ({ children }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const triggerTransition = useCallback(() => {
    if (isTransitioning) return;             // avoid duplicates
    setIsTransitioning(true);
    setTimeout(() => setIsTransitioning(false), 1000); // matches animation length
  }, [isTransitioning]);

  return (
    <PageTransitionContext.Provider value={{ isTransitioning, triggerTransition }}>
      {children}
    </PageTransitionContext.Provider>
  );
};
