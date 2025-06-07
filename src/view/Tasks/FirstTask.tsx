import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../router/routes';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Chip,
  Button,
  Container,
  Avatar,
  TableContainer,
  Divider,
  Alert,
  AlertTitle,
  styled
} from '@mui/material';
import Grid from '@mui/material/Grid';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

interface StyledTableCellProps {
  error?: boolean;
}

const StyledTableCell = styled(TableCell, {
  shouldForwardProp: (prop) => prop !== 'error'
})<StyledTableCellProps>(({ theme, error }) => ({
  border: `1px solid ${error ? theme.palette.error.main : theme.palette.divider}`,
  backgroundColor: error 
    ? theme.palette.error.light 
    : theme.palette.background.paper,
  color: error ? theme.palette.error.main : theme.palette.text.primary,
  textAlign: 'center',
  height: '50px',
  width: '80px',
  '&.success': {
    backgroundColor: theme.palette.success.light,
    color: theme.palette.success.dark,
  },
  '&.dragging': {
    opacity: 0.5,
  }
}));

const DraggableChip = styled(Chip)(({ theme }) => ({
  cursor: 'grab',
  '&:active': {
    cursor: 'grabbing',
  },
  '& .MuiChip-avatar': {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.dark,
  }
}));

const FirstTask: React.FC = () => {
  const aValues = [4, 6, 9, 13];
  const initialExtraNumbers = [31, 28, 19, 33, 36, 26, 23, 40];
  
  const [calculatedValues, setCalculatedValues] = useState<(number | null)[]>(Array(aValues.length).fill(null));
  const [availableNumbers, setAvailableNumbers] = useState<number[]>(initialExtraNumbers);
  const [draggedNumber, setDraggedNumber] = useState<number | null>(null);
  const [draggedFromIndex, setDraggedFromIndex] = useState<number | null>(null);
  const [isDraggingFromTable, setIsDraggingFromTable] = useState(false);
  const [validationErrors, setValidationErrors] = useState<boolean[]>(Array(aValues.length).fill(false));

  const validateCell = (index: number, value: number | null): boolean => {
    if (value === null) return false;
    return value === 27 + aValues[index];
  };

  const handleDragStartFromList = (num: number) => {
    setDraggedNumber(num);
    setIsDraggingFromTable(false);
  };

  const handleDragStartFromTable = (num: number, index: number) => {
    setDraggedNumber(num);
    setDraggedFromIndex(index);
    setIsDraggingFromTable(true);
  };

  const handleDropToTable = (index: number) => {
  if (draggedNumber !== null) {
    const newValues = [...calculatedValues];
  
    if (isDraggingFromTable && draggedFromIndex !== null) {
      if (newValues[index] !== null) {
        const temp = newValues[index];
        newValues[index] = newValues[draggedFromIndex];
        newValues[draggedFromIndex] = temp;
      } else {
        newValues[index] = newValues[draggedFromIndex];
        newValues[draggedFromIndex] = null;
      }
    } 
    else {
      if (newValues[index] !== null) {
        return;
      }
      newValues[index] = draggedNumber;
      setAvailableNumbers(prev => prev.filter(n => n !== draggedNumber));
    }

    setCalculatedValues(newValues);
    const isValid = validateCell(index, newValues[index]);
    const newErrors = [...validationErrors];
    newErrors[index] = !isValid;
    if (isDraggingFromTable && draggedFromIndex !== null) {
      newErrors[draggedFromIndex] = !validateCell(draggedFromIndex, newValues[draggedFromIndex]);
    }
    setValidationErrors(newErrors);
  }
};

  const handleDropToList = () => {
    if (draggedNumber !== null && isDraggingFromTable && draggedFromIndex !== null) {
      setAvailableNumbers(prev => [...prev, draggedNumber]);
      const newValues = [...calculatedValues];
      newValues[draggedFromIndex] = null;
      setCalculatedValues(newValues);
      const newErrors = [...validationErrors];
      newErrors[draggedFromIndex] = false;
      setValidationErrors(newErrors);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement | HTMLTableCellElement>) => {
    e.preventDefault();
  };

  const correctCount = calculatedValues.filter((val, i) => 
    val !== null && validateCell(i, val)
  ).length;

  const allCorrect = correctCount === aValues.length;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
          Заполните таблицу
        </Typography>
        
        <Typography variant="body1" paragraph align="center" sx={{ mb: 4 }}>
          Перетащите числа в таблицу или между ячейками. Можно вернуть числа обратно в список.
        </Typography>

        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell variant="head" sx={{ fontWeight: 'bold' }}>a</TableCell>
                {aValues.map((value, i) => (
                  <TableCell key={`a-${i}`} align="center">{value}</TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell variant="head" sx={{ fontWeight: 'bold' }}>27 + a</TableCell>
                {calculatedValues.map((value, i) => (
                  <StyledTableCell
                    key={`calc-${i}`}
                    error={validationErrors[i]}
                    className={`${validateCell(i, value) ? 'success' : ''} ${
                      isDraggingFromTable && draggedFromIndex === i ? 'dragging' : ''
                    }`}
                    onDrop={() => handleDropToTable(i)}
                    onDragOver={handleDragOver}
                    draggable={value !== null}
                    onDragStart={() => value !== null && handleDragStartFromTable(value, i)}
                  >
                    {value !== null && (
                      <>
                        {validateCell(i, value) ? (
                          <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                        ) : validationErrors[i] ? (
                          <ErrorIcon color="error" sx={{ mr: 1 }} />
                        ) : null}
                        {value}
                      </>
                    )}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Доступные числа:
        </Typography>
        
        <Grid 
          container 
          spacing={2} 
          sx={{ mb: 4, minHeight: '80px' }}
          onDrop={handleDropToList}
          onDragOver={handleDragOver}
        >
          {availableNumbers.map(num => (
            //@ts-ignore
            <Grid item key={num}>
              <DraggableChip
                avatar={<Avatar><DragHandleIcon /></Avatar>}
                label={num}
                draggable
                onDragStart={() => handleDragStartFromList(num)}
                variant="outlined"
                color="primary"
              />
            </Grid>
          ))}
        </Grid>

        <Alert 
          severity={allCorrect ? "success" : "info"} 
          sx={{ mb: 3 }}
          icon={allCorrect ? <CheckCircleIcon fontSize="inherit" /> : null}
        >
          <AlertTitle>
            {allCorrect ? "Отлично!" : "Прогресс"}
          </AlertTitle>
          Правильно заполнено: {correctCount} из {aValues.length}
        </Alert>

        {allCorrect && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Button
              component={Link}
              to={routes.Task.replace(':id', '2')}
              variant="contained"
              color="success"
              size="large"
              endIcon={<CheckCircleIcon />}
            >
              Перейти к следующему заданию
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default FirstTask;