import LoadingButton from '@/components/Button/LoadingButton';
import SimpleForm from '@/components/Form/SimpleForm';
import TextInput from '@/components/Form/TextInput';
import { useEffect, useMemo, useState } from 'react';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useSetNewPasswordMutation, useToast, useToken } from '@/hooks';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { IconButton, InputGroup, InputRightElement } from '@chakra-ui/react';
interface FormInput {
    password: string;
    repeatPassword: string;
}

function NewPasswordForm() {
    const { t } = useTranslation();
    const { mutate, isPending } = useSetNewPasswordMutation();
    const { showError, showSuccess } = useToast();
    const { token } = useToken();
    const [show, setShow] = useState(false);
    const [searchParams] = useSearchParams();
    const setPasswordToken = searchParams.get('token');
    const userId = searchParams.get('accountId');
    const navigate = useNavigate();

    const validationSchema = useMemo(() => {
        return yup.object().shape({
            password: yup.string().required(t('Hasło jest wymagane')),
            repeatPassword: yup
                .string()
                .required(t('Hasło jest wymagane'))
                .oneOf([yup.ref('password')], t('Hasła muszą być takie same')),
        });
    }, [t]);

    const handleSubmit = ({ password }: FormInput) => {
        if (!setPasswordToken || !userId) return;
        mutate(
            { password, token: setPasswordToken, userId },
            {
                onSuccess: () => {
                    showSuccess('Hasło zostało zmienione pomyślnie!');
                    navigate('/login');
                },
                onError: (error) => showError(error, 'Coś poszło nie tak!'),
            }
        );
    };

    const defaultValues = useMemo(() => {
        return {
            password: '',
            repeatPassword: '',
        };
    }, []);

    useEffect(() => {
        if (token) navigate('/');
        if (!setPasswordToken || !userId) throw new Error();
    }, [token, navigate, setPasswordToken, userId]);

    const ToggleButton = () => {
        return (
            <IconButton
                aria-label={t('Toggle password visibility')}
                bg={'transparent'}
                _hover={{ bg: 'transparent' }}
                onClick={() => setShow(!show)}
                icon={show ? <ViewOffIcon color={'white'} /> : <ViewIcon color={'white'} />}
            />
        );
    };

    return (
        <SimpleForm<FormInput>
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            defaultValues={defaultValues}
            w={'xs'}
        >
            <InputGroup>
                <TextInput<FormInput> type={show ? 'text' : 'password'} name="password" placeholder={t('Hasło')} />
                <InputRightElement>
                    <ToggleButton />
                </InputRightElement>
            </InputGroup>
            <TextInput<FormInput>
                type={show ? 'text' : 'password'}
                name="repeatPassword"
                placeholder={t('Powtórz hasło')}
            />

            <LoadingButton w={'full'} type="submit" isLoading={isPending} isDisabled={!userId || !setPasswordToken}>
                {t('Resetuj hasło')}
            </LoadingButton>
        </SimpleForm>
    );
}

export default NewPasswordForm;
