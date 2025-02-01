import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './components/theme-provider.tsx'
import ThemeSwitcher from './components/ui/theme-switcher.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme='dark' storageKey='bgenie-theme'>
      <App />
      <ThemeSwitcher />
    </ThemeProvider>
  </StrictMode>,
)
