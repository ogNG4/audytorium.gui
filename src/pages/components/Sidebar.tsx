import { memo } from 'react';
import { Box, Menu, MenuButton, MenuItem, MenuList, Stack, VStack, Text, Button, MenuDivider } from '@chakra-ui/react';
import { useRoomsQuery } from '@/hooks';
import { filter, map } from 'lodash';
import { NavLink, useNavigate } from 'react-router-dom';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { cutString } from '../../utils/common';
import Logo from '@/assets/logo.svg';

function TopMenu() {
    const { data: rooms } = useRoomsQuery();
    const navigate = useNavigate();
    const selectedRoom = localStorage.getItem('selectedRoom');

    return (
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
                        filter(rooms ?? [], (room) => room.id === selectedRoom)[0]?.name ||
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
                                navigate(`/${room.id}`);
                                localStorage.setItem('selectedRoom', room.id);
                            }}
                        >
                            <Text>{cutString(room.name, 30)}</Text>
                        </MenuItem>
                    ))}
                    <MenuDivider />
                    <MenuItem bg={'gray.700'} onClick={() => navigate('/admin-panel/rooms')}>
                        Zarządzaj Pokojami <ChevronDownIcon ml={2} />
                    </MenuItem>
                </MenuList>
            </Menu>
        </Box>
    );
}

function Sidebar() {
    return (
        <VStack
            height={'100vh'}
            bg={'gray.900'}
            w={'270px'}
            justifyContent={'space-between'}
            position={'fixed'}
            py={4}
            zIndex={9999}
        >
            <Stack w={'100%'} alignItems={'center'} spacing={4}>
                <NavLink to="/">
                    <Box>
                        <img src={Logo} alt="Logo" width={180} />
                    </Box>
                </NavLink>
                <TopMenu />
            </Stack>
            <Stack></Stack>
            <Stack></Stack>
        </VStack>
    );
}

export default memo(Sidebar);
