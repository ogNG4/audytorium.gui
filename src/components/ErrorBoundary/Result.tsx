import { Button, Divider, HStack, Stack, Text } from '@chakra-ui/react';

interface ResultProps {
    code: string;
    message: string;
}
function Result({ code, message }: ResultProps) {
    return (
        <Stack spacing={4} alignItems={'center'} justifyContent={'center'} h={'100vh'} align="center">
            <HStack>
                <Text fontSize={'40px'}>{code}</Text>
                <Divider orientation="vertical" />
                <Text fontSize={'40px'} fontWeight={'200'}>
                    {message}
                </Text>
            </HStack>
            <HStack>
                <Button colorScheme="blue" onClick={() => window.location.replace('/')} variant="outline" color="white">
                    Powrót do strony głównej
                </Button>
            </HStack>
        </Stack>
    );
}

export default Result;
