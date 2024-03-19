import { useToast as useChakraToast } from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';

const toastConfig = {
    duration: 5000,
    isClosable: true,
};

function useToast() {
    const toast = useChakraToast();
    const { t } = useTranslation();

    const showError = (error: AxiosError | string) => {
        let errorMessage;
        if (typeof error === 'string') errorMessage = error;
        else errorMessage = error.response?.statusText || 'An error occurred';

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
