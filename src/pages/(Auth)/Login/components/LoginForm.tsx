import LoadingButton from '@/components/Button/LoadingButton';
import SimpleForm from '@/components/Form/SimpleForm';
import TextInput from '@/components/Form/TextInput';
import { useEffect, useMemo } from 'react';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useLoginMutation, useToast, useToken } from '@/hooks';
import { useNavigate } from 'react-router-dom';
interface FormInput {
    email: string;
    password: string;
}

function LoginForm() {
    const { t } = useTranslation();
    const { mutate, isPending } = useLoginMutation();
    const { showError, showSuccess } = useToast();
    const { setToken, token } = useToken();
    const navigate = useNavigate();
    const validationSchema = useMemo(() => {
        return yup.object().shape({
            email: yup.string().required(t('Email jest wymagany')).email(t('Email jest nieprawidłowy')),
            password: yup.string().required(t('Hasło jest wymagane')),
        });
    }, [t]);

    const handleSubmit = ({ email, password }: FormInput) => {
        mutate(
            { email, password },
            {
                onSuccess: (data) => {
                    showSuccess('Login successful!');
                    setToken(data.accessToken);
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

    useEffect(() => {
        if (token) navigate('/');
    }, [token, navigate]);

    return (
        <SimpleForm<FormInput>
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            defaultValues={defaultValues}
            w={'xs'}
        >
            <TextInput<FormInput> isRequired={true} name="email" placeholder="Email" />
            <TextInput<FormInput> name="password" placeholder="Hasło" type='password' />
            <LoadingButton w={'full'} type="submit" isLoading={isPending}>
                {t('Login')}
            </LoadingButton>
        </SimpleForm>
    );
}

export default LoginForm;
