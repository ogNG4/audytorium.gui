import { paths } from '@/types/apiSchema';
import api from '@/utils/api';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const path: keyof paths = '/auth/reset-password';
type MutationPath = paths[typeof path]['post'];

type Response = MutationPath['responses']['200'];
type RequestParams = MutationPath['requestBody']['content']['application/json'];

const postResetPassword = async (params: RequestParams) => {
    const { data } = await api.getClient().post(path, params);
    return data;
};

export default function useResetPasswordMutation(
    options: UseMutationOptions<Response, AxiosError, RequestParams> = {}
) {
    return useMutation<Response, AxiosError, RequestParams>({
        ...options,
        mutationFn: (params: RequestParams) => postResetPassword(params),
    });
}
