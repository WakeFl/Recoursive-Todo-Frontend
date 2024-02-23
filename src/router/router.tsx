import { createBrowserRouter } from 'react-router-dom'
import Layout from 'src/Layout'
import Auth from 'src/pages/Auth'
import Home from 'src/pages/Home'

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
    ],
  },
])
