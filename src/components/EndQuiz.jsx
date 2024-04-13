import React from 'react'
import useQuizContext from '../hooks/useQuizContext'
import { Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const EndQuiz = () => {
    const { points, questions } = useQuizContext()
    const navigate = useNavigate()

    return (
        <div>
            Quiz ended!
            Your points: {points} of {questions.length}
            <Button onClick={() => navigate('/')} colorScheme='blue'>New Game</Button>
        </div>
    )
}

export default EndQuiz