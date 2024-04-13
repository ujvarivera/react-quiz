import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { Button, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Radio, RadioGroup, Stack } from '@chakra-ui/react'
import { categories, difficulties } from "../constants/index"
import useQuizContext from './../hooks/useQuizContext';

const MakeQuiz = () => {
    const [questionNumber, setQuestionNumber] = useState(10)
    const [selectedCategory, setSelectedCategory] = useState("")
    const [selectedDifficulty, setSelectedDifficulty] = useState("easy")
    const { setApiLink } = useQuizContext()
    const navigate = useNavigate()

    const startQuiz = () => {
        let apiLink = `https://opentdb.com/api.php?amount=${questionNumber}&difficulty=${selectedDifficulty}&type=multiple`
        if (selectedCategory !== "") {
            apiLink += `&category=${selectedCategory}`
        }
        setApiLink(apiLink)
        navigate('/quiz')
    }

    return (
        <div>
            <p>Choose the number or questions: </p>
            <NumberInput value={questionNumber} onChange={setQuestionNumber} min="5" max="50" maxW={20}>
                <NumberInputField />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>

            <p>Choose a category:</p>
            <Stack direction='column'>
                {
                    categories.map((category) => (
                        <Radio onChange={(e) => setSelectedCategory(e.target.value)} value={category.id} key={category.id} isChecked={selectedCategory == category.id}>{category.name}</Radio>
                    ))
                }
            </Stack>

            <p>Choose a difficulty:</p>
            <RadioGroup onChange={setSelectedDifficulty} value={selectedDifficulty}>
                <Stack direction='column'>
                    {
                        difficulties.map((difficulty) => (
                            <Radio value={difficulty} key={difficulty}>{difficulty}</Radio>
                        ))
                    }
                </Stack>
            </RadioGroup>

            <div>
                Selected:
                <p>Number of Questions: {questionNumber}</p>
                <p>Category: {selectedCategory}</p>
                <p>Difficulty: {selectedDifficulty}</p>
            </div>

            <Button onClick={startQuiz} colorScheme='blue'>Start the game</Button>

        </div>
    )
}

export default MakeQuiz