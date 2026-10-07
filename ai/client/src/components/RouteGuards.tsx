import { type ComponentType } from 'preact'
import { VNode } from 'preact'
import { useUser } from '#front/hooks/useUser'

/**
 * ROUTE GUARD
 * Restricts access to certain routes based on user authentication and roles.
 * Make redirection to login page if user is not authenticated or does not have the required roles.
 */


interface GuardProps {
    component: ComponentType
}

export function RouteGuard({ children, rights }: { children: VNode, rights?: string[] }) {

    const user = useUser()

    return (
        <>{children}</>
    )
}

// export function ProtectedRoute({ component: Component }: GuardProps) {
//     const { isAuthenticated, isLoading } = useUser()

//     if (isLoading) return <div>Loading...</div>

//     if (!isAuthenticated) {
//         return <Route path='/' component={Login} />
//     }

//     return <Component />
// }

// export function PublicRoute({ component: Component }: GuardProps) {
//     const { isAuthenticated, isLoading } = useUser()

//     if (isLoading) return <div>Loading...</div>

//     if (isAuthenticated) {
//         return <Route path='/' component={Login} />
//     }

//     return <Component />
// }
