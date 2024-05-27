import React, { useEffect, useState } from 'react'
import useQuizContext from '../hooks/useQuizContext'
import { Button, Center, Container, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { formatDate } from '../constants'
import axiosInstance from '../constants/axios'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'

const EndQuiz = () => {
    const { points, questions } = useQuizContext()
    const [myScores, setMyScores] = useState([]);
    const navigate = useNavigate()
    console.log(myScores[0]);

    useEffect(() => {
        const getMyPoints = async () => {
            const { data } = await axiosInstance.get("api/v1/quiz-scores");
            setMyScores(data)
        }

        getMyPoints()
    }, [])

    return (
        <Container minHeight={"100vh"} bgColor={"white"} opacity={0.9}>
            <Text py={4} fontSize={"xl"}>Quiz ended!</Text>
            <Text py={4} fontSize={"xl"} color={"orange.500"}>
                {
                    points >= (0.70 * questions.length) ?
                        "You did well, congratulations! :)" :
                        "Practise more to achive more points!"
                }
            </Text>
            <Text py={4} fontSize={"xl"}>Your points: {points} of {questions.length}</Text>
            <Text py={4} fontSize={"xl"} color={"orange.500"}>
                Top 5:
            </Text>
            <TableContainer>
                <Table variant='simple'>
                    <TableCaption>TOP 5</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Date</Th>
                            <Th>Score</Th>
                            <Th>Result (%)</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            myScores?.map((scoreItem) => (
                                <Tr>
                                    <Td>{scoreItem.user.name}</Td>
                                    <Td>{formatDate(scoreItem.created_at)}</Td>
                                    <Td>{scoreItem.score}</Td>
                                    <Td>{scoreItem.result}%</Td>
                                </Tr>

                            ))
                        }
                    </Tbody>
                </Table>
            </TableContainer>
            <Center>
                <Button onClick={() => navigate('/')} colorScheme='orange'>New Game</Button>
            </Center>

        </Container>
    )
}

export default EndQuiz