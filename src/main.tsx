import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ErrorPage } from './components/ErrorPage'

const router = createBrowserRouter([
  {
    path: '/',
    // Outlet 表示子路由出口
    // 当只有 Outlet 元素时，此属性可以省略
    // element: <div><Outlet/></div>,
    errorElement: <ErrorPage/>,
    children: [
      {
        // 仅在根路由展示的内容
        index: true,
        element: <div>index 1 2 3</div>,
      },
      {
        path: '1',
        element: <div>1</div>,
      },
      {
        path: '2',
        element: <div>2</div>,
      },
      {
        path: '3',
        element: <div>3</div>,
      },
    ],
  },
  // 优先级要高于定义在 children 属性中的路由
  {
    path: '/4',
    element: <div>4</div>,
  },
])
const div = document.getElementById('root')
const root = ReactDOM.createRoot(div as HTMLElement)
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
