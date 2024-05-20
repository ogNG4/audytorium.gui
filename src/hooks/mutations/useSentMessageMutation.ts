import { paths } from '@/types/apiSchema';
import api from '@/utils/api';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const path: keyof paths = '/chatbot/send-message';
type MutationPath = paths[typeof path]['post'];

type Response = MutationPath['responses']['200'];
type RequestParams = MutationPath['requestBody']['content']['application/json'];

const postSentMessage = async (params: RequestParams) => {
    const { data } = await api.getClient().post(path, params);
    return data;
};

export default function useSentMessageMutation(options: UseMutationOptions<Response, AxiosError, RequestParams> = {}) {
    return useMutation<Response, AxiosError, RequestParams>({
        ...options,
        mutationFn: (params: RequestParams) => postSentMessage(params),
    });
}
