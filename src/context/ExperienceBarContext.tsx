import { createContext, useState } from 'react';
import { getCurrentLevel } from '../helpers/experienceService';

export const ExperienceBarContext = createContext({
  progress: getCurrentLevel(),
  updateProgress: (newProgress: { level: number; exp: number }) => {}
});

export const ExperienceBarProvider = ({ children }: { children: React.ReactNode }) => {
  const [progress, setProgress] = useState(getCurrentLevel());
  
  return (
    <ExperienceBarContext.Provider value={{
      progress,
      updateProgress: setProgress
    }}>
      {children}
    </ExperienceBarContext.Provider>
  );
};