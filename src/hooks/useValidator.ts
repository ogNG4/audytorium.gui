import * as yup from 'yup';

const useValidator = () => {
    const emailValidator = yup
        .string()
        .email('Email musi być poprawny')
        .required('Email jest wymagany')
        .test('has-domain', 'Email musi być poprawny', (value) => {
            const regex = /\.[a-zA-Z]{2,}$/;
            return regex.test(value);
        });

    return { emailValidator };
};

export default useValidator;