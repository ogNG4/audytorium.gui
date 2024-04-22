import { Avatar, Menu, MenuButton, Stack, HStack, Button, MenuList, MenuItem } from '@chakra-ui/react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

// const MenuItem = ({ children, ...props }) => {
//     return (
//         <MenuItem _hover={{ bg: 'gray.800' }} _focus={{ bg: 'gray.800' }} _active={{ bg: 'gray.800' }} {...props}>
//             {children}
//         </MenuItem>
//     );
// };

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
                    {t('Wyloguj')}
                </MenuItem>
            </MenuList>
        </Menu>
    );
}

// function TopBarMenuItem(){
//     return
// }

function TopBar() {
    return (
        <HStack height={'60px'} bg={'gray.900'} w={'100%'} justifyContent={'end'} px={4} py={2}>
            <Stack></Stack>
            <Stack>
                <Link to="admin-panel/users">Użytkownicy</Link>
            </Stack>
            <Stack>
                <UserMenu />
            </Stack>
        </HStack>
    );
}

export default memo(TopBar);
