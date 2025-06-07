export const markTaskCompleted = (taskId: number) => {
    const completedTasks = JSON.parse(localStorage.getItem('completedTasks') || '[]');
    if (!completedTasks.includes(taskId)) {
      localStorage.setItem(
        'completedTasks', 
        JSON.stringify([...completedTasks, taskId])
      );
      return true;
    }
    return false;
  };
  
  export const isTaskCompleted = (taskId: number) => {
    const completedTasks = JSON.parse(localStorage.getItem('completedTasks') || '[]');
    return completedTasks.includes(taskId);
  };