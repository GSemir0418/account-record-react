import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
const div = document.getElementById('root')
const root = ReactDOM.createRoot(div as HTMLElement)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
