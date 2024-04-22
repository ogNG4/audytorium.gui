import { Stack } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Topbar from '../components/Topbar';

function AdminLayout() {
    return (
        <Stack direction={'row'} w={'100%'}>
            <Stack flex={1}>
                <Topbar />
                <Stack p={6} height={'100%'} position={'relative'} alignItems={'center'}>
                    <Outlet />
                </Stack>
            </Stack>
        </Stack>
    );
}

export default AdminLayout;
