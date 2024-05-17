import React, { useEffect, useState } from 'react'
import useQuizContext from '../hooks/useQuizContext'
import { Button, Center, Container, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { formatDate } from '../constants'

const EndQuiz = () => {
    const { points, questions } = useQuizContext()
    const [ myScores, setMyScores ] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const getMyPoints = async () => {
            const { data } = await axios.get(import.meta.env.VITE_API_QUIZ);
            setMyScores(data)
        }

        getMyPoints()
    }, [])

    return (
        <Container minHeight={"100vh"} bgColor={"white"} opacity={0.9}>
            <Text py={4} fontSize={"xl"}>Quiz ended!</Text>
            <Text py={4} fontSize={"xl"} color={"orange.500"}>
                {
                    points >= (0.70 * questions.length) ?
                    "You did well, congratulations! :)" :
                    "Practise more to achive more points!" 
                }
            </Text>
            <Text py={4} fontSize={"xl"}>Your points: {points} of {questions.length}</Text>
            <Text py={4} fontSize={"xl"} color={"orange.500"}>
                Your old scores:
                {
                    myScores?.map((scoreItem) => (
                        <div>{formatDate(scoreItem.created_at)} | {scoreItem.score}</div>
                    ))
                }
            </Text>

            <Center>
                <Button onClick={() => navigate('/')} colorScheme='orange'>New Game</Button>
            </Center>

        </Container>
    )
}

export default EndQuiz