import axios from 'axios'
import { useEffect, useState } from 'react'

function App() {
  const [questions, setQuestions] = useState([])
  const URL = "https://opentdb.com/api.php?amount=10"
  const categories = ["Any", "General Knowledge", "Entertainment: Books", "Entertainment: Film",
    "Entertainment: Music", "Mythology", "Art", "Celebrities", "Animals"]

  useEffect(() => {
    const getQuestions = async () => {
      const { data } = await axios.get(URL);
      console.log(data.results)
      setQuestions(data.results)
    }
    getQuestions()
  }, [])

  return (
    <div>
      Quiz App
      <div>
          {
            questions && questions[0]?.question
          }
      </div>
    </div>
  )
}

export default App
