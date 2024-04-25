import { useRouteError } from 'react-router-dom';
import NotFoundError from './NotFoundError';
import ForbiddenError from './ForbiddenError';
import UnauthorizedError from './UnauthorizedError';
import Result from './Result';

function RouteBoundary() {
    const error = useRouteError();

    if (error && typeof error === 'object' && 'status' in error && typeof error.status === 'number') {
        if (error.status === 404) {
            return <NotFoundError />;
        }

        if (error.status === 403) {
            return <ForbiddenError />;
        }

        if (error.status === 401) {
            return <UnauthorizedError />;
        }
    }
    return <Result code="500" message="Coś poszło nie tak" />;
}
export default RouteBoundary;
