import { memo } from 'react';
import { Stack, VStack} from '@chakra-ui/react';

function Sidebar() {
    return (
        <VStack height={'100vh'} bg={'gray.900'} w={'270px'} justifyContent={'space-between'} position={'fixed'} py={4}>
            <Stack></Stack>
            <Stack></Stack>
            <Stack></Stack>
        </VStack>
    );
}

export default memo(Sidebar);
