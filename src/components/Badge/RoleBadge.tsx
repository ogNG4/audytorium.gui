import { AppRoleName } from '@/types/auth';
import { transformRoleName } from '@/utils/common';
import { Badge } from '@chakra-ui/react';
import { memo } from 'react';

interface RoleBadgeProps {
    role: AppRoleName;
}
function RoleBadge({ role }: RoleBadgeProps) {
    const transformedRole = transformRoleName(role);

    return (
        <Badge
            colorScheme={
                role === AppRoleName.SuperAdmin
                    ? 'red'
                    : role === AppRoleName.Admin
                    ? 'orange'
                    : role === AppRoleName.Auditor
                    ? 'blue'
                    : 'gray'
            }
        >
            {transformedRole}
        </Badge>
    );
}

export default memo(RoleBadge);
