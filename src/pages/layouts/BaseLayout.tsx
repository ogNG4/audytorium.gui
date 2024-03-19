import { VStack } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

function BaseLayout() {
    return (
        <VStack bg={'gray.800'} height="100vh" flex={1}>
            <Outlet />
        </VStack>
    );
}

export default BaseLayout;
