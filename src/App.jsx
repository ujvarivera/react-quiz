import { BrowserRouter, Routes, Route } from "react-router-dom";
import MakeQuiz from './components/MakeQuiz'
import Quiz from './components/Quiz';
import EndQuiz from "./components/EndQuiz";
import Login from "./components/Login";
import Register from './components/Register';
import useAuthContext from "./hooks/useAuthContext";
import Navbar from './components/Navbar';

function App() {
  const {user} = useAuthContext()
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={user?.name && <MakeQuiz />} />
        <Route path="/quiz" element={user?.name && <Quiz />} />
        <Route path="/end" element={user?.name && <EndQuiz />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
