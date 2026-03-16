import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

// This checks if the site is running on Vercel. 
// If it is, use "/" (root). If not, use "/germanvocabs" (GitHub).
const baseName = window.location.hostname.includes('vercel.app') 
  ? '/' 
  : '/germanvocabs';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={baseName}>
      <App />
    </BrowserRouter>
  </StrictMode>
)