/**
 * Legal Commons Showcase
 * Marketing and demo site
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

const App = () => {
  return (
    <div>
      <h1>Legal Commons Showcase</h1>
      <p>Coming soon...</p>
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
