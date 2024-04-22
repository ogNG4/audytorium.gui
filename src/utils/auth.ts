import { Token } from '@/types/auth';
import { RolesAccessProps } from '@/types/common';
import { jwtDecode } from 'jwt-decode';
export default {
    tokenName: 'accessToken',
    removeToken() {
        localStorage.removeItem(this.tokenName);
    },
    getToken() {
        return localStorage.getItem(this.tokenName) as string;
    },
    getDecodedToken() {
        const token = this.getToken();

        try {
            return jwtDecode(token) as Token;
        } catch (e) {
            return null;
        }
    },

    checkRoles({ roles, requiredRoles, operator = 'AND' }: RolesAccessProps) {
        if (operator === 'OR') return requiredRoles.some((role) => roles.includes(role));
        return requiredRoles.every((role) => roles.includes(role));
    },
};
