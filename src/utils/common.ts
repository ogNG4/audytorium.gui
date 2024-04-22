import { AppRoleName } from '@/types/auth';

const roleDescriptions = {
    [AppRoleName.SuperAdmin]: 'Super Administrator',
    [AppRoleName.Admin]: 'Administrator',
    [AppRoleName.Auditor]: 'Audytor',
};

export const transformRoleName = (role: AppRoleName) => {
    return roleDescriptions[role] || '';
};
