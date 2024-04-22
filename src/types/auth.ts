export interface Token {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    roles: AppRoleName[];
    iat: number;
    exp: number;
}

export type VerifyRolesOperator = 'AND' | 'OR';

export enum AppRoleName {
    SuperAdmin = 'SUPER_ADMIN',
    Admin = 'ADMIN',
    Auditor = 'AUDITOR',
}
