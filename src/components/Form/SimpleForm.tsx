import { PropsWithChildren, memo, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FieldValues, FormProvider, SubmitHandler, UseFormProps, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { ChakraProps, VStack } from '@chakra-ui/react';

interface SimpleFormProps<T extends FieldValues> {
    onSubmit: SubmitHandler<T>;
    validationSchema?: Yup.AnyObjectSchema;
}

function SimpleForm<T extends FieldValues>({
    children,
    defaultValues,
    onSubmit,
    validationSchema,
    ...props
}: PropsWithChildren<UseFormProps<T> & SimpleFormProps<T> & ChakraProps>) {
    const methods = useForm({
        defaultValues,
        resolver: validationSchema ? yupResolver(validationSchema) : undefined,
    });
    const { handleSubmit, reset } = methods;

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues, reset]);

    return (
        <FormProvider {...methods}>
            <VStack as="form" spacing={4} noValidate onSubmit={handleSubmit(onSubmit)} {...props}>
                {children}
            </VStack>
        </FormProvider>
    );
}

export default memo(SimpleForm) as typeof SimpleForm;
