import { InputProps, SelectProps, Text, VStack, Select } from '@chakra-ui/react';
import { memo } from 'react';
import { FieldPath, FieldValues, UseControllerProps, useController } from 'react-hook-form';

function SelectInput<T extends FieldValues = FieldValues, S extends FieldPath<T> = FieldPath<T>>({
    name,
    defaultValue,
    children,
    ...props
}: InputProps & UseControllerProps<T, S> & SelectProps) {
    const {
        field: { value, onChange },
        fieldState: { error },
    } = useController({
        name,
        defaultValue,
    });

    return (
        <VStack alignItems={'start'} w={'full'}>
            <Select isInvalid={!!error} value={value} onChange={onChange} {...props}>
                {children}
            </Select>
            {error && (
                <Text fontSize={'sm'} color={'crimson'}>
                    {error.message}
                </Text>
            )}
        </VStack>
    );
}

export default memo(SelectInput) as typeof SelectInput;
