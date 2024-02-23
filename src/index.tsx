import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import { setupStore } from './store/store'
import { Box, ChakraProvider } from '@chakra-ui/react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const store = setupStore()

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Box className='App'>
    <ChakraProvider>
      <Provider store={store}>
        <App />
        <ToastContainer
          position='bottom-left'
          autoClose={2000}
        />
      </Provider>
    </ChakraProvider>
  </Box>
)
