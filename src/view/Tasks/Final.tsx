import React, { useEffect, useState } from 'react';
import LessonCompletion from '../../components/LessonCompletion';
import { useAchievements } from '../../hooks/useAchievements';

const Final: React.FC = () => {
    const { achievements, earnAchievement } = useAchievements();
    const [showAchievement, setShowAchievement] = useState(false);
    const [hasShownAchievement, setHasShownAchievement] = useState(false);

useEffect(() => {
  if (!achievements['start-learning'].earned) {
    earnAchievement('start-learning');
    setShowAchievement(true);
    setHasShownAchievement(true);
    
    const timer = setTimeout(() => {
      setShowAchievement(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }

  if (achievements['start-learning'].earned && !hasShownAchievement) {
    setShowAchievement(true);
    setHasShownAchievement(true);
    
    const timer = setTimeout(() => {
      setShowAchievement(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }
}, [achievements, earnAchievement, hasShownAchievement]);
    return (
        <>
        <LessonCompletion userName={'TestStudent1'} lessonName={'Введение'} correctAnswers={5} totalQuestions={5} expGained={120} currentLevel={2} currentExp={20} expToNextLevel={100} />
      </>
    );
};

export default Final;
