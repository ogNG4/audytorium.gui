import auth from '@/utils/auth';
import { useCallback } from 'react';
import { useLocalStorage } from 'react-use';

function useToken() {
    const [localToken, setLocalToken] = useLocalStorage<string | null>(auth.tokenName, null, { raw: true });

    const setToken = useCallback(
        (token: string) => {
            setLocalToken(token);
        },
        [setLocalToken]
    );

    const removeToken = useCallback(() => {
        setLocalToken(null);
    }, [setLocalToken]);

    return {
        token: localToken,
        setToken,
        removeToken,
    };
}

export default useToken;
