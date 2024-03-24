import auth from '@/utils/auth';
import React from 'react';
import { RouteObject, RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';

async function loginLoader() {
    const token = auth.getDecodedToken();
    if (token) return redirect('/');
    return null;
}

async function protectedLoader() {
    const token = auth.getDecodedToken();
    if (!token) return redirect('/auth/login');
    return token;
}

/** Layouts */
export const BaseLayout = React.lazy(() => import('@/pages/layouts/BaseLayout'));
export const AuthLayout = React.lazy(() => import('@/pages/layouts/AuthLayout'));

/** Pages */
export const LoginPage = React.lazy(() => import('@/pages/(Auth)/Login/Page'));
export const CreateAccountPage = React.lazy(() => import('@/pages/(Auth)/CreateAccount/Page'));
export const ChatbotPage = React.lazy(() => import('@/pages/Chatbot/Page'));

const routeProps = {
    loader: protectedLoader,
};

const authRouteProps = {
    loader: loginLoader,
};

const routeList: RouteObject[] = [
    {
        id: 'root',
        path: '/',
        element: <BaseLayout />,
        children: [{ ...routeProps, path: '/', element: <ChatbotPage /> }],
    },
    {
        id: 'auth',
        path: '/',
        element: <AuthLayout />,
        children: [
            { ...authRouteProps, path: 'login', element: <LoginPage /> },
            { ...authRouteProps, path: 'create-account', element: <CreateAccountPage /> },
        ],
    },
];
const router = createBrowserRouter(routeList);

export const Routes: React.FC = () => {
    return <RouterProvider router={router} />;
};
