import { Center, Spinner } from '@chakra-ui/react';

function Loader() {
    return (
        <Center h={'100vh'} w={'100%'}>
            <Spinner size="xl" />
        </Center>
    );
}

export default Loader;
