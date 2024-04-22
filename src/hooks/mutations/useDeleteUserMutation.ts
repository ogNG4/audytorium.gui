import { paths } from '@/types/apiSchema';
import api from '@/utils/api';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { replace } from 'lodash';

const path: keyof paths = '/user/{id}';
type MutationPath = paths[typeof path]['delete'];

type Response = MutationPath['responses']['200'];
type RequestParams = MutationPath['parameters']['path'];

const postDeleteUser = async ({ id }: RequestParams) => {
    const { data } = await api.getClient().delete(replace(path, '{id}', id));
    return data;
};

export default function useDeleteUserMutation(options: UseMutationOptions<Response, AxiosError, RequestParams> = {}) {
    return useMutation<Response, AxiosError, RequestParams>({
        ...options,
        mutationFn: (params: RequestParams) => postDeleteUser(params),
    });
}
