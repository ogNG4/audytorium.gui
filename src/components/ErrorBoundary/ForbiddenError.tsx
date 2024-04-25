import Result from './Result';

function ForbiddenError() {
    return <Result code="403" message="Nie masz dostępu do tej strony." />;
}

export default ForbiddenError;
