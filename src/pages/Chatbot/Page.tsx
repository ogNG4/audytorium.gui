import TextInput from '@/components/Form/TextInput';
import { Button, Stack, VStack, Text, Spinner, Box } from '@chakra-ui/react';
import { AddIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { map } from 'lodash';
import Message from './components/Message';
import Logo from '@/assets/logo.svg';
import { Outlet, useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { isNewParam } from '@/constants/common';
import { useConversationQuery, useSentMessageMutation, useStartConversationMutation } from '@/hooks';
import { useQueryClient } from '@tanstack/react-query';
import queryKeys from '@/constants/queryKeys';
import { Case, Default, Switch, When } from 'react-if';
import { components } from '@/types/apiSchema';
import PrimarySpinner from '@/components/Spinner/PrimarySpinner';
import { Token } from '@/types/auth';

interface FormInput {
    message: string;
}

interface Message {
    message: string;
    isBot: boolean;
}

function Page() {
    const bottomRef = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate();
    const { conversationId, roomId } = useParams();
    const isNew = conversationId === isNewParam.toString();
    const user = useLoaderData() as Token;
    const client = useQueryClient();
    const {
        data: conversation,
        isError: conversationError,
        isLoading: isConversationLoading,
    } = useConversationQuery(
        { id: conversationId! },
        { enabled: !isNew, queryKey: [queryKeys.conversation, conversationId] }
    );
    const { mutate: sendMessageMutate, isPending: isSendPending } = useSentMessageMutation();
    const { mutate: startConversationMutate } = useStartConversationMutation();
    const isSameUser = conversation?.userId === user.id;

    const validationSchema = useMemo(() => {
        return yup.object().shape({
            message: yup.string().required('To pole jest wymagane').max(1500, 'Maksymalna długość to 1500 znaków'),
        });
    }, []);

    const methods = useForm<FormInput>({
        resolver: yupResolver(validationSchema),
    });
    const { handleSubmit, reset } = methods;

    const handleSendMessage = useCallback(() => {
        handleSubmit(({ message }) => {
            const userMessage = { content: message, isBot: false };
            client.setQueryData(
                [queryKeys.conversation, conversationId],
                (oldData: components['schemas']['ConversationDto']) => ({
                    ...oldData,
                    messages: [...(oldData?.messages || []), userMessage],
                })
            );

            sendMessageMutate(
                { conversationId, roomId: roomId!, message },
                {
                    onSuccess: () => {
                        client.invalidateQueries({ queryKey: [queryKeys.conversation, conversationId] });
                    },
                }
            );

            reset({
                message: '',
            });
        })();
    }, [handleSubmit, reset, client, conversationId, roomId, sendMessageMutate]);

    const handleStartConversation = useCallback(() => {
        startConversationMutate(
            { roomId: roomId! },
            {
                onSuccess: (data) => {
                    navigate(`/${roomId}/${data.id}`);
                    client.invalidateQueries({ queryKey: [queryKeys.conversations] });
                },
            }
        );
    }, [startConversationMutate, navigate, roomId, client]);

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [conversation?.messages]);

    useEffect(() => {
        reset({
            message: '',
        });
    }, [reset]);

    return (
        <>
            <Outlet />
            <Stack justifyContent="space-between" spacing={10} h={'80vh'}>
                <Box alignSelf="center">
                    <img src={Logo} alt="logo" width={280} />
                </Box>
                <Switch>
                    <Case condition={isConversationLoading}>
                        <PrimarySpinner />
                    </Case>
                    <Case condition={isNew || conversationError}>
                        <VStack h="100vh" justifyContent="center">
                            <Button
                                w="fit-content"
                                alignSelf="center"
                                gap={2}
                                bg="gray.700"
                                _hover={{ bg: 'gray.600' }}
                                onClick={handleStartConversation}
                            >
                                <AddIcon color="white" />
                                <Text color="white">Rozpocznij konwersację</Text>
                            </Button>
                            <When condition={conversationError}>
                                <Text color="red.500">Nie znaleziono konwersacji.</Text>
                            </When>
                        </VStack>
                    </Case>
                    <Default>
                        <VStack spacing={4} mb={8}>
                            {map(conversation?.messages, (message) => (
                                <Message key={message.id} message={message.content} isBot={message.isBot} />
                            ))}
                            <When condition={isSendPending}>
                                <Spinner mt={4} size="xl" />
                            </When>
                        </VStack>
                        <FormProvider {...methods}>
                            <div ref={bottomRef} />
                            <Stack w="full" direction="row" as="form" onSubmit={handleSubmit(handleSendMessage)}>
                                <TextInput<FormInput>
                                    name="message"
                                    color="white"
                                    placeholder="Wprowadź wiadomość !"
                                    mb={4}
                                    disabled={isNew || isSendPending || !isSameUser}
                                />
                                <Button type="submit" isDisabled={isNew || isSendPending || !isSameUser}>
                                    <ArrowForwardIcon />
                                </Button>
                            </Stack>
                        </FormProvider>
                    </Default>
                </Switch>
            </Stack>
        </>
    );
}

export default Page;
