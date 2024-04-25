import Result from './Result';

function UnauthorizedError() {
    return <Result code="401" message=" Zaloguj się, aby uzyskać dostęp do tej strony" />;
}

export default UnauthorizedError;
