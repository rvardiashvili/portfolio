import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

// Set favicon dynamically to the profile picture
const link = document.createElement('link');
link.rel = 'icon';
link.href = '/media/pfp.png'; // Note: In Vite, public assets are at root
document.head.appendChild(link);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/portfolio">
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
