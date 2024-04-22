import { Stack } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

function BaseLayout() {
    return (
        <Stack direction={'row'} w={'100%'}>
            <Sidebar />
            <Stack flex={1}>
                <Topbar />
                <Stack p={6} position={'relative'} ml={'270px'}>
                    <Outlet />
                </Stack>
            </Stack>
        </Stack>
    );
}

export default BaseLayout;
