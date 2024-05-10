import { AppRoleName, Token, VerifyRolesOperator } from '@/types/auth';
import auth from '@/utils/auth';
import React from 'react';
import { RouteObject, RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';
import RouteBoundary from '@/components/ErrorBoundary/RouteBoundary';
import { getRooms } from '@/hooks/queries/useRoomsQuery';

async function loginLoader() {
    const token = auth.getDecodedToken();
    if (token) return redirect('/');
    return null;
}

async function protectedLoader() {
    const token = auth.getDecodedToken();
    if (!token) return redirect('/login');
    return token;
}

async function rolesLoader(requiredRoles: AppRoleName[], operator?: VerifyRolesOperator) {
    const user = (await protectedLoader()) as Token;
    const hasAccess = auth.checkRoles({ roles: user.roles, requiredRoles, operator });
    if (!hasAccess) throw new Response('Forbidden', { status: 403 });
    return user;
}

/** Layouts */
export const BaseLayout = React.lazy(() => import('@/pages/layouts/BaseLayout'));
export const AuthLayout = React.lazy(() => import('@/pages/layouts/AuthLayout'));
export const AdminPanelLayout = React.lazy(() => import('@/pages/layouts/AdminLayout'));

/** Pages */
export const LoginPage = React.lazy(() => import('@/pages/(Auth)/Login/Page'));
export const SetNewPasswordPage = React.lazy(() => import('@/pages/(Auth)/SetNewPassword/Page'));
export const ResetPasswordPage = React.lazy(() => import('@/pages/(Auth)/ResetPassword/Page'));
export const ChatbotPage = React.lazy(() => import('@/pages/Chatbot/Page'));
export const UsersPage = React.lazy(() => import('@/pages/AdminPanel/Users/Page'));
export const UserModal = React.lazy(() => import('@/pages/AdminPanel/Users/[Id]/Page'));
export const RoomsModal = React.lazy(() => import('@/pages/AdminPanel/Room/Page'));

const routeProps = {
    errorElement: <RouteBoundary />,
    loader: protectedLoader,
};

const authRouteProps = {
    errorElement: <RouteBoundary />,
    loader: loginLoader,
};

const routeList: RouteObject[] = [
    {
        id: 'root',
        path: '/',
        ...routeProps,
        element: <BaseLayout />,

        children: [
            {
                ...routeProps,
                path: '/',
                loader: async () => {
                    try {
                        const rooms = await getRooms();
                        localStorage.setItem('selectedRoom', rooms[0].id);
                        return redirect(`/${rooms[0].id}`);
                    } catch (error) {
                        console.error('Błąd podczas pobierania pokoi:', error);
                        return null;
                    }
                },
            },
            {
                ...routeProps,
                path: '/:roomId',
                element: <ChatbotPage />,
            },
        ],
    },
    {
        id: 'auth',
        path: '/',
        element: <AuthLayout />,
        children: [
            { ...authRouteProps, path: 'login', element: <LoginPage /> },
            { ...authRouteProps, path: 'set-password', element: <SetNewPasswordPage /> },
            { ...authRouteProps, path: 'reset-password', element: <ResetPasswordPage /> },
        ],
    },
    {
        id: 'admin',
        path: '/admin-panel',
        element: <AdminPanelLayout />,
        ...routeProps,
        children: [
            {
                path: 'users',
                loader: () => rolesLoader([AppRoleName.SuperAdmin, AppRoleName.Admin]),
                element: <UsersPage />,
            },
            {
                path: 'users/:userId',
                loader: () => rolesLoader([AppRoleName.SuperAdmin, AppRoleName.Admin]),
                element: <UserModal />,
            },
            {
                path: 'rooms',
                loader: () => rolesLoader([AppRoleName.SuperAdmin, AppRoleName.Admin]),
                element: <RoomsModal />,
            },
        ],
    },
    {
        path: '/logout',
        loader() {
            auth.removeToken();
            return redirect('/login');
        },
    },
];
export const router = createBrowserRouter(routeList);

export const Routes: React.FC = () => {
    return <RouterProvider router={router} />;
};
