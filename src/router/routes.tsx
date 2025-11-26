import type { RouteObject } from 'react-router-dom'
import { lazy } from 'react'
import IntroduceProfilePage from '@/features/home/pages/IntroduceProfilePage'

// Lazy Loading các components
const RootLayout = lazy(() => import('../layouts/RootLayout'))
const HomeLayout = lazy(() => import('@/features/home/components/HomeLayout'))
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
                        index: true,
                        element: <HomePage />,
                    },
                    {
                        path: 'profile/:slug',
                        element: <IntroduceProfilePage />,
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
