import { Input, InputProps, Text, VStack } from '@chakra-ui/react';
import { memo } from 'react';
import { FieldPath, FieldValues, UseControllerProps, useController } from 'react-hook-form';

function TextInput<T extends FieldValues = FieldValues, S extends FieldPath<T> = FieldPath<T>>({
    name,
    defaultValue,
    ...props
}: InputProps & UseControllerProps<T, S> & Omit<InputProps, 'variant'>) {
    const {
        field: { value, onChange },
        fieldState: { error },
    } = useController({
        name,
        defaultValue,
    });
    return (
        <VStack alignItems={'start'} w={'full'}>
            <Input size={'md'} isInvalid={!!error} value={value} onChange={onChange} {...props} />
            {error && (
                <Text fontSize={'sm'} color={'crimson'}>
                    {error.message}
                </Text>
            )}
        </VStack>
    );
}

export default memo(TextInput) as typeof TextInput;
