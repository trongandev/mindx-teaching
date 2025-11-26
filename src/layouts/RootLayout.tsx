import { Outlet } from 'react-router-dom'
import useScrollRestoration from '@/hooks/useScrollRestoration'

export default function RootLayout() {
    useScrollRestoration()

    return <Outlet />
}
