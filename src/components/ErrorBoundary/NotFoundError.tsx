import Result from './Result';

function NotFoundError() {
    return <Result code="404" message="Nie znaleziono strony" />;
}

export default NotFoundError;
