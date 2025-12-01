import type { RouteObject } from 'react-router-dom'
import { lazy } from 'react'
import IntroduceProfilePage from '@/features/home/pages/IntroduceProfilePage'
import AuthLayout from '@/layouts/AuthLayout'
import LoginPage from '@/features/auth/LoginPage'
import ProfilePage from '@/features/home/pages/ProfilePage'
import TestPage from '@/features/home/pages/TestPage'

// Lazy Loading các components
const RootLayout = lazy(() => import('../layouts/RootLayout'))
const HomeLayout = lazy(() => import('@/layouts/HomeLayout'))
const HomePage = lazy(() => import('../features/home/pages/HomePage'))
const NotFound = lazy(() => import('../features/not-found/NotFound'))

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                path: '/',
                element: <HomeLayout />,
                children: [
                    {
                        index: true,
                        element: <HomePage />,
                    },
                    {
                        path: 'test',
                        element: <TestPage />,
                    },
                    {
                        path: 'profile',
                        element: <ProfilePage />,
                    },
                    {
                        path: 'profile/:slug',
                        element: <IntroduceProfilePage />,
                    },
                ],
            },
            {
                path: '/auth',
                element: <AuthLayout />,
                children: [
                    {
                        index: true,
                        element: <LoginPage />,
                    },
                ],
            },
            {
                path: '*',
                element: <NotFound />,
            },
        ],
    },
]
