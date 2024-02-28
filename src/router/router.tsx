import { createBrowserRouter } from 'react-router-dom'
import Layout from 'src/Layout'
import Auth from 'src/pages/Auth'
import Authors from 'src/pages/Authors'
import Home from 'src/pages/Home'
import Todos from 'src/pages/Todos'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'auth',
        element: <Auth />,
      },
      {
        path: 'all',
        element: <Todos />,
      },
      {
        path: 'authors',
        element: <Authors />,
      },
    ],
  },
])
