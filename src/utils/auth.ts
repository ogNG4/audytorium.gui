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
            return jwtDecode(token);
        } catch (e) {
            return null;
        }
    },
};
