import LoadingButton from '@/components/Button/LoadingButton';
import SimpleForm from '@/components/Form/SimpleForm';
import TextInput from '@/components/Form/TextInput';
import { useMemo, useState } from 'react';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useCreateAccountMutation, useToast } from '@/hooks';
import { IconButton, InputGroup, InputRightElement } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

interface FormInput {
    email: string;
    password: string;
    repeatPassword: string;
    firstName: string;
    lastName: string;
}

function CreateAccountForm() {
    const { t } = useTranslation();
    const { mutate } = useCreateAccountMutation();
    const navigate = useNavigate();
    const { showError, showSuccess } = useToast();
    const [show, setShow] = useState(false);
    const validationSchema = useMemo(() => {
        return yup.object().shape({
            email: yup.string().required(t('Email jest wymagany')).email(t('Email jest niepoprawny')),
            password: yup.string().required(t('Hasło jest wymagane')),
            repeatPassword: yup
                .string()
                .required(t('Hasło jest wymagane'))
                .oneOf([yup.ref('password')], t('Hasła muszą być takie same')),
            firstName: yup.string().required(t('Imię jest wymagane')),
            lastName: yup.string().required(t('Nazwisko jest wymagane')),
        });
    }, [t]);

    const handleSubmit = ({ email, password, firstName, lastName }: FormInput) => {
        mutate(
            { email, password, firstName, lastName },
            {
                onSuccess: () => {
                    showSuccess('Account created succesful!');
                    navigate('/login');
                },
                onError: () => showError('Invalid credentials'),
            }
        );
    };

    const defaultValues = useMemo(() => {
        return {
            email: '',
            password: '',
        };
    }, []);

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
            <TextInput<FormInput> name="email" placeholder={t('Email')} />
            <TextInput<FormInput> name="firstName" placeholder={t('Imię')} />
            <TextInput<FormInput> name="lastName" placeholder={t('Nazwisko')} />
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

            <LoadingButton w={'full'} type="submit">
                {t('Utwórz konto')}
            </LoadingButton>
        </SimpleForm>
    );
}

export default CreateAccountForm;
