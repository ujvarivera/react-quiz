import axios from 'axios'
import { useEffect, useState } from 'react'
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
    <div>
      <h1 className='font-bold'>
        Quiz App
      </h1>
      <MakeQuiz />
    </div>
  )
}

export default App
