import React, { useState, useEffect } from 'react';
import { getSelectedAvatarId, saveSelectedAvatarId } from '../helpers/avatarService';
import { 
  Container,
  Box,
  Avatar,
  Typography,
  Paper,
  Chip,
  Divider,
  useTheme,
  styled,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid
} from '@mui/material';
import { 
  School as SchoolIcon,
  Star as StarIcon,
  EmojiEvents as TrophyIcon,
  CheckCircle as CheckIcon,
  MoreVert as MoreVertIcon
} from '@mui/icons-material';
import { getCurrentLevel } from '../helpers/experienceService';
import { availableAvatars, AvatarType } from '../helpers/avatarConstants';
import { Link } from 'react-router';
import { availableTitles, Title } from '../helpers/titles';
import { getAvailableTitles, getCurrentTitle, saveSelectedTitle } from '../helpers/titleService';

const AchievementCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  transition: 'all 0.2s',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4]
  }
}));

const Profile: React.FC = () => {
    const [progress, setProgress] = useState(() => getCurrentLevel());
    const [currentTitle, setCurrentTitle] = useState<Title>(() => getCurrentTitle(progress.level));
const [availableTitlesList, setAvailableTitlesList] = useState<Title[]>(() => getAvailableTitles(progress.level));
const [titleMenuAnchor, setTitleMenuAnchor] = useState<null | HTMLElement>(null);

useEffect(() => {
  const newAvailableTitles = getAvailableTitles(progress.level);
  setAvailableTitlesList(newAvailableTitles);
  
  const titleAvailable = newAvailableTitles.some(t => t.id === currentTitle.id);
  if (!titleAvailable) {
    const newTitle = getCurrentTitle(progress.level);
    setCurrentTitle(newTitle);
    saveSelectedTitle(newTitle.id);
  }
});
const handleTitleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
  setTitleMenuAnchor(event.currentTarget);
};

const handleTitleMenuClose = () => {
  setTitleMenuAnchor(null);
};

const handleTitleSelect = (title: Title) => {
  setCurrentTitle(title);
  saveSelectedTitle(title.id);
  handleTitleMenuClose();
};
  const theme = useTheme();
  const competition = () => {
    const level = getCurrentLevel();
    return level.exp !== 0;
  };

  
  const [openAvatarDialog, setOpenAvatarDialog] = useState(false);
  const [achievements, _] = useState([
    { id: 1, name: 'Первый шаг', description: 'Завершите первый урок', earned: competition(), icon: <CheckIcon color="success" /> },
    { id: 2, name: 'Усердный ученик', description: 'Завершите введение', earned: competition(), icon: <SchoolIcon color="primary" /> },
    { id: 3, name: 'Мастер', description: 'Достигните 5 уровня', earned: false, icon: <TrophyIcon color="warning" /> },
    { id: 4, name: 'Звезда', description: 'Получите 10 отличных оценок', earned: false, icon: <StarIcon color="secondary" /> },
  ]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarType>(() => {
  const savedAvatarId = getSelectedAvatarId();
  return availableAvatars.find(avatar => avatar.id === savedAvatarId) || availableAvatars[0];
});

const handleAvatarSelect = (avatar: AvatarType) => {
  if (progress.level >= avatar.levelRequired) {
    setSelectedAvatar(avatar);
    saveSelectedAvatarId(avatar.id);
  } else {
    setDialogAvatar(avatar);
    setOpenAvatarDialog(true);
  }
  handleAvatarMenuClose();
};

useEffect(() => {
  const currentAvatar = availableAvatars.find(a => a.id === selectedAvatar.id);
  if (!currentAvatar || progress.level < currentAvatar.levelRequired) {
    const newAvatar = [...availableAvatars]
      .reverse()
      .find(avatar => progress.level >= avatar.levelRequired) || availableAvatars[0];
    setSelectedAvatar(newAvatar);
    saveSelectedAvatarId(newAvatar.id);
  }
}, [progress.level]);

  useEffect(() => {
    const interval = setInterval(() => {
      const current = getCurrentLevel();
      if (current.level !== progress.level || current.exp !== progress.exp) {
        setProgress(current);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [progress.level]);

  const handleAvatarMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAvatarMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDialogClose = () => {
    setOpenAvatarDialog(false);
    setDialogAvatar(null);
  };

  const [dialogAvatar, setDialogAvatar] = useState<AvatarType | null>(null);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
        <Link to="/main"><Button variant='outlined'>На главную</Button></Link>
      <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 4 }}>
        <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems="center" gap={4}>
          <Box position="relative">
            <Avatar
              src={selectedAvatar.src}
              alt={selectedAvatar.alt}
              sx={{ 
                width: 120, 
                height: 120,
                border: `4px solid ${theme.palette.primary.main}`,
                cursor: 'pointer'
              }}
              onClick={handleAvatarMenuOpen}
            />
            <IconButton
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                backgroundColor: theme.palette.background.paper,
                '&:hover': {
                  backgroundColor: theme.palette.grey[200]
                }
              }}
              onClick={handleAvatarMenuOpen}
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>
          </Box>
          <Box display="flex" flexDirection="column" gap={1}>
  <Typography variant="h4" component="h1">
    TestStudent1
  </Typography>
  <Box display="flex" alignItems="center" gap={1}>
    <Chip 
      label={currentTitle.name}
      sx={{ 
        backgroundColor: currentTitle.color,
        color: 'white',
        fontWeight: 'bold',
        cursor: 'pointer'
      }}
      onClick={handleTitleMenuOpen}
    />
    <Typography variant="body2" color="text.secondary">
      {currentTitle.description}
    </Typography>
  </Box>
</Box>
<Menu
  anchorEl={titleMenuAnchor}
  open={Boolean(titleMenuAnchor)}
  onClose={handleTitleMenuClose}
>
  {availableTitlesList.map(title => (
    <MenuItem 
      key={title.id}
      onClick={() => handleTitleSelect(title)}
      sx={{ color: title.color, fontWeight: 'bold' }}
    >
      {title.name}
      <Typography variant="body2" color="text.secondary" ml={2}>
        {title.description}
      </Typography>
    </MenuItem>
  ))}
</Menu>
        </Box>
      </Paper>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleAvatarMenuClose}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: '20ch',
          },
        }}
      >
        {availableAvatars.map((avatar) => (
          <MenuItem 
            key={avatar.id} 
            onClick={() => handleAvatarSelect(avatar)}
            disabled={progress.level < avatar.levelRequired}
          >
            <ListItemIcon>
              <Avatar src={avatar.src} sx={{ width: 32, height: 32 }} />
            </ListItemIcon>
            <Typography variant="body2">
              {avatar.alt}
              {progress.level < avatar.levelRequired && (
                <Typography component="span" variant="caption" color="text.secondary" ml={1}>
                  (уровень {avatar.levelRequired})
                </Typography>
              )}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
      <Dialog open={openAvatarDialog} onClose={handleDialogClose}>
        <DialogTitle>Аватарка недоступна</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" alignItems="center" p={2}>
            <Avatar src={dialogAvatar?.src} sx={{ width: 100, height: 100, mb: 2 }} />
            <Typography>
              Чтобы разблокировать эту аватарку, достигните {dialogAvatar?.levelRequired} уровня.
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>
              Текущий уровень: {progress.level}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>

      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4, mb: 3 }}>
  Мои титулы
</Typography>

<Grid container spacing={2}>
  {availableTitles.map(title => (
    //@ts-ignore
    <Grid item xs={12} sm={6} md={4} key={title.id}>
      <Paper 
        elevation={availableTitlesList.some(t => t.id === title.id) ? 3 : 1}
        sx={{ 
          p: 2,
          borderLeft: `4px solid ${title.color}`,
          opacity: availableTitlesList.some(t => t.id === title.id) ? 1 : 0.6
        }}
      >
        <Typography variant="h6" color={title.color}>
          {title.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {title.description}
        </Typography>
        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
          Требуется уровень: {title.levelRequired}
        </Typography>
        {currentTitle.id === title.id && (
          <Chip 
            label="Выбрано" 
            size="small" 
            sx={{ 
              mt: 1,
              backgroundColor: title.color,
              color: 'white'
            }} 
          />
        )}
      </Paper>
    </Grid>
  ))}
</Grid>
      <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3 }}>
        Мои достижения
      </Typography>
      
      <Grid container spacing={3}>
        {achievements.map((achievement) => (
          //@ts-ignore
          <Grid item xs={12} sm={6} md={4} key={achievement.id}>
            <AchievementCard elevation={2}>
              <Box display="flex" gap={2} alignItems="center" mb={1.5}>
                <Box sx={{ 
                  width: 40, 
                  height: 40,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  bgcolor: achievement.earned ? theme.palette.success.light : theme.palette.grey[200]
                }}>
                  {React.cloneElement(achievement.icon, { 
                    fontSize: 'medium',
                    color: achievement.earned ? 'inherit' : 'disabled'
                  })}
                </Box>
                <Typography variant="subtitle1" fontWeight="600">
                  {achievement.name}
                </Typography>
              </Box>
              
              <Typography variant="body2" color="text.secondary" mb={2}>
                {achievement.description}
              </Typography>
              
              <Chip
                label={achievement.earned ? 'Получено' : 'Не получено'}
                size="small"
                color={achievement.earned ? 'success' : 'default'}
                variant={achievement.earned ? 'filled' : 'outlined'}
              />
            </AchievementCard>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 6 }} />
      
      <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3 }}>
        Статистика
      </Typography>
  
      <Grid container spacing={2}>
        {/* @ts-expect-error */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h4" color="primary">{!competition() ? "0" : "1"}</Typography>
            <Typography>Завершенных уроков</Typography>
          </Paper>
        </Grid>
        {/* @ts-expect-error */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h4" color="success">{!competition() ? "0" : "5"}</Typography>
            <Typography>Подряд верных ответов</Typography>
          </Paper>
        </Grid>
        {/* @ts-expect-error */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h4" color="warning">{!competition() ? "Нет данных" : "100%"}</Typography>
            <Typography>Средняя точность</Typography>
          </Paper>
        </Grid>
        {/* @ts-expect-error */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h4" color="secondary">{!competition() ? "0" : "2"}</Typography>
            <Typography>Полученных достижения</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;