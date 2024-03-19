import { Button, ButtonProps } from '@chakra-ui/react';
import { memo } from 'react';

interface LoadingButtonProps {
    isLoading?: boolean;
}

function LoadingButton({ isLoading, children, ...props }: LoadingButtonProps & ButtonProps) {
    return (
        <Button isLoading={isLoading} colorScheme="teal" {...props}>
            {children}
        </Button>
    );
}

export default memo(LoadingButton);
