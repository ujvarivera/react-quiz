import React, { useState } from 'react'
import { Button, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Radio, RadioGroup, Stack } from '@chakra-ui/react'
import { categories, difficulties } from "../constants/index"

const MakeQuiz = () => {
    const [questionNumber, setQuestionNumber] = useState(10)
    const [selectedCategory, setSelectedCategory] = useState("")
    const [selectedDifficulty, setSelectedDifficulty] = useState("easy")
    const [link, setLink] = useState("")

    const startQuiz = () => {
        if (selectedCategory === "") {
            const apiLink = `https://opentdb.com/api.php?amount=${questionNumber}&difficulty=${selectedDifficulty}&type=multiple`
            setLink(apiLink)
        } else {
            const apiLink = `https://opentdb.com/api.php?amount=${questionNumber}&category=${selectedCategory}&difficulty=${selectedDifficulty}&type=multiple`
            setLink(apiLink)
        }
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
            <Stack direction='row'>
                {
                    categories.map((category) => (
                        <Radio onChange={(e) => setSelectedCategory(e.target.value)} value={category.id} key={category.id} isChecked={selectedCategory == category.id}>{category.name}</Radio>
                    ))
                }
            </Stack>

            <p>Choose a difficulty:</p>
            <RadioGroup onChange={setSelectedDifficulty} value={selectedDifficulty}>
                <Stack direction='row'>
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

            <div>{link}</div>
        </div>
    )
}

export default MakeQuiz