import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    ModalProps,
    Stack,
    Text,
    VStack,
} from '@chakra-ui/react';
import { memo } from 'react';
import LoadingButton from '@/components/Button/LoadingButton';

interface ConfirmationModalProps extends Omit<ModalProps, 'children'> {
    onConfirm: () => void;
    title: string;
    description: string;
    isLoading?: boolean;
    confirmText?: string;
}

function ConfirmationModal({ onConfirm, title, description, isLoading, ...props }: ConfirmationModalProps) {
    return (
        <Modal isCentered {...props}>
            <ModalOverlay backdropFilter="blur(10px)" />
            <ModalContent bg={'gray.900'}>
                <ModalCloseButton />
                <ModalHeader></ModalHeader>
                <ModalBody>
                    <VStack>
                        <Text fontSize={'xl'} fontWeight={'medium'}>
                            {title}
                        </Text>
                        <Text fontSize={'md'} color={'gray.400'}>
                            {description}
                        </Text>
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Stack spacing={4} direction={'row'}>
                        <Button colorScheme={'gray'} variant="outlined" onClick={props.onClose}>
                            Anuluj kruwa
                        </Button>
                        <LoadingButton colorScheme={'red'} isLoading={isLoading} onClick={onConfirm}>
                            {props.confirmText || 'Potwierdź'}
                        </LoadingButton>
                    </Stack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default memo(ConfirmationModal);
