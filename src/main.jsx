import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRouter from './router/AppRouter.jsx'
import { AccessibilityProvider } from './context/AccessibilityProvider.jsx'





createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AccessibilityProvider>
      <AppRouter />
    </AccessibilityProvider>
  </StrictMode>,
)