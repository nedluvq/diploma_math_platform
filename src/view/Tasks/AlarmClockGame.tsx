import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Slider,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
  Zoom,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ExperienceNotification } from '../../components/ExperienceNotification';
import { markTaskCompleted } from '../../helpers/TaskService';
import { addExperience } from '../../helpers/experienceService';
import { ExperienceBarContext } from '../../context/ExperienceBarContext';

const AlarmClockGame: React.FC = () => {
  const { updateProgress } = useContext(ExperienceBarContext);
  const [hourAngle, setHourAngle] = useState<number>(0);
  const [minuteAngle, setMinuteAngle] = useState<number>(0);
  const [result, setResult] = useState<string>('');

  const [isSolved, setIsSolved] = useState(false);
  const [showExpNotification, setShowExpNotification] = useState(false);
//@ts-ignore
  const handleHourChange = (e: Event, newValue: number | number[]) => {
    setHourAngle(newValue as number);
    setResult('');
  };
//@ts-ignore
  const handleMinuteChange = (e: Event, newValue: number | number[]) => {
    setMinuteAngle(newValue as number);
    setResult('');
  };

  const checkTime = () => {
    const correctHourAngle = 225;
    const correctMinuteAngle = 180;
    let isCorrect = false;

    const hourDiff = Math.abs(hourAngle - correctHourAngle);
    const minuteDiff = Math.abs(minuteAngle - correctMinuteAngle);

    if (hourDiff <= 15 && minuteDiff <= 15) {
      setResult('Правильно! Будильник установлен на 7:30');
      isCorrect = true;
    } else {
      setResult('Неправильно. Попробуйте еще раз!');
      isCorrect = false;
    }

    if (isCorrect && !isSolved) {
      const wasJustCompleted = markTaskCompleted(1);
      if (wasJustCompleted) {
        const newProgress = addExperience(120);
        updateProgress(newProgress);
        setShowExpNotification(true);
      }
      setIsSolved(true);
    }
  };

  const getHandPosition = (angle: number, length: number) => {
    const rad = (angle - 90) * (Math.PI / 180);
    return {
      x: 100 + length * Math.cos(rad),
      y: 100 + length * Math.sin(rad)
    };
  };

  const hourHand = getHandPosition(hourAngle, 40);
  const minuteHand = getHandPosition(minuteAngle, 60);

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
            Установка будильника
          </Typography>
          
          <Typography variant="body1" paragraph align="center">
            Вам нужно выйти в школу в 8:30. Поставьте будильник на 7:30.
          </Typography>
          <Typography variant="body1" paragraph align="center">
            Переместите стрелки часов, чтобы установить время 7:30.
          </Typography>

          <Box sx={{ 
            position: 'relative', 
            margin: '40px auto', 
            width: 200, 
            height: 200,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <svg width="200" height="200" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="95" fill="#f5f5f5" stroke="#333" strokeWidth="2" />
              
              {Array.from({ length: 12 }).map((_, i) => {
                const angle = i * 30;
                const pos = getHandPosition(angle, 85);
                return (
                  <text 
                    key={i} 
                    x={pos.x} 
                    y={pos.y} 
                    textAnchor="middle" 
                    dominantBaseline="middle"
                    fontSize="12"
                    fontWeight="bold"
                  >
                    {i === 0 ? 12 : i}
                  </text>
                );
              })}
              
              <line 
                x1="100" y1="100" 
                x2={hourHand.x} y2={hourHand.y} 
                stroke="#333" strokeWidth="4" strokeLinecap="round" 
              />
              
              <line 
                x1="100" y1="100" 
                x2={minuteHand.x} y2={minuteHand.y} 
                stroke="#333" strokeWidth="2" strokeLinecap="round" 
              />
              
              <circle cx="100" cy="100" r="4" fill="#333" />
            </svg>
          </Box>

          <Grid container spacing={3} sx={{ mb: 3 }}>
              <Typography gutterBottom>Часовая стрелка</Typography>
              <Slider
                value={hourAngle}
                onChange={handleHourChange}
                min={0}
                max={360}
              />
              <Typography gutterBottom>Минутная стрелка</Typography>
              <Slider
                value={minuteAngle}
                onChange={handleMinuteChange}
                min={0}
                max={360}
              />
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <Button 
              variant="contained" 
              size="large" 
              onClick={checkTime}
              sx={{ px: 4 }}
            >
              Проверить
            </Button>
          </Box>

          {result && (
            <Alert 
              severity={result.includes('Правильно') ? 'success' : 'error'}
              sx={{ mb: 3 }}
            >
              {result}
            </Alert>
          )}

          <Accordion sx={{ mb: 3 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight="bold">Подсказка</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography paragraph>• Часовая стрелка должна указывать на 7</Typography>
              <Typography paragraph>• Минутная стрелка должна указывать на 6 (30 минут)</Typography>
              <Typography>• Помните, что часовая стрелка смещается по мере движения минутной стрелки</Typography>
            </AccordionDetails>
          </Accordion>

          {showExpNotification && <ExperienceNotification amount={120} />}
          
          {isSolved && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Zoom in>

              <Button
                          component={Link}
                          to="/final"
                          variant="contained"
                          color="success"
                          size="large"
                          sx={{ 
                            mt: 4, 
                            px: 4, 
                            py: 1.5, 
                            borderRadius: 4,
                            fontWeight: 'bold',
                          }}
                        >
                          Завершить урок
                        </Button>
              </Zoom>
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default AlarmClockGame;