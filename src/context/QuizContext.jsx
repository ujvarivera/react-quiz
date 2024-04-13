import axios from "axios";
import { createContext, useState } from "react";

export const QuizContext = createContext();

const QuizContextProvider = ({ children }) => {
    const [questions, setQuestions] = useState([])
    const [apiLink, setApiLink] = useState("")

    const getQuestions = async (URL) => {
        const { data } = await axios.get(URL);
        //console.log(data.results)
        setQuestions(data.results)
    }

    return <QuizContext.Provider value={{
        questions,
        setQuestions,
        getQuestions,
        apiLink,
        setApiLink
    }}>{children}</QuizContext.Provider>;
}

export default QuizContextProvider