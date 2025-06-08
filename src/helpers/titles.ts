export type Title = {
  id: number;
  name: string;
  levelRequired: number;
  description: string;
  color: string;
};

export const availableTitles: Title[] = [
  { id: 1, name: 'Новичок', levelRequired: 1, description: 'Только начинаете свой путь', color: '#9E9E9E' },
  { id: 2, name: 'Ученик', levelRequired: 2, description: 'Осваиваете основы', color: '#4CAF50' },
  { id: 3, name: 'Опытный', levelRequired: 2, description: 'Демонстрируете уверенные навыки', color: '#2196F3' },
  { id: 4, name: 'Знаток', levelRequired: 2, description: 'Показываете глубокие знания', color: '#9C27B0' },
  { id: 5, name: 'Мастер', levelRequired: 3, description: 'В совершенстве владеете материалом', color: '#FF9800' },
  { id: 6, name: 'Гуру', levelRequired: 3, description: 'Можете учить других', color: '#F44336' },
  { id: 7, name: 'Легенда', levelRequired: 4, description: 'Достигли вершины мастерства', color: '#E91E63' },
];