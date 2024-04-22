import { useToast as useChakraToast } from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { useMemo } from 'react';
import { get } from 'lodash';
import { useTranslation } from 'react-i18next';

const toastConfig = {
    duration: 5000,
    isClosable: true,
};

function useToast() {
    const toast = useChakraToast();
    const { t } = useTranslation();

    const errorCodes = useMemo(() => {
        return {
            INVALID_CREDENTIALS: 'Nieprawidłowe dane logowania!',
            INVALID_TOKEN: 'Nieprawidłowy token!',
            TOKEN_EXPIRED: ' Token wygasł!',
            USER_NOT_FOUND: 'Użytkownik nie istnieje!',
            USER_ALREADY_EXISTS: 'Użytkownik już istnieje!',
            EMAIL_ALREADY_EXISTS: 'Email już istnieje!',
            ROLE_NOT_FOUND: 'Rola nie istnieje!',
        };
    }, []);

    const showError = (error: AxiosError, message: string) => {
        let errorMessage = '';
        const errorCode = get(error, 'response.data.message', '');
        errorMessage = get(errorCodes, errorCode, message);

        toast({
            description: t(errorMessage),
            status: 'error',
            ...toastConfig,
        });
    };

    const showSuccess = (message: string) => {
        toast({
            description: t(message),
            status: 'success',
            ...toastConfig,
        });
    };

    return {
        showError,
        showSuccess,
    };
}

export default useToast;
