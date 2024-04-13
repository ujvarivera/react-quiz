import { BrowserRouter, Routes, Route } from "react-router-dom";
import MakeQuiz from './components/MakeQuiz'
import Quiz from './components/Quiz';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MakeQuiz />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
