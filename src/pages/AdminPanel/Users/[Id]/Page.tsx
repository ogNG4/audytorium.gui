import SelectInput from '@/components/Form/SelectInput';
import TextInput from '@/components/Form/TextInput';
import { isNewParam } from '@/constants/common';
import {
    useCreateUserMutation,
    useRolesQuery,
    useToast,
    useUpdateUserMutation,
    useUserQuery,
    useValidator,
} from '@/hooks';
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
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Else, If, Then, When } from 'react-if';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { map } from 'lodash';
import { transformRoleName } from '@/utils/common';
import { useQueryClient } from '@tanstack/react-query';
import queryKeys from '@/constants/queryKeys';
import LoadingButton from '@/components/Button/LoadingButton';
import DialogSpinner from '@/components/Spinner/DialogSpinner';
import { AppRoleName } from '@/types/auth';

interface FormInput {
    email: string;
    firstName: string;
    lastName: string;
    role: string;
}

function Page() {
    const navigate = useNavigate();
    const { userId } = useParams();
    const isNew = userId === isNewParam.toString();
    const { emailValidator } = useValidator();
    const { data: roles } = useRolesQuery();
    const { data: userData, isLoading: isUserLoading } = useUserQuery(
        { id: userId! },
        { enabled: !isNew, queryKey: [queryKeys.user, userId] }
    );
    const { mutate: createMutate, isPending: isCreatePending } = useCreateUserMutation();
    const { mutate: updateMutate, isPending: isUpdatePending } = useUpdateUserMutation();
    const { showSuccess, showError } = useToast();
    const client = useQueryClient();

    const validationSchema = useMemo(() => {
        return yup.object().shape({
            email: emailValidator,
            firstName: yup.string().required('Imię jest wymagane').max(50, 'Imię jest za długie'),
            lastName: yup.string().required('Nazwisko jest wymagane').max(50, 'Nazwisko jest za długie'),
            role: yup.string().required('Rola jest wymagana'),
        });
    }, [emailValidator]);

    const methods = useForm<FormInput>({
        resolver: yupResolver(validationSchema),
    });

    const { handleSubmit, reset } = methods;

    const handleClose = useCallback(() => {
        navigate('/admin-panel/users');
    }, [navigate]);

    const handleSave = useCallback(() => {
        handleSubmit((data) => {
            if (isNew) {
                createMutate(data, {
                    onSuccess: () => {
                        handleClose();
                        client.invalidateQueries({ queryKey: [queryKeys.users] });
                        showSuccess('Użytkownik został utworzony!');
                    },
                    onError: (error) => {
                        showError(error, 'Coś poszło nie tak!');
                    },
                });
            }

            if (!isNew && userId) {
                updateMutate(
                    { id: userId, ...data },
                    {
                        onSuccess: () => {
                            handleClose();
                            client.invalidateQueries({ queryKey: [queryKeys.users] });
                            showSuccess('Użytkownik został edytowany pomyślnie!');
                        },
                        onError: (error) => {
                            showError(error, 'Coś poszło nie tak!');
                        },
                    }
                );
            }
        })();
    }, [handleSubmit, createMutate, updateMutate, isNew, userId, client, showSuccess, showError, handleClose]);

    useEffect(() => {
        reset({
            email: userData?.email || '',
            firstName: userData?.firstName || '',
            lastName: userData?.lastName || '',
            role: userData?.roles[0] || '',
        });
    }, [reset, userData?.email, userData?.firstName, userData?.lastName, userData?.roles]);

    return (
        <FormProvider {...methods}>
            <Modal isCentered isOpen={true} onClose={handleClose}>
                <ModalOverlay backdropFilter="blur(10px)" />
                <ModalContent bg={'gray.900'}>
                    <When condition={isUserLoading}>
                        <DialogSpinner />
                    </When>
                    <ModalHeader>
                        <If condition={isNew}>
                            <Then>
                                <Text>Utwórz użytkownika</Text>
                            </Then>
                            <Else>
                                <Text>Edytuj użytkownika</Text>
                            </Else>
                        </If>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack spacing={6}>
                            <TextInput<FormInput> isRequired={true} name="email" placeholder="Email" />
                            <TextInput<FormInput> isRequired={true} name="firstName" placeholder="Imię" />
                            <TextInput<FormInput> isRequired={true} name="lastName" placeholder="Nazwisko" />
                            <SelectInput<FormInput> name="role" colorScheme="black">
                                <option value="">Rola</option>
                                {map(roles, (role) => (
                                    <option key={role.name} value={role.name}>
                                        {transformRoleName(role.name as AppRoleName)}
                                    </option>
                                ))}
                            </SelectInput>
                        </Stack>
                    </ModalBody>

                    <ModalFooter>
                        <Button size={'sm'} mr={'2'} variant={'outlined'} onClick={handleClose}>
                            Anuluj
                        </Button>
                        <LoadingButton size={'sm'} onClick={handleSave} isLoading={isCreatePending || isUpdatePending}>
                            Zapisz
                        </LoadingButton>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </FormProvider>
    );
}

export default Page;
