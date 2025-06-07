import React, { useState } from 'react';
import { routes } from '../../router/routes';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Container,
  Button,
  Avatar,
  Chip,
  Divider,
  Alert,
  AlertTitle,
  Slide,
  Zoom,
  Fade,
  styled
} from '@mui/material';
import {
  Square as SquareIcon,
  Circle as CircleIcon,
  ChangeHistory as TriangleIcon,
  Check as CheckIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';

interface Shape {
  id: number;
  type: 'square' | 'circle' | 'triangle';
  size: number;
  color: string;
}

const ShapeContainer = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: theme.transitions.create(['transform', 'opacity'], {
    duration: theme.transitions.duration.short,
  }),
  '&:hover': {
    transform: 'scale(1.05)',
  },
  position: 'relative',
  overflow: 'hidden',
}));

const TowerBuildingGame: React.FC = () => {
  const allShapes: Shape[] = [
    { id: 1, type: 'square', size: 60, color: '#FF6B6B' },
    { id: 2, type: 'circle', size: 60, color: '#4ECDC4' },
    { id: 3, type: 'square', size: 60, color: '#45B7D1' },
    { id: 4, type: 'triangle', size: 60, color: '#FFBE0B' },
    { id: 5, type: 'square', size: 60, color: '#FB5607' },
    { id: 6, type: 'circle', size: 60, color: '#8338EC' },
  ];

  const [selectedShapes, setSelectedShapes] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleShapeClick = (shape: Shape) => {
    setError(null);
    
    if (shape.type === 'square') {
      if (!selectedShapes.includes(shape.id)) {
        const newSelected = [...selectedShapes, shape.id];
        setSelectedShapes(newSelected);
        
        const allSquares = allShapes.filter(s => s.type === 'square');
        if (newSelected.length === allSquares.length) {
          setSuccess(true);
        }
      }
    } else {
      setError(`Ошибка! ${getShapeName(shape.type)} не подходит для башни. Выбирайте только квадраты.`);
    }
  };

  const getShapeName = (type: string) => {
    switch (type) {
      case 'square': return 'Квадрат';
      case 'circle': return 'Круг';
      case 'triangle': return 'Треугольник';
      default: return 'Фигура';
    }
  };

  const renderShapeIcon = (type: string, color: string, size: number) => {
    const iconStyle = { color, fontSize: size * 0.6 };
    switch (type) {
      case 'square': return <SquareIcon style={iconStyle} />;
      case 'circle': return <CircleIcon style={iconStyle} />;
      case 'triangle': return <TriangleIcon style={iconStyle} />;
      default: return <SquareIcon style={iconStyle} />;
    }
  };

  const squareCount = allShapes.filter(s => s.type === 'square').length;
  const allSquaresSelected = selectedShapes.length === squareCount;

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
          Построй башню из квадратов
        </Typography>
        
        <Typography variant="body1" paragraph align="center" sx={{ mb: 3 }}>
          Васе нужно собрать башню из фигурок. Для башни подойдут только фигуры квадратной формы.
        </Typography>
        
        <Divider sx={{ my: 3 }} />

        <Grid container spacing={3} justifyContent="center" sx={{ mb: 4 }}>
          {allShapes.map(shape => (
              <Zoom in={true}>
                <ShapeContainer
                  elevation={selectedShapes.includes(shape.id) ? 6 : 3}
                  sx={{
                    width: shape.size * 1.5,
                    height: shape.size * 1.5,
                    bgcolor: selectedShapes.includes(shape.id) ? 'action.selected' : 'background.paper',
                    transform: selectedShapes.includes(shape.id) ? 'scale(1.1)' : 'scale(1)',
                    border: selectedShapes.includes(shape.id) ? `2px dashed ${shape.color}` : 'none',
                  }}
                  onClick={() => handleShapeClick(shape)}
                >
                  {renderShapeIcon(shape.type, shape.color, shape.size)}
                  
                  {selectedShapes.includes(shape.id) && (
                    <Fade in={true}>
                      <Avatar
                        sx={{
                          position: 'absolute',
                          top: 4,
                          right: 4,
                          width: 24,
                          height: 24,
                          bgcolor: 'success.main',
                        }}
                      >
                        <CheckIcon fontSize="small" />
                      </Avatar>
                    </Fade>
                  )}
                </ShapeContainer>
              </Zoom>
          ))}
        </Grid>

        <Box sx={{ minHeight: 80 }}>
          {error && (
            <Slide direction="down" in={!!error} mountOnEnter unmountOnExit>
              <Alert severity="error" sx={{ mb: 3 }}>
                <AlertTitle>Ошибка выбора</AlertTitle>
                {error}
              </Alert>
            </Slide>
          )}

          {success && (
            <Slide direction="down" in={success} mountOnEnter unmountOnExit>
              <Alert severity="success" sx={{ mb: 3 }}>
                <AlertTitle>Успех!</AlertTitle>
                Отлично! Вы выбрали все квадратные фигуры. Башня построена!
              </Alert>
            </Slide>
          )}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
          <Chip
            label={`Выбрано: ${selectedShapes.length} из ${squareCount}`}
            color={allSquaresSelected ? 'success' : 'default'}
            variant="outlined"
            sx={{ fontSize: '1rem', p: 2 }}
          />
        </Box>

        {allSquaresSelected && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button
              component={Link}
              to={routes.Task.replace(':id', '4')}
              variant="contained"
              color="success"
              size="large"
              endIcon={<ArrowForwardIcon />}
              sx={{ borderRadius: 2, px: 4, py: 1.5 }}
            >
              Следующее задание
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default TowerBuildingGame;