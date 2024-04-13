import React, { useEffect, useState } from 'react'
import useQuizContext from '../hooks/useQuizContext'
import { Button, Radio, RadioGroup, Stack } from '@chakra-ui/react'
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
        <div>
            <h2>
                {questions[index] && questions[index].question}
            </h2>
            <p>Your points: {points} of {questions.length}</p>
            <div>
                {options.length > 0 ? (
                    <RadioGroup onChange={setSelectedAnswer} value={selectedAnswer}>
                        <Stack direction='column'>
                            {options.map((option, i) => (
                                <Radio value={option} key={i}>{option}</Radio>
                            ))}
                        </Stack>
                    </RadioGroup>
                ) : (
                    <p>Loading options...</p>
                )}
            </div>

            <Button onClick={() => navigate('/')} colorScheme='blue'>Exit</Button>
            <Button onClick={nextQuestion} colorScheme='blue'>Next question</Button>
        </div>
    )
}

export default Quiz