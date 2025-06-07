const EXPERIENCE_PER_LEVEL = 100;

export const getCurrentLevel = (): { level: number; exp: number } => {
  try {
    const savedData = localStorage.getItem('userProgress');
    
    if (savedData) {
      const { level, exp } = JSON.parse(savedData);
      return { 
        level: Number(level) || 1,
        exp: Number(exp) || 0
      };
    }
    return { level: 1, exp: 0 };
    
  } catch (error) {
    console.error('Ошибка при чтении прогресса:', error);
    return { level: 1, exp: 0 };
  }
};

export const saveProgress = (level: number, exp: number) => {
  localStorage.setItem('userProgress', JSON.stringify({ level, exp }));
};

export const addExperience = (amount: number) => {
  const current = getCurrentLevel();
  let newExp = current.exp + amount;
  let newLevel = current.level;
  
  while (newExp >= EXPERIENCE_PER_LEVEL) {
    newExp -= EXPERIENCE_PER_LEVEL;
    newLevel += 1;
  }
  
  saveProgress(newLevel, newExp);
  return { level: newLevel, exp: newExp };
};

export const resetProgress = () => {
  localStorage.removeItem('userProgress');
  localStorage.removeItem('completedTasks');
  localStorage.removeItem('achievements');
  return { level: 1, exp: 0 };
};

const EXPERIENCE_PER_TASK = 120;
export const completeTask = (taskId: number) => {
  const completedTasks = JSON.parse(localStorage.getItem('completedTasks') || '[]');
  if (!completedTasks.includes(taskId)) {
    completedTasks.push(taskId);
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
    return addExperience(EXPERIENCE_PER_TASK);
  }
  return getCurrentLevel();
};