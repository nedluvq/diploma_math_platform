import { resetProgress } from '../helpers/experienceService';

export const ResetProgress = () => {
  const handleReset = () => {
    if (window.confirm('Вы уверены, что хотите сбросить весь прогресс? Это действие нельзя отменить.')) {
      resetProgress();
      window.location.reload();
    }
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 1000
    }}>
      <button 
        onClick={handleReset}
        style={{
          padding: '8px 16px',
          backgroundColor: '#ff4444',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px'
        }}
      >
        Сбросить прогресс (админ)
      </button>
    </div>
  );
};