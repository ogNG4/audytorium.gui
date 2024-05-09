import { EditIcon, DeleteIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { HStack, IconButton, Input, Text, Tooltip } from '@chakra-ui/react';
import { memo, useEffect, useState } from 'react';
import { Else, If, Then, When } from 'react-if';
import { cutString } from '../../../../utils/common';

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
    const [isEdited, setIsEdited] = useState(false);
    const [roomName, setRoomName] = useState(name);

    useEffect(() => {
        setIsEdited(id === editedRoomId);
    }, [id, editedRoomId]);

    return (
        <HStack justifyContent={'space-between'}>
            <If condition={isEdited}>
                <Then>
                    <Input defaultValue={name} size="sm" onChange={(e) => setRoomName(e.target.value)} />
                </Then>
                <Else>
                    <Tooltip label={name} aria-label="A tooltip">
                        <Text fontWeight={'500'}>{cutString(name, 30)}</Text>
                    </Tooltip>
                </Else>
            </If>
            <HStack spacing={2}>
                <If condition={isEdited}>
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
                            onClick={() => setIsEdited(false)}
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
