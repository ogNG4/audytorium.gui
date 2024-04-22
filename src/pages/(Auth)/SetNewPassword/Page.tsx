import { VStack, Box } from '@chakra-ui/react';
import Logo from '@/assets/logo.svg';
import NewPasswordForm from './components/NewPasswordForm';

function Page() {
    return (
        <VStack>
            <Box mb={3}>
                <img src={Logo} alt="Logo" width={280} />
            </Box>
            <NewPasswordForm />
        </VStack>
    );
}

export default Page;
