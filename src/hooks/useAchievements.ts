import { useState, useEffect } from 'react';
import { Achievement, AchievementsMap } from '../types/achievements';

const ACHIEVEMENTS_KEY = 'user_achievements';

const initialAchievements: AchievementsMap = {
  'start-learning': {
    id: 'start-learning',
    title: 'Начало учебы',
    description: 'Завершите первый урок',
    icon: '📚',
    earned: false,
  },
};``

export const useAchievements = () => {
  const [achievements, setAchievements] = useState<AchievementsMap>(initialAchievements);

  useEffect(() => {
    const savedAchievements = localStorage.getItem(ACHIEVEMENTS_KEY);
    if (savedAchievements) {
      setAchievements(JSON.parse(savedAchievements));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(achievements));
  }, [achievements]);

  const earnAchievement = (achievementId: string) => {
    setAchievements(prev => {
      if (prev[achievementId] && !prev[achievementId].earned) {
        return {
          ...prev,
          [achievementId]: {
            ...prev[achievementId],
            earned: true,
            dateEarned: new Date(),
          },
        };
      }
      return prev;
    });
  };

  return { achievements, earnAchievement };
};