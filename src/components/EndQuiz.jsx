import React from 'react'
import useQuizContext from '../hooks/useQuizContext'
import { Button, Center, Container, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const EndQuiz = () => {
    const { points, questions } = useQuizContext()
    const navigate = useNavigate()

    return (
        <Container>
            <Text>Quiz ended!</Text>
            <Text>Your points: {points} of {questions.length}</Text>
            <Center>
                <Button onClick={() => navigate('/')} colorScheme='blue'>New Game</Button>
            </Center> 
        </Container>
    )
}

export default EndQuiz