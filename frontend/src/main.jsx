import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Rotas from './pages/routes.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Rotas />
  </StrictMode>,
)
