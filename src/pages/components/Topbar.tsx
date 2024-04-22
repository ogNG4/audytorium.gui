import { Avatar, Menu, MenuButton, Stack, HStack, Button, MenuList, MenuItem, Text, Box } from '@chakra-ui/react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Logo from '@/assets/logo.svg';

function UserMenu() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    return (
        <Menu>
            <MenuButton
                as={Button}
                py={6}
                bg={'transparent'}
                _hover={{ bg: 'transparent' }}
                _active={{ bg: 'trasparent' }}
            >
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Avatar size={'sm'} />
                </Stack>
            </MenuButton>
            <MenuList bg={'gray.700'}>
                <MenuItem onClick={() => navigate('/logout')} bg={'gray.700'}>
                    <Text>{t('Wyloguj')}</Text>
                </MenuItem>
            </MenuList>
        </Menu>
    );
}

function TopBar() {
    return (
        <HStack height={'60px'} bg={'gray.900'} w={'100%'} px={4} py={2} zIndex={999} justifyContent={'space-between'}>
            <NavLink to="/">
                <Box ml={8}>
                    <img src={Logo} alt="Logo" width={180} />
                </Box>
            </NavLink>
            <HStack>
                <Link to="admin-panel/users">
                    <Text>Użytkownicy</Text>
                </Link>
                <UserMenu />
            </HStack>
        </HStack>
    );
}

export default memo(TopBar);
