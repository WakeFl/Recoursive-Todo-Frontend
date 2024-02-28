import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/router'
import { useEffect, useState } from 'react'
import { useRefresh } from './hooks/useRefresh'

function App() {
  const refresh = useRefresh()

  return <RouterProvider router={router} />
}

export default App
