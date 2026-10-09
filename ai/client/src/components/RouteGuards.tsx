import { VNode } from 'preact'
import { useAuth } from '#front/hooks/useAuth.js'
import { NotAuthorized } from '#front/pages/_403'
import _ from 'lodash'

/**
 * ROUTE GUARD
 * Restricts access to certain routes based on user authentication and roles.
 * Make redirection to login page if user is not authenticated or does not have the required roles.
 */
// interface GuardProps {
//     component: ComponentType
// }

export function RouteGuard({ children, roles }: { children: VNode, roles?: string[] }) {

    const userContext = useAuth()

    const verifyRights = (): boolean => {
        if (!roles || roles.length === 0) {
            return true
        }

        let userRights = _.map(userContext?.user?.roles ?? [], role => _.toLower(role))
        let routeRights = _.map(roles ?? [], role => _.toLower(role))

        return routeRights.some(role => userRights.includes(role))
    }

    if (!verifyRights()) {
        return (
            <><NotAuthorized /></>
        )
    }

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
