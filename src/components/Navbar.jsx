import {
    Box,
    Flex,
    Avatar,
    HStack,
    Text,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import useAuthContext from './../hooks/useAuthContext';

const NavLink = (props) => {
    const { children, href } = props

    return (
        <Box
            as="a"
            px={2}
            py={1}
            rounded={'md'}
            _hover={{
                textDecoration: 'none',
                bg: useColorModeValue('gray.200', 'gray.700'),
            }}
            href={href}>
            {children}
        </Box>
    )
}

export default function Navbar() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { user, handleLogout } = useAuthContext()
    const Links = [{ name: 'Sign In', href: '/login', show: !user?.user?.name }, { name: 'Register', href: '/register', show: !user?.user?.name }]

    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <Box color={"orange.500"} fontSize={"24px"}>
                            QuizGamer
                        </Box>
                        <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
                            {
                                !user?.user?.name &&
                                <>
                                    <NavLink key={Links[0].name} href={Links[0].href}>{Links[0].name}</NavLink>
                                    <NavLink key={Links[1].name} href={Links[1].href}>{Links[1].name}</NavLink>
                                </>
                            }
                        </HStack>
                    </HStack>
                    <Flex alignItems={'center'}>
                        {
                            user?.user?.name &&
                            <>
                                <Box marginRight={"10px"}>Helló {user?.user?.name}!</Box>
                                
                                <Menu>
                                    <MenuButton
                                        as={Button}
                                        rounded={'full'}
                                        variant={'link'}
                                        cursor={'pointer'}
                                        minW={0}>
                                        <Avatar bg="orange.500" size={'sm'}/>
                                    </MenuButton>
                                    <MenuList>
                                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                    </MenuList>
                                </Menu>
                            </>
                        }
                    </Flex>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            {Links.map((link) => (
                                <NavLink key={link.name} href={link.href}>{link.name}</NavLink>
                            ))}
                        </Stack>
                    </Box>
                ) : null}
            </Box>

            {/* <Box p={4}>Main Content Here</Box>*/}
        </>
    )
}