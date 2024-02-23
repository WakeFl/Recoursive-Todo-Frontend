import './App.css'
import { Box } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import './index.css'
function Layout() {
  return (
    <Box>
      <h1>Todo App</h1>
      <Outlet />
    </Box>
  )
}

export default Layout
