import { useState, useEffect } from 'react';
import { 
  Box,
  Card,
  CardContent,
  Avatar,
  LinearProgress,
  Typography,
  styled,
  useTheme
} from '@mui/material';
import { getCurrentLevel } from '../helpers/experienceService';
import { getSelectedAvatarId } from '../helpers/avatarService';
import { Link } from 'react-router-dom';
import { availableAvatars } from '../helpers/avatarConstants';

const ExperienceProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  backgroundColor: theme.palette.grey[200],
  '& .MuiLinearProgress-bar': {
    borderRadius: 5,
    backgroundColor: theme.palette.success.main,
    transition: 'width 0.3s ease-out'
  }
}));

export const ExperienceBar = () => {
  const theme = useTheme();
  const [progress, setProgress] = useState(() => getCurrentLevel());
  const [avatar, setAvatar] = useState(() => {
    const savedAvatarId = getSelectedAvatarId();
    const foundAvatar = availableAvatars.find(a => a.id === savedAvatarId);
    return foundAvatar ? foundAvatar.src : availableAvatars[0].src;
  });

  useEffect(() => {
    const handleAvatarChange = () => {
      const savedAvatarId = getSelectedAvatarId();
      const foundAvatar = availableAvatars.find(a => a.id === savedAvatarId);
      setAvatar(foundAvatar ? foundAvatar.src : availableAvatars[0].src);
    };

    window.addEventListener('avatarChanged', handleAvatarChange);
    return () => window.removeEventListener('avatarChanged', handleAvatarChange);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const current = getCurrentLevel();
      if (current.level !== progress.level || current.exp !== progress.exp) {
        setProgress(current);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [progress]);

  const expPercent = (progress.exp / 100) * 100;

  return (
    <Link to="/profile">
      <Card 
        sx={{
          position: 'fixed',
          top: theme.spacing(2.5),
          right: theme.spacing(2.5),
          zIndex: theme.zIndex.tooltip,
          width: 280,
          boxShadow: theme.shadows[3],
          borderRadius: theme.shape.borderRadius
        }}
      >
        <CardContent sx={{ p: 2 }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2,
            mb: 2
          }}>
            <Avatar
              src={avatar}
              alt="Аватар"
              sx={{ 
                width: 50, 
                height: 50,
                border: `2px solid ${theme.palette.success.main}`
              }}
            />
            <Box>
              <Typography 
                variant="subtitle1" 
                fontWeight="600"
                color="text.primary"
              >
                TestStudent1
              </Typography>
              <Typography 
                variant="body2"
                color="text.secondary"
              >
                Уровень {progress.level}
              </Typography>
            </Box>
          </Box>

          {/* Progress Bar Section */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <ExperienceProgress 
              variant="determinate" 
              value={expPercent} 
            />
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <Typography 
                variant="caption" 
                fontWeight="bold"
                color="text.primary"
              >
                {progress.exp} опыта
              </Typography>
              <Typography 
                variant="caption"
                color="text.secondary"
              >
                /100 до след. уровня
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};