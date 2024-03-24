import { VStack } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

function AuthLayout() {
    return (
        <VStack height="100vh" p={8} justifyContent={'center'}>
            <Outlet />
        </VStack>
    );
}

export default AuthLayout;
