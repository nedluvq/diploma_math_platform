import React, { useState } from 'react';
import { Link } from 'react-router';
import { routes } from '../../router/routes';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Avatar,
  Card,
  CardContent,
  Divider,
  Alert,
  Slide,
  Zoom
} from '@mui/material';
import { styled } from '@mui/material/styles';

const AppleAvatar = styled(Avatar)(({ theme }) => ({
  width: 60,
  height: 60,
  margin: theme.spacing(1),
  cursor: 'grab',
  transition: theme.transitions.create(['transform', 'box-shadow'], {
    duration: theme.transitions.duration.short,
  }),
  '&:hover': {
    transform: 'scale(1.1)',
    boxShadow: theme.shadows[4],
  },
  '&:active': {
    cursor: 'grabbing',
  },
}));

const BasketCard = styled(Card)(({ theme }) => ({
  width: 200,
  height: 170,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2),
  position: 'relative',
  background: `url('https://cdn-icons-png.flaticon.com/512/3082/3082385.png') center bottom no-repeat`,
  backgroundSize: '80%',
  backgroundColor: theme.palette.background.paper,
  transition: theme.transitions.create(['transform', 'box-shadow'], {
    duration: theme.transitions.duration.short,
  }),
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[6],
  },
}));

const BasketContent = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  flexGrow: 1,
  width: '100%',
  padding: 0,
});

const BasketApple = styled(Avatar)(({ theme }) => ({
  width: 45,
  height: 45,
  margin: theme.spacing(0.5),
}));

const AppleDivisionGame: React.FC = () => {
  const [basket1, setBasket1] = useState<string[]>([]);
  const [basket2, setBasket2] = useState<string[]>([]);
  const [sourceApples, setSourceApples] = useState<string[]>(
    Array(8).fill('').map((_, i) => `apple-${i}`)
  );
  const [message, setMessage] = useState<string>('Перетяните по 4 яблока в каждую корзину');
  const [isComplete, setIsComplete] = useState(false);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, appleId: string) => {
    e.dataTransfer.setData('appleId', appleId);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, basketNumber: number) => {
    e.preventDefault();
    const appleId = e.dataTransfer.getData('appleId');

    if (basketNumber === 1 && basket1.length >= 4) return;
    if (basketNumber === 2 && basket2.length >= 4) return;

    setSourceApples(sourceApples.filter(id => id !== appleId));

    if (basketNumber === 1) {
      setBasket1([...basket1, appleId]);
    } else {
      setBasket2([...basket2, appleId]);
    }

    const newBasket1 = basketNumber === 1 ? [...basket1, appleId] : basket1;
    const newBasket2 = basketNumber === 2 ? [...basket2, appleId] : basket2;
    
    if (newBasket1.length === 4 && newBasket2.length === 4) {
      setMessage('Отлично! Вы правильно разделили яблоки!');
      setIsComplete(true);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <Box
      sx={{
        maxWidth: 800,
        margin: '0 auto',
        p: 4,
        textAlign: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 4,
        boxShadow: 3,
      }}
    >
      <Typography variant="h4" component="h2" gutterBottom color="primary">
        Разделение яблок
      </Typography>
      
      <Typography variant="body1" paragraph sx={{ mb: 3 }}>
        Мама купила 8 яблок. Она сказала, что вы можете взять 4 яблока себе. 
        Необходимо разделить 8 яблок пополам в две корзины.
      </Typography>

      <Slide direction="down" in mountOnEnter unmountOnExit>
        <Alert 
          severity={isComplete ? "success" : "info"} 
          sx={{ mb: 4 }}
        >
          {message}
        </Alert>
      </Slide>

      <Paper
        variant="outlined"
        sx={{
          p: 3,
          mb: 4,
          borderStyle: 'dashed',
          borderColor: 'secondary.main',
          backgroundColor: 'background.paper',
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 10px 10px',
        }}
      >
        <Grid container justifyContent="center">
          {sourceApples.map(appleId => (
            <Zoom in key={appleId}>
              <AppleAvatar
                draggable
                onDragStart={(e) => handleDragStart(e, appleId)}
                src="https://cdn-icons-png.flaticon.com/512/415/415733.png"
                alt="Apple"
              />
            </Zoom>
          ))}
        </Grid>
      </Paper>

      <Grid container spacing={4} justifyContent="center">
          <BasketCard
            onDrop={(e) => handleDrop(e, 1)}
            onDragOver={handleDragOver}
            sx={{ border: '2px solid', borderColor: 'success.main' }}
          >
            <BasketContent>
              <Box sx={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 120,
                width: '100%',
              }}>
                {basket1.map(appleId => (
                  <BasketApple 
                    key={appleId}
                    src="https://cdn-icons-png.flaticon.com/512/415/415733.png"
                    alt="Apple in basket"
                  />
                ))}
              </Box>
            </BasketContent>
            <Divider sx={{ width: '100%', my: 1 }} />
            <Typography variant="subtitle1">
              Корзина 1: {basket1.length}/4
            </Typography>
          </BasketCard>

          <BasketCard
            onDrop={(e) => handleDrop(e, 2)}
            onDragOver={handleDragOver}
            sx={{ border: '2px solid', borderColor: 'info.main' }}
          >
            <BasketContent>
              <Box sx={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 120,
                width: '100%',
              }}>
                {basket2.map(appleId => (
                  <BasketApple 
                    key={appleId}
                    src="https://cdn-icons-png.flaticon.com/512/415/415733.png"
                    alt="Apple in basket"
                  />
                ))}
              </Box>
            </BasketContent>
            <Divider sx={{ width: '100%', my: 1 }} />
            <Typography variant="subtitle1">
              Корзина 2: {basket2.length}/4
            </Typography>
          </BasketCard>
      </Grid>

      {isComplete && (
        <Zoom in>
          <Button
            component={Link}
            to={routes.Task.replace(':id', '5')}
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
            Следующее задание
          </Button>
        </Zoom>
      )}
    </Box>
  );
};

export default AppleDivisionGame;