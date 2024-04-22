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
                Zapomniałeś hasła?{' '}
                <ChakraLink as={ReactRouterLink} to="/reset-password" color={'teal.500'}>
                    {''} Przypomnij hasło.
                </ChakraLink>
            </Text>
        </VStack>
    );
}

export default Page;
