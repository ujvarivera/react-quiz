import React, { useEffect, useState } from 'react'
import useQuizContext from '../hooks/useQuizContext'
import { Box, Button, Container, Progress, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import he from "he"
import axios from 'axios'

const Quiz = () => {
    const { apiLink, questions, setQuestions, getQuestions, points, setPoints } = useQuizContext()
    const [index, setIndex] = useState(0)
    const [options, setOptions] = useState([])
    const [selectedAnswer, setSelectedAnswer] = useState("")
    const [answered, setAnswered] = useState(false)
    const navigate = useNavigate()

    const postMyPoint = async () => {
        axios.post(import.meta.env.VITE_API_QUIZ, {
            user_id: 1,
            score: points
        })
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


    const shuffle = (array) => {
        return array.sort(() => Math.random() - 0.5)
    }

    const replaceText = (text) => {
        return he.decode(text)
    }

    const nextQuestion = () => {
        setAnswered(false)

        if (index + 1 < questions.length) {
            setIndex(index + 1)
        } else {
            postMyPoint()
            navigate('/end')
        }
    }

    const exitQuiz = () => {
        setPoints(0)
        setIndex(0)
        setAnswered(false)
        setQuestions([])
        setOptions([])

        navigate('/')
    }

    return (
        <Container minHeight={"100vh"} bgColor={"white"} opacity={0.9}>
            <Text fontSize="3xl" p={2}>
                {questions[index] && replaceText(questions[index].question)}
            </Text>
            <Text fontSize="xl" py={4}>Your points: {points} of {questions.length}</Text>
            <Progress max={questions.length} value={index + 1} maxW={600} colorScheme='orange'/>
            <Box m={8}>
                {options.length > 0 ? (
                    <RadioGroup onChange={setSelectedAnswer} value={selectedAnswer}>
                        <Stack direction='column'>
                            {options.map((option, i) => (
                                <Radio value={option} key={i} isDisabled={answered} colorScheme='orange'>
                                    <Text color={answered && option === selectedAnswer ? (option === questions[index]?.correct_answer ? "green" : "red") : ""} fontSize={"xl"}>
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
                <Button onClick={exitQuiz} colorScheme='orange'>Exit</Button>
                <Button onClick={nextQuestion} colorScheme='orange'>
                    Next question
                </Button>
            </Stack>
        </Container>
    )
}

export default Quiz