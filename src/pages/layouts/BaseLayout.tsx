import { VStack } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

function BaseLayout() {
    return (
        <VStack height="100vh" p={8}>
            <Outlet />
        </VStack>
    );
}

export default BaseLayout;
