import { BrowserRouter, Routes, Route } from "react-router-dom";
import MakeQuiz from './components/MakeQuiz'
import Quiz from './components/Quiz';
import EndQuiz from "./components/EndQuiz";
import Login from "./components/Login";
import Register from './components/Register';
import useAuthContext from "./hooks/useAuthContext";

function App() {
  const {user} = useAuthContext()
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user?.user?.name && <MakeQuiz />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/end" element={<EndQuiz />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
