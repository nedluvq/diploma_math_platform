import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../router/routes';
import {
  Box,
  Typography,
  Paper,
  Container,
  Button,
  TextField,
  Grid,
  Divider,
  Alert,
  AlertTitle,
  Collapse,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Chip,
  Slide,
  Fade
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import {
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  ExpandMore as ExpandMoreIcon,
  School as SchoolIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';

const ClassPerformanceAnalysis: React.FC = () => {
  const [isSolved, setIsSolved] = useState(false);
  const data = [
    { name: 'Алексей', excellentGrades: 7 },
    { name: 'Мария', excellentGrades: 9 },
    { name: 'Иван', excellentGrades: 5 },
    { name: 'Елена', excellentGrades: 8 },
    { name: 'Дмитрий', excellentGrades: 4 },
  ];

  const minPerformanceStudent = data.reduce((min, current) => 
    current.excellentGrades < min.excellentGrades ? current : min
  );

  const [studentName, setStudentName] = useState('');
  const [gradeCount, setGradeCount] = useState<number | ''>('');
  const [result, setResult] = useState<{correct: boolean; message: string} | null>(null);

  const handleCheckAnswer = () => {
    const isCorrect = studentName === minPerformanceStudent.name && 
                     gradeCount === minPerformanceStudent.excellentGrades;
    
    setResult({
      correct: isCorrect,
      message: isCorrect 
        ? 'Правильно! Молодец!' 
        : 'Неправильно. Попробуйте еще раз.'
    });

    if (isCorrect && !isSolved) {
      setIsSolved(true);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <SchoolIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
          <Typography variant="h4" component="h1" color="primary">
            Анализ успеваемости класса
          </Typography>
        </Box>

        <Typography variant="body1" paragraph>
          В вашем классе есть 5 человек. За четверть они написали 10 контрольных по математике.
        </Typography>
        <Typography variant="body1" paragraph sx={{ mb: 4 }}>
          Диаграмма отражает количество оценок "Отлично" у каждого ученика.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ height: 400, mb: 4 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#555' }} 
              />
              <YAxis 
                domain={[0, 10]}
                tick={{ fill: '#555' }}
                label={{ 
                  value: 'Количество "Отлично"', 
                  angle: -90, 
                  position: 'insideLeft',
                  fill: '#555'
                }} 
              />
              <Tooltip 
                contentStyle={{
                  borderRadius: 8,
                  boxShadow: '0 3px 10px rgba(0,0,0,0.2)'
                }}
              />
              <Bar 
                dataKey="excellentGrades" 
                fill="#8884d8" 
                name="Оценок 'Отлично'"
                radius={[4, 4, 0, 0]}
                label={{ 
                  position: 'top', 
                  fill: '#555' 
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>

        <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
            Вопрос:
          </Typography>
          <Typography paragraph sx={{ mb: 3 }}>
            Напишите имя ученика с минимальным количеством оценок "Отлично" и количество оценок:
          </Typography>

          <Grid container spacing={3} justifyContent="center">
              <TextField
                fullWidth
                label="Имя ученика"
                variant="outlined"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
              />
              <TextField
                fullWidth
                label="Количество оценок"
                type="number"
                variant="outlined"
                inputProps={{ min: 0, max: 10 }}
                value={gradeCount}
                onChange={(e) => setGradeCount(e.target.value === '' ? '' : parseInt(e.target.value))}
              />
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleCheckAnswer}
                sx={{ px: 4, py: 1.5, borderRadius: 2 }}
              >
                Проверить ответ
              </Button>
            </Grid>
        </Paper>

        <Collapse in={!!result}>
          {result && (
            <Alert
              severity={result.correct ? 'success' : 'error'}
              sx={{ mb: 3 }}
              icon={result.correct ? <CheckCircleIcon fontSize="inherit" /> : <ErrorIcon fontSize="inherit" />}
            >
              <AlertTitle>{result.correct ? 'Правильно!' : 'Ошибка'}</AlertTitle>
              {result.message}
              {result.correct && (
                <Box sx={{ mt: 1 }}>
                  <Chip
                    avatar={<Avatar>{minPerformanceStudent.excellentGrades}</Avatar>}
                    label={`${minPerformanceStudent.name} - наименьшее количество оценок "Отлично"`}
                    variant="outlined"
                    color="success"
                  />
                </Box>
              )}
            </Alert>
          )}
        </Collapse>

        <Accordion elevation={2} sx={{ mt: 3, borderRadius: 3, overflow: 'hidden' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Подсказка</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Найдите самый низкий столбец на диаграмме. Обратите внимание, что ось Y показывает количество оценок "Отлично".
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Fade in={isSolved}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button
              component={Link}
              to={routes.Task.replace(':id', '3')}
              variant="contained"
              color="success"
              size="large"
              endIcon={<ArrowForwardIcon />}
              sx={{ borderRadius: 2, px: 4, py: 1.5 }}
            >
              Следующее задание
            </Button>
          </Box>
        </Fade>
      </Paper>
    </Container>
  );
};

export default ClassPerformanceAnalysis;