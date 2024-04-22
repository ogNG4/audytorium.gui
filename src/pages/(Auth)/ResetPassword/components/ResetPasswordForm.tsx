import LoadingButton from '@/components/Button/LoadingButton';
import SimpleForm from '@/components/Form/SimpleForm';
import TextInput from '@/components/Form/TextInput';
import { useEffect, useMemo, useState } from 'react';
import * as yup from 'yup';
import { useResetPasswordMutation, useToast, useToken, useValidator } from '@/hooks';
import { useNavigate } from 'react-router-dom';
import { If, Then, Else } from 'react-if';
import { Button, Text } from '@chakra-ui/react';
interface FormInput {
    email: string;
}

function ResetPasswordForm() {
    const { mutate, isPending } = useResetPasswordMutation();
    const { showSuccess } = useToast();
    const { emailValidator } = useValidator();
    const { token } = useToken();
    const navigate = useNavigate();
    const [emailSent, setEmailSent] = useState(false);

    const validationSchema = useMemo(() => {
        return yup.object().shape({
            email: emailValidator,
        });
    }, [emailValidator]);

    const handleSubmit = ({ email }: FormInput) => {
        mutate(
            { email },
            {
                onSettled: () => {
                    showSuccess('Email został wysłany!');
                    setEmailSent(true);
                },
            }
        );
    };

    const defaultValues = useMemo(() => {
        return {
            email: '',
        };
    }, []);

    useEffect(() => {
        if (token) navigate('/');
    }, [token, navigate]);

    return (
        <>
            <If condition={emailSent}>
                <Then>
                    <Text fontSize="2xl">Email wysłany!</Text>
                    <Button onClick={() => navigate('/login')} variant="link">
                        Wróć do logowania
                    </Button>
                </Then>
                <Else>
                    <SimpleForm<FormInput>
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema}
                        defaultValues={defaultValues}
                        w={'xs'}
                    >
                        <TextInput<FormInput> isRequired={true} name="email" placeholder="Email" autoComplete="email" />
                        <LoadingButton w={'full'} type="submit" isLoading={isPending}>
                            Resetuj hasło
                        </LoadingButton>
                    </SimpleForm>
                </Else>
            </If>
        </>
    );
}

export default ResetPasswordForm;
