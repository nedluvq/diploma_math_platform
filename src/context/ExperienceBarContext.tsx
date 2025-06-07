import { createContext, useState } from 'react';
import { getCurrentLevel } from '../helpers/experienceService';

type ProgressType = {
  level: number;
  exp: number;
};

type ExperienceBarContextType = {
  progress: ProgressType;
  updateProgress: React.Dispatch<React.SetStateAction<ProgressType>>;
};

export const ExperienceBarContext = createContext<ExperienceBarContextType>({
  progress: getCurrentLevel(),
  updateProgress: () => {}
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