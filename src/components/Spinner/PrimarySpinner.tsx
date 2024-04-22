import { Spinner, Stack } from '@chakra-ui/react';
import { memo } from 'react';

function PrimarySpinner() {
    return (
        <Stack h={'60vh'} alignItems={'center'} justifyContent={'center'}>
            <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
        </Stack>
    );
}

export default memo(PrimarySpinner);
