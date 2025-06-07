import { availableTitles } from './titles';

const TITLE_KEY = 'selected_title';

export const getAvailableTitles = (level: number) => {
  return availableTitles.filter(title => title.levelRequired <= level);
};

export const getCurrentTitle = (level: number) => {
  const savedId = localStorage.getItem(TITLE_KEY);
  const available = getAvailableTitles(level);
  
  if (savedId) {
    const savedTitle = available.find(t => t.id === parseInt(savedId));
    if (savedTitle) return savedTitle;
  }
  
  return available[available.length - 1] || availableTitles[0];
};

export const saveSelectedTitle = (titleId: number) => {
  localStorage.setItem(TITLE_KEY, titleId.toString());
  window.dispatchEvent(new Event('titleChanged'));
};