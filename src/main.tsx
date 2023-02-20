import React from 'react'
import ReactDOM from 'react-dom/client'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { RedirectToWelcome1 } from './components/RedrectToWelcome1'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Outlet/>,
    errorElement: <RedirectToWelcome1/>,
    children: [
      { index: true, element: <div>空</div> },
      {
        path: 'welcome',
        element: <Outlet />,
        children: [
          {
            // 仅在根路由展示的内容
            index: true,
            element: <div>空</div>,
          },
          {
            path: '1',
            element: <div>welcome1</div>,
          },
          {
            path: '2',
            element: <div>welcome2</div>,
          },
          {
            path: '3',
            element: <div>welcome3</div>,
          },
        ],
      },
    ],
  },
])
const div = document.getElementById('root')
const root = ReactDOM.createRoot(div as HTMLElement)
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
