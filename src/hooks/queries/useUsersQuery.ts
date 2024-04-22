import queryKeys from '@/constants/queryKeys';
import { paths } from '@/types/apiSchema';
import api from '@/utils/api';
import { UseMutationOptions, UseQueryResult, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const path: keyof paths = '/user/all';
type QueryPath = paths[typeof path]['get'];
type Response = QueryPath['responses']['200']['content']['application/json'];

const getUsers = async () => {
    const { data } = await api.getClient().get(path);
    return data;
};

export default function useUsersQuery(
    options: UseMutationOptions<Response, AxiosError> = {}
): UseQueryResult<Response, AxiosError> {
    return useQuery<Response, AxiosError>({
        ...options,
        queryKey: [queryKeys.users],
        queryFn: () => getUsers(),
    });
}
