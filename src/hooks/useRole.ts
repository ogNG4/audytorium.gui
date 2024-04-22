import auth from '@/utils/auth';
import { AppRoleName, VerifyRolesOperator } from '@/types/auth';

export const useRole = (requiredRoles: AppRoleName[], operator?: VerifyRolesOperator) => {
    const decodedToken = auth.getDecodedToken();
    if (!decodedToken) return false;
    return auth.checkRoles({ roles: decodedToken.roles, requiredRoles, operator });
};

export default useRole;
