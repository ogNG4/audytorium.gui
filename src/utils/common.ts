import { AppRoleName } from '@/types/auth';

const roleDescriptions = {
    [AppRoleName.SuperAdmin]: 'Super Administrator',
    [AppRoleName.Admin]: 'Administrator',
    [AppRoleName.Auditor]: 'Audytor',
};

export const transformRoleName = (role: AppRoleName) => {
    return roleDescriptions[role] || '';
};

export const cutString = (str: string, length: number) => {
    return str.length > length ? `${str.slice(0, length)}...` : str;
};
