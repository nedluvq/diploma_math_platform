import { useNavigate, useParams } from "react-router-dom";
import Task1  from "../view/Tasks/FirstTask";
import  Task2  from "../view/Tasks/ClassPerformanceAnalysis";
import  Task3  from "../view/Tasks/TowerBuildingGame";
import  Task4  from "../view/Tasks/AppleDivisionGame";
import  Task5  from "../view/Tasks/AlarmClockGame";

export const TaskWrapper = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const taskId = parseInt(id || '0');
  
    if (isNaN(taskId) || taskId < 1 || taskId > 5) {
      navigate('/');
      return null;
    }
  
    switch(taskId) {
      case 1: return <Task1 />;
      case 2: return <Task2 />;
      case 3: return <Task3 />;
      case 4: return <Task4 />;
      case 5: return <Task5 />;
      default: return null;
    }
  };