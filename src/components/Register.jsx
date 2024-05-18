import React from 'react'
import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  Box,
  Avatar,
  FormControl,
  InputRightElement
} from "@chakra-ui/react";
import { NavLink, useNavigate } from 'react-router-dom';
import FlashMessage from './FlashMessage';
import useAuthContext from '../hooks/useAuthContext';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [emailInput, setEmailInput] = useState("")
  const [passwordInput, setPasswordInput] = useState("")
  const [nameInput, setNameInput] = useState("")
  const { user, setUser, handleRegister, authError } = useAuthContext()
  const navigate = useNavigate()

  const handleShowClick = () => setShowPassword(!showPassword);

  const clickRegisterButton = async (event) => {
    event.preventDefault()
    await handleRegister(nameInput, emailInput, passwordInput)

    if (user?.user?.name) {
      navigate('/')
    }
  }

  return (
    <>
      {
        authError &&
        <FlashMessage message={authError?.message}/>
      }
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      //justifyContent="center"
      alignItems="center"
      paddingTop={"40px"}
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="orange.500" />
        <Heading color="orange.400">Welcome at QuizGamer</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <Input 
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    type="text" 
                    placeholder="Name" 
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <Input
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    type="email" 
                    placeholder="Email address" 
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <Input
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                onClick={clickRegisterButton}
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="orange"
                width="full"
              >
                Register
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        You already have an account?{" "}
        <NavLink className="text-orange-500 hover:underline" to="/login">
          Login
        </NavLink>
      </Box>
    </Flex>
    </>
  )
}

export default Register