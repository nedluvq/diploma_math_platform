import { createRoot } from 'react-dom/client'
import { AppRouter } from './router/AppRouter'
import './styles.css'
import { ExperienceBarProvider } from './context/ExperienceBarContext'

createRoot(document.getElementById('root')!).render(
        <ExperienceBarProvider>
                <AppRouter />
        </ExperienceBarProvider>
    
)
