import SimpleForm from '@/components/Form/SimpleForm';
import TextInput from '@/components/Form/TextInput';
import { Button, Stack, VStack } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { map, sample } from 'lodash';
import Message from './components/Message';
import { fakeMessages } from './components/messages';
import Logo from '@/assets/logo.svg';

interface FormInput {
    message: string;
}

interface Message {
    message: string;
    isBot: boolean;
}

function Page() {
    const [messages, setMessages] = useState<Message[]>();
    const [isBotTyping, setIsBotTyping] = useState(false);

    const generateBotResponse = () => {
        const randomMessage = sample(fakeMessages);
        setIsBotTyping(true);
        setTimeout(() => {
            setMessages((prevMessages) => [...(prevMessages || []), { message: randomMessage || '', isBot: true }]);
            setIsBotTyping(false);
        }, 300);
    };

    const handleSubmit = ({ message }: FormInput) => {
        setMessages((prevMessages) => [...(prevMessages || []), { message: message || '', isBot: false }]);
        generateBotResponse();
    };

    return (
        <Stack justifyContent="space-between" spacing={10}>
            <VStack spacing={4} mb={8}>
                <img src={Logo} alt="logo" width={280} />

                {map(messages, (message: Message) => (
                    <Message message={message.message} isBot={message.isBot} />
                ))}
            </VStack>
            <SimpleForm<FormInput> onSubmit={handleSubmit}>
                <Stack w="full" direction="row">
                    <TextInput<FormInput>
                        name="message"
                        color="white"
                        placeholder="Wprowadź wiadomość !"
                        isReadOnly={isBotTyping}
                        mb={4}
                    />
                    <Button type="submit" isDisabled={isBotTyping}>
                        <ArrowForwardIcon />
                    </Button>
                </Stack>
            </SimpleForm>
        </Stack>
    );
}

export default Page;
