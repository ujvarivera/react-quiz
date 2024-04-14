import React, { useEffect, useState } from 'react'
import useQuizContext from '../hooks/useQuizContext'
import { Box, Button, Container, Progress, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import he from "he"

const Quiz = () => {
    const { apiLink, questions, setQuestions, getQuestions, points, setPoints } = useQuizContext()
    const [index, setIndex] = useState(0)
    const [options, setOptions] = useState([])
    const [selectedAnswer, setSelectedAnswer] = useState("")
    const [answered, setAnswered] = useState(false)

    const navigate = useNavigate()

    const shuffle = (array) => {
        return array.sort(() => Math.random() - 0.5)
    }

    const replaceText = (text) => {
        return he.decode(text)
    }

    useEffect(() => {
        setPoints(0)
        setIndex(0)
        setAnswered(false)
        setQuestions([])
        setOptions([])
        getQuestions(apiLink)
    }, [apiLink])

    useEffect(() => {
        //setSelectedAnswer("")
        setAnswered(false)

        if (questions[index]) {
            let options = shuffle([
                questions[index].correct_answer,
                ...questions[index].incorrect_answers,
            ]);
            setOptions(options);
        }
    }, [index, questions]);

    useEffect(() => {
        setAnswered(true)

        if (selectedAnswer == questions[index]?.correct_answer) {
            setPoints(points + 1)
        }

    }, [selectedAnswer])

    const nextQuestion = () => {
        setAnswered(false)

        if (index + 1 < questions.length) {
            setIndex(index + 1)
        } else {
            navigate('/end')
        }
    }

    return (
        <Container>
            <Text fontSize="3xl">
                {questions[index] && replaceText(questions[index].question)}
            </Text>
            <Text fontSize="xl" m={2}>Your points: {points} of {questions.length}</Text>
            <Progress max={questions.length} value={index + 1} maxW={600} />
            <Box m={8}>
                {options.length > 0 ? (
                    <RadioGroup onChange={setSelectedAnswer} value={selectedAnswer}>
                        <Stack direction='column'>
                            {options.map((option, i) => (
                                <Radio value={option} key={i} isDisabled={answered}>
                                    <Text color={answered && option === selectedAnswer ? (option === questions[index]?.correct_answer ? "green" : "red") : ""} fontSize='2xl'>
                                        {replaceText(option)}
                                    </Text>
                                </Radio>
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