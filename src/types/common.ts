import { AppRoleName, VerifyRolesOperator } from './auth';

export interface RolesAccessProps {
    roles: AppRoleName[];
    requiredRoles: AppRoleName[];
    operator?: VerifyRolesOperator;
}
