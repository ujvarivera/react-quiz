import axios from 'axios'
import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MakeQuiz from './components/MakeQuiz'

function App() {
  const [questions, setQuestions] = useState([])
  const URL = "https://opentdb.com/api.php?amount=10"

  /*
  useEffect(() => {
    const getQuestions = async () => {
      const { data } = await axios.get(URL);
      console.log(data.results)
      setQuestions(data.results)
    }
    getQuestions()
  }, [])
  */

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<MakeQuiz />}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
