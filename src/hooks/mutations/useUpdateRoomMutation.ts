import { paths } from '@/types/apiSchema';
import api from '@/utils/api';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const path: keyof paths = '/room';
type MutationPath = paths[typeof path]['put'];

type Response = MutationPath['responses']['200'];
type RequestParams = MutationPath['requestBody']['content']['application/json'];

const postUpdateRoom = async (params: RequestParams) => {
    const { data } = await api.getClient().put(path, params);
    return data;
};

export default function useUpdateRoomMutation(options: UseMutationOptions<Response, AxiosError, RequestParams> = {}) {
    return useMutation<Response, AxiosError, RequestParams>({
        ...options,
        mutationFn: (params: RequestParams) => postUpdateRoom(params),
    });
}
