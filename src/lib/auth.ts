import api from './api';

export interface AuthUser {
    id: string;
    fullName: string;
    email: string;
    country: string;
    role: 'buyer' | 'seller' | 'admin';
    isVerified: boolean;
}

interface AuthResponse {
    message: string;
    token?: string;
    user?: AuthUser;
    code?: string;
}

export const authService = {
    async register(data: {
        fullName: string;
        email: string;
        password: string;
        country: string;
        role: 'buyer' | 'seller';
    }): Promise<AuthResponse> {
        const res = await api.post('/auth/register', data);
        return res.data;
    },

    async login(email: string, password: string): Promise<AuthResponse> {
        const res = await api.post('/auth/login', { email, password });
        if (res.data.token && res.data.user) {
            sessionStorage.setItem('token', res.data.token);
            sessionStorage.setItem('user', JSON.stringify(res.data.user));
        }
        return res.data;
    },

    async verifyEmail(token: string): Promise<AuthResponse> {
        const res = await api.get('/auth/verify-email?token=' + token);
        return res.data;
    },

    async resendVerification(email: string): Promise<AuthResponse> {
        const res = await api.post('/auth/resend-verification', { email });
        return res.data;
    },

    async forgotPassword(email: string): Promise<AuthResponse> {
        const res = await api.post('/auth/forgot-password', { email });
        return res.data;
    },

    async resetPassword(token: string, password: string): Promise<AuthResponse> {
        const res = await api.post('/auth/reset-password', { token, password });
        return res.data;
    },

    async getMe(): Promise<AuthResponse> {
        const res = await api.get('/auth/me');
        if (res.data.user) {
            sessionStorage.setItem('user', JSON.stringify(res.data.user));
        }
        return res.data;
    },

    logout(): void {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        api.post('/auth/logout').catch(() => {});
    },

    getToken(): string | null {
        if (typeof window === 'undefined') return null;
        return sessionStorage.getItem('token');
    },

    getUser(): AuthUser | null {
        if (typeof window === 'undefined') return null;
        const raw = sessionStorage.getItem('user');
        if (!raw) return null;
        try {
            return JSON.parse(raw) as AuthUser;
        } catch {
            return null;
        }
    },

    isAuthenticated(): boolean {
        return !!this.getToken();
    },
};
