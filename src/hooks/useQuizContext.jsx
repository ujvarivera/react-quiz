import { useContext } from 'react'
import { QuizContext } from '../context/QuizContext'

const useQuizContext = () => {
    const context = useContext(QuizContext);

    return context;
}

export default useQuizContext