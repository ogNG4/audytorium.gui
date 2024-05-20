import queryKeys from '@/constants/queryKeys';
import { paths } from '@/types/apiSchema';
import api from '@/utils/api';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { replace } from 'lodash';

const path: keyof paths = '/chatbot/conversation/{id}';
type QueryPath = paths[typeof path]['get'];
type Response = QueryPath['responses']['200']['content']['application/json'];
type RequestParams = QueryPath['parameters']['path'];

const getConversation = async ({ id }: RequestParams) => {
    const { data } = await api.getClient().get(replace(path, '{id}', id));
    return data;
};

export default function useConversationQuery(
    params: RequestParams,
    options: UseQueryOptions<Response, AxiosError, Response>
) {
    return useQuery<Response, AxiosError, Response>({
        ...options,
        queryKey: [queryKeys.conversation, params.id],
        queryFn: () => getConversation(params),
    });
}
