import { useCallback } from 'react';
import { useLocalStorage } from 'react-use';

function useRoom() {
    const [room, setRoom] = useLocalStorage<string | null>('selectedRoom', null, { raw: true });

    const setRoomId = useCallback(
        (roomId: string) => {
            setRoom(roomId);
        },
        [setRoom]
    );

    return {
        room,
        setRoomId,
    };
}

export default useRoom;
