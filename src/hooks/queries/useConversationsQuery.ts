import queryKeys from '@/constants/queryKeys';
import { paths } from '@/types/apiSchema';
import api from '@/utils/api';
import { UseQueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { replace } from 'lodash';

const path: keyof paths = '/chatbot/conversation/all/{roomId}';
type QueryPath = paths[typeof path]['get'];
type Response = QueryPath['responses']['200']['content']['application/json'];
type RequestParams = QueryPath['parameters']['path'];

const getConversations = async ({ roomId }: RequestParams) => {
    const { data } = await api.getClient().get(replace(path, '{roomId}', roomId));
    return data;
};

export default function useConversationsQuery(
    params: RequestParams,
    options?: UseQueryOptions<Response, AxiosError>
): UseQueryResult<Response, AxiosError> {
    return useQuery<Response, AxiosError>({
        ...options,
        queryKey: [queryKeys.conversations],
        queryFn: () => getConversations(params),
    });
}
