import React, { createContext, useContext, useState, useCallback } from "react";

const PageTransitionContext = createContext();
export const usePageTransition = () => useContext(PageTransitionContext);

export const PageTransitionProvider = ({ children }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionStage, setTransitionStage] = useState(null); // Add this state

  const triggerTransition = useCallback(() => {
    if (isTransitioning) return;             // avoid duplicates

    console.log("Transition triggered"); // Add debugging

    setIsTransitioning(true);
    setTransitionStage('exit');              // Set initial stage

    // First phase - exit current page
    setTimeout(() => {
      console.log("Switching to enter phase"); // Debug logging
      setTransitionStage('enter');           // Switch to enter stage

      // Second phase - enter new page
      setTimeout(() => {
        setIsTransitioning(false);
        setTransitionStage(null);
        console.log("Transition complete"); // Debug logging
      }, 800);                               // Allow time for enter animation
    }, 600);                                 // Allow time for exit animation
  }, [isTransitioning]);

  return (
    <PageTransitionContext.Provider value={{
      isTransitioning,
      transitionStage,
      triggerTransition
    }}>
      {children}
    </PageTransitionContext.Provider>
  );
};
