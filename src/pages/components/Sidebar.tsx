import { Token } from '@/types/auth';
import { Avatar, Menu, MenuButton, Stack, VStack, Text, Button, MenuList, MenuItem } from '@chakra-ui/react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLoaderData, useNavigate } from 'react-router-dom';

function UserMenu() {
    const user = useLoaderData() as Token;
    const { t } = useTranslation();
    const navigate = useNavigate();
    return (
        <Menu>
            <MenuButton as={Button} py={6} bg={'transparent'} _hover={{ bg: 'gray.700' }} _active={{ bg: 'gray.700' }}>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Avatar size={'sm'} />
                    <Stack direction={'row'}>
                        <Text>{user.firstName}</Text>
                        <Text>{user.lastName}</Text>
                    </Stack>
                </Stack>
            </MenuButton>
            <MenuList bg={'gray.700'}>
                <MenuItem onClick={() => navigate('/logout')} bg={'gray.700'}>
                    {t('Wyloguj')}
                </MenuItem>
            </MenuList>
        </Menu>
    );
}

function Sidebar() {
    return (
        <VStack height={'100vh'} bg={'gray.900'} w={'20%'} maxWidth={'280px'} justifyContent={'space-between'} py={4}>
            <Stack></Stack>
            <Stack></Stack>
            <Stack>
                <UserMenu />
            </Stack>
        </VStack>
    );
}

export default memo(Sidebar);
