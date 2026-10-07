import { type ComponentType } from 'preact'
import { VNode } from 'preact'
import { useAuth } from '#front/hooks/useAuth'

/**
 * ROUTE GUARD
 * Restricts access to certain routes based on user authentication and roles.
 * Make redirection to login page if user is not authenticated or does not have the required roles.
 */


interface GuardProps {
    component: ComponentType
}

// export function ProtectedRoute({ component: Component }: GuardProps) {
//     const { isAuthenticated, isLoading } = useAuth()

//     if (isLoading) return <div>Loading...</div>

//     if (!isAuthenticated) {
//         return <Route path='/' component={Login} />
//     }

//     return <Component />
// }

// export function PublicRoute({ component: Component }: GuardProps) {
//     const { isAuthenticated, isLoading } = useAuth()

//     if (isLoading) return <div>Loading...</div>

//     if (isAuthenticated) {
//         return <Route path='/' component={Login} />
//     }

//     return <Component />
// }

export function RouteGuard({ children, rights }: { children: VNode, rights?: string[] }) {

    const user = useAuth()
    console.log(user)

    return (
        <>{children}</>
    )
}
