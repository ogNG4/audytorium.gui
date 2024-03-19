import { Card, CardBody, Text } from '@chakra-ui/react';
import { memo } from 'react';

interface MessageProps {
    message: string;
    isBot: boolean;
}

function Message({ message, isBot }: MessageProps) {
    return (
        <Card bg={isBot ? 'green.400' : 'green.500 '} alignSelf={isBot ? 'start' : 'end'} borderRadius="xl" maxW="70%">
            <CardBody>
                <Text>{message}</Text>
            </CardBody>
        </Card>
    );
}

export default memo(Message);
