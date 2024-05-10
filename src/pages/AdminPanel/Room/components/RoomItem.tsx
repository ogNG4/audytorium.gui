import { EditIcon, DeleteIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { HStack, IconButton, Input, Text, Tooltip } from '@chakra-ui/react';
import { memo, useState } from 'react';
import { Else, If, Then, When } from 'react-if';
import { cutString } from '@/utils/common';

interface RoomItemProps {
    id: string;
    name: string;
    isDeletable: boolean;
    onUpdate: (id: string, name: string) => void;
    onDelete: (id: string) => void;
    editedRoomId: string;
    setEditedRoomId: (id: string) => void;
}
function RoomItem({ id, name, onUpdate, onDelete, isDeletable, editedRoomId, setEditedRoomId }: RoomItemProps) {
    const [roomName, setRoomName] = useState(name);

    return (
        <HStack justifyContent={'space-between'}>
            <If condition={editedRoomId === id}>
                <Then>
                    <Input defaultValue={name} maxLength={60} size="sm" onChange={(e) => setRoomName(e.target.value)} />
                </Then>
                <Else>
                    <Tooltip label={name} aria-label="A tooltip">
                        <Text fontWeight={'500'}>{cutString(name, 30)}</Text>
                    </Tooltip>
                </Else>
            </If>
            <HStack spacing={2}>
                <If condition={editedRoomId === id}>
                    <Then>
                        <IconButton
                            variant="outline"
                            colorScheme="green"
                            size={'sm'}
                            aria-label="Edit"
                            icon={<CheckIcon />}
                            onClick={() => onUpdate(id, roomName)}
                        />
                        <IconButton
                            variant="outline"
                            colorScheme="red"
                            size={'sm'}
                            aria-label="Edit"
                            icon={<CloseIcon />}
                            onClick={() => setEditedRoomId('')}
                        />
                    </Then>
                    <Else>
                        <IconButton
                            variant="outline"
                            colorScheme="blue"
                            size={'sm'}
                            aria-label="Edit"
                            icon={<EditIcon />}
                            onClick={() => setEditedRoomId(id)}
                        />

                        <When condition={isDeletable}>
                            <IconButton
                                variant="outline"
                                colorScheme="red"
                                size={'sm'}
                                aria-label="Send email"
                                icon={<DeleteIcon />}
                                onClick={() => onDelete(id)}
                            />
                        </When>
                    </Else>
                </If>
            </HStack>
        </HStack>
    );
}

export default memo(RoomItem);
