import { useCreateRoomMutation, useDeleteRoomMutation, useRoomsQuery, useToast, useUpdateRoomMutation } from '@/hooks';
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    Button,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text,
    Input,
    HStack,
    IconButton,
} from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { Else, If, Then, When } from 'react-if';
import { useNavigate } from 'react-router-dom';
import { map } from 'lodash';
import { useQueryClient } from '@tanstack/react-query';
import queryKeys from '@/constants/queryKeys';
import DialogSpinner from '@/components/Spinner/DialogSpinner';
import RoomItem from './components/RoomItem';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';

function Page() {
    const navigate = useNavigate();

    const { data: rooms, isLoading: isRoomsLoading } = useRoomsQuery();
    const [isNewRoom, setIsNewRoom] = useState(false);
    const [roomName, setRoomName] = useState('');
    const [editedRoomId, setEditedRoomId] = useState('');

    const { mutate: createMutate } = useCreateRoomMutation();
    const { mutate: updateMutate } = useUpdateRoomMutation();
    const { mutate: deleteMutate } = useDeleteRoomMutation();
    const { showSuccess, showError } = useToast();
    const client = useQueryClient();

    const handleClose = useCallback(() => {
        navigate('/');
    }, [navigate]);

    const handleUpdate = useCallback(
        (id: string, name: string) => {
            updateMutate(
                { id, name },
                {
                    onSuccess: () => {
                        client.invalidateQueries({ queryKey: [queryKeys.rooms] });
                        setEditedRoomId('');
                        showSuccess('Pokój został edytowany pomyślnie!');
                    },
                    onError: (error) => {
                        showError(error, 'Coś poszło nie tak!');
                    },
                }
            );
        },
        [updateMutate, client, showSuccess, showError]
    );

    const handleCreate = useCallback(
        (name: string) => {
            createMutate(
                { name },
                {
                    onSuccess: () => {
                        client.invalidateQueries({ queryKey: [queryKeys.rooms] });
                        showSuccess('Pokój został utworzony pomyślnie!');
                    },
                    onError: (error) => {
                        showError(error, 'Coś poszło nie tak!');
                    },
                }
            );
        },
        [createMutate, client, showSuccess, showError]
    );

    const handleDelete = useCallback(
        (id: string) => {
            deleteMutate(
                { id },
                {
                    onSuccess: () => {
                        client.invalidateQueries({ queryKey: [queryKeys.rooms] });
                        showSuccess('Pokój został usunięty pomyślnie!');
                    },
                    onError: (error) => {
                        showError(error, 'Coś poszło nie tak!');
                    },
                }
            );
        },
        [deleteMutate, client, showSuccess, showError]
    );

    return (
        <Modal isCentered isOpen={true} onClose={handleClose}>
            <ModalOverlay backdropFilter="blur(20px)" />
            <ModalContent bg={'gray.900'}>
                <ModalHeader>
                    <Text>Zarządzaj pokojami</Text>
                    <ModalCloseButton />
                </ModalHeader>
                <When condition={isRoomsLoading}>
                    <DialogSpinner />
                </When>

                <ModalBody>
                    <Stack spacing={4}>
                        {map(rooms, (room) => (
                            <RoomItem
                                key={room.id}
                                id={room.id}
                                name={room.name}
                                isDeletable={rooms ? rooms.length > 1 : false}
                                onUpdate={handleUpdate}
                                onDelete={handleDelete}
                                editedRoomId={editedRoomId}
                                setEditedRoomId={setEditedRoomId}
                            />
                        ))}
                    </Stack>
                </ModalBody>

                <ModalFooter mt={4}>
                    <If condition={isNewRoom}>
                        <Then>
                            <HStack w={'100%'}>
                                <Input size="sm" onChange={(e) => setRoomName(e.target.value)} />
                                <IconButton
                                    variant="outline"
                                    colorScheme="green"
                                    size={'sm'}
                                    aria-label="Edit"
                                    icon={<CheckIcon />}
                                    onClick={() => {
                                        handleCreate(roomName);
                                        setIsNewRoom(false);
                                    }}
                                />
                                <IconButton
                                    variant="outline"
                                    colorScheme="red"
                                    size={'sm'}
                                    aria-label="Edit"
                                    icon={<CloseIcon />}
                                    onClick={() => setIsNewRoom(false)}
                                />
                            </HStack>
                        </Then>
                        <Else>
                            <When condition={rooms ? rooms.length <= 10 : false}>
                                <Button
                                    size={'sm'}
                                    onClick={() => {
                                        setEditedRoomId('');
                                        setIsNewRoom(true);
                                    }}
                                    colorScheme="blue"
                                >
                                    Utwórz Pokój
                                </Button>
                            </When>
                        </Else>
                    </If>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default Page;
