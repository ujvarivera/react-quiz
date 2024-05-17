import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import QuizContextProvider from './context/QuizContext'
import Navbar from './components/Navbar';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <QuizContextProvider>
        <Navbar />
        <App />
      </QuizContextProvider>
    </ChakraProvider>
  </React.StrictMode>,
)
