import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'react-calendar/dist/Calendar.css';
import { CaloriesProvider } from './context/CaloriesContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CaloriesProvider>
      <App />
    </CaloriesProvider>
  </React.StrictMode>,
)
