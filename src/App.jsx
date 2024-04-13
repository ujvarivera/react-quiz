import { BrowserRouter, Routes, Route } from "react-router-dom";
import MakeQuiz from './components/MakeQuiz'
import Quiz from './components/Quiz';
import EndQuiz from "./components/EndQuiz";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MakeQuiz />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/end" element={<EndQuiz />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
