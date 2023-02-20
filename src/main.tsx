import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ErrorPage } from './components/ErrorPage'
const router = createBrowserRouter([
  {
    path: '/',
    element: <div>root</div>,
    errorElement: <ErrorPage/>,
  },
  {
    path: '/1',
    element: <div>11</div>,
  },
])
const div = document.getElementById('root')
const root = ReactDOM.createRoot(div as HTMLElement)
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
