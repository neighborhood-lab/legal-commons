/**
 * Legal Commons Web Application
 * React-based frontend for legal document preparation
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

const App = () => {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>Legal Commons</h1>
      <p>Democratizing access to legal services</p>
      <p style={{ color: '#666' }}>Application initializing...</p>
    </div>
  )
}

const rootElement = document.getElementById('root')
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  )
}
