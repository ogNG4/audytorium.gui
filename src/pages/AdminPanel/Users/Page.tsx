import { Avatar, Button, HStack, IconButton, Stack, Tag, Text, useDisclosure } from '@chakra-ui/react';
import { useDeleteUserMutation, useUsersQuery, useToast } from '@/hooks';
import DataTable from '@/components/Table/DataTable';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import PrimarySpinner from '@/components/Spinner/PrimarySpinner';
import { Else, If, Then, When } from 'react-if';
import RoleBadge from '@/components/Badge/RoleBadge';
import { AppRoleName, Token } from '@/types/auth';
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Outlet, useLoaderData, useNavigate } from 'react-router-dom';
import { isNewParam } from '@/constants/common';
import ConfirmationModal from '@/components/Modal/ConfirmationModal';
import { useCallback, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import queryKeys from '@/constants/queryKeys';

interface TableData {
    id: string;
    name: string;
    email: string;
    role: string;
    isActive: boolean;
}

function Page() {
    const { data, isLoading } = useUsersQuery();
    const { mutate: deleteUserMutate, isPending: isDeletePending } = useDeleteUserMutation();
    const { showSuccess, showError } = useToast();
    const [userId, setUserId] = useState('');
    const user = useLoaderData() as Token;
    const columnHelper = createColumnHelper<TableData>();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();
    const client = useQueryClient();

    const tableData: TableData[] =
        data?.map((user) => ({
            id: user.id,
            name: user.firstName + ' ' + user.lastName,
            email: user.email,
            role: user.roles[0],
            isActive: user.isActive,
        })) ?? [];

    const columns = [
        columnHelper.accessor('name', {
            cell: (row) => (
                <HStack>
                    <Avatar name={row.getValue()} size="sm" />
                    <Text>{row.getValue()}</Text>
                </HStack>
            ),
            header: 'Nazwa',
            size: 12,
            enableResizing: true,
        }),
        columnHelper.accessor('email', {
            cell: (info) => <Text>{info.getValue()}</Text>,
            header: 'Email',
        }),
        columnHelper.accessor('role', {
            cell: (info) => <RoleBadge role={info.getValue() as AppRoleName} />,
            header: 'Rola',
        }),
        columnHelper.accessor('isActive', {
            cell: (info) => {
                return (
                    <If condition={info.getValue()}>
                        <Then>
                            <Tag colorScheme="green">Aktywny</Tag>
                        </Then>
                        <Else>
                            <Tag colorScheme="red">Nieaktywny</Tag>
                        </Else>
                    </If>
                );
            },
            header: 'Status',
        }),
        columnHelper.accessor('id', {
            cell: (info) => {
                return (
                    <HStack>
                        <IconButton
                            variant="outline"
                            colorScheme="blue"
                            size={'sm'}
                            aria-label="Edit"
                            icon={<EditIcon />}
                            onClick={() => navigate(`${info.getValue()}`)}
                        />
                        <When condition={info.getValue() !== user.id}>
                            <IconButton
                                variant="outline"
                                colorScheme="red"
                                size={'sm'}
                                aria-label="Send email"
                                icon={<DeleteIcon />}
                                onClick={() => {
                                    setUserId(info.getValue());
                                    onOpen();
                                }}
                            />
                        </When>
                    </HStack>
                );
            },
            header: '',
        }),
    ];

    const handleDelete = useCallback(
        (id: string) => {
            deleteUserMutate(
                { id },
                {
                    onSuccess: () => {
                        client.invalidateQueries({ queryKey: [queryKeys.users] });
                        showSuccess('Użytkownik został usunięty pomyślnie!');
                        onClose();
                    },
                    onError: (error) => {
                        showError(error, 'Coś poszło nie tak!');
                    },
                }
            );
        },
        [deleteUserMutate, onClose, showError, showSuccess, client]
    );

    return (
        <>
            <Outlet />
            <ConfirmationModal
                isOpen={isOpen}
                onClose={onClose}
                isLoading={isDeletePending}
                onConfirm={() => handleDelete(userId)}
                title="Czy na pewno chcesz usunąć użytkownika?"
                description="Tej operacji nie można cofnąć!"
                confirmText="Usuń"
            />
            <Stack w={'80%'}>
                <If condition={isLoading}>
                    <Then>
                        <PrimarySpinner />
                    </Then>
                    <Else>
                        <Stack justifyContent="space-between" spacing={4}>
                            <HStack justifyContent={'space-between'}>
                                <Text as="b">Użytkownicy</Text>
                                <Button
                                    leftIcon={<AddIcon color={'white'} />}
                                    variant="outlined"
                                    size="sm"
                                    onClick={() => navigate(`${isNewParam}`)}
                                >
                                    <Text>Dodaj użytkownika</Text>
                                </Button>
                            </HStack>
                            {data && <DataTable columns={columns as ColumnDef<object, TableData>[]} data={tableData} />}
                        </Stack>
                    </Else>
                </If>
            </Stack>
        </>
    );
}

export default Page;
