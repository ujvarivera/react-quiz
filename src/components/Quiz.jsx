import React, { useEffect, useState } from 'react'
import useQuizContext from '../hooks/useQuizContext'
import { Box, Button, Container, Progress, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const Quiz = () => {
    const { apiLink, questions, setQuestions, getQuestions, points, setPoints } = useQuizContext()
    const [index, setIndex] = useState(0)
    const [options, setOptions] = useState([])
    const [selectedAnswer, setSelectedAnswer] = useState("")

    const navigate = useNavigate()

    const shuffle = (array) => {
        return array.sort(() => Math.random() - 0.5)
    }

    useEffect(() => {
        setPoints(0)
        setIndex(0)
        setQuestions([])
        setOptions([])
        getQuestions(apiLink)
    }, [apiLink])

    useEffect(() => {
        setSelectedAnswer("")

        if (questions[index]) {
            let options = shuffle([
                questions[index].correct_answer,
                ...questions[index].incorrect_answers,
            ]);
            setOptions(options);
        }
    }, [index, questions]);

    const nextQuestion = () => {
        if (selectedAnswer == questions[index].correct_answer) {
            setPoints(points + 1)
        }
        console.log(selectedAnswer, questions[index].correct_answer);
        if (index + 1 < questions.length) {
            setIndex(index + 1)
        } else {
            navigate('/end')
        }
    }

    return (
        <Container>
            <Text fontSize="2xl">
                {questions[index] && questions[index].question}
            </Text>
            <Text fontSize="md" m={2}>Your points: {points} of {questions.length}</Text>
            <Progress max={questions.length} value={index + 1} maxW={600} />
            <Box m={8}>
                {options.length > 0 ? (
                    <RadioGroup onChange={setSelectedAnswer} value={selectedAnswer}>
                        <Stack direction='column'>
                            {options.map((option, i) => (
                                <Radio value={option} key={i}>{option}</Radio>
                            ))}
                        </Stack>
                    </RadioGroup>
                ) : (
                    <Text>Loading options...</Text>
                )}
            </Box>

            <Stack spacing={4} direction='row' align='center' justify='center'>
                <Button onClick={() => navigate('/')} colorScheme='blue'>Exit</Button>
                <Button onClick={nextQuestion} colorScheme='blue'>
                    Next question
                </Button>
            </Stack>
        </Container>
    )
}

export default Quiz