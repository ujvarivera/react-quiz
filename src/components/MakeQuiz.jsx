import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { Box, Button, Center, Container, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react'
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
        <Container bg='blue.200' p={2}>
            <Box m={4}>
                <Text fontSize="xl">Choose the number or questions: </Text>
                <NumberInput value={questionNumber} onChange={setQuestionNumber} min="5" max="50" maxW={20}>
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </Box>

            <Box m={4}>
                <Text fontSize="xl">Choose a category:</Text>
                <Stack direction='column'>
                    {
                        categories.map((category) => (
                            <Radio onChange={(e) => setSelectedCategory(e.target.value)} value={category.id} key={category.id} isChecked={selectedCategory == category.id}>{category.name}</Radio>
                        ))
                    }
                </Stack>
            </Box>

            <Box m={4}>
                <Text fontSize="xl">Choose a difficulty:</Text>
                <RadioGroup onChange={setSelectedDifficulty} value={selectedDifficulty}>
                    <Stack direction='column'>
                        {
                            difficulties.map((difficulty) => (
                                <Radio value={difficulty} key={difficulty}>{difficulty}</Radio>
                            ))
                        }
                    </Stack>
                </RadioGroup>
            </Box>

            <Center>
                <Button onClick={startQuiz} colorScheme='blue' >Start the game</Button>
            </Center>

        </Container>
    )
}

export default MakeQuiz