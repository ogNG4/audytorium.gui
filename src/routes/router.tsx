import React from 'react';
import { RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom';

export const BaseLayout = React.lazy(() => import('@/pages/layouts/BaseLayout'));
export const HomePage = React.lazy(() => import('@/pages/Page'));

const routeList: RouteObject[] = [
    {
        id: 'root',
        path: '/',
        element: <BaseLayout />,
        children: [{ path: '/', element: <HomePage /> }],
    },
];
const router = createBrowserRouter(routeList);

export const Routes: React.FC = () => {
    return <RouterProvider router={router} />;
};
