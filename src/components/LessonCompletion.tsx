import React from 'react';
import { Box, Typography, Button, Avatar, LinearProgress, Paper, Container } from '@mui/material';
import { CheckCircle, ArrowForward } from '@mui/icons-material';
import avatarUrl from '../assets/avatar.png';
import { Link } from 'react-router';

interface LessonCompletionProps {
  userName: string;
  lessonName: string;
  correctAnswers: number;
  totalQuestions: number;
  expGained: number;
  currentLevel: number;
  currentExp: number;
  expToNextLevel: number;
  onContinue?: () => void;
}

const LessonCompletion: React.FC<LessonCompletionProps> = ({
  userName,
  lessonName,
  correctAnswers,
  totalQuestions,
  expGained,
  currentLevel,
  currentExp,
  expToNextLevel,
  onContinue
}) => {
  const progressValue = (currentExp / expToNextLevel) * 100;

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
        <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
          <CheckCircle color="success" sx={{ fontSize: 80 }} />
          <Typography variant="h4" component="h1" gutterBottom>
            Урок завершен!
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {lessonName}
          </Typography>

          <Box display="flex" alignItems="center" gap={2} sx={{ mt: 2 }}>
            <Avatar
              src={avatarUrl}
              alt={userName}
              sx={{ width: 64, height: 64, border: '3px solid #4caf50' }}
            />
            <Box>
              <Typography variant="body1">{userName}</Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Уровень {currentLevel}
              </Typography>
            </Box>
          </Box>
          <Box width="100%" sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Результаты:
            </Typography>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography>Правильные ответы:</Typography>
              <Typography fontWeight="bold">
                {correctAnswers} из {totalQuestions}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={3}>
              <Typography>Получено опыта:</Typography>
              <Typography fontWeight="bold" color="success.main">
                +{expGained} XP
              </Typography>
            </Box>
          </Box>

          <Box width="100%">
            <Typography variant="subtitle2" gutterBottom>
              Прогресс до следующего уровня:
            </Typography>
            <Box display="flex" alignItems="center" gap={2}>
              <LinearProgress
                variant="determinate"
                value={progressValue}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  flexGrow: 1,
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 5,
                  },
                }}
              />
              <Typography variant="body2">
                {currentExp}/{expToNextLevel}
              </Typography>
            </Box>
          </Box>

          <Link to="/main" style={{ textDecoration: 'none', color: 'white' }}>
          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowForward />}
            onClick={onContinue}
            sx={{ mt: 4, px: 6, py: 1.5, borderRadius: 3 }}
          >
            
              Вернуться на главную 
              
          </Button>
          </Link>
        </Box>
      </Paper>
    </Container>
  );
};

export default LessonCompletion;