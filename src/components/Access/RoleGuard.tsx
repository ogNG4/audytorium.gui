import { useRole } from '@/hooks';
import { RolesAccessProps } from '@/types/common';
import { memo, PropsWithChildren } from 'react';

function RoleGuard({ requiredRoles, operator, children }: Omit<RolesAccessProps, 'roles'> & PropsWithChildren) {
    const hasAccess = useRole(requiredRoles, operator);
    return hasAccess ? <>{children}</> : null;
}

export default memo(RoleGuard);
