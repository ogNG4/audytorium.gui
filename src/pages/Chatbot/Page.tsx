import TextInput from '@/components/Form/TextInput';
import { Button, Stack, VStack } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { useCallback, useMemo, useRef, useState } from 'react';
import { map, sample } from 'lodash';
import Message from './components/Message';
import { fakeMessages } from './components/messages';
import Logo from '@/assets/logo.svg';
import { Outlet } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

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
    const bottomRef = useRef<HTMLInputElement | null>(null);

    const generateBotResponse = () => {
        const randomMessage = sample(fakeMessages);
        setIsBotTyping(true);
        setTimeout(() => {
            setMessages((prevMessages) => [...(prevMessages || []), { message: randomMessage || '', isBot: true }]);
            setIsBotTyping(false);
            bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 300);
    };

    const validationSchema = useMemo(() => {
        return yup.object().shape({
            message: yup.string().required('To pole jest wymagane'),
        });
    }, []);

    const methods = useForm<FormInput>({
        resolver: yupResolver(validationSchema),
    });
    const { handleSubmit, reset } = methods;

    const handleSendMessage = useCallback(() => {
        handleSubmit(({ message }) => {
            setMessages((prevMessages) => [...(prevMessages || []), { message: message || '', isBot: false }]);
            generateBotResponse();
            reset({
                message: '',
            });
        })();
    }, [handleSubmit, reset]);

    return (
        <>
            <Outlet />
            <Stack justifyContent="space-between" spacing={10} h={'80vh'}>
                <VStack spacing={4} mb={8}>
                    <img src={Logo} alt="logo" width={280} />

                    {map(messages, (message: Message) => (
                        <Message message={message.message} isBot={message.isBot} />
                    ))}
                </VStack>
                <FormProvider {...methods}>
                    <div ref={bottomRef} />
                    <Stack w="full" direction="row">
                        <TextInput<FormInput>
                            name="message"
                            color="white"
                            placeholder="Wprowadź wiadomość !"
                            isReadOnly={isBotTyping}
                            mb={4}
                        />
                        <Button type="submit" isDisabled={isBotTyping} onClick={handleSendMessage}>
                            <ArrowForwardIcon />
                        </Button>
                    </Stack>
                </FormProvider>
            </Stack>
        </>
    );
}

export default Page;
