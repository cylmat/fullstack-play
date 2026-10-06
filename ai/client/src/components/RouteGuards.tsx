import { ComponentType } from 'preact'
import { route } from 'preact-iso'
import { useAuth } from '#front/hooks/useAuth'
import { NotFound } from '#front/pages/_404'

interface GuardProps {
    component: ComponentType
}

export function ProtectedRoute({ component: Component }: GuardProps) {
    const { isAuthenticated, isLoading } = useAuth()

    if (isLoading) return <div>Loading...</div>

    if (!isAuthenticated) {
        route('/login', true)
        return null
    }

    return <Component />
}

export function PublicRoute({ component: Component }: GuardProps) {
    const { isAuthenticated, isLoading } = useAuth()

    if (isLoading) return <div>Loading...</div>

    if (isAuthenticated) {
        route('/', true)
        return null
    }

    return <Component />
}
