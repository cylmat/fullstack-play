import { ComponentType } from 'preact'
import { Route } from 'preact-iso'
import { useAuth } from '#front/hooks/useAuth'
import { NotFound } from '#front/pages/_404'
import { Login } from '#front/pages/Login'

interface GuardProps {
    component: ComponentType
}

export function ProtectedRoute({ component: Component }: GuardProps) {
    const { isAuthenticated, isLoading } = useAuth()

    if (isLoading) return <div>Loading...</div>

    if (!isAuthenticated) {
        return <Route path='/' component={Login} />
    }

    return <Component />
}

export function PublicRoute({ component: Component }: GuardProps) {
    const { isAuthenticated, isLoading } = useAuth()

    if (isLoading) return <div>Loading...</div>

    if (isAuthenticated) {
        return <Route path='/' component={Login} />
    }

    return <Component />
}

export function GuardRouter({ children }: { children: any }) {
    // const { isAuthenticated, isLoading } = useAuth()
    return (
        <>guard{children}</>
    )
}
