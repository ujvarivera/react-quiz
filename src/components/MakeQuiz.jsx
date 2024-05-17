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
        <Container minHeight={"100vh"} bgColor={"white"} opacity={0.9} marginY={"20px"}>
            <Box p={2}>
                <Text fontSize="xl">Choose the number or questions: </Text>
                <NumberInput value={questionNumber} onChange={setQuestionNumber} min="5" max="50" maxW={20}>
                    <NumberInputField borderColor='orange.200' focusBorderColor={"orange.200"} _focusVisible={{outline: "orange.400"}}/>
                    <NumberInputStepper>
                        <NumberIncrementStepper bg='orange.200'/>
                        <NumberDecrementStepper bg='orange.200'/>
                    </NumberInputStepper>
                </NumberInput>
            </Box>

            <Box p={2}>
                <Text fontSize="xl">Choose a category:</Text>
                <Stack direction='column'>
                    {
                        categories.map((category) => (
                            <Radio onChange={(e) => setSelectedCategory(e.target.value)} value={category.id} key={category.id} colorScheme='orange' isChecked={selectedCategory == category.id}>{category.name}</Radio>
                        ))
                    }
                </Stack>
            </Box>

            <Box p={2}>
                <Text fontSize="xl">Choose a difficulty:</Text>
                <RadioGroup onChange={setSelectedDifficulty} value={selectedDifficulty}>
                    <Stack direction='column'>
                        {
                            difficulties.map((difficulty) => (
                                <Radio value={difficulty} key={difficulty} colorScheme='orange'>{difficulty}</Radio>
                            ))
                        }
                    </Stack>
                </RadioGroup>
            </Box>

            <Center>
                <Button onClick={startQuiz} colorScheme='orange'>Start the game</Button>
            </Center>

        </Container>
    )
}

export default MakeQuiz