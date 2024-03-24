import { VStack, Text, Link as ChakraLink, Box } from '@chakra-ui/react';
import LoginForm from './components/LoginForm';
import { Link as ReactRouterLink } from 'react-router-dom';
import Logo from '@/assets/logo.svg';

function Page() {
    return (
        <VStack>
            <Box mb={3}>
                <img src={Logo} alt="Logo" width={280} />
            </Box>
            <LoginForm />
            <Text>
                Nie masz konta?{' '}
                <ChakraLink as={ReactRouterLink} to="/create-account" color={'teal.500'}>
                    {''} Utwórz konto
                </ChakraLink>
            </Text>
        </VStack>
    );
}

export default Page;
