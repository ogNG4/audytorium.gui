import { memo, useCallback, useEffect } from 'react';
import {
    Box,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Stack,
    VStack,
    Text,
    Button,
    MenuDivider,
    HStack,
} from '@chakra-ui/react';
import { useConversationsQuery, useRoom, useRoomsQuery, useStartConversationMutation } from '@/hooks';
import { filter, map } from 'lodash';
import { NavLink, useNavigate } from 'react-router-dom';
import { AddIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { cutString } from '../../utils/common';
import Logo from '@/assets/logo.svg';
import { RoleGuard } from '@/components/Access';
import { AppRoleName } from '@/types/auth';
import { components } from '@/types/apiSchema';
import { isNewParam } from '@/constants/common';
import { Else, If, Then } from 'react-if';
import PrimarySpinner from '@/components/Spinner/PrimarySpinner';
import moment from 'moment';
import queryKeys from '@/constants/queryKeys';
import { useQueryClient } from '@tanstack/react-query';

interface SidebarMenuItemProps {
    conversation: components['schemas']['ConversationDto'];
    onClick: () => void;
}
function SidebarMenuItem({ conversation, onClick }: SidebarMenuItemProps) {
    return (
        <Button bg="gray.800" _hover={{ bg: 'gray.700' }} onClick={onClick}>
            <Text color="white">{cutString(moment(conversation.createdAt).format('DD-MM-YYYY HH:mm'), 20)}</Text>
        </Button>
    );
}

function Sidebar() {
    const { room, setRoomId } = useRoom();
    const { data: rooms, isLoading: isRoomsLoading } = useRoomsQuery();
    const {
        data: conversations,
        isLoading: isConversationsLoading,
        refetch,
    } = useConversationsQuery({ roomId: room! });
    const navigate = useNavigate();
    const { mutate: startConversationMutate } = useStartConversationMutation();
    const client = useQueryClient();

    const handleStartConversation = useCallback(() => {
        startConversationMutate(
            { roomId: room! },
            {
                onSuccess: (data) => {
                    client.invalidateQueries({ queryKey: [queryKeys.conversations] });
                    navigate(`/${room}/${data.id}`);
                },
            }
        );
    }, [startConversationMutate, navigate, room, client]);

    useEffect(() => {
        if (room) {
            refetch();
        }
    }, [room, refetch]);

    return (
        <VStack
            height={'100vh'}
            bg={'gray.900'}
            w={'270px'}
            py={4}
            position="fixed"
            zIndex={9999}
            overflowY="scroll"
            css={{
                '&::-webkit-scrollbar': {
                    width: '4px',
                },
                '&::-webkit-scrollbar-track': {
                    width: '6px',
                },
                '&::-webkit-scrollbar-thumb': {
                    background: '#f7f5f5',
                    borderRadius: '24px',
                },
            }}
        >
            <NavLink to="/">
                <Box>
                    <img src={Logo} alt="Logo" width={180} />
                </Box>
            </NavLink>
            <If condition={isRoomsLoading || isConversationsLoading}>
                <Then>
                    <PrimarySpinner />
                </Then>
                <Else>
                    <Box w={'80%'}>
                        <Menu>
                            <MenuButton
                                as={Button}
                                w={'100%'}
                                rightIcon={<ChevronDownIcon />}
                                bg={'transparent'}
                                color={'white'}
                                _hover={{ bg: 'gray.700' }}
                                _active={{ bg: 'gray.700' }}
                            >
                                {cutString(
                                    filter(rooms ?? [], (r) => r.id === room)[0]?.name ||
                                        rooms?.[0]?.name ||
                                        'Brak pokoi',
                                    20
                                )}
                            </MenuButton>
                            <MenuList bg={'gray.700'}>
                                {map(rooms, (room) => (
                                    <MenuItem
                                        key={room.id}
                                        bg={'gray.700'}
                                        onClick={() => {
                                            navigate(`/${room.id}/${isNewParam}`);
                                            setRoomId(room.id);
                                        }}
                                    >
                                        <Text>{cutString(room.name, 30)}</Text>
                                    </MenuItem>
                                ))}
                                <RoleGuard requiredRoles={[AppRoleName.Admin, AppRoleName.SuperAdmin]}>
                                    <MenuDivider />
                                    <MenuItem bg={'gray.700'} onClick={() => navigate('/admin-panel/rooms')}>
                                        Zarządzaj Pokojami <ChevronDownIcon ml={2} />
                                    </MenuItem>
                                </RoleGuard>
                            </MenuList>
                        </Menu>
                    </Box>
                    <Stack>
                        <Button mb={4} bg="gray.800" _hover={{ bg: 'gray.700' }} onClick={handleStartConversation}>
                            <HStack>
                                <AddIcon color="white" />
                                <Text color="white">Nowa Konwersacja</Text>
                            </HStack>
                        </Button>
                        {conversations?.map((conversation) => (
                            <SidebarMenuItem
                                key={conversation.id}
                                conversation={conversation}
                                onClick={() => {
                                    navigate(`${room}/${conversation.id}`);
                                }}
                            />
                        ))}
                    </Stack>
                </Else>
            </If>
        </VStack>
    );
}

export default memo(Sidebar);
