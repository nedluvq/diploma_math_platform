import React from 'react';
import { Achievement } from '../types/achievements';
import { 
  Box, 
  Typography, 
  Paper, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Divider,
  Chip
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface AchievementsListProps {
  achievements: Achievement[];
}

const AchievementsList: React.FC<AchievementsListProps> = ({ achievements }) => {
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Ваши достижения
      </Typography>
      <List>
        {achievements.map(achievement => (
          <React.Fragment key={achievement.id}>
            <ListItem>
              <ListItemIcon>
                <Box sx={{ fontSize: '2rem' }}>{achievement.icon}</Box>
              </ListItemIcon>
              <ListItemText
                primary={achievement.title}
                secondary={achievement.description}
              />
              {achievement.earned ? (
                <Chip 
                  icon={<CheckCircleIcon />}
                  label="Получено"
                  color="success"
                  variant="outlined"
                />
              ) : (
                <Chip 
                  label="Не получено"
                  color="default"
                  variant="outlined"
                />
              )}
            </ListItem>
            <Divider component="li" />
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default AchievementsList;