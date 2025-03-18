import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRoutes from './routes/appRoutes.tsx'
import { Toaster } from 'sonner'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster richColors position='top-center' />
    <AppRoutes />
  </StrictMode>,
)
