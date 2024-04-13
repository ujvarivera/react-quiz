import React, { useState } from 'react'
import { Radio, RadioGroup, Stack } from '@chakra-ui/react'
import { categories } from "../constants/index"

const MakeQuiz = () => {
    const [selectedCategory, setSelectedCategory] = useState("")

    return (
        <div>
            <p>Choose a category:</p>
            <RadioGroup onChange={setSelectedCategory} value={selectedCategory}>
                <Stack direction='row'>
                    {
                        categories.map((category) => (
                            <Radio value={category} key={category}>{category}</Radio>
                        ))
                    }
                </Stack>
            </RadioGroup>
            <div>Selected: {selectedCategory}</div>
        </div>
    )
}

export default MakeQuiz