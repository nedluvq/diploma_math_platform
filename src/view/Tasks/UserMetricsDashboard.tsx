import React from 'react';
import {
  Box,
  Typography,
  Card,
  Grid,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Button,
  Chip,
  Divider,
  LinearProgress,
  Tooltip
} from '@mui/material';
import {
  AccessTime,
  CheckCircle,
  ErrorOutline,
  HelpOutline,
  CalendarToday,
  Schedule,
  TrendingUp
} from '@mui/icons-material';
import {
  LineChart,
  BarChart,
  PieChart,
  Line,
  Bar,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';

// 1. Mock данные для времени на платформе
const platformTimeData = [
  { day: 'Пн', minutes: 45 },
  { day: 'Вт', minutes: 90 },
  { day: 'Ср', minutes: 120 },
  { day: 'Чт', minutes: 60 },
  { day: 'Пт', minutes: 180 },
  { day: 'Сб', minutes: 30 },
  { day: 'Вс', minutes: 90 }
];

// 2. Mock данные для успеваемости
const performanceData = [
  { userId: 1, accuracy: 82, attempts: 1.8, timePerLesson: 12.5 },
  { userId: 2, accuracy: 65, attempts: 2.4, timePerLesson: 18.2 },
  { userId: 3, accuracy: 91, attempts: 1.2, timePerLesson: 8.5 },
  { userId: 4, accuracy: 73, attempts: 2.1, timePerLesson: 15.0 },
  { userId: 5, accuracy: 88, attempts: 1.5, timePerLesson: 10.8 },
  { userId: 6, accuracy: 79, attempts: 1.9, timePerLesson: 14.3 },
  { userId: 7, accuracy: 85, attempts: 1.7, timePerLesson: 11.2 },
  { userId: 8, accuracy: 70, attempts: 2.3, timePerLesson: 16.7 },
  { userId: 9, accuracy: 94, attempts: 1.1, timePerLesson: 7.5 },
  { userId: 10, accuracy: 81, attempts: 1.8, timePerLesson: 12.0 }
];

// 3. Mock данные для использования подсказок
const hintsData = [
  { subject: 'Урок 1', withHints: 35, withoutHints: 65 },
  { subject: 'Урок 2', withHints: 45, withoutHints: 55 },
  { subject: 'Урок 3', withHints: 28, withoutHints: 72 },
  { subject: 'Урок 4', withHints: 15, withoutHints: 85 }
];

// 4. Mock данные для типовых ошибок
const commonMistakes = [
  { topic: 'Сложение', count: 23, percentage: 32 },
  { topic: 'Вычитание', count: 18, percentage: 25 },
  { topic: 'Фигуры', count: 15, percentage: 21 },
  { topic: 'Геометрия', count: 8, percentage: 11 },
  { topic: 'Логические задачи', count: 7, percentage: 10 }
];

// 5. Mock данные для частоты посещения
const activityData = Array.from({ length: 365 }, (_, i) => ({
  date: new Date(2023, 0, i + 1),
  count: Math.floor(Math.random() * 5)
}));

// 6. Mock данные для средней сессии
const sessionData = [
  { name: 'Короткие (<15 мин)', value: 35 },
  { name: 'Стандартные', value: 45 },
  { name: 'Длинные (>45 мин)', value: 20 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const CircularProgressWithLabel = ({ value, size = 100 }) => {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex', mb: 1 }}>
      <Box sx={{
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        backgroundColor: 'rgba(0, 0, 0, 0.02)'
      }}>
        <Typography variant="h5">{`${Math.round(value)}%`}</Typography>
      </Box>
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
      </Box>
    </Box>
  );
};

const UserMetricsDashboard = () => {
  // Расчет средних значений по всем пользователям
  const avgAccuracy = performanceData.reduce((acc, curr) => acc + curr.accuracy, 0) / performanceData.length;
  const avgAttempts = performanceData.reduce((acc, curr) => acc + curr.attempts, 0) / performanceData.length;
  const avgTimePerLesson = performanceData.reduce((acc, curr) => acc + curr.timePerLesson, 0) / performanceData.length;

  return (
    <Box sx={{ p: 3 }}>
      <Card sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          <AccessTime sx={{ verticalAlign: 'middle', mr: 1 }} />
          Общее время обучения
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box sx={{ mr: 3 }}>
            <Typography variant="h3">42 ч 15 мин</Typography>
            <Typography color="text.secondary">+3ч 40м за неделю</Typography>
          </Box>
          <TrendingUp color="success" sx={{ fontSize: 40 }} />
        </Box>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={platformTimeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis label={{ value: 'Минут', angle: -90, position: 'insideLeft' }} />
            <RechartsTooltip />
            <Line type="monotone" dataKey="minutes" stroke="#8884d8" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2 }}>
        Статистика успеваемости (10 пользователей)
      </Typography>
      <Grid container spacing={3}>
          <Card sx={{ p: 2, height: '100%' }}>
            <Typography variant="subtitle1" gutterBottom>
              <CheckCircle color="success" sx={{ verticalAlign: 'middle', mr: 1 }} />
              Средняя точность ответов
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgressWithLabel value={avgAccuracy} />
            </Box>
            <Typography variant="body2" color="text.secondary" align="center">
              Лучший результат: {Math.max(...performanceData.map(p => p.accuracy))}%
            </Typography>
          </Card>

          <Card sx={{ p: 2, height: '100%' }}>
            <Typography variant="subtitle1" gutterBottom>
              <HelpOutline color="info" sx={{ verticalAlign: 'middle', mr: 1 }} />
              Средние попытки на задание
            </Typography>
            <Typography variant="h4" align="center" gutterBottom>
              {avgAttempts.toFixed(1)}
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={Math.min(100, avgAttempts * 50)} 
              sx={{ height: 10, mb: 1 }}
            />
            <Typography variant="body2" color="text.secondary">
              Оптимальный диапазон: 1.5-2.0
            </Typography>
          </Card>

          <Card sx={{ p: 2, height: '100%' }}>
            <Typography variant="subtitle1" gutterBottom>
              <Schedule color="warning" sx={{ verticalAlign: 'middle', mr: 1 }} />
              Среднее время на урок
            </Typography>
            <Typography variant="h4" align="center" gutterBottom>
              {avgTimePerLesson.toFixed(1)} мин
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">
                Мин: {Math.min(...performanceData.map(p => p.timePerLesson))} мин
              </Typography>
              <Typography variant="caption">
                Макс: {Math.max(...performanceData.map(p => p.timePerLesson))} мин
              </Typography>
            </Box>
          </Card>
        </Grid>

      <Card sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Использование подсказок
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={hintsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="subject" />
            <YAxis />
            <RechartsTooltip />
            <Legend />
            <Bar dataKey="withHints" name="С подсказками" fill="#ff6b6b" />
            <Bar dataKey="withoutHints" name="Без подсказок" fill="#51cf66" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          <ErrorOutline color="error" sx={{ verticalAlign: 'middle', mr: 1 }} />
          Частые ошибки
        </Typography>
        <List>
          {commonMistakes.map((mistake, index) => (
            <ListItem key={index} sx={{ py: 1 }}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: 'error.light' }}>
                  <ErrorOutline color="error" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={mistake.topic}
                secondary={`${mistake.count} раз(а) - ${mistake.percentage}%`}
              />
              <Button size="small" variant="outlined">Повторить</Button>
            </ListItem>
          ))}
        </List>
      </Card>

      <Card sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          <CalendarToday sx={{ verticalAlign: 'middle', mr: 1 }} />
          Активность пользователей
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Календарь активности за последний год (10 пользователей)
        </Typography>
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(14px, 1fr))',
          gap: 1,
          mt: 2
        }}>
          {activityData.map((day, i) => (
            <Tooltip 
              key={i} 
              title={`${day.date.toLocaleDateString()}: ${day.count} активностей`}
            >
              <Box sx={{
                width: 14,
                height: 14,
                bgcolor: day.count > 0 ? 
                  `rgba(37, 99, 235, ${Math.min(1, day.count/5)})` : '#eee',
                borderRadius: '2px'
              }} />
            </Tooltip>
          ))}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Typography variant="body2">
            <strong>5.2</strong> дней/неделю (в среднем)
          </Typography>
          <Chip label="Самая активная среда" size="small" />
        </Box>
      </Card>
      <Card sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Продолжительность сессий
        </Typography>
        <Grid container spacing={2}>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sessionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {sessionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            </Box>

            <Box sx={{ p: 2 }}>
              <Typography variant="h3" gutterBottom>24 мин</Typography>
              <Typography color="text.secondary">Средняя продолжительность</Typography>
              
              <Box sx={{ mt: 3 }}>
                {sessionData.map((entry, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Box sx={{
                      width: 12,
                      height: 12,
                      bgcolor: COLORS[index % COLORS.length],
                      mr: 1
                    }} />
                    <Typography variant="body2" sx={{ flexGrow: 1 }}>
                      {entry.name}
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {entry.value}%
                    </Typography>
                  </Box>
                ))}
              </Box>
              
              <Box sx={{ mt: 3 }}>
                <Chip label="Утро" variant="outlined" sx={{ mr: 1 }} />
                <Chip label="День" variant="outlined" sx={{ mr: 1 }} />
                <Chip label="Вечер" variant="outlined" />
              </Box>
            </Box>
          </Grid>
      </Card>
    </Box>
  );
};

export default UserMetricsDashboard;