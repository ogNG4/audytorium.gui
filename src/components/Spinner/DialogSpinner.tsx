import { Spinner, Stack } from '@chakra-ui/react';
import { memo } from 'react';

function DialogSpinner() {
    return (
        <>
            <Stack
                alignItems={'center'}
                justifyContent={'center'}
                position={'absolute'}
                inset={0}
                zIndex={10}
                opacity={0.6}
                bg={'gray.900'}
            />

            <Stack alignItems={'center'} justifyContent={'center'} position={'absolute'} inset={0} zIndex={20}>
                <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
            </Stack>
        </>
    );
}

export default memo(DialogSpinner);
