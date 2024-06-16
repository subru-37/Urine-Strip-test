import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Box, ChakraProvider } from '@chakra-ui/react'

import './App.css'
import Landing from './components/Landing'

function App() {
  const [count, setCount] = useState(0)
  return (
    <ChakraProvider>
      <Box sx={{
        width:'100%',
        height:'100%', 
      }}>
        <Landing/>
      </Box>
    </ChakraProvider>
  )
}

export default App
