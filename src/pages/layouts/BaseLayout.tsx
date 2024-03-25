import { Stack } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

function BaseLayout() {
    return (
        <Stack height="100vh" direction={'row'} w={'100%'}>
            <Sidebar />
            <Stack flex={1} py={8} px={12}>
                <Outlet />
            </Stack>
        </Stack>
    );
}

export default BaseLayout;
