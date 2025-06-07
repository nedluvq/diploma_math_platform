import React from 'react';
import { Container } from '@mui/material';
import { useAchievements } from '../hooks/useAchievements';
import AchievementsList from '../components/AchievementsList';

const AchievementsPage: React.FC = () => {
  const { achievements } = useAchievements();

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <AchievementsList achievements={Object.values(achievements)} />
    </Container>
  );
};

export default AchievementsPage;