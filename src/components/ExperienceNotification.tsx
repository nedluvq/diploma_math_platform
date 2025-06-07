import { useEffect } from 'react';

export const ExperienceNotification = ({ amount }: { amount: number }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      const element = document.getElementById('exp-notification');
      if (element) {
        element.style.opacity = '0';
        setTimeout(() => element.remove(), 500);
      }
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      id="exp-notification"
      style={{
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '4px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
        zIndex: 1000,
        transition: 'opacity 0.5s',
        animation: 'slideDown 0.5s forwards'
      }}
    >
      Получено {amount} опыта!
    </div>
  );
};