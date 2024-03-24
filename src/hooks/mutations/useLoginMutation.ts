import { paths } from '@/types/apiSchema';
import api from '@/utils/api';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const path: keyof paths = '/auth/sign-in';
type MutationPath = paths[typeof path]['post'];

type Response = MutationPath['responses']['200']['content']['application/json'];
type RequestParams = MutationPath['requestBody']['content']['application/json'];

const postLogin = async (params: RequestParams) => {
    const { data } = await api.getClient().post(path, params);
    return data;
};

export default function useLoginMutation(options: UseMutationOptions<Response, AxiosError, RequestParams> = {}) {
    return useMutation<Response, AxiosError, RequestParams>({
        ...options,
        mutationFn: (params: RequestParams) => postLogin(params),
    });
}
