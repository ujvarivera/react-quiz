import React, { useEffect, useState } from 'react'
import useQuizContext from '../hooks/useQuizContext'
import { Button, Radio, RadioGroup, Stack } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const Quiz = () => {
    const { apiLink, questions, getQuestions } = useQuizContext()
    const [index, setIndex] = useState(0)
    const [allAnswers, setAllAnswers] = useState([])
    const [selectedAnswer, setSelectedAnswer] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        getQuestions(apiLink)
        // setAllAnswers([...questions[index]?.incorrect_answers])
        // console.log(questions[index].incorrect_answers);
        // console.log(questions[index].correct_answer);
    }, [apiLink])
    /*
    useEffect(() => {
        setAllAnswers([...questions[index]?.incorrect_answers])
    }, [index])
    */

    return (
        <div>
            <h2>
                {questions[index] && questions[index].question}
            </h2>
            <div>
                {
                    questions[index] &&

                    <div>
                        <p>{questions[index].incorrect_answers[0]}</p>
                        <p>{questions[index].incorrect_answers[1]}</p>
                        <p>{questions[index].incorrect_answers[2]}</p>
                        <p>{questions[index].correct_answer}</p>
                    </div>
                }
            </div>

            <Button onClick={() => navigate('/')} colorScheme='blue'>Exit</Button>
            <Button onClick={() => setIndex(index + 1)} colorScheme='blue'>Next question</Button>
        </div>
    )
}

export default Quiz