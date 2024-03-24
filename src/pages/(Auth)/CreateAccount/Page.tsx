import { VStack, Box, Link as ChakraLink, Text } from '@chakra-ui/react';
import CreateAccountForm from './components/CreateAccountForm';
import { Link as ReactRouterLink } from 'react-router-dom';
import Logo from '@/assets/logo.svg';

function Page() {
    return (
        <VStack>
            <Box mb={3}>
                <img src={Logo} alt="Logo" width={280} />
            </Box>
            <CreateAccountForm />
            <Text>
                Masz już konto?{' '}
                <ChakraLink as={ReactRouterLink} to="/login" color={'teal.500'}>
                    {''} Zaloguj się
                </ChakraLink>
            </Text>
        </VStack>
    );
}

export default Page;
