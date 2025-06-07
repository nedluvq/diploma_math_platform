import React from 'react';
import { 
  Container,
  Grid,
  Typography,
  Paper,
  Button,
  Avatar,
  useTheme,
  useMediaQuery,
  Zoom,
  Fade,
  Slide,
  Box
} from '@mui/material';
import { 
  School as SchoolIcon,
  ArrowForward as ArrowForwardIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import { Link } from 'react-router';
import { getCurrentLevel } from '../helpers/experienceService';

interface LessonCardProps {
  name: string;
  image: string;
  isCurrent?: boolean;
  completed?: boolean;
}

const LessonCard: React.FC<LessonCardProps> = ({ name, image, isCurrent = false, completed = false }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Zoom in={true} style={{ transitionDelay: '100ms' }}>
      <Paper
        elevation={isCurrent ? 6 : 3}
        sx={{
          p: 3,
          borderRadius: 4,
          border: isCurrent ? `2px solid ${theme.palette.primary.main}` : 'none',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: 8
          },
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          width: '100%',
        }}
      >
        {completed && (
          <CheckCircleIcon 
            color="success" 
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              fontSize: 32
            }} 
          />
        )}
        <Grid container spacing={2} alignItems="center">
            <Avatar
              src={image}
              alt={name}
              sx={{ 
                width: isMobile ? 80 : 120, 
                height: isMobile ? 80 : 120,
                mx: 'auto'
              }}
              variant="rounded"
            />
            <Typography variant="h6" component="h3" gutterBottom>
              {name}
            </Typography>
            <Button
              variant={isCurrent ? "contained" : "outlined"}
              size="small"
              endIcon={<ArrowForwardIcon />}
              fullWidth={isMobile}
              sx={{
                borderRadius: 4,
                textTransform: 'none'
              }}
            >
              <Link to="/task/1" style={{ textDecoration: 'none', color: isCurrent ? '#fff' : theme.palette.primary.main }}>
                {isCurrent ? "Продолжить" : "Посмотреть"} </Link>
            </Button>
          </Grid>
      </Paper>
    </Zoom>
  );
};

const MainPage: React.FC = () => {
    const competition = () => {
        const level = getCurrentLevel();
        if ( level.exp != 0) {
            return true
        } else {
            return false
        }
    }
  const lessons = [
    { name: "Урок №1. Введение", image: "https://cdn-icons-png.flaticon.com/512/3875/3875120.png", isCurrent: !competition(), completed: competition() },
    { name: "Урок №2. Основные понятия", image: "https://cdn-icons-png.flaticon.com/512/3972/3972679.png", isCurrent: competition(), completed: false },
    { name: "Урок №3. Продвинутые техники", image: "https://cdn-icons-png.flaticon.com/512/7490/7490986.png" },
    { name: "Урок №4. Практика", image: "https://cdn-icons-png.flaticon.com/512/3362/3362115.png" },
    { name: "Урок №5. Итоговый тест", image: "https://cdn-icons-png.flaticon.com/512/4345/4345398.png" }
  ];

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Fade in={true} timeout={500}>
        <Box textAlign="center" mb={6}>
          <SchoolIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
            Мои уроки
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Продолжайте обучение с того места, где остановились
          </Typography>
        </Box>
      </Fade>

      <Slide in={true} direction="up" timeout={800}>
        <Grid container spacing={4}>
          {lessons.map((lesson) => (
              <LessonCard 
                name={lesson.name} 
                image={lesson.image} 
                isCurrent={lesson.isCurrent} 
                completed={lesson.completed} 
              />
          ))}
        </Grid>
      </Slide>
    </Container>
  );
};

export default MainPage;