import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/router'
import 'virtual:uno.css'
import './global.scss'

const div = document.getElementById('root')
const root = ReactDOM.createRoot(div as HTMLElement)
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
