import axios from "axios";
import { createContext, useState } from "react";
import axiosInstance from "../constants/axios";

export const QuizContext = createContext();

const QuizContextProvider = ({ children }) => {
    const [questions, setQuestions] = useState([])
    const [apiLink, setApiLink] = useState("")
    const [points, setPoints] = useState(0)
    const [selectedDifficulty, setSelectedDifficulty] = useState("easy")
    const [selectedCategory, setSelectedCategory] = useState("")
    const [questionNumber, setQuestionNumber] = useState(10)

    const getQuestions = async (URL) => {
        const { data } = await axios.get(URL);
        //console.log(data.results)
        setQuestions(data.results)
    }

    const handleScorePost = async(user_id, score, questions, category, difficulty) => {
        axiosInstance.post("api/v1/quiz-scores", {
            user_id: user_id,
            score: score,
            questions: questions,
            category: category,
            difficulty: difficulty,
        }).then(function (response) {
            console.log('Saved');
        }).catch(function (error) {
            console.log(error.response.data);
        });
    }

    return <QuizContext.Provider value={{
        questions,
        setQuestions,
        getQuestions,
        apiLink,
        setApiLink,
        points,
        setPoints,
        selectedDifficulty,
        setSelectedDifficulty,
        selectedCategory,
        setSelectedCategory,
        questionNumber,
        setQuestionNumber,
        handleScorePost
    }}>{children}</QuizContext.Provider>;
}

export default QuizContextProvider