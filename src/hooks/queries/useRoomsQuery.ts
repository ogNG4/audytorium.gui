import queryKeys from '@/constants/queryKeys';
import { paths } from '@/types/apiSchema';
import api from '@/utils/api';
import { UseQueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const path: keyof paths = '/room/all';
type QueryPath = paths[typeof path]['get'];
type Response = QueryPath['responses']['200']['content']['application/json'];

export const getRooms = async () => {
    const { data } = await api.getClient().get(path);
    return data;
};

export default function useRoomsQuery(
    options?: UseQueryOptions<Response, AxiosError>
): UseQueryResult<Response, AxiosError> {
    return useQuery<Response, AxiosError>({
        ...options,
        queryKey: [queryKeys.rooms],
        queryFn: () => getRooms(),
    });
}
